import {
  ArtworkState,
  ArtworkActionTypes,
  FETCH_ALL_ARTWORK_FROM_CLOUD,
  SET_LOADING_ERROR,
  SET_SEARCH_QUERY,
  SET_CURRENT_ARTWORK,
  SET_CURRENT_CRITIQUE,
} from './types';
import { Artwork, Critique } from 'types'

const initialState: ArtworkState = {
  list: [],
  isLoading: true,
  isError: false,
  searchQuery: "",
  currentArtwork: {
    title: "",
    artist: "",
    description: "",
    tags: [[]],
    imageURLs: [],
    critiques: [],
  },
  currentCritique: {
    title: "Not Playing",
    critic: "",
    transcript: "",
    tags: [[]],
    AudioURL: "",
  },
  isPlaying: false,
};

export default function artworkReducer(
  state = initialState,
  action: ArtworkActionTypes,
): ArtworkState {
  switch (action.type) {
    case FETCH_ALL_ARTWORK_FROM_CLOUD:
      return {
        ...state,
        list: action.payload,
        isLoading: false,
        isError: false,
      };
    case SET_LOADING_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: action.payload,
      };
    case SET_SEARCH_QUERY:
      return {
        ...state,
        searchQuery: action.payload,
      };
    case SET_CURRENT_ARTWORK:
      return {
        ...state,
        currentArtwork: action.payload,
      }
    case SET_CURRENT_CRITIQUE:
      return {
        ...state,
        currentCritique: action.payload,
        isPlaying: true,
      }
    default:
      return state;
  }
}
