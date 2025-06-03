import styled from '@emotion/styled';
import { MdLanguage } from 'react-icons/md';

const ToggleButton = styled.button<{ theme: string }>`
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
  gap: 0.25rem;
  
  &:hover {
    color: #ff5f5f;
  }
`;

interface LanguageToggleProps {
  theme: string;
  language: string;
  onToggle: () => void;
  className?: string;
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({ 
  theme, 
  language, 
  onToggle, 
  className 
}) => {
  return (
    <ToggleButton 
      onClick={onToggle} 
      theme={theme}
      className={className}
      aria-label="Change language"
    >
      <MdLanguage />
      <span>{language === 'ru' ? 'RU' : 'EN'}</span>
    </ToggleButton>
  );
};

export default LanguageToggle; 