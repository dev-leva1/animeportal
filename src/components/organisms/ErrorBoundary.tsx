import { Component, ErrorInfo, ReactNode } from 'react';
import { withApp } from '../../context/ThemeContext';
import { AppContextProps } from '../../types/context';
import { Card, Typography, Button } from '../atoms';

interface Props extends AppContextProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

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
        <Card style={{
          padding: '2rem',
          margin: '2rem auto',
          maxWidth: '800px'
        }}>
          <Typography variant="heading-md" color="error" style={{ marginBottom: '1rem' }}>
            {t('error.title')}
          </Typography>
          
          <Typography variant="body-lg" color="muted" style={{ marginBottom: '1rem' }}>
            {t('error.message')}
          </Typography>
          
          {error && (
            <Typography variant="body-md" color="muted" style={{ marginBottom: '1rem' }}>
              {error.toString()}
            </Typography>
          )}
          
          {errorInfo && (
            <details style={{ marginTop: '1rem' }}>
              <summary style={{
                cursor: 'pointer',
                marginBottom: '0.5rem'
              }}>
                <Typography variant="body-sm" color="muted">
                  {t('error.details')}
                </Typography>
              </summary>
              <pre style={{
                backgroundColor: theme === 'dark' ? '#111' : '#f0f0f0',
                padding: '1rem',
                borderRadius: '4px',
                overflow: 'auto',
                fontSize: '0.875rem',
                color: theme === 'dark' ? '#ddd' : '#333'
              }}>
                {errorInfo.componentStack}
              </pre>
            </details>
          )}
          
          <Button 
            variant="primary" 
            onClick={this.handleReset}
            style={{ marginTop: '1rem' }}
          >
            {t('error.try_again')}
          </Button>
        </Card>
      );
    }

    return children;
  }
}

export default withApp(ErrorBoundary); 