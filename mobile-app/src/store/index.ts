import thunk, { ThunkAction } from 'redux-thunk';
import { combineReducers, createStore, applyMiddleware, Action } from 'redux';
import artworkReducer from './artwork/reducers';

const rootReducer = combineReducers({
  artwork: artworkReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

// Type for the return value of all action creators that return a function instead of a new state
// object.
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export function configureStore() {
  return createStore(rootReducer, applyMiddleware(thunk));
}
