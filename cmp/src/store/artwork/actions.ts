import { FILE } from 'dns';
import { Dispatch } from 'redux';
import { v4 as uuidv4 } from 'uuid';
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

  const artworkTitle =
    artwork.objectPath === ''
      ? artwork.title.replaceAll(' ', '-').toLowerCase()
      : artwork.objectPath.split('/')[0];
  const rootURL = `${host}/bucket/${artworkTitle}${
    artwork.objectPath === '' ? uuidv4() : ''
  }`;

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

  const jsonURL =
    artwork.objectPath === ''
      ? `${host}/bucket/${artworkTitle}/${artworkTitle}.json`
      : `${host}/bucket/${artwork.objectPath}`;

  fetch(jsonURL, {
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
    fetch(`${rootURL}/images/`, {
      headers: JSONHeaders,
      method: 'DELETE',
    })
      // eslint-disable-next-line no-console
      .catch((err) => console.error(err)); // TODO: better error handling.

    fetch(`${rootURL}/images/`, {
      method: 'POST',
      body: emptyFormData,
    })
      // eslint-disable-next-line no-console
      .catch((err) => console.error(err)); // TODO: better error handling.
    const formData = new FormData();

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
  }
  artwork.critiques.forEach((critique) => {
    const critiqueTitle =
      critique.objectPath === ''
        ? `${critique.title.replaceAll(' ', '-').toLowerCase()}`
        : critique.objectPath.split('/')[2];

    const critiqueRootURL = `${rootURL}/critiques/${critiqueTitle}${
      critique.objectPath === '' ? uuidv4() : ''
    }`;

    fetch(`${critiqueRootURL}/`, {
      method: 'POST',
      body: emptyFormData,
    })
      // eslint-disable-next-line no-console
      .catch((err) => console.error(err)); // TODO: better error handling.

    const critiquejsonURL =
      critique.objectPath === ''
        ? `${critiqueRootURL}/${critiqueTitle}.json`
        : `${host}/bucket/${critique.objectPath}`;

    fetch(critiquejsonURL, {
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

    if (critique.audioFile) {
      const formData = new FormData();

      formData.append('file', critique.audioFile);
      fetch(`${critiqueRootURL}/${critiqueTitle}.mp3`, {
        method: 'POST',
        body: formData,
      })
        // eslint-disable-next-line no-console
        .catch((err) => console.error(err)); // TODO: better error handling.
    }
  });
}

export function deleteArtworkFromCloud(host: string, artwork: Artwork): void {
  const JSONHeaders = new Headers({
    'Content-Type': 'application/json',
  });

  const artworkTitle = artwork.objectPath.split('/')[0];
  const rootURL = `${host}/bucket/${artworkTitle}`;

  fetch(`${rootURL}/`, {
    method: 'DELETE',
  })
    // eslint-disable-next-line no-console
    .catch((err) => console.error(err)); // TODO: better error handling.
}
