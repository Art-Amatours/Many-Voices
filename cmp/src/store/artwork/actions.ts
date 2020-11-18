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
    console.log(`${host}/bucket`);
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
