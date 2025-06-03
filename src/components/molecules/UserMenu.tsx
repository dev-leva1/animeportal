import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { FaUser, FaSignOutAlt, FaUserShield } from 'react-icons/fa';

const MenuContainer = styled.div`
  display: flex;
  gap: 0.75rem;
  align-items: center;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const ProfileButton = styled(Link)<{ theme: string }>`
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

const LogoutButton = styled.button<{ theme: string }>`
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

interface User {
  email?: string;
  // Добавить другие поля по необходимости
}

interface UserMenuProps {
  theme: string;
  isAuthenticated: boolean;
  user?: User | null;
  isAdmin?: boolean;
  onLogout: () => void;
  labels: {
    admin: string;
    profile: string;
    logout: string;
    login: string;
  };
  className?: string;
}

export const UserMenu: React.FC<UserMenuProps> = ({ 
  theme, 
  isAuthenticated, 
  isAdmin,
  onLogout, 
  labels,
  className 
}) => {
  return (
    <MenuContainer className={className}>
      {isAuthenticated ? (
        <>
          {isAdmin && (
            <ProfileButton to="/admin" theme={theme}>
              <FaUserShield />
              {labels.admin}
            </ProfileButton>
          )}
          <ProfileButton to="/profile" theme={theme}>
            <FaUser />
            {labels.profile}
          </ProfileButton>
          <LogoutButton onClick={onLogout} theme={theme}>
            <FaSignOutAlt />
            {labels.logout}
          </LogoutButton>
        </>
      ) : (
        <AuthButton to="/auth">
          {labels.login}
        </AuthButton>
      )}
    </MenuContainer>
  );
};

export default UserMenu; 