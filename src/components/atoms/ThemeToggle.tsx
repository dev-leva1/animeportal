import styled from '@emotion/styled';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '../../hooks/useTheme';

const ToggleButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  color: ${props => props.theme.text.primary};
  padding: 0.5rem;
  transition: color 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    color: ${props => props.theme.colors.primary[500]};
  }
`;

interface ThemeToggleProps {
  onToggle: () => void;
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ 
  onToggle, 
  className 
}) => {
  const theme = useTheme();
  
  return (
    <ToggleButton 
      onClick={onToggle} 
      className={className}
    >
      {theme.mode === 'dark' ? <FaSun /> : <FaMoon />}
    </ToggleButton>
  );
};

export default ThemeToggle; 