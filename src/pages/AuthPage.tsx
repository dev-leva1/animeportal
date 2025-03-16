import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { useApp } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { UserCredentials, RegisterData } from '../types/user';

const AuthContainer = styled.div`
  max-width: 500px;
  margin: 2rem auto;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background-color: ${props => props.theme === 'dark' ? '#1a1a1a' : '#ffffff'};
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  text-align: center;
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#121212'};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 500;
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#121212'};
`;

const Input = styled.input`
  padding: 0.75rem;
  border-radius: 4px;
  border: 1px solid ${props => props.theme === 'dark' ? '#444' : '#ddd'};
  background-color: ${props => props.theme === 'dark' ? '#333' : '#f5f5f5'};
  color: ${props => props.theme === 'dark' ? '#fff' : '#333'};
  
  &:focus {
    outline: none;
    border-color: #ff5f5f;
  }
`;

const Button = styled.button`
  padding: 0.75rem;
  border-radius: 4px;
  border: none;
  background-color: #ff5f5f;
  color: white;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 1rem;
  
  &:hover {
    background-color: #ff4545;
  }
  
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const ToggleMode = styled.button`
  background: none;
  border: none;
  color: #ff5f5f;
  cursor: pointer;
  margin-top: 1rem;
  text-align: center;
  width: 100%;
  
  &:hover {
    text-decoration: underline;
  }
`;

const ErrorMessage = styled.div`
  color: #ff4545;
  margin-top: 1rem;
  text-align: center;
`;

function AuthPage() {
  const { theme, t } = useApp();
  const { login, register, isLoading } = useAuth();
  const navigate = useNavigate();
  
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [error, setError] = useState('');
  
  const [loginData, setLoginData] = useState<UserCredentials>({
    email: '',
    password: ''
  });
  
  const [registerData, setRegisterData] = useState<RegisterData>({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      await login(loginData);
      navigate('/');
    } catch (err) {
      setError(t('auth.login_error'));
    }
  };
  
  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (registerData.password !== registerData.confirmPassword) {
      setError(t('auth.passwords_not_match'));
      return;
    }
    
    try {
      await register(registerData);
      navigate('/');
    } catch (err) {
      setError(t('auth.register_error'));
    }
  };
  
  return (
    <AuthContainer theme={theme}>
      <Title theme={theme}>
        {isLoginMode ? t('auth.login') : t('auth.register')}
      </Title>
      
      {isLoginMode ? (
        <Form onSubmit={handleLoginSubmit}>
          <FormGroup>
            <Label theme={theme}>{t('auth.email')}</Label>
            <Input
              type="email"
              name="email"
              value={loginData.email}
              onChange={handleLoginChange}
              required
              theme={theme}
            />
          </FormGroup>
          
          <FormGroup>
            <Label theme={theme}>{t('auth.password')}</Label>
            <Input
              type="password"
              name="password"
              value={loginData.password}
              onChange={handleLoginChange}
              required
              theme={theme}
            />
          </FormGroup>
          
          <Button type="submit" disabled={isLoading}>
            {isLoading ? t('auth.loading') : t('auth.login')}
          </Button>
        </Form>
      ) : (
        <Form onSubmit={handleRegisterSubmit}>
          <FormGroup>
            <Label theme={theme}>{t('auth.username')}</Label>
            <Input
              type="text"
              name="username"
              value={registerData.username}
              onChange={handleRegisterChange}
              required
              theme={theme}
            />
          </FormGroup>
          
          <FormGroup>
            <Label theme={theme}>{t('auth.email')}</Label>
            <Input
              type="email"
              name="email"
              value={registerData.email}
              onChange={handleRegisterChange}
              required
              theme={theme}
            />
          </FormGroup>
          
          <FormGroup>
            <Label theme={theme}>{t('auth.password')}</Label>
            <Input
              type="password"
              name="password"
              value={registerData.password}
              onChange={handleRegisterChange}
              required
              theme={theme}
            />
          </FormGroup>
          
          <FormGroup>
            <Label theme={theme}>{t('auth.confirm_password')}</Label>
            <Input
              type="password"
              name="confirmPassword"
              value={registerData.confirmPassword}
              onChange={handleRegisterChange}
              required
              theme={theme}
            />
          </FormGroup>
          
          <Button type="submit" disabled={isLoading}>
            {isLoading ? t('auth.loading') : t('auth.register')}
          </Button>
        </Form>
      )}
      
      {error && <ErrorMessage>{error}</ErrorMessage>}
      
      <ToggleMode onClick={() => setIsLoginMode(!isLoginMode)}>
        {isLoginMode ? t('auth.no_account') : t('auth.have_account')}
      </ToggleMode>
    </AuthContainer>
  );
}

export default AuthPage; 