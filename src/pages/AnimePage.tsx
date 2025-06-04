import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { useApp } from '../context/ThemeContext';
import { animeService, AnimeSearchParams } from '../services/animeService';
import { Anime } from '../types/anime';
import { AnimeCard, Pagination, LoadingFallback, ErrorMessage } from '../components';

const PageTitle = styled.h1`
  color: ${props => props.theme.text.primary};
  margin-bottom: 1.5rem;
  font-size: 2rem;
`;

const FiltersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1rem;
  background-color: ${props => props.theme.background.secondary};
  border-radius: 8px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const AdvancedFiltersContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid ${props => props.theme.border.primary};
  width: 100%;
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const FilterLabel = styled.label`
  font-size: 0.9rem;
  color: ${props => props.theme.text.muted};
`;

const ToggleButton = styled.button`
  background-color: transparent;
  color: ${props => props.theme.text.primary};
  border: 1px solid ${props => props.theme.border.primary};
  border-radius: 4px;
  padding: 0.5rem;
  cursor: pointer;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background-color: ${props => props.theme.background.secondary};
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
  color: ${props => props.theme.text.secondary};
  cursor: pointer;
`;

const SearchInput = styled.input`
  padding: 0.75rem 1rem;
  border-radius: 4px;
  border: 1px solid ${props => props.theme.border.primary};
  background-color: ${props => props.theme.background.secondary};
  color: ${props => props.theme.text.primary};
  flex: 1;
  min-width: 200px;
  
  &:focus {
    outline: none;
    border-color: #ff5f5f;
  }
`;

const SelectFilter = styled.select`
  padding: 0.75rem 1rem;
  border-radius: 4px;
  border: 1px solid ${props => props.theme.border.primary};
  background-color: ${props => props.theme.background.secondary};
  color: ${props => props.theme.text.primary};
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: #ff5f5f;
  }
`;

const FilterButton = styled.button`
  background-color: #ff5f5f;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #ff4040;
  }
`;

const AnimeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 1rem;
  }
`;

const NoResults = styled.div`
  text-align: center;
  padding: 3rem;
  color: ${props => props.theme.text.muted};
  font-size: 1.2rem;
`;

const genres = [
  { id: 1, name: 'genre.action' },
  { id: 2, name: 'genre.adventure' },
  { id: 4, name: 'genre.comedy' },
  { id: 8, name: 'genre.drama' },
  { id: 10, name: 'genre.fantasy' },
  { id: 7, name: 'genre.mystery' },
  { id: 22, name: 'genre.romance' },
  { id: 24, name: 'genre.sci_fi' },
  { id: 36, name: 'genre.slice_of_life' },
  { id: 30, name: 'genre.sports' }
];

const animeTypes = [
  { value: 'tv', label: 'TV' },
  { value: 'movie', label: 'Movie' },
  { value: 'ova', label: 'OVA' },
  { value: 'special', label: 'Special' },
  { value: 'ona', label: 'ONA' },
  { value: 'music', label: 'Music' }
];

const animeStatus = [
  { value: 'airing', label: 'status.airing' },
  { value: 'complete', label: 'status.complete' },
  { value: 'upcoming', label: 'status.upcoming' }
];

const animeRatings = [
  { value: 'g', label: 'rating.g' },
  { value: 'pg', label: 'rating.pg' },
  { value: 'pg13', label: 'rating.pg13' },
  { value: 'r17', label: 'rating.r17' },
  { value: 'r', label: 'rating.r' }
];

const animeSeasons = [
  { value: 'winter', label: 'season.winter' },
  { value: 'spring', label: 'season.spring' },
  { value: 'summer', label: 'season.summer' },
  { value: 'fall', label: 'season.fall' }
];

const sortOptions = [
  { value: 'title', label: 'sort.title' },
  { value: 'score', label: 'sort.score' },
  { value: 'popularity', label: 'sort.popularity' },
  { value: 'rank', label: 'sort.rank' },
  { value: 'start_date', label: 'sort.start_date' }
];

function AnimePage() {
  const { t } = useApp();
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const initialSearchQuery = queryParams.get('search') || '';
  
  const [animeList, setAnimeList] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchInput, setSearchInput] = useState(initialSearchQuery);
  
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedSeason, setSelectedSeason] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [selectedRating, setSelectedRating] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [minScore, setMinScore] = useState<number | null>(null);
  const [maxScore, setMaxScore] = useState<number | null>(null);
  const [orderBy, setOrderBy] = useState<string>('score');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  
  // Parse URL params on initial load
  useEffect(() => {
    const genresParam = queryParams.get('genres');
    if (genresParam) {
      setSelectedGenres(genresParam.split(',').map(Number));
    }
    
    const yearParam = queryParams.get('year');
    if (yearParam) {
      setSelectedYear(Number(yearParam));
    }
    
    const seasonParam = queryParams.get('season');
    if (seasonParam) {
      setSelectedSeason(seasonParam);
    }
    
    const statusParam = queryParams.get('status');
    if (statusParam) {
      setSelectedStatus(statusParam);
    }
    
    const ratingParam = queryParams.get('rating');
    if (ratingParam) {
      setSelectedRating(ratingParam);
    }
    
    const typeParam = queryParams.get('type');
    if (typeParam) {
      setSelectedType(typeParam);
    }
    
    const minScoreParam = queryParams.get('min_score');
    if (minScoreParam) {
      setMinScore(Number(minScoreParam));
    }
    
    const maxScoreParam = queryParams.get('max_score');
    if (maxScoreParam) {
      setMaxScore(Number(maxScoreParam));
    }
    
    const orderByParam = queryParams.get('order_by');
    if (orderByParam) {
      setOrderBy(orderByParam);
    }
    
    const sortParam = queryParams.get('sort');
    if (sortParam && (sortParam === 'asc' || sortParam === 'desc')) {
      setSortOrder(sortParam);
    }
    
    const pageParam = queryParams.get('page');
    if (pageParam) {
      setCurrentPage(Number(pageParam));
    }
  }, []);
  
  useEffect(() => {
    const fetchAnime = async () => {
      try {
        setLoading(true);
        
        const searchParams: AnimeSearchParams = {
          page: currentPage,
          limit: 20,
          orderBy: orderBy,
          sort: sortOrder
        };
        
        if (searchInput) {
          searchParams.query = searchInput;
        }
        
        if (selectedGenres.length > 0) {
          searchParams.genres = selectedGenres;
        }
        
        if (selectedYear) {
          searchParams.year = selectedYear;
        }
        
        if (selectedSeason) {
          searchParams.season = selectedSeason;
        }
        
        if (selectedStatus) {
          searchParams.status = selectedStatus;
        }
        
        if (selectedRating) {
          searchParams.rating = selectedRating;
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
        
        const response = await animeService.searchAnime(searchParams);
        
        setAnimeList(response.data);
        setTotalPages(response.pagination.last_visible_page);
        setError(null);
      } catch (err: any) {
        if (err.response && err.response.status === 429) {
          setError('Превышен лимит запросов к API. Пожалуйста, подождите несколько секунд и попробуйте снова.');
        } else {
          setError('Не удалось загрузить список аниме. Пожалуйста, попробуйте позже.');
        }
        console.error('Error fetching anime:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAnime();
  }, [currentPage, searchInput, selectedGenres, selectedYear, selectedSeason, selectedStatus, selectedRating, selectedType, minScore, maxScore, orderBy, sortOrder]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateUrlParams();
    setCurrentPage(1);
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
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Update URL with new page
    const newParams = new URLSearchParams(location.search);
    newParams.set('page', page.toString());
    navigate(`${location.pathname}?${newParams.toString()}`);
  };
  
  const updateUrlParams = () => {
    const params = new URLSearchParams();
    
    if (searchInput) {
      params.set('search', searchInput);
    }
    
    if (selectedGenres.length > 0) {
      params.set('genres', selectedGenres.join(','));
    }
    
    if (selectedYear) {
      params.set('year', selectedYear.toString());
    }
    
    if (selectedSeason) {
      params.set('season', selectedSeason);
    }
    
    if (selectedStatus) {
      params.set('status', selectedStatus);
    }
    
    if (selectedRating) {
      params.set('rating', selectedRating);
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
    
    navigate(`${location.pathname}?${params.toString()}`);
  };
  
  const handleRetry = () => {
    setError(null);
    setLoading(true);
    
    setTimeout(() => {
      const searchParams: AnimeSearchParams = {
        page: currentPage,
        limit: 20,
        orderBy: orderBy,
        sort: sortOrder
      };
      
      if (searchInput) {
        searchParams.query = searchInput;
      }
      
      if (selectedGenres.length > 0) {
        searchParams.genres = selectedGenres;
      }
      
      if (selectedYear) {
        searchParams.year = selectedYear;
      }
      
      if (selectedSeason) {
        searchParams.season = selectedSeason;
      }
      
      if (selectedStatus) {
        searchParams.status = selectedStatus;
      }
      
      if (selectedRating) {
        searchParams.rating = selectedRating;
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
      
      animeService.searchAnime(searchParams)
        .then(response => {
          setAnimeList(response.data);
          setTotalPages(response.pagination.last_visible_page);
        })
        .catch(err => {
          if (err.response && err.response.status === 429) {
            setError('Превышен лимит запросов к API. Пожалуйста, подождите несколько секунд и попробуйте снова.');
          } else {
            setError('Не удалось загрузить список аниме. Пожалуйста, попробуйте позже.');
          }
          console.error('Error retrying anime fetch:', err);
        })
        .finally(() => {
          setLoading(false);
        });
    }, 2000);
  };
  
  const getPageTitle = () => {
    if (searchInput) {
      return `${t('anime.search_results')}: ${searchInput}`;
    } else if (selectedGenres.length > 0) {
      return `${t('anime.genre')}: ${selectedGenres.map(id => {
        const genre = genres.find(g => g.id === id);
        return genre ? t(genre.name) : '';
      }).filter(Boolean).join(', ')}`;
    } else {
      return t('anime.catalog');
    }
  };
  
  const resetFilters = () => {
    setSearchInput('');
    setSelectedGenres([]);
    setSelectedYear(null);
    setSelectedSeason('');
    setSelectedStatus('');
    setSelectedRating('');
    setSelectedType('');
    setMinScore(null);
    setMaxScore(null);
    setOrderBy('score');
    setSortOrder('desc');
    setCurrentPage(1);
    navigate(location.pathname);
  };
  
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, i) => currentYear - i);
  
  return (
    <div>
      <PageTitle>{getPageTitle()}</PageTitle>
      
      <FiltersContainer>
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '1rem', width: '100%' }}>
          <SearchInput 
            type="text" 
            placeholder={t('header.search')} 
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <FilterButton type="submit">{t('anime.search')}</FilterButton>
          <ToggleButton 
            type="button" 
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
          >
            {showAdvancedFilters ? t('anime.hide_filters') : t('anime.show_filters')}
          </ToggleButton>
          <FilterButton type="button" onClick={resetFilters}>{t('anime.reset_filters')}</FilterButton>
        </form>
        
        {showAdvancedFilters && (
          <AdvancedFiltersContainer>
            <FilterGroup>
              <FilterLabel>{t('anime.genres')}</FilterLabel>
              <CheckboxGroup>
                {genres.map(genre => (
                  <CheckboxLabel key={genre.id}>
                    <input 
                      type="checkbox" 
                      checked={selectedGenres.includes(genre.id)}
                      onChange={() => handleGenreToggle(genre.id)}
                    />
                    {t(genre.name)}
                  </CheckboxLabel>
                ))}
              </CheckboxGroup>
            </FilterGroup>
            
            <FilterGroup>
              <FilterLabel>{t('anime.year')}</FilterLabel>
              <SelectFilter 
                value={selectedYear || ''}
                onChange={(e) => setSelectedYear(e.target.value ? Number(e.target.value) : null)}
              >
                <option value="">{t('anime.all_years')}</option>
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </SelectFilter>
            </FilterGroup>
            
            <FilterGroup>
              <FilterLabel>{t('anime.season')}</FilterLabel>
              <SelectFilter 
                value={selectedSeason}
                onChange={(e) => setSelectedSeason(e.target.value)}
              >
                <option value="">{t('anime.all_seasons')}</option>
                {animeSeasons.map(season => (
                  <option key={season.value} value={season.value}>
                    {t(season.label)}
                  </option>
                ))}
              </SelectFilter>
            </FilterGroup>
            
            <FilterGroup>
              <FilterLabel>{t('anime.status')}</FilterLabel>
              <SelectFilter 
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="">{t('anime.all_statuses')}</option>
                {animeStatus.map(status => (
                  <option key={status.value} value={status.value}>
                    {t(status.label)}
                  </option>
                ))}
              </SelectFilter>
            </FilterGroup>
            
            <FilterGroup>
              <FilterLabel>{t('anime.type')}</FilterLabel>
              <SelectFilter 
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                <option value="">{t('anime.all_types')}</option>
                {animeTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </SelectFilter>
            </FilterGroup>
            
            <FilterGroup>
              <FilterLabel>{t('anime.rating')}</FilterLabel>
              <SelectFilter 
                value={selectedRating}
                onChange={(e) => setSelectedRating(e.target.value)}
              >
                <option value="">{t('anime.all_ratings')}</option>
                {animeRatings.map(rating => (
                  <option key={rating.value} value={rating.value}>
                    {t(rating.label)}
                  </option>
                ))}
              </SelectFilter>
            </FilterGroup>
            
            <FilterGroup>
              <FilterLabel>{t('anime.min_score')}</FilterLabel>
              <SelectFilter 
                value={minScore || ''}
                onChange={(e) => setMinScore(e.target.value ? Number(e.target.value) : null)}
              >
                <option value="">{t('anime.any_score')}</option>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(score => (
                  <option key={score} value={score}>{score}</option>
                ))}
              </SelectFilter>
            </FilterGroup>
            
            <FilterGroup>
              <FilterLabel>{t('anime.max_score')}</FilterLabel>
              <SelectFilter 
                value={maxScore || ''}
                onChange={(e) => setMaxScore(e.target.value ? Number(e.target.value) : null)}
              >
                <option value="">{t('anime.any_score')}</option>
                {[2, 3, 4, 5, 6, 7, 8, 9, 10].map(score => (
                  <option key={score} value={score}>{score}</option>
                ))}
              </SelectFilter>
            </FilterGroup>
            
            <FilterGroup>
              <FilterLabel>{t('anime.sort_by')}</FilterLabel>
              <SelectFilter 
                value={orderBy}
                onChange={(e) => setOrderBy(e.target.value)}
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {t(option.label)}
                  </option>
                ))}
              </SelectFilter>
            </FilterGroup>
            
            <FilterGroup>
              <FilterLabel>{t('anime.sort_order')}</FilterLabel>
              <SelectFilter 
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
              >
                <option value="desc">{t('anime.descending')}</option>
                <option value="asc">{t('anime.ascending')}</option>
              </SelectFilter>
            </FilterGroup>
          </AdvancedFiltersContainer>
        )}
      </FiltersContainer>
      
              {loading ? (
          <LoadingFallback />
      ) : error ? (
        <ErrorMessage message={error} onRetry={handleRetry} />
      ) : animeList.length === 0 ? (
        <NoResults>
          {t('anime.no_results')}
        </NoResults>
      ) : (
        <>
          <AnimeGrid>
            {animeList.map(anime => (
              <AnimeCard key={anime.id} anime={anime} />
            ))}
          </AnimeGrid>
          
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
}

export default AnimePage;