import { useState, useCallback, useMemo, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { FaDice } from 'react-icons/fa';
import { useApp } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { animeService } from '../../services/animeService';
import Logo from '../atoms/Logo';
import ThemeToggle from '../atoms/ThemeToggle';
import LanguageToggle from '../atoms/LanguageToggle';
import MenuToggle from '../atoms/MenuToggle';
import SearchBox from '../molecules/SearchBox';
import Navigation from '../molecules/Navigation';
import UserMenu from '../molecules/UserMenu';
import MobileMenu from '../molecules/MobileMenu';

const HeaderContainer = styled.header<{ theme: string }>`
  background-color: ${props => props.theme === 'dark' ? '#1a1a1a' : '#ffffff'};
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#121212'};
  padding: 1rem 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
`;

const DesktopControls = styled.div`
  display: flex;
  gap: 0.75rem;
  align-items: center;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

export const Header: React.FC = memo(() => {
  const { theme, toggleTheme, language, toggleLanguage, t } = useApp();
  const { user, isAuthenticated, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const isAdmin = useMemo(() => 
    isAuthenticated && user?.email === 'admin@example.com', 
    [isAuthenticated, user?.email]
  );
  
  const handleRandomAnime = useCallback(async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    try {
      const response = await animeService.getRandomAnime();
      navigate(`/anime/${response.data.id}`);
    } catch (error) {
      console.error('Error fetching random anime:', error);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, navigate]);
  
  const handleLogout = useCallback(() => {
    logout();
    navigate('/');
  }, [logout, navigate]);

  const navigationItems = useMemo(() => [
    { to: '/anime', label: t('nav.anime') },
    { to: '/manga', label: t('nav.manga') },
    { to: '/favorites', label: t('nav.favorites') },
    { 
      label: t('anime.random'), 
      onClick: handleRandomAnime, 
      isButton: true, 
      icon: <FaDice />,
      disabled: isLoading
    }
  ], [t, handleRandomAnime, isLoading]);

  const userMenuLabels = useMemo(() => ({
    admin: t('nav.admin'),
    profile: t('nav.profile'),
    logout: t('nav.logout'),
    login: t('nav.login')
  }), [t]);

  const mobileMenuLabels = useMemo(() => ({
    ...userMenuLabels,
    themeDark: t('theme.dark'),
    themeLight: t('theme.light'),
    languageEn: 'English',
    languageRu: 'Русский'
  }), [userMenuLabels, t]);

  return (
    <HeaderContainer theme={theme}>
      <NavContainer>
        <Logo text={t('site.name')} />
        
        <MenuToggle 
          theme={theme}
          isOpen={isMobileMenuOpen}
          onToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        />
        
        <Navigation 
          theme={theme}
          items={navigationItems}
        />
        
        <SearchBox 
          theme={theme}
          placeholder={t('search.placeholder')}
        />
        
        <DesktopControls>
          <UserMenu 
            theme={theme}
            isAuthenticated={isAuthenticated}
            user={user}
            isAdmin={isAdmin}
            onLogout={handleLogout}
            labels={userMenuLabels}
          />
          
          <LanguageToggle 
            theme={theme}
            language={language}
            onToggle={toggleLanguage}
          />
          
          <ThemeToggle 
            theme={theme}
            onToggle={toggleTheme}
          />
        </DesktopControls>
        
        <MobileMenu 
          theme={theme}
          language={language}
          isOpen={isMobileMenuOpen}
          isAuthenticated={isAuthenticated}
          user={user}
          isAdmin={isAdmin}
          navigationItems={navigationItems.filter(item => !item.isButton)}
          onClose={() => setIsMobileMenuOpen(false)}
          onLogout={handleLogout}
          onRandomAnime={handleRandomAnime}
          onThemeToggle={toggleTheme}
          onLanguageToggle={toggleLanguage}
          labels={mobileMenuLabels}
        />
      </NavContainer>
    </HeaderContainer>
  );
});

export default Header; 