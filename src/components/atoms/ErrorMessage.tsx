import styled from '@emotion/styled';
import { memo } from 'react';
import { Button } from './Button';
import { Typography } from './Typography';
import { Card } from './Card';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
  variant?: 'error' | 'warning';
}

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
  gap: 1rem;
`;

const ErrorIcon = styled.div<{ variant: 'error' | 'warning' }>`
  font-size: 3rem;
  color: ${props => props.variant === 'error' ? '#ff5f5f' : '#ff9800'};
`;

export const ErrorMessage = memo(({ 
  message, 
  onRetry, 
  variant = 'error' 
}: ErrorMessageProps) => {
  const icon = variant === 'error' ? '⚠️' : '⚠️';
  
  return (
    <Card variant="outlined">
      <ErrorContainer>
        <ErrorIcon variant={variant}>{icon}</ErrorIcon>
        <Typography variant="body-lg" color={variant === 'error' ? 'error' : 'warning'}>
          {message}
        </Typography>
        {onRetry && (
          <Button variant="primary" onClick={onRetry}>
            Повторить
          </Button>
        )}
      </ErrorContainer>
    </Card>
  );
});

export default ErrorMessage; 