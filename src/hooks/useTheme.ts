import { useTheme as useDesignSystemTheme } from '../design-system/tokens';

export function useTheme() {
  const { theme } = useDesignSystemTheme();
  return theme;
} 