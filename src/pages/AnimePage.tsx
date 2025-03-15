import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled from '@emotion/styled';
import { useApp } from '../context/ThemeContext';
import { animeService } from '../services/animeService';
import { Anime } from '../types/anime';
import AnimeCard from '../components/AnimeCard';
import Pagination from '../components/Pagination';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';

const PageTitle = styled.h1`
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#121212'};
  margin-bottom: 1.5rem;
  font-size: 2rem;
`;

const FiltersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1rem;
  background-color: ${props => props.theme === 'dark' ? '#1e1e1e' : '#f5f5f5'};
  border-radius: 8px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const SearchInput = styled.input`
  padding: 0.75rem 1rem;
  border-radius: 4px;
  border: 1px solid ${props => props.theme === 'dark' ? '#444' : '#ddd'};
  background-color: ${props => props.theme === 'dark' ? '#333' : '#ffffff'};
  color: ${props => props.theme === 'dark' ? '#fff' : '#333'};
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
  border: 1px solid ${props => props.theme === 'dark' ? '#444' : '#ddd'};
  background-color: ${props => props.theme === 'dark' ? '#333' : '#ffffff'};
  color: ${props => props.theme === 'dark' ? '#fff' : '#333'};
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
  color: ${props => props.theme === 'dark' ? '#aaa' : '#666'};
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

function AnimePage() {
  const { theme, t } = useApp();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialSearchQuery = queryParams.get('search') || '';
  
  const [animeList, setAnimeList] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [searchInput, setSearchInput] = useState(initialSearchQuery);
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  
  useEffect(() => {
    const fetchAnime = async () => {
      try {
        setLoading(true);
        let response;
        
        if (searchQuery) {
          response = await animeService.searchAnime(searchQuery, currentPage);
        } else if (selectedGenre) {
          response = await animeService.getAnimeByGenre(selectedGenre, currentPage);
        } else {
          response = await animeService.getAnimeList(currentPage);
        }
        
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
  }, [currentPage, searchQuery, selectedGenre]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(searchInput);
    setSelectedGenre(null);
    setCurrentPage(1);
  };
  
  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const genreId = parseInt(e.target.value);
    setSelectedGenre(genreId || null);
    setSearchQuery('');
    setSearchInput('');
    setCurrentPage(1);
  };
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleRetry = () => {
    setError(null);
    setLoading(true);
    
    setTimeout(() => {
      let fetchPromise;
      if (searchQuery) {
        fetchPromise = animeService.searchAnime(searchQuery, currentPage);
      } else if (selectedGenre) {
        fetchPromise = animeService.getAnimeByGenre(selectedGenre, currentPage);
      } else {
        fetchPromise = animeService.getAnimeList(currentPage);
      }
      
      fetchPromise
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
    if (searchQuery) {
      return `${t('anime.search_results')}: ${searchQuery}`;
    } else if (selectedGenre) {
      const genre = genres.find(g => g.id === selectedGenre);
      return `${t('anime.genre')}: ${genre ? t(genre.name) : ''}`;
    } else {
      return t('anime.catalog');
    }
  };
  
  return (
    <div>
      <PageTitle theme={theme}>{getPageTitle()}</PageTitle>
      
      <FiltersContainer theme={theme}>
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '1rem', flex: 1 }}>
          <SearchInput 
            type="text" 
            placeholder={t('header.search')} 
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            theme={theme}
          />
          <FilterButton type="submit">{t('anime.search')}</FilterButton>
        </form>
        
        <SelectFilter 
          value={selectedGenre || ''}
          onChange={handleGenreChange}
          theme={theme}
        >
          <option value="">{t('anime.all_genres')}</option>
          {genres.map(genre => (
            <option key={genre.id} value={genre.id}>
              {t(genre.name)}
            </option>
          ))}
        </SelectFilter>
      </FiltersContainer>
      
      {loading ? (
        <Loading />
      ) : error ? (
        <ErrorMessage message={error} onRetry={handleRetry} />
      ) : animeList.length === 0 ? (
        <NoResults theme={theme}>
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