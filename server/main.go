package main

import (
	"log"
	"os"
	"strconv"

	// Automatically loads in environment variables from the .env file.

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
	contents, _ := bucket.FetchAllArtwork()
	for _, artwork := range contents {
		log.Printf("%+v\n", artwork)
	}

	// Initialize a Server object.
	port, err := strconv.Atoi(portAsStr)
	if err != nil {
		log.Fatalf("Failed to convert PORT env var to int: %v\n", err)
	}
	server := NewServer(port)

	server.Start()
}
