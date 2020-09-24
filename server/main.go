package main

import (
	"fmt"
	"log"
	"os"
	"strconv"

	// Automatically loads in environment variables from the .env file.
	"github.com/aws/aws-sdk-go/service/s3"
	_ "github.com/joho/godotenv/autoload"
)

const bucketRegion = "us-east-1"

func main() {
	// Pull down env vars
	bucketName := os.Getenv("BUCKET")
	portAsStr := os.Getenv("PORT")

	// Get a new Bucket object to interact with our S3 bucket through.
	bucket, err := NewBucket(bucketName, bucketRegion)
	if err != nil {
		log.Fatalf("Failed to create a new Bucket object: %v\n", err)
	}
	// TODO: TEMPORARY! JUST FOR TESTING TO SEE IF WE'RE WIRED UP TO THE BUCKET IN THE CLOUD
	contents, _ := bucket.svc.ListObjectsV2(&s3.ListObjectsV2Input{Bucket: &bucket.name})
	fmt.Printf("%+v\n", contents)

	// Initialize a Server object.
	port, err := strconv.Atoi(portAsStr)
	if err != nil {
		log.Fatalf("Failed to convert PORT env var to int: %v\n", err)
	}
	server := NewServer(port)

	server.Start()
}
