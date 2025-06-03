import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { memo, useMemo } from 'react';
import { useApp } from '../context/ThemeContext';

const FooterContainer = styled.footer`
  background-color: ${props => props.theme === 'dark' ? '#1a1a1a' : '#f0f0f0'};
  color: ${props => props.theme === 'dark' ? '#aaa' : '#666'};
  padding: 2rem 0;
  margin-top: 3rem;
  border-top: 1px solid ${props => props.theme === 'dark' ? '#333' : '#ddd'};
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FooterLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
`;

const FooterLink = styled(Link)`
  color: ${props => props.theme === 'dark' ? '#aaa' : '#666'};
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.2s ease;
  
  &:hover {
    color: ${props => props.theme === 'dark' ? '#fff' : '#333'};
    text-decoration: underline;
  }
`;

const FooterCopyright = styled.div`
  text-align: center;
  font-size: 0.85rem;
  margin-top: 1rem;
`;

const Footer = memo(() => {
  const { theme, t } = useApp();
  
  const currentYear = useMemo(() => new Date().getFullYear(), []);
  
  return (
    <FooterContainer theme={theme}>
      <FooterContent>
        <FooterLinks>
          <FooterLink to="/about" theme={theme}>
            {t('footer.about')}
          </FooterLink>
          <FooterLink to="/terms" theme={theme}>
            {t('footer.terms')}
          </FooterLink>
          <FooterLink to="/privacy" theme={theme}>
            {t('footer.privacy')}
          </FooterLink>
          <FooterLink to="/contacts" theme={theme}>
            {t('footer.contacts')}
          </FooterLink>
          <FooterLink to="/data-source" theme={theme}>
            {t('footer.data_source')}
          </FooterLink>
          <FooterLink to="/copyright" theme={theme}>
            {t('footer.copyright_page')}
          </FooterLink>
        </FooterLinks>
        <FooterCopyright>
          {t('footer.copyright').replace('{year}', currentYear.toString())}
        </FooterCopyright>
      </FooterContent>
    </FooterContainer>
  );
});

export default Footer; 