import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useCallback, useEffect } from 'react';
import styled from '@emotion/styled';
import Header from './components/organisms/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AnimePage from './pages/AnimePage';
import AnimeDetailsPage from './pages/AnimeDetailsPage';
import MangaPage from './pages/MangaPage';
import MangaDetailsPage from './pages/MangaDetailsPage';
import FavoritesPage from './pages/FavoritesPage';
import AuthPage from './pages/AuthPage';
import ProfilePage from './pages/ProfilePage';
import AdminPage from './pages/AdminPage';
import NotFoundPage from './pages/NotFoundPage';
import AboutPage from './pages/AboutPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import ContactsPage from './pages/ContactsPage';
import DataSourcePage from './pages/DataSourcePage';
import CopyrightPage from './pages/CopyrightPage';
import { AppProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { translations } from './translations';
import './App.css';
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
