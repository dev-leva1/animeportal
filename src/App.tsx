import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useCallback, useEffect, Suspense, lazy } from 'react';
import styled from '@emotion/styled';
import Header from './components/organisms/Header';
import Footer from './components/Footer';
import LoadingFallback from './components/atoms/Spinner/LoadingFallback';

// Lazy loading для всех страниц
const HomePage = lazy(() => import('./pages/HomePage'));
const AnimePage = lazy(() => import('./pages/AnimePage'));
const AnimeDetailsPage = lazy(() => import('./pages/AnimeDetailsPage'));
const MangaPage = lazy(() => import('./pages/MangaPage'));
const MangaDetailsPage = lazy(() => import('./pages/MangaDetailsPage'));
const FavoritesPage = lazy(() => import('./pages/FavoritesPage'));
const AuthPage = lazy(() => import('./pages/AuthPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const AdminPage = lazy(() => import('./pages/AdminPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const TermsPage = lazy(() => import('./pages/TermsPage'));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'));
const ContactsPage = lazy(() => import('./pages/ContactsPage'));
const DataSourcePage = lazy(() => import('./pages/DataSourcePage'));
const CopyrightPage = lazy(() => import('./pages/CopyrightPage'));
import { AppProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { translations } from './translations';
import './App.css';
import './styles/responsive.css';
import ErrorBoundary from './components/ErrorBoundary';

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme === 'dark' ? '#121212' : '#f5f5f5'};
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#121212'};
`;

const MainContent = styled.main`
  flex: 1;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

function App() {
  const [theme, setTheme] = useState('dark');
  const [language, setLanguage] = useState('ru');

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  };

  const toggleLanguage = () => {
    setLanguage(prevLanguage => prevLanguage === 'ru' ? 'en' : 'ru');
  };
  
  const t = useCallback((key: string): string => {
    if (key in translations) {
      return translations[key][language as 'ru' | 'en'];
    }
    return key;
  }, [language]);
  
  useEffect(() => {
    const pageTitle = document.getElementById('page-title');
    if (pageTitle) {
      pageTitle.textContent = t('page.title');
    }
  }, [language, t]);

  return (
    <AppProvider value={{ theme, toggleTheme, language, toggleLanguage, t }}>
      <AuthProvider>
        <ErrorBoundary>
          <AppContainer theme={theme}>
            <Router>
              <Header />
              <MainContent>
                <Suspense fallback={<LoadingFallback />}>
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/anime" element={<AnimePage />} />
                    <Route path="/anime/:id" element={<AnimeDetailsPage />} />
                    <Route path="/manga" element={<MangaPage />} />
                    <Route path="/manga/:id" element={<MangaDetailsPage />} />
                    <Route path="/favorites" element={<FavoritesPage />} />
                    <Route path="/auth" element={<AuthPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/admin" element={<AdminPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/terms" element={<TermsPage />} />
                    <Route path="/privacy" element={<PrivacyPage />} />
                    <Route path="/contacts" element={<ContactsPage />} />
                    <Route path="/data-source" element={<DataSourcePage />} />
                    <Route path="/copyright" element={<CopyrightPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                  </Routes>
                </Suspense>
              </MainContent>
              <Footer />
            </Router>
          </AppContainer>
        </ErrorBoundary>
      </AuthProvider>
    </AppProvider>
  );
}

export default App;
