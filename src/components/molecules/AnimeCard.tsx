import { Link } from 'react-router-dom';
import { Anime, WatchStatus } from '../../types/anime';
import { useApp } from '../../context/ThemeContext';
import { favoritesService } from '../../services/favoritesService';
import { useState, useCallback, memo } from 'react';
import { FaHeart, FaRegHeart, FaStar, FaEye, FaClock, FaCheck, FaPause, FaTimesCircle } from 'react-icons/fa';
import { LazyImage, Badge, Card, Typography, Button } from '../atoms';

interface AnimeCardProps {
  anime: Anime;
}

const AnimeCard = memo(function AnimeCard({ anime }: AnimeCardProps) {
  const { theme } = useApp();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isStatusMenuOpen, setIsStatusMenuOpen] = useState(false);
  const [currentStatus, setCurrentStatus] = useState<WatchStatus>(null);

  const toggleFavorite = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isFavorite) {
      favoritesService.removeFromFavorites(anime.mal_id || anime.id || 0);
      setIsFavorite(false);
      setCurrentStatus(null);
    } else {
      favoritesService.addToFavorites(anime);
      setIsFavorite(true);
    }
  }, [anime, isFavorite]);

  const toggleStatusMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsStatusMenuOpen(!isStatusMenuOpen);
  }, [isStatusMenuOpen]);

  const handleStatusChange = useCallback((status: WatchStatus) => {
    setCurrentStatus(status);
    setIsStatusMenuOpen(false);
  }, []);

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
    switch(status) {
      case 'watching': return 'Смотрю';
      case 'planned': return 'Запланировано';
      case 'completed': return 'Просмотрено';
      case 'on_hold': return 'Отложено';
      case 'dropped': return 'Брошено';
      default: return '';
    }
  };

  return (
    <Link to={`/anime/${anime.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <Card variant="elevated" style={{ height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
        <div style={{ 
          position: 'relative', 
          paddingTop: '140%', 
          overflow: 'hidden', 
          borderRadius: '8px 8px 0 0' 
        }}>
          <LazyImage
            src={anime.images?.jpg?.image_url || anime.image_url || ''}
            alt={anime.title}
            style={{ 
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
          
          <Button
            variant="ghost"
            size="small"
            onClick={toggleFavorite}
            style={{
              position: 'absolute',
              top: '0.5rem',
              right: '0.5rem',
              background: 'rgba(0, 0, 0, 0.5)',
              borderRadius: '50%',
              width: '2rem',
              height: '2rem',
              minWidth: '2rem',
              padding: 0,
              color: isFavorite ? '#ff5f5f' : '#ffffff',
              fontSize: '1.2rem',
              zIndex: 2
            }}
          >
            {isFavorite ? <FaHeart /> : <FaRegHeart />}
          </Button>
          
          {currentStatus && (
            <Badge
              variant="primary"
              style={{
                position: 'absolute',
                top: '0.5rem',
                left: '0.5rem',
                zIndex: 2,
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
                cursor: 'pointer'
              }}
              onClick={toggleStatusMenu}
            >
              {getStatusIcon(currentStatus)}
              {getStatusText(currentStatus)}
            </Badge>
          )}
          
          {isStatusMenuOpen && (
            <div style={{
              position: 'absolute',
              top: '3rem',
              right: '0.5rem',
              background: theme === 'dark' ? '#1a1a1a' : '#ffffff',
              borderRadius: '4px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
              overflow: 'hidden',
              zIndex: 3,
              width: '150px'
            }}>
              {(['watching', 'planned', 'completed', 'on_hold', 'dropped'] as WatchStatus[]).map(status => (
                <Button
                  key={status}
                  variant="ghost"
                  size="small"
                  onClick={() => handleStatusChange(status)}
                  style={{
                    width: '100%',
                    justifyContent: 'flex-start',
                    padding: '0.5rem 1rem',
                    borderRadius: 0,
                    gap: '0.5rem'
                  }}
                >
                  {getStatusIcon(status)}
                  {getStatusText(status)}
                </Button>
              ))}
            </div>
          )}
        </div>
        
        <div style={{ 
          padding: '1rem', 
          flexGrow: 1, 
          display: 'flex', 
          flexDirection: 'column' 
        }}>
          <Typography 
            variant="body-lg" 
            weight="medium" 
            style={{ 
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              marginBottom: '0.5rem'
            }}
          >
            {anime.title}
          </Typography>
          
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            marginTop: 'auto', 
            paddingTop: '0.5rem' 
          }}>
            <Typography 
              variant="body-sm" 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.25rem',
                fontWeight: 500
              }}
            >
              <FaStar style={{ color: '#ff5f5f' }} />
              {anime.score ? anime.score.toFixed(1) : 'N/A'}
            </Typography>
            
            <Typography 
              variant="body-sm" 
              style={{ 
                color: theme === 'dark' ? '#aaa' : '#666' 
              }}
            >
              {anime.episodes} эп.
            </Typography>
          </div>
        </div>
      </Card>
    </Link>
  );
});

export default AnimeCard; 