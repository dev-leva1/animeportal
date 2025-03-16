import { Component, ErrorInfo, ReactNode } from 'react';
import styled from '@emotion/styled';
import { withApp } from '../context/ThemeContext';
import { AppContextProps } from '../types/context';

interface Props extends AppContextProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

const ErrorContainer = styled.div`
  padding: 2rem;
  margin: 2rem auto;
  max-width: 800px;
  background-color: ${props => props.theme === 'dark' ? '#1a1a1a' : '#f8f8f8'};
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const ErrorTitle = styled.h2`
  color: #ff5f5f;
  margin-bottom: 1rem;
`;

const ErrorMessage = styled.p`
  color: ${props => props.theme === 'dark' ? '#ddd' : '#333'};
  margin-bottom: 1rem;
`;

const ErrorDetails = styled.details`
  margin-top: 1rem;
  
  summary {
    cursor: pointer;
    color: ${props => props.theme === 'dark' ? '#aaa' : '#666'};
    margin-bottom: 0.5rem;
  }
`;

const ErrorStack = styled.pre`
  background-color: ${props => props.theme === 'dark' ? '#111' : '#f0f0f0'};
  padding: 1rem;
  border-radius: 4px;
  overflow: auto;
  font-size: 0.875rem;
  color: ${props => props.theme === 'dark' ? '#ddd' : '#333'};
`;

const ResetButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #ff5f5f;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  margin-top: 1rem;
  
  &:hover {
    background-color: #ff4545;
  }
`;

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({
      error,
      errorInfo
    });
    
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
  }

  render(): ReactNode {
    const { hasError, error, errorInfo } = this.state;
    const { children, theme, t, fallback } = this.props;

    if (hasError) {
      if (fallback) {
        return fallback;
      }

      return (
        <ErrorContainer theme={theme}>
          <ErrorTitle>{t('error.title')}</ErrorTitle>
          <ErrorMessage theme={theme}>
            {t('error.message')}
          </ErrorMessage>
          
          {error && (
            <ErrorMessage theme={theme}>
              {error.toString()}
            </ErrorMessage>
          )}
          
          {errorInfo && (
            <ErrorDetails theme={theme}>
              <summary>{t('error.details')}</summary>
              <ErrorStack theme={theme}>
                {errorInfo.componentStack}
              </ErrorStack>
            </ErrorDetails>
          )}
          
          <ResetButton onClick={this.handleReset}>
            {t('error.try_again')}
          </ResetButton>
        </ErrorContainer>
      );
    }

    return children;
  }
}

export default withApp(ErrorBoundary); 