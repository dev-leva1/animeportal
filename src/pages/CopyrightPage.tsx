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

const List = styled.ul`
  color: ${props => props.theme === 'dark' ? '#cccccc' : '#333333'};
  line-height: 1.6;
  margin-bottom: 1rem;
  padding-left: 2rem;
`;

const ListItem = styled.li`
  margin-bottom: 0.5rem;
`;

function CopyrightPage() {
  const { theme, t } = useApp();
  const currentYear = new Date().getFullYear();
  
  // Устанавливаем заголовок страницы
  document.title = `${t('copyright.title')} - ${t('site.name')}`;
  
  return (
    <Container>
      <Title theme={theme}>{t('copyright.title')}</Title>
      
      <Section>
        <SectionTitle theme={theme}>{t('copyright.ownership_title')}</SectionTitle>
        <Paragraph theme={theme}>
          {t('copyright.ownership_text').replace('{year}', currentYear.toString())}
        </Paragraph>
      </Section>
      
      <Section>
        <SectionTitle theme={theme}>{t('copyright.content_title')}</SectionTitle>
        <Paragraph theme={theme}>{t('copyright.content_text')}</Paragraph>
        <List theme={theme}>
          <ListItem>{t('copyright.content_item1')}</ListItem>
          <ListItem>{t('copyright.content_item2')}</ListItem>
          <ListItem>{t('copyright.content_item3')}</ListItem>
          <ListItem>{t('copyright.content_item4')}</ListItem>
        </List>
      </Section>
      
      <Section>
        <SectionTitle theme={theme}>{t('copyright.fair_use_title')}</SectionTitle>
        <Paragraph theme={theme}>{t('copyright.fair_use_text')}</Paragraph>
      </Section>
      
      <Section>
        <SectionTitle theme={theme}>{t('copyright.dmca_title')}</SectionTitle>
        <Paragraph theme={theme}>{t('copyright.dmca_text')}</Paragraph>
      </Section>
      
      <Section>
        <SectionTitle theme={theme}>{t('copyright.contact_title')}</SectionTitle>
        <Paragraph theme={theme}>{t('copyright.contact_text')}</Paragraph>
      </Section>
    </Container>
  );
}

export default CopyrightPage; 