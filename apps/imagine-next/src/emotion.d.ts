import '@emotion/react';
import { ImagineTheme } from './site-ui/theme/ThemeProvider.types';

declare module '@emotion/react' {
  export interface Theme extends ImagineTheme { }
}