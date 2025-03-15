import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useCallback, useEffect } from 'react';
import styled from '@emotion/styled';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AnimePage from './pages/AnimePage';
import AnimeDetailsPage from './pages/AnimeDetailsPage';
import MangaPage from './pages/MangaPage';
import MangaDetailsPage from './pages/MangaDetailsPage';
import FavoritesPage from './pages/FavoritesPage';
import NotFoundPage from './pages/NotFoundPage';
import { AppProvider } from './context/ThemeContext';
import { translations } from './translations';
import './App.css';

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
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </MainContent>
          <Footer />
        </Router>
      </AppContainer>
    </AppProvider>
  );
}

export default App;
