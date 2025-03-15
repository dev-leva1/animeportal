import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { useApp } from '../context/ThemeContext';
import { mangaService } from '../services/mangaService';
import { Manga } from '../types/anime';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';

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

const GenreFilter = styled.div`
  margin-bottom: 2rem;
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

function MangaPage() {
  const { theme, t } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();
  const [manga, setManga] = useState<Manga[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState(0);
  
  const query = searchParams.get('search') || '';
  const genreId = parseInt(searchParams.get('genre') || '0');
  const page = parseInt(searchParams.get('page') || '1');
  
  useEffect(() => {
    setSearchQuery(query);
    setSelectedGenre(genreId);
    setCurrentPage(page);
  }, [query, genreId, page]);
  
  useEffect(() => {
    const fetchManga = async () => {
      setLoading(true);
      setError(null);
      
      try {
        let response;
        
        if (query) {
          response = await mangaService.searchManga(query, currentPage);
          document.title = `${t('manga.search_results')} - ${t('site.name')}`;
        } else if (genreId > 0) {
          response = await mangaService.getMangaByGenre(genreId, currentPage);
          const genreName = genres.find(g => g.id === genreId)?.name || '';
          document.title = `${t(`genre.${genreName}`)} ${t('manga.genre')} - ${t('site.name')}`;
        } else {
          response = await mangaService.getMangaList(currentPage);
          document.title = `${t('manga.catalog')} - ${t('site.name')}`;
        }
        
        setManga(response.data);
        setTotalPages(response.pagination.last_visible_page);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchManga();
  }, [query, genreId, currentPage, t]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchParams({ search: searchQuery, page: '1' });
    }
  };
  
  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const genreId = parseInt(e.target.value);
    if (genreId === 0) {
      setSearchParams({ page: '1' });
    } else {
      setSearchParams({ genre: e.target.value, page: '1' });
    }
  };
  
  const handlePageChange = (page: number) => {
    const params: Record<string, string> = { page: page.toString() };
    if (query) params.search = query;
    if (genreId > 0) params.genre = genreId.toString();
    setSearchParams(params);
  };
  
  const handleRetry = () => {
    const params: Record<string, string> = { page: currentPage.toString() };
    if (query) params.search = query;
    if (genreId > 0) params.genre = genreId.toString();
    setSearchParams(params);
  };
  
  return (
    <Container>
      <Header>
        <Title theme={theme}>
          {query
            ? t('manga.search_results')
            : genreId > 0
              ? `${t(`genre.${genres.find(g => g.id === genreId)?.name || ''}`)} ${t('manga.genre')}`
              : t('manga.catalog')}
        </Title>
        
        <SearchForm onSubmit={handleSearch}>
          <SearchInput
            type="text"
            placeholder={t('manga.search')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            theme={theme}
          />
          <SearchButton type="submit">{t('manga.search')}</SearchButton>
        </SearchForm>
      </Header>
      
      <GenreFilter>
        <GenreSelect
          value={selectedGenre}
          onChange={handleGenreChange}
          theme={theme}
        >
          {genres.map(genre => (
            <option key={genre.id} value={genre.id}>
              {t(`genre.${genre.name}`)}
            </option>
          ))}
        </GenreSelect>
      </GenreFilter>
      
      {loading ? (
        <Loading />
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