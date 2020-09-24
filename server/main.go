package main

import (
	"log"
	"os"
	"strconv"

	// Automatically loads in environment variables from the .env file.
	_ "github.com/joho/godotenv/autoload"
)

func main() {
	// Pull down env vars
	portAsStr := os.Getenv("PORT")

	// Initialize a Server object.
	port, err := strconv.Atoi(portAsStr)
	if err != nil {
		log.Fatalf("Failed to convert PORT env var to int: %v\n", err)
	}
	server := NewServer(port)

	server.Start()
}
