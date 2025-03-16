import { createContext, useContext, ReactNode, ComponentType } from 'react';
import { AppContextProps } from '../types/context';

interface AppContextType {
  theme: string;
  toggleTheme: () => void;
  language: string;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

interface AppProviderProps {
  children: ReactNode;
  value: AppContextType;
}

export function AppProvider({ children, value }: AppProviderProps) {
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function withApp<P extends AppContextProps>(Component: ComponentType<P>) {
  return function WithApp(props: Omit<P, keyof AppContextProps>) {
    const appContext = useApp();
    return <Component {...props as P} {...appContext} />;
  };
} 