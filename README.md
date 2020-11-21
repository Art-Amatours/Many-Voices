# Many Voices

A more interactive and customizable alternative to existing audio tours in museums and art galleries.

<p align="center">
    <img src="https://github.com/nchaloult/many-voices-museum-app/blob/master/gifs/demo-on-readme.gif?raw=true" width="320">
</p>

## Environment Setup

### Prerequisites for Installation and Running

1. Install Node.js
    - macOS
        - `$ brew update && brew install node`
    - Windows
        - Use the [official installer](https://nodejs.org/en/download/)
        - Or `$ choco install nodejs`
2. Install yarn _(Optional, but recommended)_
    - macOS
        - `$ brew update && brew install yarn`
    - Windows
        - Use the [official installer](https://classic.yarnpkg.com/en/docs/install/#windows-stable)
        - Or `$ choco install yarn`
3. Install [Go](https://golang.org)
    - Follow the [instructions in the server/ dir](server/README.md)

### Mobile App Setup

To download these dependencies use commands:

```bash
$ cd mobile-app
$ yarn
```

**NOTE**: Using the `yarn` command will install all dependent libraries automatically for you. You will not have to worry about installing each dependent library individually.

### Server Setup

Follow the [instructions in the server/ dir](server/README.md)

## Running Locally

1. In one shell, run `$ cd server && go run *.go`
    - More details in the [instructions in the server/ dir](server/README.md)
    - Leave this shell running in the background. It will need to be running for the server to be running.
2. In another shell, run `$ cd mobile-app && expo start`
    - Expo will launch in a new browser tab
    - You'll be prompted to spin up a device simulator, or launch the app on a physical device using a QR code you can scan with your phone
        - You'll need the official Expo app installed on your device if you prefer not to use a simulator. This app is located in the Apple App Store and in the Google Play Store.

## Dependencies & External Libraries

### Mobile App

The mobile app uses the following packages from [npm](https://www.npmjs.com):

- `@react-native-community/masked-view`
- `@react-navigation/native`
- `@react-navigation/stack`
- `expo`
- `expo-av`
- `expo-constants`
- `expo-status-bar`
- `go`
- `react`
- `react-dom`
- `react-native`
- `react-native-audio-streamer`
- `react-native-gesture-handler`
- `react-native-screens`
- `react-native-sound`
- `react-native-sound-player`
- `react-native-track-player`
- `react-native-web`
- `react-redux`
- `redux`
- `redux-thunk`

### HTTP Server

The HTTP server relies on the following libraries:

- `github.com/aws/aws-sdk-go`
- `github.com/joho/godotenv`

### Content Management Platform

The content management platform uses the following packages from [npm](https://npmjs.com):

- `@types/jest`
- `@types/node`
- `@types/react`
- `@types/react-dom`
- `react`
- `react-dom`
- `react-redux`
- `react-scripts`
- `redux`
- `redux-thunk`
- `web-vitals`

## Troubleshooting &mdash; Common Problems & Solutions

| Problem | Common Solution |
| --- | --- |
| Application is taking an excessive time to load when opening | Make sure you are running the HTTP server in a separate shell or in a background process |
| Expo is not starting after running `$ expo start` | Make sure you are running Expo in mobile-app folder |
| Expo is displaying "package" related errors while trying to start after running `$ expo start` | Run `$ yarn` inside the `mobile-app` dir |

## Release Notes

### Version 1.0

### New Features Present

- Application Side:
    - App pulls data from backend and displays scrollable list of artworks
    - User can search app with keywords to find specific artworks
    - User can select artwork to see its critiques and info screen
    - User can play audio critiques
    - User can view and interact with audio bar throughout application
    - User can skip/backtrack 10 seconds in audio critique
    - User can use audio scrubber to advance to specific places in audio critique
    - User can view Info screen on artwork piece
- Server Side:
    - Server can contain data for app
    - Server can be requested to push data to app

### Known Defects
None

### Defects that Have Been Fixed Since Last Release
None
