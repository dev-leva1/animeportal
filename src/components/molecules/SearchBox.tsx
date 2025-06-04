import { useState } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

const SearchContainer = styled.div`
  position: relative;
  margin: 0 1rem;
  flex: 1;
  max-width: 300px;
  
  @media (max-width: 768px) {
    max-width: none;
    margin: 0 0.5rem;
  }
`;

const SearchInput = styled.input`
  padding: 0.5rem 1rem;
  border-radius: 20px;
  border: 1px solid ${props => props.theme.border.primary};
  background-color: ${props => props.theme.background.secondary};
  color: ${props => props.theme.text.primary};
  width: 100%;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #ff5f5f;
  }
  
  @media (max-width: 480px) {
    padding: 0.4rem 0.8rem;
    font-size: 0.9rem;
  }
`;

interface SearchBoxProps {
  placeholder: string;
  className?: string;
}

export const SearchBox: React.FC<SearchBoxProps> = ({ placeholder, 
  className 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/anime?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className={className}>
      <SearchContainer>
        <SearchInput 
          type="text" 
          placeholder={placeholder} 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </SearchContainer>
    </form>
  );
};

export default SearchBox; 