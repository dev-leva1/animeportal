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

const Link = styled.a`
  color: #ff5f5f;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
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

function DataSourcePage() {
  const { theme, t } = useApp();
  
  // Устанавливаем заголовок страницы
  document.title = `${t('footer.data_source')} - ${t('site.name')}`;
  
  return (
    <Container>
      <Title theme={theme}>{t('footer.data_source')}</Title>
      
      <Section>
        <SectionTitle theme={theme}>{t('data_source.api_title')}</SectionTitle>
        <Paragraph theme={theme}>
          {t('data_source.api_text')}
          <Link href="https://jikan.moe/" target="_blank" rel="noopener noreferrer">
            Jikan API
          </Link>
          {t('data_source.api_text2')}
          <Link href="https://myanimelist.net/" target="_blank" rel="noopener noreferrer">
            MyAnimeList
          </Link>.
        </Paragraph>
      </Section>
      
      <Section>
        <SectionTitle theme={theme}>{t('data_source.usage_title')}</SectionTitle>
        <Paragraph theme={theme}>{t('data_source.usage_text')}</Paragraph>
        <List theme={theme}>
          <ListItem>{t('data_source.usage_item1')}</ListItem>
          <ListItem>{t('data_source.usage_item2')}</ListItem>
          <ListItem>{t('data_source.usage_item3')}</ListItem>
        </List>
      </Section>
      
      <Section>
        <SectionTitle theme={theme}>{t('data_source.limitations_title')}</SectionTitle>
        <Paragraph theme={theme}>{t('data_source.limitations_text')}</Paragraph>
        <List theme={theme}>
          <ListItem>{t('data_source.limitations_item1')}</ListItem>
          <ListItem>{t('data_source.limitations_item2')}</ListItem>
          <ListItem>{t('data_source.limitations_item3')}</ListItem>
        </List>
      </Section>
      
      <Section>
        <SectionTitle theme={theme}>{t('data_source.attribution_title')}</SectionTitle>
        <Paragraph theme={theme}>{t('data_source.attribution_text')}</Paragraph>
      </Section>
      
      <Section>
        <SectionTitle theme={theme}>{t('data_source.contact_title')}</SectionTitle>
        <Paragraph theme={theme}>{t('data_source.contact_text')}</Paragraph>
      </Section>
    </Container>
  );
}

export default DataSourcePage; 