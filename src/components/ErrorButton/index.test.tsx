import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ErrorButton from '.';

const originalConsoleError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    if (/(It's my handle fault!!!)/.test(args[0])) {
      return;
    }
    originalConsoleError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalConsoleError;
});

describe('ErrorButton', () => {
  it('renders without crashing', () => {
    render(<ErrorButton />);
    const button = screen.getByText('Error');
    expect(button).toBeInTheDocument();
  });

  it('throws an error when the button is clicked', () => {
    const spy = vi.spyOn(console, 'error');
    render(<ErrorButton />);
    const button = screen.getByText('Error');
    expect(() => {
      fireEvent.click(button);
    }).toThrow("It's my handle fault!!!");
    spy.mockRestore();
  });
});
