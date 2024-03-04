import '@emotion/react';
import { ImagineTheme } from '@imagine-cms/web';

declare module '@emotion/react' {
  export interface Theme extends ImagineTheme { }
}