import { combineReducers, configureStore } from '@reduxjs/toolkit';
import checkedSliceReducer from './reducers/CheckedSlice';
import { fetchPoke } from '../api/poke';

const rootReducer = combineReducers({
  checkedSliceReducer,
  [fetchPoke.reducerPath]: fetchPoke.reducer,
});

export const configStore = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(fetchPoke.middleware),
});

export type MyReducerState = ReturnType<typeof rootReducer>;
export type MyStore = typeof configStore;
export type MyDispatch = MyStore['dispatch'];
