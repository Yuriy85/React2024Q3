import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ErrorBoundary from '.';

describe('ErrorBoundary Component', () => {
  let consoleErrorSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <div>Normal Component</div>
      </ErrorBoundary>
    );
    const normalComponent = screen.getByText('Normal Component');
    expect(normalComponent).toBeInTheDocument();
  });

  it('renders error message when an error is thrown', () => {
    const ThrowErrorComponent = () => {
      throw new Error('Test Error');
    };
    render(
      <ErrorBoundary>
        <ThrowErrorComponent />
      </ErrorBoundary>
    );
    const errorMessage = screen.getByText('Something went wrong...');
    expect(errorMessage).toBeInTheDocument();
  });

  it('logs the error to console', () => {
    const ThrowErrorComponent = () => {
      throw new Error('Test Error');
    };
    render(
      <ErrorBoundary>
        <ThrowErrorComponent />
      </ErrorBoundary>
    );
    expect(consoleErrorSpy).toHaveBeenCalled();
  });
});
