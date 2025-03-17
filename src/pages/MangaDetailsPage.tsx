import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { useApp } from '../context/ThemeContext';
import { mangaService } from '../services/mangaService';
import { favoritesService } from '../services/favoritesService';
import { Manga } from '../types/anime';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import { FaArrowLeft, FaHeart, FaRegHeart, FaBook, FaBookOpen, FaChartLine, FaCalendarAlt, FaLayerGroup, FaUser } from 'react-icons/fa';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#121212'};
  text-decoration: none;
  margin-bottom: 1rem;
  font-weight: 500;
  
  &:hover {
    color: #ff5f5f;
  }
`;

const MangaHeader = styled.div`
  display: flex;
  gap: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ImageContainer = styled.div`
  flex-shrink: 0;
  width: 300px;
  
  @media (max-width: 768px) {
    width: 100%;
    max-width: 300px;
    margin: 0 auto;
  }
`;

const MangaImage = styled.img`
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const MangaInfo = styled.div`
  flex: 1;
`;

const Title = styled.h1`
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#121212'};
  margin: 0 0 0.5rem;
  font-size: 2rem;
`;

const JapaneseTitle = styled.h2`
  color: ${props => props.theme === 'dark' ? '#aaa' : '#666'};
  margin: 0 0 1.5rem;
  font-size: 1.2rem;
  font-weight: normal;
`;

const InfoItem = styled.div`
  margin-bottom: 1rem;
`;

const InfoLabel = styled.span`
  color: ${props => props.theme === 'dark' ? '#aaa' : '#666'};
  margin-right: 0.5rem;
`;

const InfoValue = styled.span`
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#121212'};
  font-weight: 500;
`;

const Score = styled.div`
  display: inline-flex;
  align-items: center;
  background-color: ${props => props.theme === 'dark' ? '#2a2a2a' : '#f0f0f0'};
  padding: 0.5rem 1rem;
  border-radius: 20px;
  margin: 1rem 0;
  
  &::before {
    content: '★';
    color: #ffc107;
    margin-right: 0.5rem;
  }
`;

const GenresList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const GenreTag = styled.span`
  background-color: ${props => props.theme === 'dark' ? '#2a2a2a' : '#f0f0f0'};
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#121212'};
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.9rem;
`;

const FavoriteButton = styled.button<{ isFavorite: boolean; theme: string }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.isFavorite ? '#ff5f5f' : props.theme === 'dark' ? '#2a2a2a' : '#f0f0f0'};
  color: ${props => props.isFavorite ? 'white' : props.theme === 'dark' ? '#ffffff' : '#121212'};
  border: none;
  border-radius: 4px;
  padding: 0.75rem 1.5rem;
  font-weight: 500;
  cursor: pointer;
  margin-top: 1.5rem;
  transition: background-color 0.3s ease;
  gap: 0.5rem;
  
  &:hover {
    background-color: ${props => props.isFavorite ? '#ff4545' : props.theme === 'dark' ? '#333' : '#e0e0e0'};
  }
`;

const Section = styled.section`
  margin-top: 2rem;
`;

const SectionTitle = styled.h2`
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#121212'};
  margin: 0 0 1rem;
  font-size: 1.5rem;
  border-bottom: 1px solid ${props => props.theme === 'dark' ? '#333' : '#eee'};
  padding-bottom: 0.5rem;
`;

const Synopsis = styled.div`
  color: ${props => props.theme === 'dark' ? '#ddd' : '#333'};
  line-height: 1.6;
  white-space: pre-line;
`;

function MangaDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { theme, t } = useApp();
  const [manga, setManga] = useState<Manga | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  
  useEffect(() => {
    const fetchMangaDetails = async () => {
      if (!id) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const response = await mangaService.getMangaById(parseInt(id));
        setManga(response.data);
        document.title = `${response.data.title} - ${t('site.name')}`;
        
        // Check if manga is in favorites
        const favorites = favoritesService.getFavorites();
        setIsFavorite(favorites.some(fav => fav.id === parseInt(id)));
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchMangaDetails();
  }, [id, t]);
  
  const handleFavoriteToggle = () => {
    if (!manga) return;
    
    if (isFavorite) {
      favoritesService.removeFromFavorites(manga.id);
    } else {
      favoritesService.addToFavorites({
        mal_id: manga.id,
        id: manga.id,
        title: manga.title,
        title_japanese: manga.title_japanese,
        image_url: manga.image_url,
        images: {
          jpg: {
            image_url: manga.image_url,
            small_image_url: manga.image_url,
            large_image_url: manga.image_url
          },
          webp: {
            image_url: manga.image_url,
            small_image_url: manga.image_url,
            large_image_url: manga.image_url
          }
        },
        synopsis: manga.synopsis,
        episodes: 0,
        score: manga.score,
        aired: {
          from: manga.published?.from || '',
          to: manga.published?.to || null,
          string: `${manga.published?.from || ''} to ${manga.published?.to || 'now'}`
        },
        status: manga.status,
        genres: manga.genres.map(genre => ({
          mal_id: genre.id,
          name: genre.name,
          type: 'manga',
          url: ''
        })),
        studios: [],
        source: manga.type,
        rating: 'Unknown',
        duration: 'N/A',
        type: manga.type
      });
    }
    
    setIsFavorite(!isFavorite);
  };
  
  const handleRetry = () => {
    if (!id) return;
    fetchMangaDetails();
  };
  
  const fetchMangaDetails = async () => {
    if (!id) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await mangaService.getMangaById(parseInt(id));
      setManga(response.data);
      document.title = `${response.data.title} - ${t('site.name')}`;
      
      // Check if manga is in favorites
      const favorites = favoritesService.getFavorites();
      setIsFavorite(favorites.some(fav => fav.id === parseInt(id)));
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Container>
      <BackLink to="/manga" theme={theme}>
        <FaArrowLeft style={{ marginRight: '0.5rem' }} />
        {t('manga.back_to_catalog')}
      </BackLink>
      
      {loading ? (
        <Loading />
      ) : error ? (
        <ErrorMessage message={error.message} onRetry={handleRetry} />
      ) : manga ? (
        <>
          <MangaHeader>
            <ImageContainer>
              <MangaImage src={manga.image_url} alt={manga.title} />
            </ImageContainer>
            
            <MangaInfo>
              <Title theme={theme}>{manga.title}</Title>
              {manga.title_japanese && (
                <JapaneseTitle theme={theme}>{manga.title_japanese}</JapaneseTitle>
              )}
              
              {manga.score && (
                <Score theme={theme}>{manga.score.toFixed(1)}</Score>
              )}
              
              <InfoItem>
                <InfoLabel theme={theme}>
                  <FaBook style={{ marginRight: '0.5rem' }} />
                  {t('manga.chapters')}:
                </InfoLabel>
                <InfoValue theme={theme}>
                  {manga.chapters > 0 ? manga.chapters : t('manga.unknown')}
                </InfoValue>
              </InfoItem>
              
              <InfoItem>
                <InfoLabel theme={theme}>
                  <FaBookOpen style={{ marginRight: '0.5rem' }} />
                  {t('manga.volumes')}:
                </InfoLabel>
                <InfoValue theme={theme}>
                  {manga.volumes > 0 ? manga.volumes : t('manga.unknown')}
                </InfoValue>
              </InfoItem>
              
              <InfoItem>
                <InfoLabel theme={theme}>
                  <FaChartLine style={{ marginRight: '0.5rem' }} />
                  {t('manga.status')}:
                </InfoLabel>
                <InfoValue theme={theme}>{manga.status}</InfoValue>
              </InfoItem>
              
              <InfoItem>
                <InfoLabel theme={theme}>
                  <FaCalendarAlt style={{ marginRight: '0.5rem' }} />
                  {t('manga.published')}:
                </InfoLabel>
                <InfoValue theme={theme}>
                  {manga.published?.from ? new Date(manga.published.from).toLocaleDateString() : '?'} 
                  {' - '} 
                  {manga.published?.to ? new Date(manga.published.to).toLocaleDateString() : t('manga.ongoing')}
                </InfoValue>
              </InfoItem>
              
              <InfoItem>
                <InfoLabel theme={theme}>
                  <FaLayerGroup style={{ marginRight: '0.5rem' }} />
                  {t('manga.type')}:
                </InfoLabel>
                <InfoValue theme={theme}>{manga.type}</InfoValue>
              </InfoItem>
              
              {manga.authors && manga.authors.length > 0 && (
                <InfoItem>
                  <InfoLabel theme={theme}>
                    <FaUser style={{ marginRight: '0.5rem' }} />
                    {t('manga.authors')}:
                  </InfoLabel>
                  <InfoValue theme={theme}>
                    {manga.authors.map(author => author.name).join(', ')}
                  </InfoValue>
                </InfoItem>
              )}
              
              {manga.genres && manga.genres.length > 0 && (
                <InfoItem>
                  <InfoLabel theme={theme}>{t('manga.genres')}:</InfoLabel>
                  <GenresList>
                    {manga.genres.map(genre => (
                      <GenreTag key={genre.id} theme={theme}>
                        {genre.name}
                      </GenreTag>
                    ))}
                  </GenresList>
                </InfoItem>
              )}
              
              <FavoriteButton 
                onClick={handleFavoriteToggle} 
                isFavorite={isFavorite} 
                theme={theme}
              >
                {isFavorite ? <FaHeart /> : <FaRegHeart />}
                {isFavorite ? t('manga.remove_from_favorites') : t('manga.add_to_favorites')}
              </FavoriteButton>
            </MangaInfo>
          </MangaHeader>
          
          <Section>
            <SectionTitle theme={theme}>{t('manga.synopsis')}</SectionTitle>
            <Synopsis theme={theme}>{manga.synopsis}</Synopsis>
          </Section>
        </>
      ) : null}
    </Container>
  );
}

export default MangaDetailsPage; 