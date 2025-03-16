import { ReactNode } from 'react';

export interface AppContextProps {
  theme: string;
  toggleTheme: () => void;
  language: string;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

export interface AppProviderProps {
  children: ReactNode;
  value: AppContextProps;
} 