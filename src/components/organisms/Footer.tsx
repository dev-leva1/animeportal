import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { memo, useMemo } from 'react';
import { useApp } from '../../context/ThemeContext';

const FooterContainer = styled.footer`
  background-color: ${props => props.theme.mode === 'dark' ? '#1a1a1a' : '#f0f0f0'};
  color: ${props => props.theme.text.muted};
  padding: 2rem 0;
  margin-top: 3rem;
  border-top: 1px solid ${props => props.theme.mode === 'dark' ? '#333' : '#ddd'};
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
  color: ${props => props.theme.text.muted};
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.2s ease;
  
  &:hover {
    color: ${props => props.theme.text.primary};
    text-decoration: underline;
  }
`;

const FooterCopyright = styled.div`
  text-align: center;
  font-size: 0.85rem;
  margin-top: 1rem;
`;

export const Footer: React.FC = memo(() => {
  const { t } = useApp();
  
  const currentYear = useMemo(() => new Date().getFullYear(), []);
  
  const footerLinks = useMemo(() => [
    { to: '/about', label: t('footer.about') },
    { to: '/terms', label: t('footer.terms') },
    { to: '/privacy', label: t('footer.privacy') },
    { to: '/contacts', label: t('footer.contacts') },
    { to: '/data-source', label: t('footer.data_source') },
    { to: '/copyright', label: t('footer.copyright_page') }
  ], [t]);
  
  return (
    <FooterContainer>
      <FooterContent>
        <FooterLinks>
          {footerLinks.map(({ to, label }) => (
            <FooterLink key={to} to={to}>
              {label}
            </FooterLink>
          ))}
        </FooterLinks>
        <FooterCopyright>
          {t('footer.copyright').replace('{year}', currentYear.toString())}
        </FooterCopyright>
      </FooterContent>
    </FooterContainer>
  );
});

export default Footer; 