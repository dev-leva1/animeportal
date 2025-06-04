import styled from '@emotion/styled';
import { useApp } from '../context/ThemeContext';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const Title = styled.h1`
  color: ${props => props.theme.text.primary};
  margin-bottom: 2rem;
  font-size: 2rem;
`;

const Section = styled.section`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  color: ${props => props.theme.text.primary};
  margin-bottom: 1rem;
  font-size: 1.5rem;
`;

const Paragraph = styled.p`
  color: ${props => props.theme.text.secondary};
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const List = styled.ul`
  color: ${props => props.theme.text.secondary};
  line-height: 1.6;
  margin-bottom: 1rem;
  padding-left: 2rem;
`;

const ListItem = styled.li`
  margin-bottom: 0.5rem;
`;

function CopyrightPage() {
  const { t } = useApp();
  const currentYear = new Date().getFullYear();
  
  // Устанавливаем заголовок страницы
  document.title = `${t('copyright.title')} - ${t('site.name')}`;
  
  return (
    <Container>
      <Title>{t('copyright.title')}</Title>
      
      <Section>
        <SectionTitle>{t('copyright.ownership_title')}</SectionTitle>
        <Paragraph>
          {t('copyright.ownership_text').replace('{year}', currentYear.toString())}
        </Paragraph>
      </Section>
      
      <Section>
        <SectionTitle>{t('copyright.content_title')}</SectionTitle>
        <Paragraph>{t('copyright.content_text')}</Paragraph>
        <List>
          <ListItem>{t('copyright.content_item1')}</ListItem>
          <ListItem>{t('copyright.content_item2')}</ListItem>
          <ListItem>{t('copyright.content_item3')}</ListItem>
          <ListItem>{t('copyright.content_item4')}</ListItem>
        </List>
      </Section>
      
      <Section>
        <SectionTitle>{t('copyright.fair_use_title')}</SectionTitle>
        <Paragraph>{t('copyright.fair_use_text')}</Paragraph>
      </Section>
      
      <Section>
        <SectionTitle>{t('copyright.dmca_title')}</SectionTitle>
        <Paragraph>{t('copyright.dmca_text')}</Paragraph>
      </Section>
      
      <Section>
        <SectionTitle>{t('copyright.contact_title')}</SectionTitle>
        <Paragraph>{t('copyright.contact_text')}</Paragraph>
      </Section>
    </Container>
  );
}

export default CopyrightPage; 