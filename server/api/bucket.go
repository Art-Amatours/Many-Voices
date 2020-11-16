package api

import (
	"encoding/json"
	"net/http"
	"strings"

	"github.com/Art-Amatours/Many-Voices/bucket"
)

// BucketHandler handles requests to endpoints that respond with information about artwork info in
// our S3 bucket.
type BucketHandler struct {
	bucket *bucket.Bucket
}

// NewBucketHandler returns a pointer to a new BucketHandler initialized with the provided fields.
func NewBucketHandler(bucket *bucket.Bucket) *BucketHandler {
	return &BucketHandler{bucket}
}

// getContentsHandler handles requests on GET /bucket.
func (h *BucketHandler) getContentsHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != "GET" {
		http.Error(w, "This endpoint only supports GET requests", http.StatusBadRequest)
		return
	}

	// Traverse the entire bucket and fetch the contents.
	contents, err := h.bucket.FetchAllArtwork()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	constructAndSendResponse(w, contents)
}

// postNewObjectHandler handles POST requests on the "/bucket/:objectPath" route.
func (h *BucketHandler) postNewObjectHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != "POST" {
		http.Error(w, "This endpoint only supports POST requests", http.StatusBadRequest)
		return
	}

	// Turn payload into a "file" (slice of bytes).
	file, err := json.MarshalIndent(r.Body, "", " ")
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Extract object path from URI.
	//
	// TODO: validate URI structure. We aren't checking that the provided object path in the URI is
	// present, much less valid.
	objectPath := strings.TrimPrefix(r.URL.Path, "/bucket")

	// Send that file off to the S3 bucket.
	err = h.bucket.ReplaceExistingJSONFile(objectPath, file)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}

// RegisterRoutes registers handlers for all of the routes that BucketHandler supports.
func (h *BucketHandler) RegisterRoutes(router *http.ServeMux) {
	router.HandleFunc("/bucket", h.getContentsHandler)
	router.HandleFunc("/bucket/", h.postNewObjectHandler)
}
