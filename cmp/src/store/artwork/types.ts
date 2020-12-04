export interface Artwork {
  title: string;
  artist: string;
  description: string;
  tags: string[][];
  imageURLs: string[];
  critiques: Critique[];
}

export interface Critique {
  title: string;
  critic: string;
  transcript: string;
  tags: string[][];
  audioURL: string;
  audioFile?: File | null;
}

export interface ArtworkState {
  list: Artwork[];
  isLoading: boolean;
  isError: boolean;
  searchQuery: string;
}

export const FETCH_ALL_ARTWORK_FROM_CLOUD = 'ADD_ALL_ARTWORK_FROM_CLOUD';
export const SET_LOADING_ERROR = 'SET_LOADING_ERROR';
export const SET_SEARCH_QUERY = 'SET_SEARCH_QUERY';
interface AddAllArtworkAction {
  type: typeof FETCH_ALL_ARTWORK_FROM_CLOUD;
  payload: Artwork[];
}
interface SetErrorFromFetchAction {
  type: typeof SET_LOADING_ERROR;
  payload: boolean;
}
interface SetSearchQueryAction {
  type: typeof SET_SEARCH_QUERY;
  payload: string;
}
export type ArtworkActionTypes =
  | AddAllArtworkAction
  | SetErrorFromFetchAction
  | SetSearchQueryAction;
