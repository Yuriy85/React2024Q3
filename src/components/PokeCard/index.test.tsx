import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { describe, it, expect, vi, Mock } from 'vitest';
import { MyReducerState } from '../../store';
import { checkedSlice } from '../../store/reducers/CheckedSlice';
import { fetchPoke } from '../../api/poke';
import PokeCard from '.';

vi.mock('react-router-dom', () => ({
  useLocation: vi.fn(),
  useNavigate: vi.fn(),
  useParams: vi.fn(),
}));

vi.mock('react-redux', () => ({
  useSelector: vi.fn(),
  useDispatch: vi.fn(),
}));

describe('PokeCard Component', () => {
  const mockNavigate = vi.fn();
  const mockDispatch = vi.fn();

  const mockState: MyReducerState = {
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
  };

  beforeEach(() => {
    (useNavigate as Mock).mockReturnValue(mockNavigate);
    (useLocation as Mock).mockReturnValue({ pathname: '/path' });
    (useParams as Mock).mockReturnValue({ detail: undefined });
    (useSelector as unknown as Mock).mockImplementation(
      (selector: (state: MyReducerState) => unknown) => selector(mockState)
    );
    (useDispatch as unknown as Mock).mockReturnValue(mockDispatch);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('navigates to detail page on click', () => {
    render(<PokeCard name="Pikachu" url="/pokemon/25/" />);
    const card = screen.getByText('Pikachu');
    fireEvent.click(card);
    expect(mockNavigate).toHaveBeenCalledWith('/pathdetail/25');
  });

  it('adds card to checked list on checkbox change', () => {
    render(<PokeCard name="Pikachu" url="/pokemon/25/" />);
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox); // To stop propagation
    fireEvent.change(checkbox, { target: { checked: true } });
    expect(mockDispatch).toHaveBeenCalledWith(
      checkedSlice.actions.addCheckedCard({
        number: 0,
        name: 'Pikachu',
        id: '25',
        url: '/pokemon/25/',
      })
    );
  });

  it('removes card from checked list on checkbox change', () => {
    const stateWithCheckedCard: MyReducerState = {
      checkedSliceReducer: {
        checkedCards: [{ number: 0, name: 'Pikachu', id: '25', url: '/pokemon/25/' }],
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
    };
    (useSelector as unknown as Mock).mockImplementation(
      (selector: (state: MyReducerState) => unknown) => selector(stateWithCheckedCard)
    );
    render(<PokeCard name="Pikachu" url="/pokemon/25/" />);
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    fireEvent.change(checkbox, { target: { checked: false } });
    expect(mockDispatch).toHaveBeenCalledWith(
      checkedSlice.actions.removeCheckedCard({
        number: 0,
        name: 'Pikachu',
        id: '25',
        url: '/pokemon/25/',
      })
    );
  });
});
