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

function PrivacyPage() {
  const { t } = useApp();
  
  // Устанавливаем заголовок страницы
  document.title = `${t('footer.privacy')} - ${t('site.name')}`;
  
  return (
    <Container>
      <Title>{t('footer.privacy')}</Title>
      
      <Section>
        <SectionTitle>{t('privacy.intro_title')}</SectionTitle>
        <Paragraph>{t('privacy.intro_text')}</Paragraph>
      </Section>
      
      <Section>
        <SectionTitle>{t('privacy.collection_title')}</SectionTitle>
        <Paragraph>{t('privacy.collection_text')}</Paragraph>
        <List>
          <ListItem>{t('privacy.collection_item1')}</ListItem>
          <ListItem>{t('privacy.collection_item2')}</ListItem>
          <ListItem>{t('privacy.collection_item3')}</ListItem>
          <ListItem>{t('privacy.collection_item4')}</ListItem>
        </List>
      </Section>
      
      <Section>
        <SectionTitle>{t('privacy.use_title')}</SectionTitle>
        <Paragraph>{t('privacy.use_text')}</Paragraph>
        <List>
          <ListItem>{t('privacy.use_item1')}</ListItem>
          <ListItem>{t('privacy.use_item2')}</ListItem>
          <ListItem>{t('privacy.use_item3')}</ListItem>
        </List>
      </Section>
      
      <Section>
        <SectionTitle>{t('privacy.sharing_title')}</SectionTitle>
        <Paragraph>{t('privacy.sharing_text')}</Paragraph>
      </Section>
      
      <Section>
        <SectionTitle>{t('privacy.cookies_title')}</SectionTitle>
        <Paragraph>{t('privacy.cookies_text')}</Paragraph>
      </Section>
      
      <Section>
        <SectionTitle>{t('privacy.security_title')}</SectionTitle>
        <Paragraph>{t('privacy.security_text')}</Paragraph>
      </Section>
      
      <Section>
        <SectionTitle>{t('privacy.changes_title')}</SectionTitle>
        <Paragraph>{t('privacy.changes_text')}</Paragraph>
      </Section>
      
      <Section>
        <SectionTitle>{t('privacy.contact_title')}</SectionTitle>
        <Paragraph>{t('privacy.contact_text')}</Paragraph>
      </Section>
    </Container>
  );
}

export default PrivacyPage; 