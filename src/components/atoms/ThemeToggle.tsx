import styled from '@emotion/styled';
import { FaSun, FaMoon } from 'react-icons/fa';

const ToggleButton = styled.button<{ theme: string }>`
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

interface ThemeToggleProps {
  theme: string;
  onToggle: () => void;
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ 
  theme, 
  onToggle, 
  className 
}) => {
  return (
    <ToggleButton 
      onClick={onToggle} 
      theme={theme}
      className={className}
    >
      {theme === 'dark' ? <FaSun /> : <FaMoon />}
    </ToggleButton>
  );
};

export default ThemeToggle; 