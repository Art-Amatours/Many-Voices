import { FILE } from 'dns';
import { Dispatch } from 'redux';
import { AppThunk } from '..';
import {
  Artwork,
  ArtworkActionTypes,
  FETCH_ALL_ARTWORK_FROM_CLOUD,
  SET_LOADING_ERROR,
  SET_SEARCH_QUERY,
} from './types';

export function setLoadingError(to: boolean): ArtworkActionTypes {
  return {
    type: SET_LOADING_ERROR,
    payload: to,
  };
}

export function setSearchQuery(to: string): ArtworkActionTypes {
  return {
    type: SET_SEARCH_QUERY,
    payload: to,
  };
}

function addAllArtworkFromCloud(artwork: Artwork[]): ArtworkActionTypes {
  return {
    type: FETCH_ALL_ARTWORK_FROM_CLOUD,
    payload: artwork,
  };
}

// Thunk which makes an HTTP API call, then calls an action creator and dispatches that action
// depending on the response from that API call.
export function fetchAllArtworkFromCloud(host: string): AppThunk {
  return (dispatch: Dispatch<ArtworkActionTypes>): void => {
    console.log(`${host}/bucket`); // eslint-disable-line no-console
    fetch(`${host}/bucket`)
      .then((response) =>
        response.json().then((json) => ({
          status: response.status,
          json,
        })),
      )
      .then(({ status, json }) => {
        // TODO: more explicit error handling of different status codes.
        if (status >= 400) {
          dispatch(setLoadingError(true));
        } else {
          dispatch(addAllArtworkFromCloud(json));
        }
      })
      // eslint-disable-next-line no-console
      .catch((err) => console.error(err)); // TODO: better error handling.
  };
}

export function uploadArtworkToCloud(
  host: string,
  artwork: Artwork,
  image: File | null,
): void {
  const JSONHeaders = new Headers({
    'Content-Type': 'application/json',
  });

  const artworkTitle = artwork.title.replaceAll(' ', '-').toLowerCase();
  const rootURL = `${host}/bucket/${artworkTitle}`;

  const emptyFormData = new FormData();
  const emptyFile = new File([], 'empty.txt');

  emptyFormData.append('file', emptyFile);
  fetch(`${rootURL}/`, {
    method: 'POST',
    body: emptyFormData,
  })
    // eslint-disable-next-line no-console
    .catch((err) => console.error(err)); // TODO: better error handling.
  fetch(`${rootURL}/images/`, {
    method: 'POST',
    body: emptyFormData,
  })
    // eslint-disable-next-line no-console
    .catch((err) => console.error(err)); // TODO: better error handling.
  fetch(`${rootURL}/critiques/`, {
    method: 'POST',
    body: emptyFormData,
  })
    // eslint-disable-next-line no-console
    .catch((err) => console.error(err)); // TODO: better error handling.

  fetch(`${rootURL}/${artworkTitle}.json`, {
    method: 'POST',
    headers: JSONHeaders,
    body: JSON.stringify({
      title: artwork.title,
      artist: artwork.artist,
      description: artwork.description,
      tags: artwork.tags,
    }),
  })
    // eslint-disable-next-line no-console
    .catch((err) => console.error(err)); // TODO: better error handling.
  if (image) {
    let formData = new FormData();

    formData.append('file', image);
    fetch(
      `${rootURL}/images/${image.name.replaceAll(' ', '-').toLowerCase()}`,
      {
        method: 'POST',
        body: formData,
      },
    )
      // eslint-disable-next-line no-console
      .catch((err) => console.error(err)); // TODO: better error handling.
    artwork.critiques.forEach((critique) => {
      const critiqueTitle = critique.title.replaceAll(' ', '-').toLowerCase();

      fetch(`${rootURL}/critiques/${critiqueTitle}/`, {
        method: 'POST',
        body: emptyFormData,
      })
        // eslint-disable-next-line no-console
        .catch((err) => console.error(err)); // TODO: better error handling.

      fetch(`${rootURL}/critiques/${critiqueTitle}/${critiqueTitle}.json`, {
        method: 'POST',
        headers: JSONHeaders,
        body: JSON.stringify({
          title: critique.title,
          critic: critique.critic,
          transcript: critique.transcript,
          tags: critique.tags,
          length: 30,
        }),
      })
        // eslint-disable-next-line no-console
        .catch((err) => console.error(err)); // TODO: better error handling.

      if (critique.audioFile != null) {
        formData = new FormData();

        formData.append('file', critique.audioFile);
        fetch(`${rootURL}/critiques/${critiqueTitle}/${critiqueTitle}.mp3`, {
          method: 'POST',
          body: formData,
        })
          // eslint-disable-next-line no-console
          .catch((err) => console.error(err)); // TODO: better error handling.
      }
    });
  }
}
