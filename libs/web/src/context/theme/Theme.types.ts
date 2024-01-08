import { ReactNode } from 'react';

export type SiteTheme = 'light' | 'dark';

export function getThemePreference() {
  // Check if 'window' is defined
  if (typeof window !== "undefined") {
    // Use 'matchMedia' to check for dark mode preference
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? 'dark' : 'light';
  } else {
    // Default to 'dark' if 'window' is not defined
    return 'dark';
  }
}


export interface ThemeContext {
  theme: SiteTheme;
  showClient: boolean;
  showFooter: boolean;
  showModalOverlay: boolean;
  applicationMode: boolean;
  setTheme: (changes: Partial<ThemeContext>) => void;
}

export const defaultThemeContextInterface: ThemeContext = {
  theme: getThemePreference(),
  showClient: false,
  showFooter: true,
  showModalOverlay: true,
  applicationMode: false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setTheme: (changes: Partial<ThemeContext>) => { },
};

export interface ThemeContextProviderProps {
  children: ReactNode;
}
