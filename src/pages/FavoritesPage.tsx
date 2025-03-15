import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { useApp } from '../context/ThemeContext';
import { favoritesService } from '../services/favoritesService';
import { Anime } from '../types/anime';
import AnimeCard from '../components/AnimeCard';

const PageTitle = styled.h1`
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#121212'};
  margin-bottom: 1.5rem;
  font-size: 2rem;
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

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  background-color: ${props => props.theme === 'dark' ? '#1e1e1e' : '#f5f5f5'};
  border-radius: 8px;
  color: ${props => props.theme === 'dark' ? '#aaa' : '#666'};
`;

const EmptyStateIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const EmptyStateText = styled.p`
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
`;

const EmptyStateLink = styled.a`
  display: inline-block;
  background-color: #ff5f5f;
  color: white;
  text-decoration: none;
  padding: 0.8rem 2rem;
  border-radius: 4px;
  font-weight: 500;
  transition: background-color 0.3s ease, transform 0.3s ease;
  
  &:hover {
    background-color: #ff4040;
    transform: translateY(-3px);
  }
`;

function FavoritesPage() {
  const { theme, t } = useApp();
  const [favorites, setFavorites] = useState<Anime[]>([]);
  
  useEffect(() => {
    const loadFavorites = () => {
      const favoritesData = favoritesService.getFavorites();
      setFavorites(favoritesData);
    };
    
    loadFavorites();
    
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'anime_favorites') {
        loadFavorites();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);
  
  return (
    <div>
      <PageTitle theme={theme}>{t('favorites.title')}</PageTitle>
      
      {favorites.length === 0 ? (
        <EmptyState theme={theme}>
          <EmptyStateIcon>🤔</EmptyStateIcon>
          <EmptyStateText>{t('favorites.empty')}</EmptyStateText>
          <EmptyStateLink href="/anime">{t('home.go_to_catalog')}</EmptyStateLink>
        </EmptyState>
      ) : (
        <AnimeGrid>
          {favorites.map(anime => (
            <AnimeCard 
              key={anime.id} 
              anime={anime} 
            />
          ))}
        </AnimeGrid>
      )}
    </div>
  );
}

export default FavoritesPage; 