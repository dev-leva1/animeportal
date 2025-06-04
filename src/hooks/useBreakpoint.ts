import { useState, useEffect } from 'react';

// Breakpoints из дизайн-токенов
const breakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  '2xl': 1400
} as const;

type BreakpointKey = keyof typeof breakpoints;
type BreakpointValue = typeof breakpoints[BreakpointKey];

interface BreakpointState {
  current: BreakpointKey;
  value: BreakpointValue;
  isXs: boolean;
  isSm: boolean;
  isMd: boolean;
  isLg: boolean;
  isXl: boolean;
  is2Xl: boolean;
  isSmUp: boolean;
  isMdUp: boolean;
  isLgUp: boolean;
  isXlUp: boolean;
  is2XlUp: boolean;
  isSmDown: boolean;
  isMdDown: boolean;
  isLgDown: boolean;
  isXlDown: boolean;
}

const getCurrentBreakpoint = (width: number): BreakpointKey => {
  if (width >= breakpoints['2xl']) return '2xl';
  if (width >= breakpoints.xl) return 'xl';
  if (width >= breakpoints.lg) return 'lg';
  if (width >= breakpoints.md) return 'md';
  if (width >= breakpoints.sm) return 'sm';
  return 'xs';
};

const getBreakpointState = (width: number): BreakpointState => {
  const current = getCurrentBreakpoint(width);
  const value = breakpoints[current];

  return {
    current,
    value,
    isXs: current === 'xs',
    isSm: current === 'sm',
    isMd: current === 'md',
    isLg: current === 'lg',
    isXl: current === 'xl',
    is2Xl: current === '2xl',
    isSmUp: width >= breakpoints.sm,
    isMdUp: width >= breakpoints.md,
    isLgUp: width >= breakpoints.lg,
    isXlUp: width >= breakpoints.xl,
    is2XlUp: width >= breakpoints['2xl'],
    isSmDown: width < breakpoints.sm,
    isMdDown: width < breakpoints.md,
    isLgDown: width < breakpoints.lg,
    isXlDown: width < breakpoints.xl,
  };
};

/**
 * Хук для определения текущего breakpoint и responsive состояний
 * @returns Объект с информацией о текущем breakpoint и helper'ами
 * 
 * @example
 * ```tsx
 * function Component() {
 *   const { current, isMobile, isTablet, isDesktop } = useBreakpoint();
 *   
 *   return (
 *     <div>
 *       <p>Current: {current}</p>
 *       {isMobile && <MobileComponent />}
 *       {isTablet && <TabletComponent />}
 *       {isDesktop && <DesktopComponent />}
 *     </div>
 *   );
 * }
 * ```
 */
export const useBreakpoint = () => {
  const [windowWidth, setWindowWidth] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth;
    }
    return 1024; // Default для SSR
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const breakpointState = getBreakpointState(windowWidth);

  return {
    ...breakpointState,
    // Semantic aliases для удобства
    isMobile: breakpointState.isXs || breakpointState.isSm,
    isTablet: breakpointState.isMd,
    isDesktop: breakpointState.isLg || breakpointState.isXl || breakpointState.is2Xl,
    // Utility функции
    isGreaterThan: (breakpoint: BreakpointKey) => windowWidth > breakpoints[breakpoint],
    isLessThan: (breakpoint: BreakpointKey) => windowWidth < breakpoints[breakpoint],
    windowWidth
  };
};

export { breakpoints };
export type { BreakpointKey, BreakpointState }; 