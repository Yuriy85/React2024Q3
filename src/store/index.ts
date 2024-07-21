import { combineReducers, configureStore } from '@reduxjs/toolkit';
import checkedSliceReducer from './reducers/CheckedSlice';

const rootReducer = combineReducers({
  checkedSliceReducer,
});

export const configStore = configureStore({ reducer: rootReducer });

export type MyReducerState = ReturnType<typeof rootReducer>;
export type MyStore = typeof configStore;
export type MyDispatch = MyStore['dispatch'];
