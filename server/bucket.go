package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"regexp"
	"strings"
	"sync"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
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
	svc *s3.S3
	// fileExtRegexp stores a compiled regular expression for stripping out file extensions from
	// file names.
	fileExtRegexp *regexp.Regexp
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

	// This session is safe to use concurrently (in multiple goroutines), which means that we're
	// all clear to use it in HTTP handler functions.
	svc := s3.New(sess)

	// This step is kinda expensive. Instead of doing this in FetchAllArtwork() and compiling a
	// regexp each time we traverse the bucket's file system, we do this once on Bucket object
	// creation.
	fileExtRegexp, err := regexp.Compile(".[0-9a-z]+$") // Filtering for alphanumeric values only
	if err != nil {
		return nil, fmt.Errorf("Failed to compile file extension regexp: %v", err)
	}

	return &Bucket{name, region, svc, fileExtRegexp}, nil
}

// ArtworkInfo describes all information about an artwork in the bucket.
type ArtworkInfo struct {
	Title       string   `json:"title"`
	Artist      string   `json:"artist"`
	Description string   `json:"description"`
	Tags        []string `json:"tags"`
}

// CritiqueInfo describes information about each audio critique associated with
// one artwork.
type CritiqueInfo struct {
	Title      string   `json:"title"`
	Critic     string   `json:"critic"`
	Transcript string   `json:"transcript"`
	Tags       []string `json:"tags"`
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
				Tags: make([]string, 0),
			}
			artworkList = append(artworkList, &newArtworkInfoObj)
			curArtworkIndex++

			continue
		}

		// Look for a top-level .json file with info about an artwork.
		if strings.Count(*object.Key, "/") == 1 && b.fileExtRegexp.FindString(*object.Key) == ".json" {
			// Construct public URL for the object.
			objectURL := bucketURLPrefix + b.name + bucketURLSuffix + *object.Key

			// Download the top-level .json file for this artwork and store its contents in the
			// corresponding ArtworkInfo struct pointed to by curArtworkIndex.
			wg.Add(1)
			go addInfo(objectURL, artworkList, curArtworkIndex, &wg, errChan)

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

// addInfo is a helper func to FetchAllArtwork(). It fetches the JSON file at the provided URL, then
// uses its contents to populate fields on the artworkInfo struct at the curArtworkIndex'th index of
// the artworkList slice. If something goes wrong, it will push an error onto the provided error
// channel.
func addInfo(
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
}
