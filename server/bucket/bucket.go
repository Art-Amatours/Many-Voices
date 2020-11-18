package bucket

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
	"regexp"
	"strings"
	"sync"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
	"github.com/aws/aws-sdk-go/service/s3/s3manager"
)

const (
	bucketURLPrefix = "https://"
	// bucketURLSuffix is used to build public URLs to objects in an S3 bucket.
	bucketURLSuffix = ".s3.amazonaws.com/"
)

// Bucket stores information about an AWS S3 bucket, and implements functionality to interact with,
// or perform opertaions on, an S3 bucket.
type Bucket struct {
	// name stores the name of the S3 bucket.
	name string
	// region stores the AWS region where this bucket lives.
	region string
	// svc is a reference to an AWS service client. svc handles all interactions, or operations,
	// with this bucket.
	svc      *s3.S3
	uploader *s3manager.Uploader
	// fileExtRegexp stores a compiled regular expression for stripping out file extensions from
	// file names.
	fileExtRegexp *regexp.Regexp

	imagesSubDirRegexp *regexp.Regexp

	critiquesSubDirRegexp *regexp.Regexp
}

// NewBucket sets up a new AWS session and an S3 service client, then returns a new Bucket object
// populated with that service client.
func NewBucket(name, region string) (*Bucket, error) {
	sess, err := session.NewSession(&aws.Config{
		Region: aws.String(region),
	})
	if err != nil {
		return nil, fmt.Errorf("Failed to establish a new AWS session: %v", err)
	}

	// These sessions are safe to use concurrently (in multiple goroutines), which means that we're
	// all clear to use them in HTTP handler functions.
	svc := s3.New(sess)
	uploader := s3manager.NewUploader(sess)

	// These steps are kinda expensive. Instead of doing this in FetchAllArtwork() and compiling a
	// regexp each time we traverse the bucket's file system, we do this once on Bucket object
	// creation.
	fileExtRegexp, err := regexp.Compile(".[0-9a-z]+$") // Filtering for alphanumeric values only
	if err != nil {
		return nil, fmt.Errorf("Failed to compile file extension regexp: %v", err)
	}
	imagesSubDirRegexp, err := regexp.Compile(`^[0-9a-zA-Z-_]+\/images\/.*`) // Filtering for a */images/ subdir.
	if err != nil {
		return nil, fmt.Errorf("Failed to compile images subdir regexp: %v", err)
	}
	critiquesSubDirRegexp, err := regexp.Compile(`^[0-9a-zA-Z-_]+\/critiques\/[0-9a-zA-Z-_]+\/.*`) // Filtering for a */critiques/*/ subdir.
	if err != nil {
		return nil, fmt.Errorf("Failed to compile critiques subdir regexp: %v", err)
	}

	return &Bucket{name, region, svc, uploader, fileExtRegexp, imagesSubDirRegexp, critiquesSubDirRegexp}, nil
}

// ArtworkInfo describes all information about an artwork in the bucket.
type ArtworkInfo struct {
	Title       string          `json:"title"`
	Artist      string          `json:"artist"`
	Description string          `json:"description"`
	Tags        [][]string      `json:"tags"`
	ImageURLs   []string        `json:"imageURLs"`
	Critiques   []*CritiqueInfo `json:"critiques"`
	ObjectPath  string          `json:"objectPath"`
}

// CritiqueInfo describes information about each audio critique associated with
// one artwork.
type CritiqueInfo struct {
	Title      string     `json:"title"`
	Critic     string     `json:"critic"`
	Transcript string     `json:"transcript"`
	Tags       [][]string `json:"tags"`
	AudioURL   string     `json:"audioURL"`
	ObjectPath string     `json:"objectPath"`
}

// FetchAllArtwork fetches information for all of the artwork in the S3 bucket.
func (b *Bucket) FetchAllArtwork() ([]*ArtworkInfo, error) {
	// Fetch all objects in the bucket.
	res, err := b.svc.ListObjectsV2(&s3.ListObjectsV2Input{Bucket: &b.name})
	if err != nil {
		return nil, fmt.Errorf("Failed to list all objects in the S3 bucket: %v", err)
	}

	// Build a list of artworkInfo objects for all artwork in the bucket.
	artworkList := make([]*ArtworkInfo, 0)
	// Begin at -1 because when we encounter a new directory, we increment this var. When we
	// encounter our first directory and increment this variable, we want this var to equal 0.
	curArtworkIndex := -1
	// Begin at -1 because when we encounter a new critique, we increment this var. When we
	// encounter our first directory and increment this variable, we want this var to equal 0.
	curCritiqueIndexes := make([]int, 0)
	// Pass this channel in with each addInfo() call. If addInfo() is called and something goes
	// wrong, addInfo() will push an error onto this channel.
	errChan := make(chan error)
	// This WaitGroup keeps track of how many more goroutines are executing.
	var wg sync.WaitGroup

	for _, object := range res.Contents {
		if *object.Size == 0 && strings.Count(*object.Key, "/") == 1 {
			// The cur object is a top-level directory. Create a new ArtworkInfo object in
			// artworkList for the artwork that this directory represents.
			newArtworkInfoObj := ArtworkInfo{
				Tags:      make([][]string, 0),
				ImageURLs: make([]string, 0),
			}
			artworkList = append(artworkList, &newArtworkInfoObj)
			curArtworkIndex++
			curCritiqueIndexes = append(curCritiqueIndexes, -1)

			continue
		}

		if *object.Size == 0 && b.critiquesSubDirRegexp.MatchString(*object.Key) {
			// The cur object is a critiques/ subdirectory. Create a new CritiqueInfo object in
			// the corresponding ArtworkInfo struct's artworkList for the critique that this
			// subdirectory represents.
			newCritiqueInfoObj := CritiqueInfo{
				Tags: make([][]string, 0),
			}
			artworkList[curArtworkIndex].Critiques = append(artworkList[curArtworkIndex].Critiques, &newCritiqueInfoObj)
			curCritiqueIndexes[curArtworkIndex]++

			continue
		}

		// Look for a top-level .json file with info about an artwork.
		if strings.Count(*object.Key, "/") == 1 && b.fileExtRegexp.FindString(*object.Key) == ".json" {
			// Construct public URL for the object.
			objectURL := bucketURLPrefix + b.name + bucketURLSuffix + *object.Key

			// Download the top-level .json file for this artwork and store its contents in the
			// corresponding ArtworkInfo struct pointed to by curArtworkIndex.
			wg.Add(1)
			go addArtworkInfo(*object.Key, objectURL, artworkList, curArtworkIndex, &wg, errChan)

			continue
		}

		// Look for images inside of a particular artwork's "images/" dir.
		if *object.Size > 0 && b.imagesSubDirRegexp.MatchString(*object.Key) {
			// Construct public URL for the object.
			objectURL := bucketURLPrefix + b.name + bucketURLSuffix + *object.Key

			addImage(objectURL, artworkList, curArtworkIndex)

			continue
		}

		// Look for critique info inside of a .json file from an artwork's critiques/ dir.
		if *object.Size > 0 && b.critiquesSubDirRegexp.MatchString(*object.Key) && b.fileExtRegexp.FindString(*object.Key) == ".json" {
			// Construct public URL for the object.
			objectURL := bucketURLPrefix + b.name + bucketURLSuffix + *object.Key

			// Add audioURL for critique
			audioURL := bucketURLPrefix + b.name + bucketURLSuffix + (strings.Replace(*object.Key, ".json", ".mp3", 1))
			critiqueList := artworkList[curArtworkIndex].Critiques
			// Download the .json file for the current critique and store its contents in the
			// corresponding ArtworkInfo struct pointed to by curArtworkIndex.
			wg.Add(1)
			go addCritiqueInfo(*object.Key, objectURL, critiqueList, curCritiqueIndexes[curArtworkIndex], audioURL, &wg, errChan)

			continue
		}
	}

	// Wait for all of the goroutines that we launched to finish. Once they all finish, close the
	// wgDone channel. The wgDone channel will never have a value pushed to it; it's strictly here
	// so that we can close it once the WaitGroup is done.
	wgDone := make(chan bool)
	go func() {
		wg.Wait()
		close(wgDone)
	}()
	// Wait until either the WaitGroup is done, or one of them pushes an error to errChan.
	select {
	case <-wgDone:
		// Everything went according to plan, and all the goroutines in the WaitGroup finished with
		// no problems. Fall through this select block.
		break
	case err := <-errChan:
		// Close errChan if we get an error. We don't care if more of the goroutines fail. We drop
		// everything and return the error we get if something goes wrong.
		close(errChan)
		return nil, fmt.Errorf("Failed to add artwork info from JSON: %v", err)
	}

	return artworkList, nil
}

// addArtworkInfo is a helper func to FetchAllArtwork(). It fetches the JSON file at the provided
// URL, then uses its contents to populate fields on the artworkInfo struct at the
// curArtworkIndex'th index of the artworkList slice. If something goes wrong, it will push an error
// onto the provided error channel.
func addArtworkInfo(
	objectPath string,
	fileURL string,
	artworkList []*ArtworkInfo,
	curArtworkIndex int,
	wg *sync.WaitGroup,
	errChan chan error,
) {
	defer wg.Done()

	// Fetch the contents of the file in the bucket at the provided fileURL.
	//
	// You can think of this conceptually like hitting an HTTP API endpoint, and the file contents
	// are the response body.
	resp, err := http.Get(fileURL)
	if err != nil {
		errChan <- fmt.Errorf("Failed to fetch JSON file from bucket: %v", err)
		return
	}
	defer resp.Body.Close()

	// Marshal the response body's contents.
	bodyAsObj := ArtworkInfo{}
	err = json.NewDecoder(resp.Body).Decode(&bodyAsObj)
	if err != nil {
		errChan <- fmt.Errorf("Failed to marshal JSON file into ArtworkInfo object: %v", err)
		return
	}

	// Populate fields on the curArtworkIndex'th index of the artworkList slice with the info from
	// the JSON file that we just fetched.
	curArtworkInfoObj := artworkList[curArtworkIndex]
	curArtworkInfoObj.Title = bodyAsObj.Title
	curArtworkInfoObj.Artist = bodyAsObj.Artist
	curArtworkInfoObj.Description = bodyAsObj.Description
	curArtworkInfoObj.Tags = bodyAsObj.Tags

	curArtworkInfoObj.ObjectPath = objectPath
}

// addCritiqueInfo is a helper func to FetchAllArtwork(). It fetches the JSON file at the provided
// URL, then uses its contents to populate fields on the critiqueInfo struct at the
// curCritiqueIndex'th index of the critiqueList slice. If something goes wrong, it will push an
// error onto the provided error channel.
func addCritiqueInfo(
	objectPath string,
	fileURL string,
	critiqueList []*CritiqueInfo,
	curCritiqueIndex int,
	audioURL string,
	wg *sync.WaitGroup,
	errChan chan error,
) {
	defer wg.Done()

	// Fetch the contents of the file in the bucket at the provided fileURL.
	//
	// You can think of this conceptually like hitting an HTTP API endpoint, and the file contents
	// are the response body.
	resp, err := http.Get(fileURL)
	if err != nil {
		errChan <- fmt.Errorf("Failed to fetch JSON file from bucket: %v", err)
		return
	}
	defer resp.Body.Close()

	// Marshal the response body's contents.
	bodyAsObj := CritiqueInfo{}
	err = json.NewDecoder(resp.Body).Decode(&bodyAsObj)
	if err != nil {
		errChan <- fmt.Errorf("Failed to marshal JSON file into CritiqueInfo object: %v", err)
		return
	}

	// Populate fields on the curCritiqueIndex'th index of the critiqueList slice with the info from
	// the JSON file that we just fetched.
	curCritiqueInfoObj := critiqueList[curCritiqueIndex]
	curCritiqueInfoObj.Title = bodyAsObj.Title
	curCritiqueInfoObj.Critic = bodyAsObj.Critic
	curCritiqueInfoObj.Transcript = bodyAsObj.Transcript
	curCritiqueInfoObj.AudioURL = audioURL
	curCritiqueInfoObj.Tags = bodyAsObj.Tags

	curCritiqueInfoObj.ObjectPath = objectPath
}

// addImage is a helper func to FetchAllArtwork(). It adds the provided URL to the images slice on
// the artworkInfo struct at the curArtworkIndex'th index of the artworkList slice.
func addImage(fileURL string, artworkList []*ArtworkInfo, curArtworkIndex int) {
	curArtworkImagesList := artworkList[curArtworkIndex].ImageURLs
	artworkList[curArtworkIndex].ImageURLs = append(curArtworkImagesList, fileURL)
}

// ReplaceExistingJSONFile replaces the file at the provided object path in the S3 bucket with a new
// one.
func (b *Bucket) ReplaceExistingJSONFile(objectPath string, file []byte) error {
	_, err := b.uploader.Upload(&s3manager.UploadInput{
		Bucket: aws.String(b.name),
		Key:    aws.String(objectPath),
		Body:   bytes.NewReader(file),
	})
	if err != nil {
		return fmt.Errorf("failed to upload new %s: %v", objectPath, err)
	}

	return nil
}

// DeleteFile deletes the file at the provided object path in the S3 bucket.
func (b *Bucket) DeleteFile(objectPath string) error {
	// List all objects whose absolute paths have the prefix: objectPath. If we're deleting one
	// file, then this should only return one object path; if we're deleting a directory, then this
	// should list all objects in that directory.
	objects, err := b.svc.ListObjectsV2(&s3.ListObjectsV2Input{
		Bucket: aws.String(b.name),
		Prefix: aws.String(objectPath),
	})
	if err != nil {
		return fmt.Errorf("failed to list %s in bucket: %v", objectPath, err)
	}

	// Remove each object that we found.
	for _, object := range objects.Contents {
		_, err := b.svc.DeleteObject(&s3.DeleteObjectInput{
			Bucket: aws.String(b.name),
			Key:    object.Key,
		})
		if err != nil {
			return fmt.Errorf("failed to delete %s from bucket: %v", objectPath, err)
		}
	}

	return nil
}
