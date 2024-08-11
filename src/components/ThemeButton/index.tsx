import React from 'react';
import { useContext } from 'react';
import { ThemeContext } from '../../context';

function ThemeButton() {
  const theme = useContext(ThemeContext);
  return (
    <button
      onClick={() => (theme?.darkTheme ? theme.setDarkTheme(false) : theme?.setDarkTheme(true))}
      className="theme-button"
    >
      Change theme
    </button>
  );
}

export default ThemeButton;
