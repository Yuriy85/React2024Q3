import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { fetchPoke } from '../../api/poke';
import PokeData from '.';

const mockStore = configureMockStore();
const store = mockStore({
  checkedSliceReducer: {
    checkedCards: [],
  },
  [fetchPoke.reducerPath]: {
    queries: {},
    mutations: {},
    provided: {},
    subscriptions: {},
    config: {
      reducerPath: 'fetchPoke',
      online: true,
      focused: true,
      middlewareRegistered: true,
      refetchOnMountOrArgChange: false,
      refetchOnReconnect: false,
      refetchOnFocus: false,
      keepUnusedDataFor: 60,
      invalidationBehavior: 'delayed',
    },
  },
});

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
  useLocation: vi.fn(),
  useParams: vi.fn(),
  Outlet: () => <div>Outlet</div>,
}));

vi.mock('../../api/poke', () => ({
  fetchPoke: {
    useGetAllPokeQuery: vi.fn(),
  },
}));

describe('PokeData Component', () => {
  const mockNavigate = vi.fn();
  const mockSetPageCount = vi.fn();

  beforeEach(() => {
    (useNavigate as unknown as Mock).mockReturnValue(mockNavigate);
    (useLocation as unknown as Mock).mockReturnValue({ pathname: '/path' });
    (useParams as unknown as Mock).mockReturnValue({ page: '1', detail: undefined });
    mockSetPageCount.mockClear();
  });

  const renderComponent = (props: { searchWord: string; setPageCount: () => unknown }) => {
    return render(
      <Provider store={store}>
        <PokeData {...props} />
      </Provider>
    );
  };

  it('renders error state', () => {
    const error = { status: 'Error message' };
    (fetchPoke.useGetAllPokeQuery as Mock).mockReturnValue({
      data: null,
      error,
      isFetching: false,
    });
    renderComponent({ searchWord: '', setPageCount: mockSetPageCount });
    expect(screen.getByText('Error message')).toBeInTheDocument();
  });

  it('renders pokemons', () => {
    const mockPokes = {
      count: 1,
      results: [{ name: 'pikachu', url: '/pokemon/25/' }],
    };
    (fetchPoke.useGetAllPokeQuery as Mock).mockReturnValue({
      data: mockPokes,
      error: null,
      isFetching: false,
    });
    renderComponent({ searchWord: '', setPageCount: mockSetPageCount });
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
    expect(mockSetPageCount).toHaveBeenCalledWith(1);
  });

  it('filters pokemons based on search word', () => {
    const mockPokes = {
      count: 2,
      results: [
        { name: 'pikachu', url: '/pokemon/25/' },
        { name: 'bulbasaur', url: '/pokemon/1/' },
      ],
    };
    (fetchPoke.useGetAllPokeQuery as Mock).mockReturnValue({
      data: mockPokes,
      error: null,
      isFetching: false,
    });
    renderComponent({ searchWord: 'bulbasaur', setPageCount: mockSetPageCount });
    expect(screen.getByText('Bulbasaur')).toBeInTheDocument();
    expect(screen.queryByText('Pikachu')).not.toBeInTheDocument();
  });

  it('handles no search results', () => {
    const mockPokes = {
      count: 1,
      results: [{ name: 'pikachu', url: '/pokemon/25/' }],
    };
    (fetchPoke.useGetAllPokeQuery as Mock).mockReturnValue({
      data: mockPokes,
      error: null,
      isFetching: false,
    });
    renderComponent({ searchWord: 'charizard', setPageCount: mockSetPageCount });
    expect(screen.getByText('Sorry, not found.')).toBeInTheDocument();
    expect(screen.queryByText('Pikachu')).not.toBeInTheDocument();
  });
});
