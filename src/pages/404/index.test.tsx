import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import NotFound from '.';

describe('NotFound Component', () => {
  const renderComponent = () => {
    return render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );
  };

  it('renders the error message', () => {
    renderComponent();

    expect(
      screen.getByText(/...Ooops! Something really bad has just happened!.../i)
    ).toBeInTheDocument();
  });

  it('renders the link to the main page', () => {
    renderComponent();

    const link = screen.getByRole('link', { name: /To main page/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/');
  });
});
