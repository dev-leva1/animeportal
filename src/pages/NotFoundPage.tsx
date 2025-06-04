import { Link } from 'react-router-dom';
import { useApp } from '../context/ThemeContext';
import { Container, Typography } from '../components';

function NotFoundPage() {
  const { t } = useApp();
  
  const linkStyles = {
    display: 'inline-block',
    backgroundColor: '#ff5f5f',
    color: 'white',
    textDecoration: 'none',
    padding: '0.8rem 2rem',
    borderRadius: '4px',
    fontWeight: 500,
    fontSize: '1.125rem',
    lineHeight: '1.75rem',
    minHeight: '3.25rem',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background-color 0.3s ease, transform 0.3s ease',
    transform: 'translateY(0)',
  };
  
  return (
    <Container 
      maxWidth="md" 
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '3rem 1rem',
        minHeight: '60vh'
      }}
    >
      <div style={{ 
        fontSize: 'clamp(4rem, 8vw, 5rem)', 
        marginBottom: '2rem'
      }}>
        🤷‍♂️
      </div>
      
      <Typography 
        variant="display-lg" 
        weight="bold" 
        style={{ 
          color: '#ff5f5f', 
          margin: 0, 
          lineHeight: 1,
          fontSize: 'clamp(6rem, 10vw, 8rem)'
        }}
      >
        404
      </Typography>
      
      <Typography 
        variant="heading-lg" 
        style={{ 
          margin: '1rem 0 2rem',
          fontSize: 'clamp(1.5rem, 4vw, 2rem)'
        }}
      >
        {t('notfound.title')}
      </Typography>
      
      <Typography 
        variant="body-lg" 
        color="muted" 
        style={{ 
          maxWidth: '600px', 
          margin: '0 auto 2rem',
          fontSize: 'clamp(1rem, 2.5vw, 1.2rem)'
        }}
      >
        {t('notfound.message')}
      </Typography>
      
      <Link 
        to="/" 
        style={linkStyles}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#ff4040';
          e.currentTarget.style.transform = 'translateY(-3px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#ff5f5f';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        {t('notfound.back_home')}
      </Link>
    </Container>
  );
}

export default NotFoundPage; 