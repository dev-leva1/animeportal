export const breakpoints = {
  xs: '320px',   // Мобильные устройства (маленькие)
  sm: '480px',   // Мобильные устройства
  md: '768px',   // Планшеты
  lg: '1024px',  // Десктопы (маленькие)
  xl: '1280px',  // Десктопы
  '2xl': '1536px', // Большие экраны
} as const;

export const mediaQueries = {
  mobile: `(max-width: ${breakpoints.md})`,
  tablet: `(min-width: ${breakpoints.md}) and (max-width: ${breakpoints.lg})`,
  desktop: `(min-width: ${breakpoints.lg})`,
  
  // Mobile-first подход
  up: {
    xs: `(min-width: ${breakpoints.xs})`,
    sm: `(min-width: ${breakpoints.sm})`,
    md: `(min-width: ${breakpoints.md})`,
    lg: `(min-width: ${breakpoints.lg})`,
    xl: `(min-width: ${breakpoints.xl})`,
    '2xl': `(min-width: ${breakpoints['2xl']})`,
  },
  
  // Desktop-first подход  
  down: {
    xs: `(max-width: calc(${breakpoints.sm} - 1px))`,
    sm: `(max-width: calc(${breakpoints.md} - 1px))`,
    md: `(max-width: calc(${breakpoints.lg} - 1px))`,
    lg: `(max-width: calc(${breakpoints.xl} - 1px))`,
    xl: `(max-width: calc(${breakpoints['2xl']} - 1px))`,
  },
  
  // Точные диапазоны
  only: {
    xs: `(min-width: ${breakpoints.xs}) and (max-width: calc(${breakpoints.sm} - 1px))`,
    sm: `(min-width: ${breakpoints.sm}) and (max-width: calc(${breakpoints.md} - 1px))`,
    md: `(min-width: ${breakpoints.md}) and (max-width: calc(${breakpoints.lg} - 1px))`,
    lg: `(min-width: ${breakpoints.lg}) and (max-width: calc(${breakpoints.xl} - 1px))`,
    xl: `(min-width: ${breakpoints.xl}) and (max-width: calc(${breakpoints['2xl']} - 1px))`,
  },
} as const;

// Utility functions для работы с breakpoints
export const getBreakpointValue = (breakpoint: keyof typeof breakpoints): number => {
  return parseInt(breakpoints[breakpoint], 10);
};

export const isBreakpointUp = (breakpoint: keyof typeof breakpoints, width: number): boolean => {
  return width >= getBreakpointValue(breakpoint);
};

export const isBreakpointDown = (breakpoint: keyof typeof breakpoints, width: number): boolean => {
  return width < getBreakpointValue(breakpoint);
};

export type BreakpointTokens = typeof breakpoints;
export type MediaQueryTokens = typeof mediaQueries; 