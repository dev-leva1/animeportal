import styled from '@emotion/styled';
import { useApp } from '../context/ThemeContext';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const Title = styled.h1`
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#121212'};
  margin-bottom: 2rem;
  font-size: 2rem;
`;

const Section = styled.section`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#121212'};
  margin-bottom: 1rem;
  font-size: 1.5rem;
`;

const Paragraph = styled.p`
  color: ${props => props.theme === 'dark' ? '#cccccc' : '#333333'};
  line-height: 1.6;
  margin-bottom: 1rem;
`;

function AboutPage() {
  const { theme, t } = useApp();
  
  // Устанавливаем заголовок страницы
  document.title = `${t('footer.about')} - ${t('site.name')}`;
  
  return (
    <Container>
      <Title theme={theme}>{t('footer.about')}</Title>
      
      <Section>
        <SectionTitle theme={theme}>{t('about.mission_title')}</SectionTitle>
        <Paragraph theme={theme}>{t('about.mission_text')}</Paragraph>
      </Section>
      
      <Section>
        <SectionTitle theme={theme}>{t('about.what_we_offer_title')}</SectionTitle>
        <Paragraph theme={theme}>{t('about.what_we_offer_text1')}</Paragraph>
        <Paragraph theme={theme}>{t('about.what_we_offer_text2')}</Paragraph>
      </Section>
      
      <Section>
        <SectionTitle theme={theme}>{t('about.team_title')}</SectionTitle>
        <Paragraph theme={theme}>{t('about.team_text')}</Paragraph>
      </Section>
      
      <Section>
        <SectionTitle theme={theme}>{t('about.contact_title')}</SectionTitle>
        <Paragraph theme={theme}>{t('about.contact_text')}</Paragraph>
      </Section>
    </Container>
  );
}

export default AboutPage; 