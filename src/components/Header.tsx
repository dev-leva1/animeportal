import { Link, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { useState } from 'react';
import { useApp } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { animeService } from '../services/animeService';
import { FaUser, FaSignOutAlt, FaDice, FaSun, FaMoon, FaBars, FaTimes, FaUserShield } from 'react-icons/fa';
import { MdLanguage } from 'react-icons/md';

const HeaderContainer = styled.header`
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

const Logo = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
  color: #ff5f5f;
  margin-right: 2rem;
  
  a {
    text-decoration: none;
    color: inherit;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#121212'};
  font-weight: 500;
  padding: 0.5rem 0.75rem;
  transition: color 0.3s ease;
  
  &:hover {
    color: #ff5f5f;
  }
`;

const AuthButton = styled(Link)`
  text-decoration: none;
  background-color: #ff5f5f;
  color: white;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #ff4545;
  }
`;

const ProfileButton = styled(Link)`
  text-decoration: none;
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#121212'};
  font-weight: 500;
  padding: 0.5rem;
  transition: color 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    color: #ff5f5f;
  }
`;

const LogoutButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#121212'};
  font-weight: 500;
  padding: 0.5rem;
  cursor: pointer;
  transition: color 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    color: #ff5f5f;
  }
`;

const RandomAnimeButton = styled.button`
  text-decoration: none;
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#121212'};
  font-weight: 500;
  padding: 0.5rem;
  transition: color 0.3s ease;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    color: #ff5f5f;
  }
`;

const SearchContainer = styled.div`
  position: relative;
  margin: 0 1rem;
`;

const SearchInput = styled.input`
  padding: 0.5rem 1rem;
  border-radius: 20px;
  border: 1px solid ${props => props.theme === 'dark' ? '#444' : '#ddd'};
  background-color: ${props => props.theme === 'dark' ? '#333' : '#f5f5f5'};
  color: ${props => props.theme === 'dark' ? '#fff' : '#333'};
  width: 200px;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    width: 250px;
    border-color: #ff5f5f;
  }
`;

const ThemeToggle = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#121212'};
  padding: 0.5rem;
  transition: color 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    color: #ff5f5f;
  }
`;

const LanguageToggle = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-weight: 500;
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#121212'};
  padding: 0.5rem;
  transition: color 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    color: #ff5f5f;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#121212'};
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const NavLinks = styled.div<{ isOpen: boolean; theme: string }>`
  display: flex;
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    position: absolute;
    flex-direction: column;
    top: 100%;
    left: 0;
    right: 0;
    background-color: ${props => props.theme === 'dark' ? '#1a1a1a' : '#ffffff'};
    padding: 1rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    z-index: 10;
    display: ${props => props.isOpen ? 'flex' : 'none'};
  }
`;

const MobileMenu = styled.div<{ isOpen: boolean; theme: string }>`
  display: none;
  flex-direction: column;
  gap: 1rem;
  background-color: ${props => props.theme === 'dark' ? '#1a1a1a' : '#ffffff'};
  padding: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    display: ${props => props.isOpen ? 'flex' : 'none'};
    position: absolute;
    left: 0;
    right: 0;
    top: 100%;
    z-index: 100;
  }
`;

const MobileNavLink = styled(Link)<{ theme: string }>`
  text-decoration: none;
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#121212'};
  font-weight: 500;
  padding: 0.75rem;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background-color: ${props => props.theme === 'dark' ? '#333' : '#f0f0f0'};
  }
`;

const MobileLogoutButton = styled.button<{ theme: string }>`
  background: none;
  border: none;
  text-align: left;
  width: 100%;
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#121212'};
  font-weight: 500;
  font-size: 1rem;
  padding: 0.75rem;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background-color: ${props => props.theme === 'dark' ? '#333' : '#f0f0f0'};
  }
`;

const MobileRandomButton = styled.button<{ theme: string }>`
  background: none;
  border: none;
  text-align: left;
  width: 100%;
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#121212'};
  font-weight: 500;
  font-size: 1rem;
  padding: 0.75rem;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background-color: ${props => props.theme === 'dark' ? '#333' : '#f0f0f0'};
  }
`;

const MobileThemeButton = styled.button<{ theme: string }>`
  background: none;
  border: none;
  text-align: left;
  width: 100%;
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#121212'};
  font-weight: 500;
  font-size: 1rem;
  padding: 0.75rem;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background-color: ${props => props.theme === 'dark' ? '#333' : '#f0f0f0'};
  }
`;

const MobileLanguageButton = styled.button<{ theme: string }>`
  background: none;
  border: none;
  text-align: left;
  width: 100%;
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#121212'};
  font-weight: 500;
  font-size: 1rem;
  padding: 0.75rem;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background-color: ${props => props.theme === 'dark' ? '#333' : '#f0f0f0'};
  }
`;

function Header() {
  const { theme, toggleTheme, language, toggleLanguage, t } = useApp();
  const { user, isAuthenticated, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const isAdmin = isAuthenticated && user?.email === 'admin@example.com';
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/anime?search=${encodeURIComponent(searchQuery)}`);
    }
  };
  
  const handleRandomAnime = async () => {
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
  };
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <HeaderContainer theme={theme}>
      <NavContainer>
        <Logo>
          <Link to="/">{t('site.name')}</Link>
        </Logo>
        
        <MobileMenuButton 
          theme={theme} 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </MobileMenuButton>
        
        <Nav>
          <NavLinks isOpen={isMenuOpen} theme={theme}>
            <NavLink to="/anime" theme={theme}>{t('nav.anime')}</NavLink>
            <NavLink to="/manga" theme={theme}>{t('nav.manga')}</NavLink>
            <NavLink to="/favorites" theme={theme}>{t('nav.favorites')}</NavLink>
            <RandomAnimeButton 
              onClick={handleRandomAnime} 
              theme={theme}
              disabled={isLoading}
            >
              <FaDice />
              {t('anime.random')}
            </RandomAnimeButton>
          </NavLinks>
          
          <form onSubmit={handleSearch}>
            <SearchContainer>
              <SearchInput 
                type="text" 
                placeholder={t('search.placeholder')} 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                theme={theme}
              />
            </SearchContainer>
          </form>
          
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            {isAuthenticated ? (
              <>
                {isAdmin && (
                  <ProfileButton to="/admin" theme={theme}>
                    <FaUserShield />
                    {t('nav.admin')}
                  </ProfileButton>
                )}
                <ProfileButton to="/profile" theme={theme}>
                  <FaUser />
                  {t('nav.profile')}
                </ProfileButton>
                <LogoutButton onClick={handleLogout} theme={theme}>
                  <FaSignOutAlt />
                  {t('nav.logout')}
                </LogoutButton>
              </>
            ) : (
              <AuthButton to="/auth">
                {t('nav.login')}
              </AuthButton>
            )}
            
            <LanguageToggle onClick={toggleLanguage} theme={theme} aria-label="Change language">
              <MdLanguage />
              <span style={{ marginLeft: '0.25rem' }}>
                {language === 'ru' ? 'RU' : 'EN'}
              </span>
            </LanguageToggle>
            
            <ThemeToggle onClick={toggleTheme} theme={theme}>
              {theme === 'dark' ? <FaSun /> : <FaMoon />}
            </ThemeToggle>
          </div>
        </Nav>
      </NavContainer>
      
      <MobileMenu isOpen={isMenuOpen} theme={theme}>
        <MobileNavLink to="/anime" onClick={() => setIsMenuOpen(false)} theme={theme}>
          {t('nav.anime')}
        </MobileNavLink>
        <MobileNavLink to="/manga" onClick={() => setIsMenuOpen(false)} theme={theme}>
          {t('nav.manga')}
        </MobileNavLink>
        <MobileNavLink to="/favorites" onClick={() => setIsMenuOpen(false)} theme={theme}>
          {t('nav.favorites')}
        </MobileNavLink>
        
        {isAuthenticated ? (
          <>
            {isAdmin && (
              <MobileNavLink to="/admin" onClick={() => setIsMenuOpen(false)} theme={theme}>
                <FaUserShield />
                {t('nav.admin')}
              </MobileNavLink>
            )}
            <MobileNavLink to="/profile" onClick={() => setIsMenuOpen(false)} theme={theme}>
              <FaUser />
              {t('nav.profile')}
            </MobileNavLink>
            <MobileLogoutButton onClick={() => { handleLogout(); setIsMenuOpen(false); }} theme={theme}>
              <FaSignOutAlt />
              {t('nav.logout')}
            </MobileLogoutButton>
          </>
        ) : (
          <MobileNavLink to="/auth" onClick={() => setIsMenuOpen(false)} theme={theme}>
            {t('nav.login')}
          </MobileNavLink>
        )}
        
        <MobileRandomButton onClick={() => { handleRandomAnime(); setIsMenuOpen(false); }} theme={theme}>
          <FaDice />
          {t('anime.random')}
        </MobileRandomButton>
        
        <MobileThemeButton onClick={() => { toggleTheme(); setIsMenuOpen(false); }} theme={theme}>
          {theme === 'dark' ? <FaSun /> : <FaMoon />}
          {theme === 'dark' ? t('theme.light') : t('theme.dark')}
        </MobileThemeButton>
        
        <MobileLanguageButton onClick={() => { toggleLanguage(); setIsMenuOpen(false); }} theme={theme}>
          <MdLanguage />
          {language === 'ru' ? 'English' : 'Русский'}
        </MobileLanguageButton>
      </MobileMenu>
    </HeaderContainer>
  );
}

export default Header; 