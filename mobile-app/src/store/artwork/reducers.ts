import { Audio } from 'expo-av'
import {
  ArtworkActionTypes,
  ArtworkState,
  FETCH_ALL_ARTWORK_FROM_CLOUD,
  SET_CURRENT_ARTWORK,
  SET_CURRENT_CRITIQUE,
  SET_CURRENT_SOUND,
  SET_IS_PAUSED,
  SET_LOADING_ERROR,
  SET_SEARCH_QUERY,
} from './types';
// import { Artwork, Critique } from './types'

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
    audioURL: "",
  },
  isPlaying: false,
  isPaused: true,
  currentSound: new Audio.Sound(),
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
    case SET_IS_PAUSED:
      return {
        ...state,
        isPaused: action.payload,
      }
    case SET_CURRENT_SOUND:
      return {
        ...state,
        currentSound: action.payload,
      }
    default:
      return state;
  }
}
