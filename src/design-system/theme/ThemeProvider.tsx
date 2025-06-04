import React, { createContext, useContext } from 'react';
import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import { colors } from '../tokens/colors';

// Определяем тип темы
export type ThemeMode = 'light' | 'dark';

// Создаем расширенную тему с токенами
export interface DesignSystemTheme {
  mode: ThemeMode;
  colors: typeof colors;
  // Добавляем удобные геттеры для текущей темы
  background: {
    primary: string;
    secondary: string;
    tertiary: string;
  };
  text: {
    primary: string;
    secondary: string;
    muted: string;
    inverse: string;
  };
  border: {
    primary: string;
    secondary: string;
    focus: string;
  };
  shadow: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
}

// Контекст для темы
interface ThemeContextType {
  theme: DesignSystemTheme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Хук для использования темы
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

// Функция для создания темы
function createTheme(mode: ThemeMode): DesignSystemTheme {
  const themeColors = colors.theme[mode];
  
  return {
    mode,
    colors,
    background: themeColors.background,
    text: themeColors.text,
    border: themeColors.border,
    shadow: themeColors.shadow,
  };
}

// Props для ThemeProvider
interface ThemeProviderProps {
  children: React.ReactNode;
  initialTheme?: ThemeMode;
  onThemeChange?: (theme: ThemeMode) => void;
}

// ThemeProvider компонент
export function ThemeProvider({ 
  children, 
  initialTheme = 'dark',
  onThemeChange 
}: ThemeProviderProps) {
  const [themeMode, setThemeMode] = React.useState<ThemeMode>(initialTheme);
  
  const theme = createTheme(themeMode);
  
  const toggleTheme = React.useCallback(() => {
    const newMode = themeMode === 'light' ? 'dark' : 'light';
    setThemeMode(newMode);
    onThemeChange?.(newMode);
  }, [themeMode, onThemeChange]);
  
  const contextValue = React.useMemo(() => ({
    theme,
    toggleTheme,
  }), [theme, toggleTheme]);
  
  return (
    <ThemeContext.Provider value={contextValue}>
      <EmotionThemeProvider theme={theme}>
        {children}
      </EmotionThemeProvider>
    </ThemeContext.Provider>
  );
}

// Тип для styled-components пропсов
export interface StyledProps {
  theme: DesignSystemTheme;
} 