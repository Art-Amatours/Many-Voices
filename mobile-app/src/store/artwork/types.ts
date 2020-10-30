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
  AudioURL: string;
}

export interface ArtworkState {
  list: Artwork[];
  currentArtwork: Artwork;
  currentCritique: Critique
  isLoading: boolean;
  isError: boolean;
  searchQuery: string;
  isPlaying: boolean
}

export const FETCH_ALL_ARTWORK_FROM_CLOUD = 'ADD_ALL_ARTWORK_FROM_CLOUD';
export const SET_LOADING_ERROR = 'SET_LOADING_ERROR';
export const SET_SEARCH_QUERY = 'SET_SEARCH_QUERY';
export const SET_CURRENT_ARTWORK = 'SET_CURRENT_ARTWORK';
export const SET_CURRENT_CRITIQUE = 'SET_CURRENT_CRITIQUE';

interface AddAllArtworkAction {
  type: typeof FETCH_ALL_ARTWORK_FROM_CLOUD;
  payload: Artwork[];
}
interface SetErrorFromFetchAction {
  type: typeof SET_LOADING_ERROR;
  payload: boolean;
}
interface SetSearchQueryFromFetchAction {
  type: typeof SET_SEARCH_QUERY;
  payload: string;
}
interface SetCurrentArtwork {
  type: typeof SET_CURRENT_ARTWORK;
  payload: Artwork;
}
interface SetCurrentCritique {
  type: typeof SET_CURRENT_CRITIQUE;
  payload: Critique;
}
export type ArtworkActionTypes = AddAllArtworkAction | SetErrorFromFetchAction | SetSearchQueryFromFetchAction | SetCurrentArtwork | SetCurrentCritique;
