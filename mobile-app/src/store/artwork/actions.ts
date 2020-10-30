import { AppThunk } from '..';
import { Dispatch } from 'redux';
import {
  Artwork,
  ArtworkActionTypes,
  SET_LOADING_ERROR,
  SET_SEARCH_QUERY,
  FETCH_ALL_ARTWORK_FROM_CLOUD,
  SET_CURRENT_ARTWORK,
  Critique,
  SET_CURRENT_CRITIQUE,
} from './types';

// Action creator for the SET_LOADING_ERROR action type.
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

export function setCurrentArtwork(to: Artwork): ArtworkActionTypes {
  return {
    type: SET_CURRENT_ARTWORK,
    payload: to,
  };
}

export function setCurrentCritique(to: Critique): ArtworkActionTypes {
  return {
    type: SET_CURRENT_CRITIQUE,
    payload: to,
  };
}
// Action creator used by the fetchAllArtworkFromCloud() func.
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
    fetch(`${host}/bucketContents`)
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
      .catch((err) => console.error(err)); // TODO: better error handling.
  };
}
