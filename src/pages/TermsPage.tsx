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

function TermsPage() {
  const { t } = useApp();
  
  // Устанавливаем заголовок страницы
  document.title = `${t('footer.terms')} - ${t('site.name')}`;
  
  return (
    <Container>
      <Title>{t('footer.terms')}</Title>
      
      <Section>
        <SectionTitle>{t('terms.acceptance_title')}</SectionTitle>
        <Paragraph>{t('terms.acceptance_text')}</Paragraph>
      </Section>
      
      <Section>
        <SectionTitle>{t('terms.use_title')}</SectionTitle>
        <Paragraph>{t('terms.use_text')}</Paragraph>
        <List>
          <ListItem>{t('terms.use_item1')}</ListItem>
          <ListItem>{t('terms.use_item2')}</ListItem>
          <ListItem>{t('terms.use_item3')}</ListItem>
          <ListItem>{t('terms.use_item4')}</ListItem>
        </List>
      </Section>
      
      <Section>
        <SectionTitle>{t('terms.content_title')}</SectionTitle>
        <Paragraph>{t('terms.content_text')}</Paragraph>
      </Section>
      
      <Section>
        <SectionTitle>{t('terms.accounts_title')}</SectionTitle>
        <Paragraph>{t('terms.accounts_text')}</Paragraph>
      </Section>
      
      <Section>
        <SectionTitle>{t('terms.termination_title')}</SectionTitle>
        <Paragraph>{t('terms.termination_text')}</Paragraph>
      </Section>
      
      <Section>
        <SectionTitle>{t('terms.changes_title')}</SectionTitle>
        <Paragraph>{t('terms.changes_text')}</Paragraph>
      </Section>
      
      <Section>
        <SectionTitle>{t('terms.contact_title')}</SectionTitle>
        <Paragraph>{t('terms.contact_text')}</Paragraph>
      </Section>
    </Container>
  );
}

export default TermsPage; 