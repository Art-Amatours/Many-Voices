package api

import (
	"fmt"
	"net/http"
)

const (
	minPort = 1025
	maxPort = 65535
)

// API sets up handlers for HTTP endpoints, and spins up an HTTP server.
type API struct {
	router *http.ServeMux
	port   int
}

// NewAPI returns a pointer to a new API object initialized with the provided
// pointer to router and port number to listen on.
func NewAPI(router *http.ServeMux, port int) (*API, error) {
	if port < minPort || port > maxPort {
		return nil, fmt.Errorf(
			"the provided port must be within the range: [%d, %d]",
			minPort,
			maxPort,
		)
	}

	return &API{router, port}, nil
}
