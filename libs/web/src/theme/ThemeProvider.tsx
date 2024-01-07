import React, { useContext, useMemo } from 'react';
import { darkTheme } from './DarkTheme.styled';
import { ThemeProviderProps } from './ThemeProvider.types';
import { ThemeProvider as BaseThemeProvider } from 'styled-components';
import { lightTheme } from './LightTheme.styled';
import { themeContext } from '../context/theme/ThemeContext';

export function ThemeProvider({ children }: ThemeProviderProps) {
  const { theme } = useContext(themeContext);
  const currentTheme = useMemo(() => {
    if (theme === 'light') {
      return lightTheme;
    }

    return darkTheme;
  }, [theme]);
  return (
    <BaseThemeProvider theme={currentTheme}>
      {children}
    </BaseThemeProvider>
  )
}