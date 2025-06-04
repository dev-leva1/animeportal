import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { FaUser, FaSignOutAlt, FaUserShield, FaDice } from 'react-icons/fa';
import { MdLanguage } from 'react-icons/md';
import MenuToggle from '../atoms/MenuToggle';
import { useTheme } from '../../hooks/useTheme';

const MobileMenuOverlay = styled.div<{ isOpen: boolean }>`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${props => props.theme.background.primary};
  z-index: 1000;
  padding: 2rem;
  transform: translateX(${props => props.isOpen ? '0' : '100%'});
  transition: transform 0.3s ease;
  
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;

const MobileNavLink = styled(Link)`
  text-decoration: none;
  color: ${props => props.theme.text.primary};
  font-weight: 500;
  padding: 0.75rem;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background-color: ${props => props.theme.background.secondary};
  }
`;

const MobileButton = styled.button`
  background: none;
  border: none;
  text-align: left;
  width: 100%;
  color: ${props => props.theme.text.primary};
  font-weight: 500;
  font-size: 1rem;
  padding: 0.75rem;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background-color: ${props => props.theme.background.secondary};
  }
`;

interface NavigationItem {
  to?: string;
  label: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  isButton?: boolean;
}

interface User {
  email?: string;
}

interface MobileMenuProps {
  language: string;
  isOpen: boolean;
  isAuthenticated: boolean;
  user?: User | null;
  isAdmin?: boolean;
  navigationItems: NavigationItem[];
  onClose: () => void;
  onLogout: () => void;
  onRandomAnime: () => void;
  onThemeToggle: () => void;
  onLanguageToggle: () => void;
  labels: {
    admin: string;
    profile: string;
    logout: string;
    login: string;
    themeDark: string;
    themeLight: string;
    languageEn: string;
    languageRu: string;
  };
  className?: string;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ language,
  isOpen,
  isAuthenticated,
  isAdmin,
  navigationItems,
  onClose,
  onLogout,
  onRandomAnime,
  onThemeToggle,
  onLanguageToggle,
  labels,
  className 
}) => {
  const theme = useTheme();
  const handleLogout = () => {
    onLogout();
    onClose();
  };

  const handleRandomAnime = () => {
    onRandomAnime();
    onClose();
  };

  const handleThemeToggle = () => {
    onThemeToggle();
    onClose();
  };

  const handleLanguageToggle = () => {
    onLanguageToggle();
    onClose();
  };

  return (
    <MobileMenuOverlay isOpen={isOpen} className={className}>
      <MenuToggle
        isOpen={true}
        onToggle={onClose}
      />
      
      {navigationItems.map((item, index) => (
        <MobileNavLink 
          key={index}
          to={item.to || '/'}
          onClick={onClose}
        >
          {item.icon}
          {item.label}
        </MobileNavLink>
      ))}
      
      {isAuthenticated ? (
        <>
          {isAdmin && (
            <MobileNavLink to="/admin" onClick={onClose}>
              <FaUserShield />
              {labels.admin}
            </MobileNavLink>
          )}
          <MobileNavLink to="/profile" onClick={onClose}>
            <FaUser />
            {labels.profile}
          </MobileNavLink>
          <MobileButton onClick={handleLogout}>
            <FaSignOutAlt />
            {labels.logout}
          </MobileButton>
        </>
      ) : (
        <MobileNavLink to="/auth" onClick={onClose}>
          {labels.login}
        </MobileNavLink>
      )}
      
      <MobileButton onClick={handleRandomAnime}>
        <FaDice />
        Random Anime
      </MobileButton>
      
      <MobileButton onClick={handleThemeToggle}>
        {theme.mode === 'dark' ? '☀️' : '🌙'}
        {theme.mode === 'dark' ? labels.themeLight : labels.themeDark}
      </MobileButton>
      
      <MobileButton onClick={handleLanguageToggle}>
        <MdLanguage />
        {language === 'ru' ? labels.languageEn : labels.languageRu}
      </MobileButton>
    </MobileMenuOverlay>
  );
};

export default MobileMenu; 