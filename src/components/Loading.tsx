import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { useTheme } from '../context/ThemeContext';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  min-height: 200px;
`;

const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 5px solid ${props => props.theme === 'dark' ? '#333' : '#f0f0f0'};
  border-top: 5px solid #ff5f5f;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  margin-bottom: 1rem;
`;

const LoadingText = styled.p`
  color: ${props => props.theme === 'dark' ? '#aaa' : '#666'};
  font-size: 1rem;
  margin: 0;
`;

function Loading() {
  const { theme } = useTheme();
  
  return (
    <LoadingContainer>
      <Spinner theme={theme} />
      <LoadingText theme={theme}>Загрузка...</LoadingText>
    </LoadingContainer>
  );
}

export default Loading; 