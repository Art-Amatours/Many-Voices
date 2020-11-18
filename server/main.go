package main

import (
	"log"
	"net/http"
	"os"
	"strconv"

	// Automatically loads in environment variables from the .env file.

	"github.com/Art-Amatours/Many-Voices/api"
	"github.com/Art-Amatours/Many-Voices/bucket"
	_ "github.com/joho/godotenv/autoload"
)

const bucketRegion = "us-east-1"

func main() {
	// Pull down env vars
	bucketName := os.Getenv("BUCKET")
	portAsStr := os.Getenv("PORT")

	// Get a new Bucket object to interact with our S3 bucket through.
	bucket, err := bucket.NewBucket(bucketName, bucketRegion)
	if err != nil {
		log.Fatalf("Failed to create a new Bucket object: %v\n", err)
	}

	// Get a new API object and spin up an HTTP server.
	port, err := strconv.Atoi(portAsStr)
	if err != nil {
		log.Fatalf("Failed to convert PORT env var to int: %v\n", err)
	}
	router := http.NewServeMux()
	a, err := api.NewAPI(router, port)
	if err != nil {
		log.Fatalf("Failed to stand up new API object: %v\n", err)
	}
	a.ListenOnEndpoints([]api.RouteHandler{
		api.NewHealthHandler(),
		api.NewBucketHandler(bucket),
	})
}
