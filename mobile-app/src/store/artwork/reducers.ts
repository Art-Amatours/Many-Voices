import {
  ArtworkState,
  ArtworkActionTypes,
  FETCH_ALL_ARTWORK_FROM_CLOUD,
  SET_LOADING_ERROR,
} from './types';

const initialState: ArtworkState = {
  list: [],
  isLoading: true,
  isError: false,
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
    default:
      return state;
  }
}
