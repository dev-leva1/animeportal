import styled from '@emotion/styled';
import { MdLanguage } from 'react-icons/md';

const ToggleButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-weight: 500;
  color: ${props => props.theme.text.primary};
  padding: 0.5rem;
  transition: color 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  
  &:hover {
    color: ${props => props.theme.colors.primary[500]};
  }
`;

interface LanguageToggleProps {
  language: string;
  onToggle: () => void;
  className?: string;
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({ 
  language, 
  onToggle, 
  className 
}) => {
  return (
    <ToggleButton 
      onClick={onToggle} 
      className={className}
      aria-label="Change language"
    >
      <MdLanguage />
      <span>{language === 'ru' ? 'RU' : 'EN'}</span>
    </ToggleButton>
  );
};

export default LanguageToggle; 