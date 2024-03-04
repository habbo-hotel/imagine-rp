import '@emotion/react';
import { ImagineTheme } from './theme/ThemeProvider.types'

declare module '@emotion/react' {
  export interface Theme extends ImagineTheme { }
}