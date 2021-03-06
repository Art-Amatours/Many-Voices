# Many Voices Museum App --- Server

Server that exposes HTTP API endpoints for the Many Voices mobile application to call. These endpoints facilitate interaction with an AWS S3 bucket.

## Development Environment Setup

1. Install Go
    - If you're on a Mac, you can do this with [Homebrew](https://brew.sh)
        - `$ brew update && brew install golang`
    - If you're on Windows, then follow [these instructions](https://golang.org/dl/)
        - Or use a package manager like [chocolatey](https://chocolatey.org), if you're familiar
1. `$ cd server`
1. `$ cp .env.sample .env`
1. Manually fill out all of the environment variables in the new `.env` file
    - Refer to the pinned message in our Discord for the secrets and values you'll need
1. `$ go run *.go`
    - Or if you're hungry for speed, you can compile a standalone binary for your machine
    - `$ go build && ./Many-Voices`
1. `$ curl localhost:PORT/hello` to make sure that you're up and running

## Usage

In a client application, hit the `/bucketContents` endpoint to get a blob of JSON with info about all artwork and critiques that are being stored in our storage solution.

If you'd like to test this outside of your client application, you can use something like [Postman](https://www.postman.com), `curl`, or even a browser.

    $ curl localhost:PORT/bucketContents

## Thoughts and Reminders

* [AWS Go SDK docs](https://docs.aws.amazon.com/sdk-for-go/v1/developer-guide/s3-example-basic-bucket-operations.html#s3-examples-bucket-ops-scenario)

