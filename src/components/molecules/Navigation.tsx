import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

const Nav = styled.nav`
  display: flex;
  gap: 1rem;
  align-items: center;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)<{ theme: string }>`
  text-decoration: none;
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#121212'};
  font-weight: 500;
  padding: 0.5rem 0.75rem;
  transition: color 0.3s ease;
  
  &:hover {
    color: #ff5f5f;
  }
`;

const RandomButton = styled.button<{ theme: string }>`
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
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

interface NavigationItem {
  to?: string;
  label: string;
  onClick?: () => void;
  isButton?: boolean;
  icon?: React.ReactNode;
  disabled?: boolean;
}

interface NavigationProps {
  theme: string;
  items: NavigationItem[];
  className?: string;
}

export const Navigation: React.FC<NavigationProps> = ({ 
  theme, 
  items, 
  className 
}) => {
  return (
    <Nav className={className}>
      {items.map((item, index) => (
        item.isButton ? (
          <RandomButton
            key={index}
            onClick={item.onClick}
            theme={theme}
            disabled={item.disabled}
          >
            {item.icon}
            {item.label}
          </RandomButton>
        ) : (
          <NavLink 
            key={index}
            to={item.to || '/'}
            theme={theme}
          >
            {item.label}
          </NavLink>
        )
      ))}
    </Nav>
  );
};

export default Navigation; 