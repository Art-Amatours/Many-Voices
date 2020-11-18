package api

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"strings"

	"github.com/Art-Amatours/Many-Voices/bucket"
)

const (
	resourcePrefix  = "/bucket"
	fileFormKeyName = "file"
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

func (h *BucketHandler) objectSubResourceHandler(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodPost:
		header := r.Header.Get("Content-Type")
		if header == "application/json" {
			h.postNewJSONObjectHandler(w, r)
		} else if strings.Contains(header, "multipart/form-data") {
			h.postNewFileObjectHandler(w, r)
		} else {
			http.Error(w, "This POST endpoint expects the Content-Type header to either be "+
				"application/json or multipart/form-data", http.StatusBadRequest)
		}
	case http.MethodDelete:
		h.deleteObjectHandler(w, r)
	default:
		http.Error(w, "This endpoint only supports POST and DELETE requests", http.StatusBadRequest)
	}
}

// postNewJSONObjectHandler handles POST requests on the "/bucket/:objectPath" route that have the
// Content-Type=application/json header set.
func (h *BucketHandler) postNewJSONObjectHandler(w http.ResponseWriter, r *http.Request) {
	// Turn payload into a "file" (slice of bytes).
	var requestBody interface{}
	err := json.NewDecoder(r.Body).Decode(&requestBody)
	if err != nil {
		http.Error(w, fmt.Sprintf("The request body is not valid JSON: %v", err), http.StatusBadRequest)
		return
	}
	file, err := json.MarshalIndent(requestBody, "", " ")
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Extract object path from URI.
	//
	// TODO: validate URI structure. We aren't checking that the provided object path in the URI is
	// present, much less valid.
	objectPath := strings.TrimPrefix(r.URL.Path, resourcePrefix)

	// Send that file off to the S3 bucket.
	err = h.bucket.ReplaceExistingJSONFile(objectPath, file)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}

// postNewFileObjectHandler handles POST requests on the "/bucket/:objectPath" route that have the
// Content-Type=multipart/form-data header set.
func (h *BucketHandler) postNewFileObjectHandler(w http.ResponseWriter, r *http.Request) {
	// Turn the payload into a file (slice of bytes).
	file, _, err := r.FormFile(fileFormKeyName)
	if err != nil {
		http.Error(w, fmt.Sprintf("Failed to parse the uploaded file in the request body: %v", err),
			http.StatusBadRequest)
		return
	}
	defer file.Close()
	buffer := bytes.NewBuffer(nil)
	_, err = io.Copy(buffer, file)
	if err != nil {
		http.Error(w, fmt.Sprintf("Failed to parse the uploaded file in the request body: %v", err),
			http.StatusBadRequest)
		return
	}

	// Extract object path from URI.
	//
	// TODO: validate URI structure. We aren't checking that the provided object path in the URI is
	// present, much less valid.
	objectPath := strings.TrimPrefix(r.URL.Path, resourcePrefix)

	// Send that file off to the S3 bucket.
	err = h.bucket.ReplaceExistingJSONFile(objectPath, buffer.Bytes())
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}

// deleteObjectHandler handles DELETE requests on the "/bucket/:objectPath" route.
func (h *BucketHandler) deleteObjectHandler(w http.ResponseWriter, r *http.Request) {
	// Extract object path from URI.
	//
	// TODO: validate URI structure. We aren't checking that the provided object path in the URI is
	// present, much less valid.
	objectPath := strings.TrimPrefix(r.URL.Path, resourcePrefix+"/")

	err := h.bucket.DeleteFile(objectPath)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}

// RegisterRoutes registers handlers for all of the routes that BucketHandler supports.
func (h *BucketHandler) RegisterRoutes(router *http.ServeMux) {
	router.HandleFunc(resourcePrefix, h.getContentsHandler)
	router.HandleFunc(resourcePrefix+"/", h.objectSubResourceHandler)
}
