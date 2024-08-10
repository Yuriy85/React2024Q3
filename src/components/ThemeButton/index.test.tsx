import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi, Mock } from 'vitest';
import { ThemeContext } from '../../context';
import ThemeButton from '.';

const ThemeProviderMock = ({
  children,
  value,
}: {
  children: JSX.Element;
  value: {
    darkTheme: boolean;
    setDarkTheme: Mock;
  };
}) => <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;

describe('ThemeButton Component', () => {
  it('toggles theme on button click', () => {
    const setDarkThemeMock = vi.fn();
    const themeContextValue = {
      darkTheme: true,
      setDarkTheme: setDarkThemeMock,
    };
    render(
      <ThemeProviderMock value={themeContextValue}>
        <ThemeButton />
      </ThemeProviderMock>
    );
    const button = screen.getByRole('button', { name: /change theme/i });
    fireEvent.click(button);
    expect(setDarkThemeMock).toHaveBeenCalledWith(false);
  });

  it('sets darkTheme to true if currently false', () => {
    const setDarkThemeMock = vi.fn();
    const themeContextValue = {
      darkTheme: false,
      setDarkTheme: setDarkThemeMock,
    };
    render(
      <ThemeProviderMock value={themeContextValue}>
        <ThemeButton />
      </ThemeProviderMock>
    );
    const button = screen.getByRole('button', { name: /change theme/i });
    fireEvent.click(button);
    expect(setDarkThemeMock).toHaveBeenCalledWith(true);
  });

  it('renders the button with correct initial state', () => {
    const themeContextValue = {
      darkTheme: true,
      setDarkTheme: vi.fn(),
    };
    render(
      <ThemeProviderMock value={themeContextValue}>
        <ThemeButton />
      </ThemeProviderMock>
    );
    const button = screen.getByRole('button', { name: /change theme/i });
    expect(button).toBeInTheDocument();
  });
});
