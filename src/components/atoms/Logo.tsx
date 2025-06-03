import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

const LogoContainer = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
  color: #ff5f5f;
  margin-right: 2rem;
  
  a {
    text-decoration: none;
    color: inherit;
  }
`;

interface LogoProps {
  text: string;
  to?: string;
}

export const Logo: React.FC<LogoProps> = ({ text, to = "/" }) => {
  return (
    <LogoContainer>
      <Link to={to}>{text}</Link>
    </LogoContainer>
  );
};

export default Logo; 