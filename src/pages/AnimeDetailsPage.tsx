import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { useApp } from '../context/ThemeContext';
import { animeService } from '../services/animeService';
import { favoritesService } from '../services/favoritesService';
import { Anime, Character, StaffMember, Review } from '../types/anime';
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

const GenresList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 1rem 0;
`;

const GenreTag = styled.span`
  background-color: ${props => props.theme === 'dark' ? '#2a2a2a' : '#f0f0f0'};
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#121212'};
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.9rem;
`;

const FavoriteButton = styled.button<{ isFavorite: boolean; theme: string }>`
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

const CharactersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
`;

const CharacterCard = styled.div`
  display: flex;
  background-color: ${props => props.theme === 'dark' ? '#2a2a2a' : '#ffffff'};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const CharacterImage = styled.img`
  width: 80px;
  height: 120px;
  object-fit: cover;
`;

const CharacterInfo = styled.div`
  padding: 0.75rem;
  flex: 1;
`;

const CharacterName = styled.h3`
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#121212'};
  margin: 0 0 0.5rem;
  font-size: 1rem;
`;

const CharacterRole = styled.div`
  color: ${props => props.theme === 'dark' ? '#aaa' : '#666'};
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

const VoiceActors = styled.div`
  font-size: 0.85rem;
`;

const VoiceActor = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.25rem;
  color: ${props => props.theme === 'dark' ? '#ddd' : '#333'};
`;

const VoiceActorName = styled.span`
  margin-right: 0.5rem;
`;

const VoiceActorLanguage = styled.span`
  color: ${props => props.theme === 'dark' ? '#aaa' : '#666'};
  font-size: 0.8rem;
`;

const StaffGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
`;

const StaffCard = styled.div`
  display: flex;
  background-color: ${props => props.theme === 'dark' ? '#2a2a2a' : '#ffffff'};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const StaffImage = styled.img`
  width: 80px;
  height: 120px;
  object-fit: cover;
`;

const StaffInfo = styled.div`
  padding: 0.75rem;
  flex: 1;
`;

const StaffName = styled.h3`
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#121212'};
  margin: 0 0 0.5rem;
  font-size: 1rem;
`;

const StaffPositions = styled.div`
  color: ${props => props.theme === 'dark' ? '#aaa' : '#666'};
  font-size: 0.9rem;
`;

const ReviewsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ReviewCard = styled.div`
  background-color: ${props => props.theme === 'dark' ? '#2a2a2a' : '#ffffff'};
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const ReviewUser = styled.div`
  display: flex;
  align-items: center;
`;

const ReviewUserImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 0.75rem;
`;

const ReviewUserName = styled.span`
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#121212'};
  font-weight: 500;
`;

const ReviewScore = styled.div`
  display: flex;
  align-items: center;
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#121212'};
  
  &::before {
    content: '★';
    color: #ffc107;
    margin-right: 0.25rem;
  }
`;

const ReviewDate = styled.div`
  color: ${props => props.theme === 'dark' ? '#aaa' : '#666'};
  font-size: 0.9rem;
  margin-top: 0.25rem;
`;

const ReviewContent = styled.div<{ expanded: boolean }>`
  color: ${props => props.theme === 'dark' ? '#ddd' : '#333'};
  line-height: 1.6;
  overflow: hidden;
  max-height: ${props => props.expanded ? 'none' : '200px'};
  position: relative;
  
  &::after {
    content: '';
    display: ${props => props.expanded ? 'none' : 'block'};
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50px;
    background: linear-gradient(
      to bottom,
      transparent,
      ${props => props.theme === 'dark' ? '#2a2a2a' : '#ffffff'}
    );
  }
`;

const ShowMoreButton = styled.button`
  background: none;
  border: none;
  color: #ff5f5f;
  cursor: pointer;
  padding: 0.5rem 0;
  font-weight: 500;
  
  &:hover {
    text-decoration: underline;
  }
`;

const LoadMoreButton = styled.button`
  background-color: ${props => props.theme === 'dark' ? '#2a2a2a' : '#f0f0f0'};
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#121212'};
  border: none;
  border-radius: 4px;
  padding: 0.75rem 1.5rem;
  font-weight: 500;
  cursor: pointer;
  margin-top: 1rem;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: ${props => props.theme === 'dark' ? '#333' : '#e0e0e0'};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const NoContent = styled.div`
  text-align: center;
  padding: 2rem;
  color: ${props => props.theme === 'dark' ? '#aaa' : '#666'};
`;

function AnimeDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { theme, t } = useApp();
  const [anime, setAnime] = useState<Anime | null>(null);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [charactersLoading, setCharactersLoading] = useState(false);
  const [staffLoading, setStaffLoading] = useState(false);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [expandedReviews, setExpandedReviews] = useState<Record<number, boolean>>({});
  const [reviewsPage, setReviewsPage] = useState(1);
  const [hasMoreReviews, setHasMoreReviews] = useState(false);
  
  useEffect(() => {
    const fetchAnimeDetails = async () => {
      if (!id) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const response = await animeService.getAnimeById(parseInt(id));
        setAnime(response.data);
        document.title = `${response.data.title} - ${t('site.name')}`;
        
        // Check if anime is in favorites
        const favorites = favoritesService.getFavorites();
        setIsFavorite(favorites.some(fav => fav.id === parseInt(id)));
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAnimeDetails();
  }, [id, t]);
  
  useEffect(() => {
    const fetchCharacters = async () => {
      if (!id) return;
      
      setCharactersLoading(true);
      
      try {
        const response = await animeService.getAnimeCharacters(parseInt(id));
        setCharacters(response.data);
      } catch (error) {
        console.error('Error fetching characters:', error);
      } finally {
        setCharactersLoading(false);
      }
    };
    
    if (anime) {
      fetchCharacters();
    }
  }, [id, anime]);
  
  useEffect(() => {
    const fetchStaff = async () => {
      if (!id) return;
      
      setStaffLoading(true);
      
      try {
        const response = await animeService.getAnimeStaff(parseInt(id));
        setStaff(response.data);
      } catch (error) {
        console.error('Error fetching staff:', error);
      } finally {
        setStaffLoading(false);
      }
    };
    
    if (anime) {
      fetchStaff();
    }
  }, [id, anime]);
  
  useEffect(() => {
    const fetchReviews = async () => {
      if (!id) return;
      
      setReviewsLoading(true);
      
      try {
        const response = await animeService.getAnimeReviews(parseInt(id), 1);
        setReviews(response.data);
        setHasMoreReviews(response.pagination.has_next_page);
        setReviewsPage(1);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      } finally {
        setReviewsLoading(false);
      }
    };
    
    if (anime) {
      fetchReviews();
    }
  }, [id, anime]);
  
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
    fetchAnimeDetails();
  };
  
  const fetchAnimeDetails = async () => {
    if (!id) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await animeService.getAnimeById(parseInt(id));
      setAnime(response.data);
      document.title = `${response.data.title} - ${t('site.name')}`;
      
      // Check if anime is in favorites
      const favorites = favoritesService.getFavorites();
      setIsFavorite(favorites.some(fav => fav.id === parseInt(id)));
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };
  
  const toggleReviewExpansion = (reviewId: number) => {
    setExpandedReviews(prev => ({
      ...prev,
      [reviewId]: !prev[reviewId]
    }));
  };
  
  const loadMoreReviews = async () => {
    if (!id || reviewsLoading) return;
    
    setReviewsLoading(true);
    
    try {
      const nextPage = reviewsPage + 1;
      const response = await animeService.getAnimeReviews(parseInt(id), nextPage);
      
      setReviews(prev => [...prev, ...response.data]);
      setReviewsPage(nextPage);
      setHasMoreReviews(response.pagination.has_next_page);
    } catch (error) {
      console.error('Error loading more reviews:', error);
    } finally {
      setReviewsLoading(false);
    }
  };
  
  return (
    <Container>
      <BackLink to="/anime" theme={theme}>{t('anime.back_to_catalog')}</BackLink>
      
      {loading ? (
        <Loading />
      ) : error ? (
        <ErrorMessage message={error.message} onRetry={handleRetry} />
      ) : anime ? (
        <>
          <AnimeHeader>
            <ImageContainer>
              <AnimeImage src={anime.image_url} alt={anime.title} />
            </ImageContainer>
            
            <AnimeInfo>
              <Title theme={theme}>{anime.title}</Title>
              {anime.title_japanese && (
                <JapaneseTitle theme={theme}>{anime.title_japanese}</JapaneseTitle>
              )}
              
              {anime.score && (
                <Score theme={theme}>{anime.score.toFixed(1)}</Score>
              )}
              
              <InfoItem>
                <InfoLabel theme={theme}>{t('details.episodes')}:</InfoLabel>
                <InfoValue theme={theme}>
                  {anime.episodes > 0 ? anime.episodes : '?'}
                </InfoValue>
              </InfoItem>
              
              <InfoItem>
                <InfoLabel theme={theme}>{t('details.status')}:</InfoLabel>
                <InfoValue theme={theme}>{anime.status}</InfoValue>
              </InfoItem>
              
              <InfoItem>
                <InfoLabel theme={theme}>{t('details.aired')}:</InfoLabel>
                <InfoValue theme={theme}>
                  {anime.aired?.from ? new Date(anime.aired.from).toLocaleDateString() : '?'} 
                  {' - '} 
                  {anime.aired?.to ? new Date(anime.aired.to).toLocaleDateString() : '?'}
                </InfoValue>
              </InfoItem>
              
              {anime.studios && anime.studios.length > 0 && (
                <InfoItem>
                  <InfoLabel theme={theme}>{t('details.studios')}:</InfoLabel>
                  <InfoValue theme={theme}>
                    {anime.studios.map(studio => studio.name).join(', ')}
                  </InfoValue>
                </InfoItem>
              )}
              
              <InfoItem>
                <InfoLabel theme={theme}>{t('details.source')}:</InfoLabel>
                <InfoValue theme={theme}>{anime.source}</InfoValue>
              </InfoItem>
              
              <InfoItem>
                <InfoLabel theme={theme}>{t('details.rating')}:</InfoLabel>
                <InfoValue theme={theme}>{anime.rating}</InfoValue>
              </InfoItem>
              
              <InfoItem>
                <InfoLabel theme={theme}>{t('details.duration')}:</InfoLabel>
                <InfoValue theme={theme}>{anime.duration}</InfoValue>
              </InfoItem>
              
              {anime.genres && anime.genres.length > 0 && (
                <InfoItem>
                  <InfoLabel theme={theme}>{t('details.genres')}:</InfoLabel>
                  <GenresList>
                    {anime.genres.map(genre => (
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
                {isFavorite ? t('details.remove_from_favorites') : t('details.add_to_favorites')}
              </FavoriteButton>
            </AnimeInfo>
          </AnimeHeader>
          
          <Section>
            <SectionTitle theme={theme}>{t('details.synopsis')}</SectionTitle>
            <Synopsis theme={theme}>{anime.synopsis}</Synopsis>
          </Section>
          
          {anime.trailer_url && (
            <Section>
              <SectionTitle theme={theme}>{t('details.trailer')}</SectionTitle>
              <TrailerContainer>
                <iframe 
                  src={anime.trailer_url} 
                  title={`${anime.title} trailer`}
                  width="100%" 
                  height="100%" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              </TrailerContainer>
            </Section>
          )}
          
          <Section>
            <SectionTitle theme={theme}>{t('details.characters')}</SectionTitle>
            {charactersLoading ? (
              <Loading />
            ) : characters.length > 0 ? (
              <CharactersGrid>
                {characters.slice(0, 12).map(character => (
                  <CharacterCard key={character.id} theme={theme}>
                    <CharacterImage src={character.image_url} alt={character.name} />
                    <CharacterInfo>
                      <CharacterName theme={theme}>{character.name}</CharacterName>
                      <CharacterRole theme={theme}>
                        {character.role}
                      </CharacterRole>
                      {character.voice_actors.length > 0 && (
                        <VoiceActors>
                          {character.voice_actors.slice(0, 1).map(va => (
                            <VoiceActor key={va.id} theme={theme}>
                              <VoiceActorName>{va.name}</VoiceActorName>
                              <VoiceActorLanguage theme={theme}>
                                ({va.language})
                              </VoiceActorLanguage>
                            </VoiceActor>
                          ))}
                        </VoiceActors>
                      )}
                    </CharacterInfo>
                  </CharacterCard>
                ))}
              </CharactersGrid>
            ) : (
              <NoContent theme={theme}>{t('details.no_characters')}</NoContent>
            )}
          </Section>
          
          <Section>
            <SectionTitle theme={theme}>{t('details.staff')}</SectionTitle>
            {staffLoading ? (
              <Loading />
            ) : staff.length > 0 ? (
              <StaffGrid>
                {staff.slice(0, 12).map(member => (
                  <StaffCard key={member.id} theme={theme}>
                    <StaffImage src={member.image_url} alt={member.name} />
                    <StaffInfo>
                      <StaffName theme={theme}>{member.name}</StaffName>
                      <StaffPositions theme={theme}>
                        {member.positions.join(', ')}
                      </StaffPositions>
                    </StaffInfo>
                  </StaffCard>
                ))}
              </StaffGrid>
            ) : (
              <NoContent theme={theme}>{t('details.no_staff')}</NoContent>
            )}
          </Section>
          
          <Section>
            <SectionTitle theme={theme}>{t('details.reviews')}</SectionTitle>
            {reviewsLoading && reviews.length === 0 ? (
              <Loading />
            ) : reviews.length > 0 ? (
              <>
                <ReviewsList>
                  {reviews.map(review => (
                    <ReviewCard key={review.id} theme={theme}>
                      <ReviewHeader>
                        <ReviewUser>
                          <ReviewUserImage 
                            src={review.user.image_url || 'https://via.placeholder.com/40'} 
                            alt={review.user.username} 
                          />
                          <div>
                            <ReviewUserName theme={theme}>{review.user.username}</ReviewUserName>
                            <ReviewDate theme={theme}>
                              {new Date(review.date).toLocaleDateString()}
                            </ReviewDate>
                          </div>
                        </ReviewUser>
                        <ReviewScore theme={theme}>{review.score}</ReviewScore>
                      </ReviewHeader>
                      <ReviewContent 
                        theme={theme} 
                        expanded={!!expandedReviews[review.id]}
                      >
                        {review.content}
                      </ReviewContent>
                      <ShowMoreButton onClick={() => toggleReviewExpansion(review.id)}>
                        {expandedReviews[review.id] ? t('details.show_less') : t('details.show_more')}
                      </ShowMoreButton>
                    </ReviewCard>
                  ))}
                </ReviewsList>
                
                {hasMoreReviews && (
                  <LoadMoreButton 
                    onClick={loadMoreReviews} 
                    disabled={reviewsLoading}
                    theme={theme}
                  >
                    {reviewsLoading ? t('loading') : t('details.load_more_reviews')}
                  </LoadMoreButton>
                )}
              </>
            ) : (
              <NoContent theme={theme}>{t('details.no_reviews')}</NoContent>
            )}
          </Section>
        </>
      ) : null}
    </Container>
  );
}

export default AnimeDetailsPage; 