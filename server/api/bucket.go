package api

import (
	"encoding/json"
	"net/http"

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

// bucketContentsHandler handles requests on the "/bucketContents" route.
func (h *BucketHandler) bucketContentsHandler(w http.ResponseWriter, r *http.Request) {
	// Traverse the entire bucket and fetch the contents.
	contents, err := h.bucket.FetchAllArtwork()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	constructAndSendResponse(w, contents)
}

// ReplaceExistingJSONFileRequestBody represents the structure of the request body for a hit to the
// POST /replaceExistingFile endpoint.
type ReplaceExistingJSONFileRequestBody struct {
	ObjectPath string      `json:"objectPath"`
	Content    interface{} `json:"content"`
}

// replaceExistingFileHandler handles POST requests on the "/replaceExistingFile" route.
func (h *BucketHandler) replaceExistingFileHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != "POST" {
		http.Error(w, "This endpoint only supports POST requests", http.StatusBadRequest)
		return
	}

	// Extract request body into rb (request body) struct.
	decoder := json.NewDecoder(r.Body)
	decoder.DisallowUnknownFields()

	var rb ReplaceExistingJSONFileRequestBody
	err := decoder.Decode(&rb)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	if rb.ObjectPath == "" {
		http.Error(w, "objectPath field must be present in request body", http.StatusBadRequest)
		return
	}
	if rb.Content == nil {
		http.Error(w, "content field must be present in request body", http.StatusBadRequest)
		return
	}

	// Turn payload into a "file" (slice of bytes).
	file, err := json.MarshalIndent(rb.Content, "", " ")
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Send that file off to the S3 bucket.
	err = h.bucket.ReplaceExistingJSONFile(rb.ObjectPath, file)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}

// RegisterRoutes registers handlers for all of the routes that BucketHandler supports.
func (h *BucketHandler) RegisterRoutes(router *http.ServeMux) {
	router.HandleFunc("/bucketContents", h.bucketContentsHandler)
	router.HandleFunc("/replaceExistingFile", h.replaceExistingFileHandler)
}
