export * from './colors';
export * from './typography';
export * from './spacing';
export * from './breakpoints';
export * from './animations';
export * from '../theme';

import { colors } from './colors';
import { typography } from './typography';
import { spacing, padding, margin, gap, borderRadius, borderWidth } from './spacing';
import { breakpoints, mediaQueries } from './breakpoints';
import { duration, easing, commonAnimations, transitions } from './animations';

export const tokens = {
  colors,
  typography,
  spacing: {
    spacing,
    padding,
    margin,
    gap,
    borderRadius,
    borderWidth,
  },
  breakpoints: {
    breakpoints,
    mediaQueries,
  },
  animations: {
    duration,
    easing,
    commonAnimations,
    transitions,
  },
} as const;

export type DesignTokens = typeof tokens; 