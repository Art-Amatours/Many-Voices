package main

import (
	"fmt"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
)

// Bucket stores information about an AWS S3 bucket, and implements functionality to interact with,
// or perform opertaions on, an S3 bucket.
type Bucket struct {
	// name stores the name of the S3 bucket.
	name string
	// region stores the AWS region where this bucket lives.
	region string
	// svc is a reference to an AWS service client. svc handles all interactions, or operations,
	// with this bucket.
	svc *s3.S3
}

// NewBucket sets up a new AWS session and an S3 service client, then returns a new Bucket object
// populated with that service client.
func NewBucket(name, region string) (*Bucket, error) {
	sess, err := session.NewSession(&aws.Config{
		Region: aws.String(region),
	})
	if err != nil {
		return nil, fmt.Errorf("Failed to establish a new AWS session: %v", err)
	}

	// This session is safe to use concurrently (in multiple goroutines), which means that we're
	// all clear to use it in HTTP handler functions.
	svc := s3.New(sess)

	return &Bucket{name, region, svc}, nil
}
