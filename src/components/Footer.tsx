import styled from '@emotion/styled';
import { useTheme } from '../context/ThemeContext';

const FooterContainer = styled.footer`
  background-color: ${props => props.theme === 'dark' ? '#1a1a1a' : '#ffffff'};
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#121212'};
  padding: 2rem;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
  margin-top: auto;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FooterLinks = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
`;

const FooterLink = styled.a`
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#121212'};
  text-decoration: none;
  transition: color 0.3s ease;
  
  &:hover {
    color: #ff5f5f;
  }
`;

const FooterText = styled.p`
  margin: 0;
  color: ${props => props.theme === 'dark' ? '#aaa' : '#666'};
  font-size: 0.9rem;
`;

const Divider = styled.hr`
  width: 100%;
  border: none;
  border-top: 1px solid ${props => props.theme === 'dark' ? '#333' : '#eee'};
  margin: 1rem 0;
`;

function Footer() {
  const { theme } = useTheme();
  
  return (
    <FooterContainer theme={theme}>
      <FooterContent>
        <FooterLinks>
          <FooterLink href="#" theme={theme}>О проекте</FooterLink>
          <FooterLink href="#" theme={theme}>Правила использования</FooterLink>
          <FooterLink href="#" theme={theme}>Политика конфиденциальности</FooterLink>
          <FooterLink href="#" theme={theme}>Контакты</FooterLink>
        </FooterLinks>
        
        <Divider theme={theme} />
        
        <FooterText theme={theme}>
          &copy; {new Date().getFullYear()} АнимеПортал. Все права защищены.
        </FooterText>
        <FooterText theme={theme} style={{ marginTop: '0.5rem' }}>
          Данные предоставлены API Jikan (неофициальное API MyAnimeList).
        </FooterText>
      </FooterContent>
    </FooterContainer>
  );
}

export default Footer; 