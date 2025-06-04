import '@emotion/react';
import { DesignSystemTheme } from '../design-system/theme/ThemeProvider';

declare module '@emotion/react' {
  export interface Theme extends DesignSystemTheme {}
} 