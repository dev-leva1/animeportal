import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { useTheme } from '../context/ThemeContext';
import { animeService } from '../services/animeService';
import { favoritesService } from '../services/favoritesService';
import { Anime } from '../types/anime';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';

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
  
  &::before {
    content: '←';
    margin-right: 0.5rem;
  }
`;

const AnimeHeader = styled.div`
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

const AnimeImage = styled.img`
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const AnimeInfo = styled.div`
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
    font-size: 1.2rem;
  }
`;

const ScoreValue = styled.span`
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#121212'};
  font-weight: bold;
  font-size: 1.2rem;
`;

const GenresList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 1rem 0;
`;

const Genre = styled.span`
  background-color: ${props => props.theme === 'dark' ? '#2a2a2a' : '#f0f0f0'};
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#121212'};
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.9rem;
`;

const Synopsis = styled.div`
  margin-top: 2rem;
`;

const SynopsisTitle = styled.h3`
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#121212'};
  margin-bottom: 1rem;
  font-size: 1.5rem;
  position: relative;
  padding-bottom: 0.5rem;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 50px;
    height: 3px;
    background-color: #ff5f5f;
  }
`;

const SynopsisText = styled.p`
  color: ${props => props.theme === 'dark' ? '#dddddd' : '#333333'};
  line-height: 1.6;
  white-space: pre-line;
`;

const FavoriteButton = styled.button<{ isFavorite: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background-color: ${props => props.isFavorite ? '#ff5f5f' : 'transparent'};
  color: ${props => props.isFavorite 
    ? '#ffffff' 
    : props.theme === 'dark' ? '#ffffff' : '#121212'};
  border: 2px solid ${props => props.isFavorite ? '#ff5f5f' : '#ff5f5f'};
  border-radius: 4px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;
  
  &:hover {
    background-color: ${props => props.isFavorite ? '#ff4040' : 'rgba(255, 95, 95, 0.1)'};
  }
`;

const TrailerSection = styled.div`
  margin-top: 2rem;
`;

const TrailerTitle = styled.h3`
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#121212'};
  margin-bottom: 1rem;
  font-size: 1.5rem;
  position: relative;
  padding-bottom: 0.5rem;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 50px;
    height: 3px;
    background-color: #ff5f5f;
  }
`;

const TrailerContainer = styled.div`
  position: relative;
  padding-bottom: 56.25%; /* 16:9 */
  height: 0;
  overflow: hidden;
  border-radius: 8px;
  
  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

function AnimeDetailsPage() {
  const { theme } = useTheme();
  const { id } = useParams<{ id: string }>();
  const [anime, setAnime] = useState<Anime | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  
  useEffect(() => {
    const fetchAnimeDetails = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const animeId = parseInt(id);
        const response = await animeService.getAnimeById(animeId);
        setAnime(response.data);
        setIsFavorite(favoritesService.isFavorite(animeId));
        setError(null);
      } catch (err) {
        setError('Не удалось загрузить информацию об аниме. Пожалуйста, попробуйте позже.');
        console.error('Error fetching anime details:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAnimeDetails();
  }, [id]);
  
  const handleFavoriteToggle = () => {
    if (!anime) return;
    
    if (isFavorite) {
      favoritesService.removeFromFavorites(anime.id);
    } else {
      favoritesService.addToFavorites(anime);
    }
    
    setIsFavorite(!isFavorite);
  };
  
  const handleRetry = () => {
    if (!id) return;
    
    setError(null);
    setLoading(true);
    
    const animeId = parseInt(id);
    animeService.getAnimeById(animeId)
      .then(response => {
        setAnime(response.data);
        setIsFavorite(favoritesService.isFavorite(animeId));
      })
      .catch(err => {
        setError('Не удалось загрузить информацию об аниме. Пожалуйста, попробуйте позже.');
        console.error('Error retrying anime details fetch:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  
  return (
    <Container>
      <BackLink to="/anime" theme={theme}>Вернуться к каталогу</BackLink>
      
      {loading ? (
        <Loading />
      ) : error ? (
        <ErrorMessage message={error} onRetry={handleRetry} />
      ) : anime ? (
        <>
          <AnimeHeader>
            <ImageContainer>
              <AnimeImage src={anime.image_url} alt={anime.title} />
              <FavoriteButton 
                onClick={handleFavoriteToggle} 
                isFavorite={isFavorite}
                theme={theme}
              >
                {isFavorite ? '♥ В избранном' : '♡ Добавить в избранное'}
              </FavoriteButton>
            </ImageContainer>
            
            <AnimeInfo>
              <Title theme={theme}>{anime.title}</Title>
              {anime.title_japanese && (
                <JapaneseTitle theme={theme}>{anime.title_japanese}</JapaneseTitle>
              )}
              
              <Score theme={theme}>
                <ScoreValue theme={theme}>{anime.score.toFixed(1)}</ScoreValue>
              </Score>
              
              <InfoItem>
                <InfoLabel theme={theme}>Эпизоды:</InfoLabel>
                <InfoValue theme={theme}>{anime.episodes}</InfoValue>
              </InfoItem>
              
              <InfoItem>
                <InfoLabel theme={theme}>Статус:</InfoLabel>
                <InfoValue theme={theme}>{anime.status}</InfoValue>
              </InfoItem>
              
              {anime.aired && (
                <InfoItem>
                  <InfoLabel theme={theme}>Период выхода:</InfoLabel>
                  <InfoValue theme={theme}>
                    {new Date(anime.aired.from).toLocaleDateString()} 
                    {anime.aired.to && ` - ${new Date(anime.aired.to).toLocaleDateString()}`}
                  </InfoValue>
                </InfoItem>
              )}
              
              <InfoItem>
                <InfoLabel theme={theme}>Источник:</InfoLabel>
                <InfoValue theme={theme}>{anime.source}</InfoValue>
              </InfoItem>
              
              <InfoItem>
                <InfoLabel theme={theme}>Студии:</InfoLabel>
                <InfoValue theme={theme}>
                  {anime.studios.map(studio => studio.name).join(', ')}
                </InfoValue>
              </InfoItem>
              
              <InfoItem>
                <InfoLabel theme={theme}>Рейтинг:</InfoLabel>
                <InfoValue theme={theme}>{anime.rating}</InfoValue>
              </InfoItem>
              
              <InfoItem>
                <InfoLabel theme={theme}>Длительность:</InfoLabel>
                <InfoValue theme={theme}>{anime.duration}</InfoValue>
              </InfoItem>
              
              <GenresList>
                {anime.genres.map(genre => (
                  <Genre key={genre.id} theme={theme}>
                    {genre.name}
                  </Genre>
                ))}
              </GenresList>
            </AnimeInfo>
          </AnimeHeader>
          
          <Synopsis>
            <SynopsisTitle theme={theme}>Описание</SynopsisTitle>
            <SynopsisText theme={theme}>{anime.synopsis}</SynopsisText>
          </Synopsis>
          
          {anime.trailer_url && (
            <TrailerSection>
              <TrailerTitle theme={theme}>Трейлер</TrailerTitle>
              <TrailerContainer>
                <iframe 
                  src={anime.trailer_url} 
                  title={`${anime.title} трейлер`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </TrailerContainer>
            </TrailerSection>
          )}
        </>
      ) : null}
    </Container>
  );
}

export default AnimeDetailsPage; 