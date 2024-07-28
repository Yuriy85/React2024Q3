import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { describe, it, expect, vi, Mock } from 'vitest';
import Pagination from '.';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe('Pagination Component', () => {
  const renderComponent = (pageCount: number | null, initialEntries: string[] = ['/']) => {
    return render(
      <MemoryRouter initialEntries={initialEntries}>
        <Pagination pageCount={pageCount} />
      </MemoryRouter>
    );
  };

  it('renders correct number of pages', () => {
    renderComponent(5);
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(5);
  });

  it('renders active class for the first page by default', () => {
    renderComponent(5);
    const firstButton = screen.getByText('1');
    expect(firstButton).toHaveClass('pages__button--active');
  });

  it('calls navigate when a page button is clicked', () => {
    const navigate = vi.fn();
    (useNavigate as unknown as Mock).mockImplementation(() => navigate);
    renderComponent(5);
    const secondButton = screen.getByText('2');
    fireEvent.click(secondButton);
    expect(navigate).toHaveBeenCalledWith('/page/2/');
    vi.restoreAllMocks();
  });
});
