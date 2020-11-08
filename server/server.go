package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
)

// Server is an object that exposes HTTP API endpoints which facilitate interaction with an AWS S3
// bucket.
type Server struct {
	// port stores the port number that the server listens for requests on.
	port int
	// bucket facilitates all interactions with an S3 bucket.
	bucket *Bucket
}

// NewServer returns a new Server object initialized with the provided port number and Bucket.
func NewServer(port int, bucket *Bucket) *Server {
	return &Server{port, bucket}
}

// Start registers all of the handler funcs with their corresponding routes and begins listening for
// requests.
func (s *Server) Start() {
	// Register routes with their respective handler funcs.
	http.HandleFunc("/hello", s.helloHandler)
	http.HandleFunc("/bucketContents", s.bucketContentsHandler)

	// Stand up the server.
	log.Printf("Listening on port %d....", s.port)
	portAddr := fmt.Sprintf(":%d", s.port)
	log.Fatal(http.ListenAndServe(portAddr, nil))
}

// helloHandler handles requests on the "/hello" route.
func (s *Server) helloHandler(w http.ResponseWriter, r *http.Request) {
	constructAndSendResponse(w, "Hello world!")
}

// bucketContentsHandler handles requests on the "/bucketContents" route.
func (s *Server) bucketContentsHandler(w http.ResponseWriter, r *http.Request) {
	// Traverse the entire bucket and fetch the contents.
	contents, err := s.bucket.FetchAllArtwork()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	constructAndSendResponse(w, contents)
}

// constructAndSendResponse adds important, common headers to endpoint responses, and marshals the
// provided response body into JSON.
func constructAndSendResponse(w http.ResponseWriter, body interface{}) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/json")

	err := json.NewEncoder(w).Encode(body)
	if err != nil {
		errCode := http.StatusInternalServerError
		errMsg := fmt.Sprintf("Failed to encode response as JSON: %s", err.Error())
		http.Error(w, errMsg, errCode)
		return
	}
}
