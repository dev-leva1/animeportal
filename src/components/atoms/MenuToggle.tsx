import styled from '@emotion/styled';
import { FaBars, FaTimes } from 'react-icons/fa';

const ToggleButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${props => props.theme.text.primary};
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.5rem;
  transition: color 0.3s ease;
  align-items: center;
  justify-content: center;
  
  &:hover {
    color: #ff5f5f;
  }
  
  @media (max-width: 768px) {
    display: flex;
  }
`;

interface MenuToggleProps {
  isOpen: boolean;
  onToggle: () => void;
  className?: string;
}

export const MenuToggle: React.FC<MenuToggleProps> = ({ isOpen, 
  onToggle, 
  className 
}) => {
  return (
    <ToggleButton 
      onClick={onToggle}
      className={className}
    >
      {isOpen ? <FaTimes /> : <FaBars />}
    </ToggleButton>
  );
};

export default MenuToggle; 