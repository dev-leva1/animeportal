import styled from '@emotion/styled';
import { Spinner } from './Spinner';

const FallbackContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  gap: 16px;
`;

const LoadingText = styled.div`
  font-size: 16px;
  color: var(--color-text-secondary);
  font-weight: 500;
`;

interface LoadingFallbackProps {
  message?: string;
}

export const LoadingFallback = ({ message = 'Загрузка...' }: LoadingFallbackProps) => {
  return (
    <FallbackContainer>
      <Spinner size="lg" />
      <LoadingText>{message}</LoadingText>
    </FallbackContainer>
  );
};

export default LoadingFallback; 