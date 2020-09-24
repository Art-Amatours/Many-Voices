package main

import (
	"fmt"
	"log"
	"net/http"
)

// Server is an object that exposes HTTP API endpoints which facilitate interaction with an AWS S3
// bucket.
type Server struct {
	// port stores the port number that the server listens for requests on.
	port int
}

// NewServer returns a new Server object initialized with the provided port number and Bucket.
func NewServer(port int) *Server {
	return &Server{port}
}

// Start registers all of the handler funcs with their corresponding routes and begins listening for
// requests.
func (s *Server) Start() {
	// Register routes with their respective handler funcs.
	http.HandleFunc("/hello", s.helloHandler)

	// Stand up the server.
	log.Printf("Listening on port %d....", s.port)
	portAddr := fmt.Sprintf(":%d", s.port)
	log.Fatal(http.ListenAndServe(portAddr, nil))
}

// helloHandler handles requests on the "/hello" route.
func (s *Server) helloHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintln(w, "Hello world!")
}
