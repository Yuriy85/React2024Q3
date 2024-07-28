import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import { checkedSlice } from '../../store/reducers/CheckedSlice';
import * as downloadCSVModule from '../../utils/downloadCSV';
import CheckedDetail from '.';
import { AnyAction } from '@reduxjs/toolkit';

interface State {
  checkedSliceReducer: {
    checkedCards: string[];
  };
}
type Store = MockStoreEnhanced<State, AnyAction>;

describe('CheckedDetail Component', () => {
  const mockStore = configureStore<State, AnyAction>([]);
  let store: Store;

  beforeEach(() => {
    store = mockStore({
      checkedSliceReducer: {
        checkedCards: ['card1', 'card2', 'card3'],
      },
    });
  });

  it('renders component with correct number of checked cards', () => {
    render(
      <Provider store={store}>
        <CheckedDetail />
      </Provider>
    );
    const selectedCardsText = screen.getByText('Selected cards - 3');
    expect(selectedCardsText).toBeInTheDocument();
  });

  it('clicking Unselect all button dispatches clearCheckedCards action', () => {
    render(
      <Provider store={store}>
        <CheckedDetail />
      </Provider>
    );
    const unselectAllButton = screen.getByRole('button', { name: /unselect all/i });
    fireEvent.click(unselectAllButton);
    const actions = store.getActions();
    expect(actions).toEqual([{ type: checkedSlice.actions.clearCheckedCards.type }]);
  });

  it('clicking Download button calls downloadCSV with correct arguments', () => {
    const mockDownloadCSV = vi.spyOn(downloadCSVModule, 'downloadCSV').mockImplementation(() => {});
    render(
      <Provider store={store}>
        <CheckedDetail />
      </Provider>
    );
    const downloadButton = screen.getByRole('button', { name: /download/i });
    fireEvent.click(downloadButton);
    expect(mockDownloadCSV).toHaveBeenCalledWith(['card1', 'card2', 'card3'], expect.any(String));
    mockDownloadCSV.mockRestore();
  });
});
