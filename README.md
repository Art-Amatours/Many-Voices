# Many Voices

A more interactive and customizable alternative to existing audio tours in museums and art galleries.

<p align="center">
	<img src="https://github.com/nchaloult/many-voices-museum-app/blob/master/gifs/demo-on-readme.gif?raw=true" width="320">
</p>

## Environment Setup

### Prereqs

1. Install Node.js
   - macOS
     - `$ brew update && brew install node`
   - Windows
     - Use the [official installer](https://nodejs.org/en/download/)
     - Or `$ choco install nodejs`
1. Install yarn _(Optional, but recommended)_
   - macOS
     - `$ brew update && brew install yarn`
   - Windows
     - Use the [official installer](https://classic.yarnpkg.com/en/docs/install/#windows-stable)
     - Or `$ choco install yarn`
1. Install [Go](https://golang.org)
   - Follow the [instructions in the server/ dir](server/README.md)

### Server Setup

Follow the [instructions in the server/ dir](server/README.md)

### Mobile App Setup

Pull in required dependencies with `$ cd mobile-app && yarn install`

## Running Locally

1. In one shell, run `$ cd server && go run *.go`
   - More details in the [instructions in the server/ dir](server/README.md)
1. In another shell, run `$ cd mobile-app && expo start`
   - Expo will launch in a new browser tab
   - You'll be prompted to spin up a device simulator, or launch the app on a physical device
     - You'll need the official Expo app installed on your device if you prefer not to use a simulator

## Motivation

Museums and art galleries are effective and interesting outlets to expose differing populations and cultures to new and unfamiliar perspectives. However, if visitors do not arrive with an educational background in art or previous experience with the topics of the pieces, it can be difficult to personally grasp the artworks on display. Tours have been developed in almost all modern museums to offer guidance on this problem throughout the museum, but these tours are generalized and time limited in order to handle large amounts of visitors each day. Because you’re only hearing from one source, it’s easy to let your own opinions about how a piece affects you are significantly swayed by that source. If a particular piece affects you deeply, and you’d like to soak it in for even just a bit longer, the audio tour doesn’t stop for you. If you choose not to stay in sync with the tour, you risk missing out on hearing about later pieces that may move you even more. In short, the audio tour is a great idea, but needs to be more flexible. It should let museum visitors experience the artworks on display however they please.

The Many Voices application addresses these concerns by providing users both a diverse body of art critiques to listen to and also the opportunity to add their own critiques as well. Through the application, users search a museum’s art pieces to select specific pieces and view general information as well as a selection of audio critiques on the pieces. The audio critiques are sorted by tag topics such as the perspective of the critique author and the topic of the piece itself. Users can listen to as many or as few critiques for each piece as they want and then can continue throughout the museum to new pieces at their own pace.
