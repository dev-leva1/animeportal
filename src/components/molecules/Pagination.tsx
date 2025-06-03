import styled from '@emotion/styled';
import { memo, useMemo } from 'react';
import { Button } from '../atoms/Button';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem 0;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const PageEllipsis = styled.span`
  padding: 0.5rem 0.75rem;
  color: var(--color-text-secondary);
  font-weight: 500;
`;

export const Pagination = memo(({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const pageNumbers = useMemo(() => {
    const pages: (number | string)[] = [];
    
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      
      if (currentPage > 3) {
        pages.push('ellipsis1');
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
        pages.push(i);
      }
      
      if (currentPage < totalPages - 2) {
        pages.push('ellipsis2');
      }
      
      pages.push(totalPages);
    }
    
    return pages;
  }, [currentPage, totalPages]);
  
  return (
    <PaginationContainer>
      <Button 
        variant="ghost"
        size="small"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Предыдущая страница"
      >
        ‹
      </Button>
      
      {pageNumbers.map((page, index) => {
        if (page === 'ellipsis1' || page === 'ellipsis2') {
          return <PageEllipsis key={`ellipsis-${index}`}>...</PageEllipsis>;
        }
        
        return (
          <Button
            key={`page-${page}`}
            variant={page === currentPage ? 'primary' : 'ghost'}
            size="small"
            onClick={() => onPageChange(page as number)}
            aria-label={`Страница ${page}`}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {page}
          </Button>
        );
      })}
      
      <Button 
        variant="ghost"
        size="small"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Следующая страница"
      >
        ›
      </Button>
    </PaginationContainer>
  );
});

export default Pagination; 