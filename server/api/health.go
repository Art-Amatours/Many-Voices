package api

import "net/http"

// HealthHandler handles requests to endpoints that respond with information about the server's
// current state and status.
type HealthHandler struct {
}

// NewHealthHandler returns a pointer to a new HealthHandler initialized with the provided fields.
func NewHealthHandler() *HealthHandler {
	return &HealthHandler{}
}

// healthHandler serves requests at the /health route. Responds with information about the server's
// state.
//
// TODO: include relevant health information in response. Maybe how many artworks are currently in
// the system, or how many users are using the mobile app right now?
func (h *HealthHandler) healthHandler(w http.ResponseWriter, r *http.Request) {
	response := map[string]interface{}{
		"ok": true,
	}
	constructAndSendResponse(w, response)
}

// RegisterRoutes registers handlers for all of the routes that HealthHandler supports.
func (h *HealthHandler) RegisterRoutes(router *http.ServeMux) {
	router.HandleFunc("/health", h.healthHandler)
}
