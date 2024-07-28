import { describe, it, expect, beforeEach } from 'vitest';
import { configStore, MyReducerState, MyStore } from './index';
import {
  addCheckedCard,
  removeCheckedCard,
  clearCheckedCards,
  ICard,
} from './reducers/CheckedSlice';
import { fetchPoke } from '../api/poke';

describe('Redux Store Tests', () => {
  let store: MyStore;

  beforeEach(() => {
    store = configStore;
  });

  it('should create the store with rootReducer', () => {
    const state = store.getState();
    expect(state).toHaveProperty('checkedSliceReducer');
    expect(state).toHaveProperty(fetchPoke.reducerPath);
  });

  it('should dispatch addCheckedCard action and update state', () => {
    const card: ICard = { id: '1', name: 'Pikachu', number: 0, url: 'http:/example' };
    store.dispatch(addCheckedCard(card));
    const newState: MyReducerState = store.getState();
    expect(newState.checkedSliceReducer.checkedCards).toContainEqual(card);
  });

  it('should dispatch removeCheckedCard action and update state', () => {
    const card: ICard = { id: '1', name: 'Pikachu', number: 0, url: 'http:/example' };
    store.dispatch(addCheckedCard(card));
    store.dispatch(removeCheckedCard(card));
    const newState: MyReducerState = store.getState();
    expect(newState.checkedSliceReducer.checkedCards).not.toContainEqual(card);
  });

  it('should dispatch clearCheckedCards action and update state', () => {
    const card: ICard = { id: '1', name: 'Pikachu', number: 0, url: 'http:/example' };
    store.dispatch(addCheckedCard(card));
    store.dispatch(clearCheckedCards());
    const newState: MyReducerState = store.getState();
    expect(newState.checkedSliceReducer.checkedCards).toHaveLength(0);
  });
});
