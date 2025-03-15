import styled from '@emotion/styled';
import { useApp } from '../context/ThemeContext';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
  background-color: ${props => props.theme === 'dark' ? '#2a2020' : '#fff5f5'};
  border-radius: 8px;
  border: 1px solid ${props => props.theme === 'dark' ? '#4a2020' : '#ffdddd'};
  margin: 1rem 0;
`;

const ErrorIcon = styled.div`
  font-size: 3rem;
  color: #ff5f5f;
  margin-bottom: 1rem;
`;

const ErrorText = styled.p`
  color: ${props => props.theme === 'dark' ? '#ff9999' : '#cc0000'};
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
`;

const RetryButton = styled.button`
  background-color: #ff5f5f;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
  
  &:hover {
    background-color: #ff4040;
    transform: translateY(-2px);
  }
`;

function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  const { theme, t } = useApp();
  
  return (
    <ErrorContainer theme={theme}>
      <ErrorIcon>⚠️</ErrorIcon>
      <ErrorText theme={theme}>{message}</ErrorText>
      {onRetry && (
        <RetryButton onClick={onRetry}>
          {t('error.retry')}
        </RetryButton>
      )}
    </ErrorContainer>
  );
}

export default ErrorMessage; 