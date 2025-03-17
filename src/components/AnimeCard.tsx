import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { Anime, WatchStatus } from '../types/anime';
import { useApp } from '../context/ThemeContext';
import { favoritesService } from '../services/favoritesService';
import { useState } from 'react';
import { FaHeart, FaRegHeart, FaStar, FaEye, FaClock, FaCheck, FaPause, FaTimesCircle } from 'react-icons/fa';

interface AnimeCardProps {
  anime: Anime;
}

interface FavoriteButtonProps {
  isFavorite: boolean;
  theme?: string;
}

interface StatusBadgeProps {
  status: WatchStatus;
  theme?: string;
}

const Card = styled.div`
  background-color: ${props => props.theme === 'dark' ? '#1e1e1e' : '#ffffff'};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const ImageContainer = styled.div`
  position: relative;
  padding-top: 140%;
  overflow: hidden;
`;

const AnimeImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
  
  ${Card}:hover & {
    transform: scale(1.05);
  }
`;

const CardContent = styled.div`
  padding: 1rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  margin: 0 0 0.5rem;
  font-size: 1rem;
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#121212'};
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const Info = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding-top: 0.5rem;
`;

const Score = styled.span`
  display: flex;
  align-items: center;
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#121212'};
  font-weight: 500;
  gap: 0.25rem;
`;

const Episodes = styled.span`
  color: ${props => props.theme === 'dark' ? '#aaa' : '#666'};
  font-size: 0.9rem;
`;

const FavoriteButton = styled.button<FavoriteButtonProps>`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: rgba(0, 0, 0, 0.5);
  border: none;
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${props => props.isFavorite ? '#ff5f5f' : '#ffffff'};
  font-size: 1.2rem;
  transition: background-color 0.3s ease, transform 0.3s ease;
  z-index: 2;
  
  &:hover {
    background: rgba(0, 0, 0, 0.7);
    transform: scale(1.1);
  }
`;

const StatusBadge = styled.div<StatusBadgeProps>`
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
  background: rgba(0, 0, 0, 0.7);
  border: none;
  border-radius: 4px;
  padding: 0.25rem 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: ${props => {
    switch(props.status) {
      case 'watching': return '#4caf50';
      case 'planned': return '#2196f3';
      case 'completed': return '#9c27b0';
      case 'on_hold': return '#ff9800';
      case 'dropped': return '#f44336';
      default: return '#ffffff';
    }
  }};
  font-size: 0.8rem;
  z-index: 2;
`;

const StatusMenu = styled.div`
  position: absolute;
  top: 3rem;
  right: 0.5rem;
  background: ${props => props.theme === 'dark' ? '#1a1a1a' : '#ffffff'};
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  z-index: 3;
  width: 150px;
`;

const StatusMenuItem = styled.button`
  width: 100%;
  padding: 0.5rem 1rem;
  text-align: left;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#121212'};
  
  &:hover {
    background-color: ${props => props.theme === 'dark' ? '#333' : '#f0f0f0'};
  }
`;

function AnimeCard({ anime }: AnimeCardProps) {
  const { theme, t } = useApp();
  const [isFavorite, setIsFavorite] = useState(favoritesService.isFavorite(anime.mal_id));
  const [watchStatus, setWatchStatus] = useState<WatchStatus>(
    favoritesService.getWatchStatus(anime.mal_id)
  );
  const [showStatusMenu, setShowStatusMenu] = useState(false);
  
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isFavorite) {
      favoritesService.removeFromFavorites(anime.mal_id);
      setIsFavorite(false);
      setWatchStatus(null);
    } else {
      favoritesService.addToFavorites(anime);
      setIsFavorite(true);
    }
  };
  
  const handleStatusClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowStatusMenu(!showStatusMenu);
  };
  
  const handleStatusChange = (e: React.MouseEvent, status: WatchStatus) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isFavorite) {
      favoritesService.addToFavorites(anime, status);
      setIsFavorite(true);
    } else {
      favoritesService.updateWatchStatus(anime.mal_id, status);
    }
    
    setWatchStatus(status);
    setShowStatusMenu(false);
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
  
  return (
    <Link to={`/anime/${anime.mal_id}`} style={{ textDecoration: 'none' }}>
      <Card theme={theme}>
        <ImageContainer>
          <AnimeImage src={anime.image_url} alt={anime.title} />
          <FavoriteButton 
            onClick={handleFavoriteClick} 
            isFavorite={isFavorite}
            aria-label={isFavorite ? t('details.remove_from_favorites') : t('details.add_to_favorites')}
          >
            {isFavorite ? <FaHeart /> : <FaRegHeart />}
          </FavoriteButton>
          
          {isFavorite && (
            <StatusBadge 
              status={watchStatus} 
              theme={theme}
              onClick={handleStatusClick}
            >
              {watchStatus ? getStatusIcon(watchStatus) : t('favorites.set_status')}
            </StatusBadge>
          )}
          
          {showStatusMenu && (
            <StatusMenu theme={theme}>
              <StatusMenuItem 
                theme={theme} 
                onClick={(e) => handleStatusChange(e, 'watching')}
              >
                <FaEye color="#4caf50" />
                {t('favorites.status.watching')}
              </StatusMenuItem>
              <StatusMenuItem 
                theme={theme} 
                onClick={(e) => handleStatusChange(e, 'planned')}
              >
                <FaClock color="#2196f3" />
                {t('favorites.status.planned')}
              </StatusMenuItem>
              <StatusMenuItem 
                theme={theme} 
                onClick={(e) => handleStatusChange(e, 'completed')}
              >
                <FaCheck color="#9c27b0" />
                {t('favorites.status.completed')}
              </StatusMenuItem>
              <StatusMenuItem 
                theme={theme} 
                onClick={(e) => handleStatusChange(e, 'on_hold')}
              >
                <FaPause color="#ff9800" />
                {t('favorites.status.on_hold')}
              </StatusMenuItem>
              <StatusMenuItem 
                theme={theme} 
                onClick={(e) => handleStatusChange(e, 'dropped')}
              >
                <FaTimesCircle color="#f44336" />
                {t('favorites.status.dropped')}
              </StatusMenuItem>
              {watchStatus && (
                <StatusMenuItem 
                  theme={theme} 
                  onClick={(e) => handleStatusChange(e, null)}
                >
                  {t('favorites.no_status')}
                </StatusMenuItem>
              )}
            </StatusMenu>
          )}
        </ImageContainer>
        <CardContent>
          <Title theme={theme}>{anime.title}</Title>
          <Info>
            <Score theme={theme}>
              <FaStar style={{ color: '#ffc107' }} />
              {anime.score ? anime.score.toFixed(1) : 'N/A'}
            </Score>
            <Episodes theme={theme}>{anime.episodes} {t('anime.episodes')}</Episodes>
          </Info>
        </CardContent>
      </Card>
    </Link>
  );
}

export default AnimeCard; 