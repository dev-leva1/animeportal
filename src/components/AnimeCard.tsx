import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { Anime } from '../types/anime';
import { useApp } from '../context/ThemeContext';
import { favoritesService } from '../services/favoritesService';
import { useState } from 'react';

interface AnimeCardProps {
  anime: Anime;
}

interface FavoriteButtonProps {
  isFavorite: boolean;
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
  
  &::before {
    content: '★';
    color: #ffc107;
    margin-right: 0.25rem;
  }
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

function AnimeCard({ anime }: AnimeCardProps) {
  const { theme, t } = useApp();
  const [isFavorite, setIsFavorite] = useState(favoritesService.isFavorite(anime.id));
  
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isFavorite) {
      favoritesService.removeFromFavorites(anime.id);
    } else {
      favoritesService.addToFavorites(anime);
    }
    
    setIsFavorite(!isFavorite);
  };
  
  return (
    <Link to={`/anime/${anime.id}`} style={{ textDecoration: 'none' }}>
      <Card theme={theme}>
        <ImageContainer>
          <AnimeImage src={anime.image_url} alt={anime.title} />
          <FavoriteButton 
            onClick={handleFavoriteClick} 
            isFavorite={isFavorite}
            aria-label={isFavorite ? t('details.remove_from_favorites') : t('details.add_to_favorites')}
          >
            {isFavorite ? '♥' : '♡'}
          </FavoriteButton>
        </ImageContainer>
        <CardContent>
          <Title theme={theme}>{anime.title}</Title>
          <Info>
            <Score theme={theme}>{anime.score ? anime.score.toFixed(1) : 'N/A'}</Score>
            <Episodes theme={theme}>{anime.episodes} {t('anime.episodes')}</Episodes>
          </Info>
        </CardContent>
      </Card>
    </Link>
  );
}

export default AnimeCard; 