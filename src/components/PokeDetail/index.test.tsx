import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useNavigate, useParams } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { fetchPoke } from '../../api/poke';
import PokeDetail from '.';

const mockStore = configureMockStore();
const store = mockStore({});

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
  useParams: vi.fn(),
}));

vi.mock('../../api/poke', () => ({
  fetchPoke: {
    useGetPokeInfoQuery: vi.fn(),
  },
}));

describe('PokeDetail Component', () => {
  const mockNavigate = vi.fn();

  beforeEach(() => {
    (useNavigate as unknown as Mock).mockReturnValue(mockNavigate);
    (useParams as unknown as Mock).mockReturnValue({ detail: '1' });
  });

  const renderComponent = () => {
    return render(
      <Provider store={store}>
        <PokeDetail />
      </Provider>
    );
  };

  it('renders error state', () => {
    const error = { status: 'Error message' };
    (fetchPoke.useGetPokeInfoQuery as Mock).mockReturnValue({
      data: null,
      error,
      isFetching: false,
    });
    renderComponent();
    expect(screen.getByText('Error message')).toBeInTheDocument();
  });

  it('renders poke details', () => {
    const mockPoke = {
      name: 'pikachu',
      firmness: { name: 'hard' },
      growth_time: 5,
      max_harvest: 10,
      natural_gift_type: { name: 'electric' },
      size: 3,
      smoothness: 4,
    };
    (fetchPoke.useGetPokeInfoQuery as Mock).mockReturnValue({
      data: mockPoke,
      error: null,
      isFetching: false,
    });
    renderComponent();
    expect(
      screen.getByText((_, element) => {
        return element?.textContent?.toLowerCase() === 'pikachu';
      })
    ).toBeInTheDocument();
    expect(screen.getByText('Firmness: hard')).toBeInTheDocument();
    expect(screen.getByText('Growth time: 5')).toBeInTheDocument();
    expect(screen.getByText('Max harvest: 10')).toBeInTheDocument();
    expect(screen.getByText('Gift type: electric')).toBeInTheDocument();
    expect(screen.getByText('Size: 3')).toBeInTheDocument();
    expect(screen.getByText('Smoothness: 4')).toBeInTheDocument();
  });

  it('navigates back when close button is clicked', () => {
    const mockPoke = {
      name: 'pikachu',
      firmness: { name: 'hard' },
      growth_time: 5,
      max_harvest: 10,
      natural_gift_type: { name: 'electric' },
      size: 3,
      smoothness: 4,
    };
    (fetchPoke.useGetPokeInfoQuery as Mock).mockReturnValue({
      data: mockPoke,
      error: null,
      isFetching: false,
    });
    renderComponent();
    fireEvent.click(screen.getByText('✘'));
    expect(mockNavigate).toHaveBeenCalled();
  });
});
