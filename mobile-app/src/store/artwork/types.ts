export interface Artwork {
  title: string;
  artist: string;
  description: string;
  tags: string[];
  imageURLs: string[];
  critiques: Critique[];
}

export interface Critique {
  title: string;
  critic: string;
  transcript: string;
  tags: string[];
}

export interface ArtworkState {
  list: Artwork[];
  isLoading: boolean;
  isError: boolean;
}

export const FETCH_ALL_ARTWORK_FROM_CLOUD = 'ADD_ALL_ARTWORK_FROM_CLOUD';
export const SET_LOADING_ERROR = 'SET_LOADING_ERROR';
interface AddAllArtworkAction {
  type: typeof FETCH_ALL_ARTWORK_FROM_CLOUD;
  payload: Artwork[];
}
interface SetErrorFromFetchAction {
  type: typeof SET_LOADING_ERROR;
  payload: boolean;
}
export type ArtworkActionTypes = AddAllArtworkAction | SetErrorFromFetchAction;
