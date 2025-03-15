import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { useApp } from '../context/ThemeContext';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 3rem 1rem;
  min-height: 60vh;
`;

const ErrorCode = styled.h1`
  font-size: 8rem;
  font-weight: bold;
  color: #ff5f5f;
  margin: 0;
  line-height: 1;
  
  @media (max-width: 768px) {
    font-size: 6rem;
  }
`;

const Title = styled.h2`
  font-size: 2rem;
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#121212'};
  margin: 1rem 0 2rem;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: ${props => props.theme === 'dark' ? '#aaa' : '#666'};
  max-width: 600px;
  margin: 0 auto 2rem;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const HomeButton = styled(Link)`
  display: inline-block;
  background-color: #ff5f5f;
  color: white;
  text-decoration: none;
  padding: 0.8rem 2rem;
  border-radius: 4px;
  font-weight: 500;
  transition: background-color 0.3s ease, transform 0.3s ease;
  
  &:hover {
    background-color: #ff4040;
    transform: translateY(-3px);
  }
`;

const Illustration = styled.div`
  font-size: 5rem;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    font-size: 4rem;
  }
`;

function NotFoundPage() {
  const { theme, t } = useApp();
  
  return (
    <Container>
      <Illustration>🤷‍♂️</Illustration>
      <ErrorCode>404</ErrorCode>
      <Title theme={theme}>{t('notfound.title')}</Title>
      <Description theme={theme}>
        {t('notfound.message')}
      </Description>
      <HomeButton to="/">{t('notfound.back_home')}</HomeButton>
    </Container>
  );
}

export default NotFoundPage; 