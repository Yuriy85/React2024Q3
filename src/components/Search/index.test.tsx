import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, beforeEach, vi, Mock } from 'vitest';
import Search from '.';

describe('Search Component', () => {
  let setSearchWordMock: Mock;

  beforeEach(() => {
    setSearchWordMock = vi.fn();
    localStorage.clear();
  });

  const renderComponent = (searchWord = '') => {
    return render(<Search searchWord={searchWord} setSearchWord={setSearchWordMock} />);
  };

  it('renders the search input and button', () => {
    renderComponent();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('loads initial state from localStorage', () => {
    localStorage.setItem('search', 'initial search');
    renderComponent();
    expect(screen.getByRole('textbox')).toHaveValue('initial search');
  });

  it('updates state on input change', () => {
    renderComponent();
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'new search' } });
    expect(input).toHaveValue('new search');
  });

  it('saves search term to localStorage and calls setSearchWord on button click', () => {
    renderComponent();
    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /search/i });
    fireEvent.change(input, { target: { value: 'save search' } });
    fireEvent.click(button);
    expect(localStorage.getItem('search')).toBe('save search');
    expect(setSearchWordMock).toHaveBeenCalledWith('save search');
  });

  it('prevents default form submission on button click', () => {
    renderComponent();
    const button = screen.getByRole('button', { name: /search/i });
    const event = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    });
    fireEvent(button, event);
    expect(event.defaultPrevented).toBe(true);
  });
});
