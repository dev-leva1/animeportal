import { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { useApp } from '../context/ThemeContext';
import { mangaService, MangaSearchParams } from '../services/mangaService';
import { Manga } from '../types/anime';
import { LoadingFallback, ErrorMessage } from '../components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

const Title = styled.h1`
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#121212'};
  margin: 0;
`;

const SearchForm = styled.form`
  display: flex;
  gap: 0.5rem;
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const SearchInput = styled.input`
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: 1px solid ${props => props.theme === 'dark' ? '#444' : '#ddd'};
  background-color: ${props => props.theme === 'dark' ? '#333' : '#f5f5f5'};
  color: ${props => props.theme === 'dark' ? '#fff' : '#333'};
  width: 250px;
  
  @media (max-width: 768px) {
    flex: 1;
  }
`;

const SearchButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: none;
  background-color: #ff5f5f;
  color: white;
  cursor: pointer;
  font-weight: 500;
  
  &:hover {
    background-color: #ff4545;
  }
`;


const GenreSelect = styled.select`
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: 1px solid ${props => props.theme === 'dark' ? '#444' : '#ddd'};
  background-color: ${props => props.theme === 'dark' ? '#333' : '#f5f5f5'};
  color: ${props => props.theme === 'dark' ? '#fff' : '#333'};
  width: 100%;
  max-width: 300px;
`;

const MangaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 1rem;
  }
`;

const MangaCard = styled(Link)`
  display: flex;
  flex-direction: column;
  text-decoration: none;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  background-color: ${props => props.theme === 'dark' ? '#2a2a2a' : '#ffffff'};
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const MangaImage = styled.img`
  width: 100%;
  aspect-ratio: 2/3;
  object-fit: cover;
`;

const MangaInfo = styled.div`
  padding: 1rem;
`;

const MangaTitle = styled.h3`
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#121212'};
  margin: 0 0 0.5rem;
  font-size: 1rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const MangaDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  color: ${props => props.theme === 'dark' ? '#aaa' : '#666'};
`;

const MangaScore = styled.div`
  display: flex;
  align-items: center;
  
  &::before {
    content: '★';
    color: #ffc107;
    margin-right: 0.25rem;
  }
`;

const MangaChapters = styled.div``;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 2rem;
`;

const PageButton = styled.button<{ isActive?: boolean }>`
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: 1px solid ${props => props.isActive ? '#ff5f5f' : props.theme === 'dark' ? '#444' : '#ddd'};
  background-color: ${props => props.isActive ? '#ff5f5f' : 'transparent'};
  color: ${props => props.isActive ? 'white' : props.theme === 'dark' ? '#fff' : '#333'};
  cursor: pointer;
  
  &:hover {
    background-color: ${props => props.isActive ? '#ff4545' : props.theme === 'dark' ? '#333' : '#f5f5f5'};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const NoResults = styled.div`
  text-align: center;
  padding: 2rem;
  color: ${props => props.theme === 'dark' ? '#aaa' : '#666'};
`;

const genres = [
  { id: 0, name: 'all_genres' },
  { id: 1, name: 'action' },
  { id: 2, name: 'adventure' },
  { id: 4, name: 'comedy' },
  { id: 8, name: 'drama' },
  { id: 10, name: 'fantasy' },
  { id: 7, name: 'mystery' },
  { id: 22, name: 'romance' },
  { id: 24, name: 'sci_fi' },
  { id: 36, name: 'slice_of_life' },
  { id: 30, name: 'sports' }
];

const mangaTypes = [
  { value: 'manga', label: 'type.manga' },
  { value: 'novel', label: 'type.novel' },
  { value: 'lightnovel', label: 'type.lightnovel' },
  { value: 'oneshot', label: 'type.oneshot' },
  { value: 'doujin', label: 'type.doujin' },
  { value: 'manhwa', label: 'type.manhwa' },
  { value: 'manhua', label: 'type.manhua' }
];

const mangaStatus = [
  { value: 'publishing', label: 'status.publishing' },
  { value: 'complete', label: 'status.complete' },
  { value: 'hiatus', label: 'status.hiatus' },
  { value: 'discontinued', label: 'status.discontinued' },
  { value: 'upcoming', label: 'status.upcoming' }
];

const sortOptions = [
  { value: 'title', label: 'sort.title' },
  { value: 'score', label: 'sort.score' },
  { value: 'popularity', label: 'sort.popularity' },
  { value: 'rank', label: 'sort.rank' },
  { value: 'start_date', label: 'sort.start_date' }
];

const AdvancedFiltersContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid ${props => props.theme === 'dark' ? '#444' : '#ddd'};
  width: 100%;
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const FilterLabel = styled.label`
  font-size: 0.9rem;
  color: ${props => props.theme === 'dark' ? '#aaa' : '#666'};
`;

const ToggleButton = styled.button`
  background-color: transparent;
  color: ${props => props.theme === 'dark' ? '#fff' : '#333'};
  border: 1px solid ${props => props.theme === 'dark' ? '#444' : '#ddd'};
  border-radius: 4px;
  padding: 0.5rem;
  cursor: pointer;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background-color: ${props => props.theme === 'dark' ? '#333' : '#f0f0f0'};
  }
`;

const CheckboxGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.9rem;
  color: ${props => props.theme === 'dark' ? '#ddd' : '#333'};
  cursor: pointer;
`;

function MangaPage() {
  const { theme, t } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [manga, setManga] = useState<Manga[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [minScore, setMinScore] = useState<number | null>(null);
  const [maxScore, setMaxScore] = useState<number | null>(null);
  const [orderBy, setOrderBy] = useState<string>('score');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  
  // Parse URL params
  const query = searchParams.get('search') || '';
  const page = parseInt(searchParams.get('page') || '1');
  
  // Parse advanced filters from URL
  useEffect(() => {
    setSearchQuery(query);
    setCurrentPage(page);
    
    const genresParam = searchParams.get('genres');
    if (genresParam) {
      setSelectedGenres(genresParam.split(',').map(Number).filter(id => id > 0));
    } else {
      setSelectedGenres([]);
    }
    
    const yearParam = searchParams.get('year');
    if (yearParam) {
      setSelectedYear(Number(yearParam));
    } else {
      setSelectedYear(null);
    }
    
    const statusParam = searchParams.get('status');
    if (statusParam) {
      setSelectedStatus(statusParam);
    } else {
      setSelectedStatus('');
    }
    
    const typeParam = searchParams.get('type');
    if (typeParam) {
      setSelectedType(typeParam);
    } else {
      setSelectedType('');
    }
    
    const minScoreParam = searchParams.get('min_score');
    if (minScoreParam) {
      setMinScore(Number(minScoreParam));
    } else {
      setMinScore(null);
    }
    
    const maxScoreParam = searchParams.get('max_score');
    if (maxScoreParam) {
      setMaxScore(Number(maxScoreParam));
    } else {
      setMaxScore(null);
    }
    
    const orderByParam = searchParams.get('order_by');
    if (orderByParam) {
      setOrderBy(orderByParam);
    } else {
      setOrderBy('score');
    }
    
    const sortParam = searchParams.get('sort');
    if (sortParam && (sortParam === 'asc' || sortParam === 'desc')) {
      setSortOrder(sortParam);
    } else {
      setSortOrder('desc');
    }
    
    // If any advanced filter is set, show the advanced filters section
    if (genresParam || yearParam || statusParam || typeParam || minScoreParam || maxScoreParam || orderByParam || sortParam) {
      setShowAdvancedFilters(true);
    }
  }, [searchParams]);
  
  useEffect(() => {
    const fetchManga = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const searchParams: MangaSearchParams = {
          page: currentPage,
          limit: 20,
          orderBy: orderBy,
          sort: sortOrder
        };
        
        if (query) {
          searchParams.query = query;
          document.title = `${t('manga.search_results')} - ${t('site.name')}`;
        } else {
          document.title = `${t('manga.catalog')} - ${t('site.name')}`;
        }
        
        if (selectedGenres.length > 0) {
          searchParams.genres = selectedGenres;
          const genreNames = selectedGenres.map(id => {
            const genre = genres.find(g => g.id === id);
            return genre ? t(`genre.${genre.name}`) : '';
          }).filter(Boolean).join(', ');
          
          if (genreNames) {
            document.title = `${genreNames} ${t('manga.genre')} - ${t('site.name')}`;
          }
        }
        
        if (selectedYear) {
          searchParams.year = selectedYear;
        }
        
        if (selectedStatus) {
          searchParams.status = selectedStatus;
        }
        
        if (selectedType) {
          searchParams.type = selectedType;
        }
        
        if (minScore) {
          searchParams.minScore = minScore;
        }
        
        if (maxScore) {
          searchParams.maxScore = maxScore;
        }
        
        const response = await mangaService.searchManga(searchParams);
        
        setManga(response.data);
        setTotalPages(response.pagination.last_visible_page);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchManga();
  }, [query, selectedGenres, selectedYear, selectedStatus, selectedType, minScore, maxScore, orderBy, sortOrder, currentPage, t]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateUrlParams();
  };
  
  const handleGenreToggle = (genreId: number) => {
    setSelectedGenres(prev => {
      if (prev.includes(genreId)) {
        return prev.filter(id => id !== genreId);
      } else {
        return [...prev, genreId];
      }
    });
  };
  
  const handlePageChange = (page: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', page.toString());
    setSearchParams(newParams);
  };
  
  const updateUrlParams = () => {
    const params = new URLSearchParams();
    
    if (searchQuery.trim()) {
      params.set('search', searchQuery);
    }
    
    if (selectedGenres.length > 0) {
      params.set('genres', selectedGenres.join(','));
    }
    
    if (selectedYear) {
      params.set('year', selectedYear.toString());
    }
    
    if (selectedStatus) {
      params.set('status', selectedStatus);
    }
    
    if (selectedType) {
      params.set('type', selectedType);
    }
    
    if (minScore) {
      params.set('min_score', minScore.toString());
    }
    
    if (maxScore) {
      params.set('max_score', maxScore.toString());
    }
    
    if (orderBy !== 'score') {
      params.set('order_by', orderBy);
    }
    
    if (sortOrder !== 'desc') {
      params.set('sort', sortOrder);
    }
    
    params.set('page', '1');
    
    setSearchParams(params);
  };
  
  const handleRetry = () => {
    // Refresh the current page
    const newParams = new URLSearchParams(searchParams);
    setSearchParams(newParams);
  };
  
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedGenres([]);
    setSelectedYear(null);
    setSelectedStatus('');
    setSelectedType('');
    setMinScore(null);
    setMaxScore(null);
    setOrderBy('score');
    setSortOrder('desc');
    navigate('/manga');
  };
  
  const getPageTitle = () => {
    if (query) {
      return t('manga.search_results');
    } else if (selectedGenres.length > 0) {
      const genreNames = selectedGenres.map(id => {
        const genre = genres.find(g => g.id === id);
        return genre ? t(`genre.${genre.name}`) : '';
      }).filter(Boolean).join(', ');
      
      return `${genreNames} ${t('manga.genre')}`;
    } else {
      return t('manga.catalog');
    }
  };
  
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, i) => currentYear - i);
  
  return (
    <Container>
      <Header>
        <Title theme={theme}>{getPageTitle()}</Title>
        
        <SearchForm onSubmit={handleSearch}>
          <SearchInput
            type="text"
            placeholder={t('manga.search')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            theme={theme}
          />
          <SearchButton type="submit">{t('manga.search')}</SearchButton>
          <ToggleButton 
            type="button" 
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            theme={theme}
          >
            {showAdvancedFilters ? t('manga.hide_filters') : t('manga.show_filters')}
          </ToggleButton>
          <SearchButton type="button" onClick={resetFilters}>{t('manga.reset_filters')}</SearchButton>
        </SearchForm>
      </Header>
      
      {showAdvancedFilters && (
        <AdvancedFiltersContainer theme={theme}>
          <FilterGroup>
            <FilterLabel theme={theme}>{t('manga.genres')}</FilterLabel>
            <CheckboxGroup>
              {genres.filter(genre => genre.id > 0).map(genre => (
                <CheckboxLabel key={genre.id} theme={theme}>
                  <input 
                    type="checkbox" 
                    checked={selectedGenres.includes(genre.id)}
                    onChange={() => handleGenreToggle(genre.id)}
                  />
                  {t(`genre.${genre.name}`)}
                </CheckboxLabel>
              ))}
            </CheckboxGroup>
          </FilterGroup>
          
          <FilterGroup>
            <FilterLabel theme={theme}>{t('manga.year')}</FilterLabel>
            <GenreSelect 
              value={selectedYear || ''}
              onChange={(e) => setSelectedYear(e.target.value ? Number(e.target.value) : null)}
              theme={theme}
            >
              <option value="">{t('manga.all_years')}</option>
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </GenreSelect>
          </FilterGroup>
          
          <FilterGroup>
            <FilterLabel theme={theme}>{t('manga.status')}</FilterLabel>
            <GenreSelect 
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              theme={theme}
            >
              <option value="">{t('manga.all_statuses')}</option>
              {mangaStatus.map(status => (
                <option key={status.value} value={status.value}>
                  {t(status.label)}
                </option>
              ))}
            </GenreSelect>
          </FilterGroup>
          
          <FilterGroup>
            <FilterLabel theme={theme}>{t('manga.type')}</FilterLabel>
            <GenreSelect 
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              theme={theme}
            >
              <option value="">{t('manga.all_types')}</option>
              {mangaTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {t(type.label)}
                </option>
              ))}
            </GenreSelect>
          </FilterGroup>
          
          <FilterGroup>
            <FilterLabel theme={theme}>{t('manga.min_score')}</FilterLabel>
            <GenreSelect 
              value={minScore || ''}
              onChange={(e) => setMinScore(e.target.value ? Number(e.target.value) : null)}
              theme={theme}
            >
              <option value="">{t('manga.any_score')}</option>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(score => (
                <option key={score} value={score}>{score}</option>
              ))}
            </GenreSelect>
          </FilterGroup>
          
          <FilterGroup>
            <FilterLabel theme={theme}>{t('manga.max_score')}</FilterLabel>
            <GenreSelect 
              value={maxScore || ''}
              onChange={(e) => setMaxScore(e.target.value ? Number(e.target.value) : null)}
              theme={theme}
            >
              <option value="">{t('manga.any_score')}</option>
              {[2, 3, 4, 5, 6, 7, 8, 9, 10].map(score => (
                <option key={score} value={score}>{score}</option>
              ))}
            </GenreSelect>
          </FilterGroup>
          
          <FilterGroup>
            <FilterLabel theme={theme}>{t('manga.sort_by')}</FilterLabel>
            <GenreSelect 
              value={orderBy}
              onChange={(e) => setOrderBy(e.target.value)}
              theme={theme}
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {t(option.label)}
                </option>
              ))}
            </GenreSelect>
          </FilterGroup>
          
          <FilterGroup>
            <FilterLabel theme={theme}>{t('manga.sort_order')}</FilterLabel>
            <GenreSelect 
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
              theme={theme}
            >
              <option value="desc">{t('manga.descending')}</option>
              <option value="asc">{t('manga.ascending')}</option>
            </GenreSelect>
          </FilterGroup>
        </AdvancedFiltersContainer>
      )}
      
              {loading ? (
          <LoadingFallback />
      ) : error ? (
        <ErrorMessage message={error.message} onRetry={handleRetry} />
      ) : manga.length === 0 ? (
        <NoResults theme={theme}>{t('manga.no_results')}</NoResults>
      ) : (
        <>
          <MangaGrid>
            {manga.map(item => (
              <MangaCard key={item.id} to={`/manga/${item.id}`} theme={theme}>
                <MangaImage src={item.image_url} alt={item.title} />
                <MangaInfo>
                  <MangaTitle theme={theme}>{item.title}</MangaTitle>
                  <MangaDetails theme={theme}>
                    {item.score && <MangaScore>{item.score.toFixed(1)}</MangaScore>}
                    <MangaChapters>
                      {item.chapters > 0 ? `${item.chapters} ${t('manga.chapters')}` : ''}
                    </MangaChapters>
                  </MangaDetails>
                </MangaInfo>
              </MangaCard>
            ))}
          </MangaGrid>
          
          <Pagination>
            <PageButton
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              theme={theme}
            >
              &lt;
            </PageButton>
            
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pageNum = currentPage > 3 
                ? currentPage - 3 + i + (currentPage + 2 > totalPages ? totalPages - currentPage - 2 : 0)
                : i + 1;
              
              if (pageNum <= totalPages) {
                return (
                  <PageButton
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    isActive={pageNum === currentPage}
                    theme={theme}
                  >
                    {pageNum}
                  </PageButton>
                );
              }
              return null;
            })}
            
            <PageButton
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              theme={theme}
            >
              &gt;
            </PageButton>
          </Pagination>
        </>
      )}
    </Container>
  );
}

export default MangaPage; 