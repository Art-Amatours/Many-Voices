package api

import (
	"fmt"
	"log"
	"net/http"
)

const (
	minPort = 1025
	maxPort = 65535
)

// RouteHandler describes objects which handle requests to specific HTTP endpoints.
type RouteHandler interface {
	RegisterRoutes(*http.ServeMux)
}

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

// ListenOnEndpoints registers all of the HTTP handler funcs with their corresponding routes and
// begins listening for new requests that come in on those routes.
func (a *API) ListenOnEndpoints(handlers []RouteHandler) {
	// Register routes with their corresponding handler funcs.
	for _, handler := range handlers {
		handler.RegisterRoutes(a.router)
	}

	// Start accepting requests on those routes.
	log.Printf("Listening on port %d....\n", a.port)
	portAddr := fmt.Sprintf(":%d", a.port)
	log.Fatal(http.ListenAndServe(portAddr, a.router))
}
