import { useApp } from '../context/ThemeContext';
import { Container, Typography } from '../components';

function AboutPage() {
  const { t } = useApp();
  
  // Устанавливаем заголовок страницы
  document.title = `${t('footer.about')} - ${t('site.name')}`;
  
  return (
    <Container maxWidth="md" padding="lg" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
      <Typography variant="heading-xl" style={{ marginBottom: '2rem' }}>
        {t('footer.about')}
      </Typography>
      
      <section style={{ marginBottom: '2rem' }}>
        <Typography variant="heading-lg" style={{ marginBottom: '1rem' }}>
          {t('about.mission_title')}
        </Typography>
        <Typography variant="body-lg" color="muted" style={{ lineHeight: 1.6, marginBottom: '1rem' }}>
          {t('about.mission_text')}
        </Typography>
      </section>
      
      <section style={{ marginBottom: '2rem' }}>
        <Typography variant="heading-lg" style={{ marginBottom: '1rem' }}>
          {t('about.what_we_offer_title')}
        </Typography>
        <Typography variant="body-lg" color="muted" style={{ lineHeight: 1.6, marginBottom: '1rem' }}>
          {t('about.what_we_offer_text1')}
        </Typography>
        <Typography variant="body-lg" color="muted" style={{ lineHeight: 1.6, marginBottom: '1rem' }}>
          {t('about.what_we_offer_text2')}
        </Typography>
      </section>
      
      <section style={{ marginBottom: '2rem' }}>
        <Typography variant="heading-lg" style={{ marginBottom: '1rem' }}>
          {t('about.team_title')}
        </Typography>
        <Typography variant="body-lg" color="muted" style={{ lineHeight: 1.6, marginBottom: '1rem' }}>
          {t('about.team_text')}
        </Typography>
      </section>
      
      <section style={{ marginBottom: '2rem' }}>
        <Typography variant="heading-lg" style={{ marginBottom: '1rem' }}>
          {t('about.contact_title')}
        </Typography>
        <Typography variant="body-lg" color="muted" style={{ lineHeight: 1.6, marginBottom: '1rem' }}>
          {t('about.contact_text')}
        </Typography>
      </section>
    </Container>
  );
}

export default AboutPage; 