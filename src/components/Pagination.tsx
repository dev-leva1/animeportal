import styled from '@emotion/styled';
import { useTheme } from '../context/ThemeContext';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem 0;
  flex-wrap: wrap;
`;

const PageButton = styled.button<{ active?: boolean; theme: string }>`
  background-color: ${props => props.active 
    ? '#ff5f5f' 
    : props.theme === 'dark' ? '#2a2a2a' : '#f0f0f0'};
  color: ${props => props.active 
    ? '#ffffff' 
    : props.theme === 'dark' ? '#ffffff' : '#333333'};
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  margin: 0 0.25rem;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
  
  &:hover {
    background-color: ${props => props.active 
      ? '#ff5f5f' 
      : props.theme === 'dark' ? '#3a3a3a' : '#e0e0e0'};
    transform: translateY(-2px);
  }
  
  &:disabled {
    background-color: ${props => props.theme === 'dark' ? '#222222' : '#e0e0e0'};
    color: ${props => props.theme === 'dark' ? '#555555' : '#999999'};
    cursor: not-allowed;
    transform: none;
  }
`;

const PageEllipsis = styled.span`
  padding: 0.5rem 0.75rem;
  color: ${props => props.theme === 'dark' ? '#aaaaaa' : '#666666'};
`;

function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const { theme } = useTheme();
  
  const getPageNumbers = () => {
    const pageNumbers = [];
    
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(1);
      
      if (currentPage > 3) {
        pageNumbers.push('ellipsis1');
      }
      
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);
      
      if (currentPage <= 3) {
        endPage = 4;
      }
      
      if (currentPage >= totalPages - 2) {
        startPage = totalPages - 3;
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
      
      if (currentPage < totalPages - 2) {
        pageNumbers.push('ellipsis2');
      }
      
      pageNumbers.push(totalPages);
    }
    
    return pageNumbers;
  };
  
  return (
    <PaginationContainer>
      <PageButton 
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        theme={theme}
      >
        &laquo;
      </PageButton>
      
      {getPageNumbers().map((page, index) => {
        if (page === 'ellipsis1' || page === 'ellipsis2') {
          return <PageEllipsis key={`ellipsis-${index}`} theme={theme}>...</PageEllipsis>;
        }
        
        return (
          <PageButton
            key={`page-${page}`}
            active={page === currentPage}
            onClick={() => onPageChange(page as number)}
            theme={theme}
          >
            {page}
          </PageButton>
        );
      })}
      
      <PageButton 
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        theme={theme}
      >
        &raquo;
      </PageButton>
    </PaginationContainer>
  );
}

export default Pagination; 