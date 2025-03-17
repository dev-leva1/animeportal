import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { useApp } from '../context/ThemeContext';
//import { useAuth } from '../context/AuthContext';
import { animeService } from '../services/animeService';
import { favoritesService } from '../services/favoritesService';
import { Anime, Character, StaffMember, Review, WatchStatus } from '../types/anime';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import AnimePlayer from '../components/AnimePlayer';
import { FaArrowLeft, FaHeart, FaRegHeart, FaPlay, FaTimes, FaTv, FaFilm, FaChartLine, FaCalendarAlt, FaLeaf, FaClock, FaShieldAlt, FaBuilding, FaChevronUp, FaChevronDown, FaEye, FaCheck, FaPause, FaTimesCircle } from 'react-icons/fa';

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

const ActionButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 1rem;
`;

interface FavoriteButtonProps {
  isFavorite: boolean;
  theme?: string;
}

interface StatusBadgeProps {
  status: WatchStatus;
  theme?: string;
}

const FavoriteButton = styled.button<FavoriteButtonProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background-color: ${props => props.isFavorite ? '#ff5f5f' : 'transparent'};
  color: ${props => props.isFavorite ? 'white' : props.theme === 'dark' ? 'white' : '#333'};
  border: 2px solid ${props => props.isFavorite ? '#ff5f5f' : props.theme === 'dark' ? 'white' : '#333'};
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.isFavorite ? '#ff4040' : props.theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'};
  }
`;

const StatusButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background-color: transparent;
  color: ${props => props.theme === 'dark' ? 'white' : '#333'};
  border: 2px solid ${props => props.theme === 'dark' ? 'white' : '#333'};
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  
  &:hover {
    background-color: ${props => props.theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'};
  }
`;

const StatusMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 200px;
  background-color: ${props => props.theme === 'dark' ? '#1a1a1a' : '#ffffff'};
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 10;
  margin-top: 0.5rem;
  overflow: hidden;
`;

const StatusMenuItem = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.75rem 1rem;
  text-align: left;
  background-color: transparent;
  border: none;
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#333'};
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: ${props => props.theme === 'dark' ? '#333' : '#f0f0f0'};
  }
`;

const StatusBadge = styled.div<StatusBadgeProps>`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: 500;
  margin-left: 1rem;
  background-color: ${props => {
    switch(props.status) {
      case 'watching': return '#4caf50';
      case 'planned': return '#2196f3';
      case 'completed': return '#9c27b0';
      case 'on_hold': return '#ff9800';
      case 'dropped': return '#f44336';
      default: return '#757575';
    }
  }};
  color: white;
`;

const WatchButton = styled.button`
  padding: 0.75rem;
  border-radius: 4px;
  border: none;
  background-color: ${props => props.theme === 'dark' ? '#4a90e2' : '#4a90e2'};
  color: white;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background-color: ${props => props.theme === 'dark' ? '#3a80d2' : '#3a80d2'};
  }
`;

const AnimeInfo = styled.div`
  flex: 1;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin: 0 0 0.5rem;
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#121212'};
`;

const EnglishTitle = styled.h2`
  color: ${props => props.theme === 'dark' ? '#aaa' : '#666'};
  margin: 0 0 1.5rem;
  font-size: 1.25rem;
  font-weight: normal;
`;

const ScoreContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const Score = styled.div`
  background-color: #ff5f5f;
  color: white;
  font-weight: bold;
  font-size: 1.25rem;
  padding: 0.5rem 0.75rem;
  border-radius: 4px;
`;

const ScoreLabel = styled.span`
  color: ${props => props.theme === 'dark' ? '#aaa' : '#666'};
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
  background-color: ${props => props.theme === 'dark' ? '#2a2a2a' : '#f5f5f5'};
  padding: 1rem;
  border-radius: 8px;
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 0.5rem;
  border-radius: 4px;
  background-color: ${props => props.theme === 'dark' ? '#333' : '#ffffff'};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const InfoLabelContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const InfoIcon = styled.span`
  margin-right: 0.5rem;
  display: flex;
  align-items: center;
`;

const InfoLabel = styled.span`
  font-weight: 600;
  color: ${props => props.theme === 'dark' ? '#aaa' : '#666'};
  font-size: 0.875rem;
`;

const InfoValue = styled.span`
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#121212'};
  font-weight: 500;
`;

const GenreList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const GenreTag = styled.span`
  background-color: ${props => props.theme === 'dark' ? '#333' : '#f0f0f0'};
  color: ${props => props.theme === 'dark' ? '#fff' : '#333'};
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.875rem;
`;

const Synopsis = styled.div`
  margin-top: 1.5rem;
`;

const SynopsisTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 0.75rem;
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#121212'};
`;

const SynopsisText = styled.p`
  line-height: 1.6;
  color: ${props => props.theme === 'dark' ? '#ddd' : '#333'};
`;

const Section = styled.section`
  margin-top: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#121212'};
  padding-bottom: 0.5rem;
  border-bottom: 1px solid ${props => props.theme === 'dark' ? '#333' : '#eee'};
`;

const CharacterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
`;

const CharacterCard = styled.div`
  display: flex;
  background-color: ${props => props.theme === 'dark' ? '#1a1a1a' : '#ffffff'};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
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

const CharacterName = styled.div`
  font-weight: 500;
  margin-bottom: 0.25rem;
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#121212'};
`;

const CharacterRole = styled.div`
  font-size: 0.875rem;
  color: ${props => props.theme === 'dark' ? '#aaa' : '#666'};
`;

const StaffGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
`;

const StaffCard = styled.div`
  display: flex;
  background-color: ${props => props.theme === 'dark' ? '#1a1a1a' : '#ffffff'};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
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

const StaffName = styled.div`
  font-weight: 500;
  margin-bottom: 0.25rem;
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#121212'};
`;

const StaffPosition = styled.div`
  font-size: 0.875rem;
  color: ${props => props.theme === 'dark' ? '#aaa' : '#666'};
`;

const ReviewList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ReviewCard = styled.div`
  background-color: ${props => props.theme === 'dark' ? '#1a1a1a' : '#ffffff'};
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
`;

const ReviewerInfo = styled.div``;

const ReviewerName = styled.div`
  font-weight: 500;
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#121212'};
`;

const ReviewDate = styled.div`
  font-size: 0.75rem;
  color: ${props => props.theme === 'dark' ? '#aaa' : '#666'};
`;

const ReviewScore = styled.div`
  background-color: #ff5f5f;
  color: white;
  font-weight: bold;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.875rem;
`;

const ReviewContent = styled.div`
  line-height: 1.6;
  color: ${props => props.theme === 'dark' ? '#ddd' : '#333'};
  margin-bottom: 0.75rem;
`;

const ExpandButton = styled.button`
  background: none;
  border: none;
  color: #ff5f5f;
  cursor: pointer;
  padding: 0;
  font-size: 0.875rem;
  
  &:hover {
    text-decoration: underline;
  }
`;

const LoadMoreButton = styled.button`
  padding: 0.75rem;
  border-radius: 4px;
  border: 1px solid ${props => props.theme === 'dark' ? '#444' : '#ddd'};
  background-color: transparent;
  color: ${props => props.theme === 'dark' ? '#fff' : '#333'};
  font-weight: 500;
  cursor: pointer;
  margin-top: 1rem;
  width: 100%;
  
  &:hover {
    background-color: ${props => props.theme === 'dark' ? '#333' : '#f0f0f0'};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;


function AnimeDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { theme, t } = useApp();
//  const { isAuthenticated } = useAuth();
  const [anime, setAnime] = useState<Anime | null>(null);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [expandedReviews, setExpandedReviews] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [isFavorite, setIsFavorite] = useState(false);
  const [watchStatus, setWatchStatus] = useState<WatchStatus>(null);
  const [showStatusMenu, setShowStatusMenu] = useState(false);
  const [reviewsPage, setReviewsPage] = useState(1);
  const [hasMoreReviews, setHasMoreReviews] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);
  const [expandedSections, setExpandedSections] = useState<{
    characters: boolean;
    staff: boolean;
    reviews: boolean;
  }>({
    characters: false,
    staff: false,
    reviews: false
  });
  
  useEffect(() => {
    if (id) {
      fetchAnimeDetails();
      fetchCharacters();
      fetchStaff();
      fetchReviews();
      
      if (favoritesService.isFavorite(Number(id))) {
        setIsFavorite(true);
        setWatchStatus(favoritesService.getWatchStatus(Number(id)));
      }
    }
  }, [id]);
  
  const fetchAnimeDetails = async () => {
    if (!id) return;
    
    setIsLoading(true);
    setError('');
    
    try {
      const response = await animeService.getAnimeById(Number(id));
      setAnime(response.data);
    } catch (err) {
      console.error('Error fetching anime details:', err);
      setError(t('anime.error_loading'));
    } finally {
      setIsLoading(false);
    }
  };
  
  const fetchCharacters = async () => {
    if (!id) return;
    
    try {
      const response = await animeService.getAnimeCharacters(Number(id));
      setCharacters(response.data);
    } catch (error) {
      console.error('Error fetching characters:', error);
    }
  };
  
  const fetchStaff = async () => {
    if (!id) return;
    
    try {
      const response = await animeService.getAnimeStaff(Number(id));
      setStaff(response.data);
    } catch (error) {
      console.error('Error fetching staff:', error);
    }
  };
  
  const fetchReviews = async () => {
    if (!id) return;
    
    try {
      const response = await animeService.getAnimeReviews(Number(id), 1);
      setReviews(response.data);
      setHasMoreReviews(response.pagination.has_next_page);
      setReviewsPage(2);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };
  
  const handleFavoriteClick = () => {
    if (anime) {
      if (isFavorite) {
        favoritesService.removeFromFavorites(anime.mal_id);
        setIsFavorite(false);
        setWatchStatus(null);
      } else {
        favoritesService.addToFavorites(anime);
        setIsFavorite(true);
      }
    }
  };
  
  const handleStatusClick = () => {
    setShowStatusMenu(!showStatusMenu);
  };
  
  const handleStatusChange = (status: WatchStatus) => {
    if (anime) {
      if (!isFavorite) {
        favoritesService.addToFavorites(anime, status);
        setIsFavorite(true);
      } else {
        favoritesService.updateWatchStatus(anime.mal_id, status);
      }
      setWatchStatus(status);
      setShowStatusMenu(false);
    }
  };
  
  const getStatusIcon = (status: WatchStatus) => {
    switch(status) {
      case 'watching': return <FaEye />;
      case 'planned': return <FaClock />;
      case 'completed': return <FaCheck />;
      case 'on_hold': return <FaPause />;
      case 'dropped': return <FaTimesCircle />;
      default: return null;
    }
  };
  
  const getStatusText = (status: WatchStatus) => {
    if (!status) return t('favorites.set_status');
    
    return t(`favorites.status.${status}`);
  };
  
  const handleRetry = () => {
    fetchAnimeDetails();
  };
  
  const toggleReviewExpansion = (reviewId: number) => {
    setExpandedReviews(prev => {
      if (prev.includes(reviewId)) {
        return prev.filter(id => id !== reviewId);
      } else {
        return [...prev, reviewId];
      }
    });
  };
  
  const loadMoreReviews = async () => {
    if (!id || isLoadingMore) return;
    
    setIsLoadingMore(true);
    
    try {
      const response = await animeService.getAnimeReviews(Number(id), reviewsPage);
      setReviews(prev => [...prev, ...response.data]);
      setHasMoreReviews(response.pagination.has_next_page);
      setReviewsPage(prev => prev + 1);
    } catch (error) {
      console.error('Error loading more reviews:', error);
    } finally {
      setIsLoadingMore(false);
    }
  };
  
  const toggleSection = (section: 'characters' | 'staff' | 'reviews') => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
  
  return (
    <Container>
      <BackLink to="/anime" theme={theme}>
        <FaArrowLeft style={{ marginRight: '0.5rem' }} />
        {t('anime.back_to_catalog')}
      </BackLink>
      
      {isLoading ? (
        <Loading />
      ) : error ? (
        <ErrorMessage message={error} onRetry={handleRetry} />
      ) : anime ? (
        <>
          <AnimeHeader>
            <ImageContainer>
              <AnimeImage 
                src={anime.images?.jpg?.large_image_url || anime.image_url} 
                alt={anime.title} 
              />
              <ActionButtons>
                <FavoriteButton 
                  onClick={handleFavoriteClick} 
                  isFavorite={isFavorite}
                  theme={theme}
                >
                  {isFavorite ? <FaHeart /> : <FaRegHeart />}
                  {isFavorite ? t('details.remove_from_favorites') : t('details.add_to_favorites')}
                </FavoriteButton>
                
                {isFavorite && watchStatus && (
                  <StatusBadge status={watchStatus} theme={theme}>
                    {getStatusIcon(watchStatus)}
                    {getStatusText(watchStatus)}
                  </StatusBadge>
                )}
                
                <StatusButton 
                  onClick={handleStatusClick}
                  theme={theme}
                >
                  {watchStatus ? getStatusIcon(watchStatus) : null}
                  {getStatusText(watchStatus)}
                  
                  {showStatusMenu && (
                    <StatusMenu theme={theme}>
                      <StatusMenuItem 
                        theme={theme} 
                        onClick={() => handleStatusChange('watching')}
                      >
                        <FaEye color="#4caf50" />
                        {t('favorites.status.watching')}
                      </StatusMenuItem>
                      <StatusMenuItem 
                        theme={theme} 
                        onClick={() => handleStatusChange('planned')}
                      >
                        <FaClock color="#2196f3" />
                        {t('favorites.status.planned')}
                      </StatusMenuItem>
                      <StatusMenuItem 
                        theme={theme} 
                        onClick={() => handleStatusChange('completed')}
                      >
                        <FaCheck color="#9c27b0" />
                        {t('favorites.status.completed')}
                      </StatusMenuItem>
                      <StatusMenuItem 
                        theme={theme} 
                        onClick={() => handleStatusChange('on_hold')}
                      >
                        <FaPause color="#ff9800" />
                        {t('favorites.status.on_hold')}
                      </StatusMenuItem>
                      <StatusMenuItem 
                        theme={theme} 
                        onClick={() => handleStatusChange('dropped')}
                      >
                        <FaTimesCircle color="#f44336" />
                        {t('favorites.status.dropped')}
                      </StatusMenuItem>
                      {watchStatus && (
                        <StatusMenuItem 
                          theme={theme} 
                          onClick={() => handleStatusChange(null)}
                        >
                          {t('favorites.no_status')}
                        </StatusMenuItem>
                      )}
                    </StatusMenu>
                  )}
                </StatusButton>
                
                <WatchButton 
                  onClick={() => setShowPlayer(!showPlayer)}
                  theme={theme}
                >
                  {showPlayer ? <FaTimes /> : <FaPlay />}
                  {showPlayer ? t('anime.hide_player') : t('anime.watch_online')}
                </WatchButton>
              </ActionButtons>
            </ImageContainer>
            
            <AnimeInfo>
              <Title theme={theme}>{anime.title}</Title>
              {anime.title_english && anime.title_english !== anime.title && (
                <EnglishTitle theme={theme}>{anime.title_english}</EnglishTitle>
              )}
              
              <ScoreContainer>
                <Score>{anime.score || 'N/A'}</Score>
                <ScoreLabel theme={theme}>{t('anime.score')}</ScoreLabel>
              </ScoreContainer>
              
              <InfoGrid theme={theme}>
                <InfoItem theme={theme}>
                  <InfoLabelContainer>
                    <InfoIcon>
                      <FaTv />
                    </InfoIcon>
                    <InfoLabel>{t('anime.type')}</InfoLabel>
                  </InfoLabelContainer>
                  <InfoValue>{anime.type}</InfoValue>
                </InfoItem>
                
                <InfoItem theme={theme}>
                  <InfoLabelContainer>
                    <InfoIcon>
                      <FaFilm />
                    </InfoIcon>
                    <InfoLabel>{t('anime.episodes')}</InfoLabel>
                  </InfoLabelContainer>
                  <InfoValue>{anime.episodes || t('anime.unknown')}</InfoValue>
                </InfoItem>
                
                <InfoItem theme={theme}>
                  <InfoLabelContainer>
                    <InfoIcon>
                      <FaChartLine />
                    </InfoIcon>
                    <InfoLabel>{t('anime.status')}</InfoLabel>
                  </InfoLabelContainer>
                  <InfoValue>{anime.status}</InfoValue>
                </InfoItem>
                
                <InfoItem theme={theme}>
                  <InfoLabelContainer>
                    <InfoIcon>
                      <FaCalendarAlt />
                    </InfoIcon>
                    <InfoLabel>{t('anime.aired')}</InfoLabel>
                  </InfoLabelContainer>
                  <InfoValue>
                    {anime.aired?.string || `${anime.aired?.from || ''} - ${anime.aired?.to || ''}`}
                  </InfoValue>
                </InfoItem>
                
                <InfoItem theme={theme}>
                  <InfoLabelContainer>
                    <InfoIcon>
                      <FaLeaf />
                    </InfoIcon>
                    <InfoLabel>{t('anime.season')}</InfoLabel>
                  </InfoLabelContainer>
                  <InfoValue>
                    {anime.season ? `${anime.season} ${anime.year}` : t('anime.unknown')}
                  </InfoValue>
                </InfoItem>
                
                <InfoItem theme={theme}>
                  <InfoLabelContainer>
                    <InfoIcon>
                      <FaClock />
                    </InfoIcon>
                    <InfoLabel>{t('anime.duration')}</InfoLabel>
                  </InfoLabelContainer>
                  <InfoValue>{anime.duration}</InfoValue>
                </InfoItem>
                
                <InfoItem theme={theme}>
                  <InfoLabelContainer>
                    <InfoIcon>
                      <FaShieldAlt />
                    </InfoIcon>
                    <InfoLabel>{t('anime.rating')}</InfoLabel>
                  </InfoLabelContainer>
                  <InfoValue>{anime.rating || t('anime.unknown')}</InfoValue>
                </InfoItem>
                
                <InfoItem theme={theme}>
                  <InfoLabelContainer>
                    <InfoIcon>
                      <FaBuilding />
                    </InfoIcon>
                    <InfoLabel>{t('anime.studios')}</InfoLabel>
                  </InfoLabelContainer>
                  <InfoValue>
                    {anime.studios.length > 0 
                      ? anime.studios.map(studio => studio.name).join(', ') 
                      : t('anime.unknown')}
                  </InfoValue>
                </InfoItem>
              </InfoGrid>
              
              <GenreList>
                {anime.genres.map(genre => (
                  <GenreTag key={genre.mal_id || genre.name} theme={theme}>
                    {genre.name}
                  </GenreTag>
                ))}
              </GenreList>
              
              <Synopsis theme={theme}>
                <SynopsisTitle>{t('anime.synopsis')}</SynopsisTitle>
                <SynopsisText>{anime.synopsis || t('anime.no_synopsis')}</SynopsisText>
              </Synopsis>
            </AnimeInfo>
          </AnimeHeader>
          
          {showPlayer && (
            <Section>
              <SectionTitle theme={theme}>{t('anime.watch_online')}</SectionTitle>
              <AnimePlayer 
                animeId={anime.mal_id} 
                title={anime.title} 
                image={anime.images?.jpg?.large_image_url || anime.image_url || ''} 
              />
            </Section>
          )}
          
          {characters.length > 0 && (
            <Section>
              <SectionTitle 
                theme={theme} 
                onClick={() => toggleSection('characters')}
                style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              >
                {t('anime.characters')}
                <span>{expandedSections.characters ? <FaChevronUp /> : <FaChevronDown />}</span>
              </SectionTitle>
              
              {expandedSections.characters && (
                <CharacterGrid>
                  {characters.map(character => (
                    <CharacterCard key={character.character.mal_id} theme={theme}>
                      <CharacterImage src={character.character.images?.jpg?.image_url} alt={character.character.name} />
                      <CharacterInfo>
                        <CharacterName theme={theme}>{character.character.name}</CharacterName>
                        <CharacterRole theme={theme}>{character.role}</CharacterRole>
                      </CharacterInfo>
                    </CharacterCard>
                  ))}
                </CharacterGrid>
              )}
            </Section>
          )}
          
          {staff.length > 0 && (
            <Section>
              <SectionTitle 
                theme={theme} 
                onClick={() => toggleSection('staff')}
                style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              >
                {t('anime.staff')}
                <span>{expandedSections.staff ? <FaChevronUp /> : <FaChevronDown />}</span>
              </SectionTitle>
              
              {expandedSections.staff && (
                <StaffGrid>
                  {staff.map(person => (
                    <StaffCard key={person.person.mal_id} theme={theme}>
                      <StaffImage src={person.person.images?.jpg?.image_url} alt={person.person.name} />
                      <StaffInfo>
                        <StaffName theme={theme}>{person.person.name}</StaffName>
                        <StaffPosition theme={theme}>{person.positions.join(', ')}</StaffPosition>
                      </StaffInfo>
                    </StaffCard>
                  ))}
                </StaffGrid>
              )}
            </Section>
          )}
          
          {reviews.length > 0 && (
            <Section>
              <SectionTitle 
                theme={theme} 
                onClick={() => toggleSection('reviews')}
                style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              >
                {t('anime.reviews')}
                <span>{expandedSections.reviews ? <FaChevronUp /> : <FaChevronDown />}</span>
              </SectionTitle>
              
              {expandedSections.reviews && (
                <ReviewList>
                  {reviews.map(review => (
                    <ReviewCard key={review.mal_id} theme={theme}>
                      <ReviewHeader>
                        <ReviewerInfo>
                          <ReviewerName theme={theme}>{review.user.username}</ReviewerName>
                          <ReviewDate theme={theme}>{new Date(review.date).toLocaleDateString()}</ReviewDate>
                        </ReviewerInfo>
                        <ReviewScore theme={theme}>{review.score} / 10</ReviewScore>
                      </ReviewHeader>
                      <ReviewContent theme={theme}>
                        {review.review.length > 300 && !expandedReviews.includes(review.mal_id) ? (
                          <>
                            {review.review.substring(0, 300)}...
                            <ExpandButton 
                              onClick={() => toggleReviewExpansion(review.mal_id)}
                              theme={theme}
                            >
                              {t('anime.read_more')}
                            </ExpandButton>
                          </>
                        ) : (
                          <>
                            {review.review}
                            {review.review.length > 300 && (
                              <ExpandButton 
                                onClick={() => toggleReviewExpansion(review.mal_id)}
                                theme={theme}
                              >
                                {t('anime.show_less')}
                              </ExpandButton>
                            )}
                          </>
                        )}
                      </ReviewContent>
                    </ReviewCard>
                  ))}
                  
                  {hasMoreReviews && (
                    <LoadMoreButton 
                      onClick={loadMoreReviews}
                      theme={theme}
                    >
                      {t('anime.load_more_reviews')}
                    </LoadMoreButton>
                  )}
                </ReviewList>
              )}
            </Section>
          )}
        </>
      ) : null}
    </Container>
  );
}

export default AnimeDetailsPage; 