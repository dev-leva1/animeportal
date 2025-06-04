import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { useApp } from '../context/ThemeContext';
import { favoritesService } from '../services/favoritesService';
import { Anime, WatchStatus } from '../types/anime';
import { AnimeCard } from '../components';
import { FaEye, FaClock, FaCheck, FaPause, FaTimesCircle, FaFilter } from 'react-icons/fa';


const PageTitle = styled.h1`
  color: ${props => props.theme.text.primary};
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
  background-color: ${props => props.theme.background.secondary};
  border-radius: 8px;
  color: ${props => props.theme.text.muted};
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

const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 2rem;
  align-items: center;
`;

const FilterLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${props => props.theme.text.primary};
  font-weight: 500;
`;

interface FilterButtonProps {
  active: boolean;
  theme?: string;
  color?: string;
}

const FilterButton = styled.button<FilterButtonProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: none;
  background-color: ${props => props.active 
    ? props.color || (props.theme.mode === 'dark' ? '#444' : '#e0e0e0') 
    : props.theme.mode === 'dark' ? '#1e1e1e' : '#f5f5f5'};
  color: ${props => props.active 
    ? '#ffffff' 
    : props.theme.mode === 'dark' ? '#aaa' : '#666'};
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: ${props => props.active ? '500' : '400'};
  
  &:hover {
    background-color: ${props => props.active 
      ? props.color || (props.theme.mode === 'dark' ? '#555' : '#d0d0d0') 
      : props.theme.mode === 'dark' ? '#333' : '#e0e0e0'};
  }
`;

function FavoritesPage() {
  const { t } = useApp();
  const [favorites, setFavorites] = useState<Anime[]>([]);
  const [filteredFavorites, setFilteredFavorites] = useState<Anime[]>([]);
  const [activeFilter, setActiveFilter] = useState<WatchStatus | 'all'>('all');
  
  useEffect(() => {
    const loadFavorites = () => {
      const favoritesData = favoritesService.getFavorites();
      setFavorites(favoritesData);
      setFilteredFavorites(favoritesData);
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
  
  useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredFavorites(favorites);
    } else {
      setFilteredFavorites(favoritesService.getFavoritesByStatus(activeFilter));
    }
  }, [activeFilter, favorites]);
  
  const handleFilterChange = (status: WatchStatus | 'all') => {
    setActiveFilter(status);
  };
  
  const getStatusColor = (status: WatchStatus | 'all') => {
    switch(status) {
      case 'watching': return '#4caf50';
      case 'planned': return '#2196f3';
      case 'completed': return '#9c27b0';
      case 'on_hold': return '#ff9800';
      case 'dropped': return '#f44336';
      default: return undefined;
    }
  };
  
  
  return (
    <div>
      <PageTitle>{t('favorites.title')}</PageTitle>
      
      {favorites.length === 0 ? (
        <EmptyState>
          <EmptyStateIcon>🤔</EmptyStateIcon>
          <EmptyStateText>{t('favorites.empty')}</EmptyStateText>
          <EmptyStateLink href="/anime">{t('home.go_to_catalog')}</EmptyStateLink>
        </EmptyState>
      ) : (
        <>
          <FilterContainer>
            <FilterLabel>
              <FaFilter />
              {t('favorites.filter_by_status')}:
            </FilterLabel>
            
            <FilterButton 
              active={activeFilter === 'all'} 
              onClick={() => handleFilterChange('all')}
            >
              {t('favorites.all')}
            </FilterButton>
            
            <FilterButton 
              active={activeFilter === 'watching'} 
              color={getStatusColor('watching')}
              onClick={() => handleFilterChange('watching')}
            >
              <FaEye />
              {t('favorites.status.watching')}
            </FilterButton>
            
            <FilterButton 
              active={activeFilter === 'planned'} 
              color={getStatusColor('planned')}
              onClick={() => handleFilterChange('planned')}
            >
              <FaClock />
              {t('favorites.status.planned')}
            </FilterButton>
            
            <FilterButton 
              active={activeFilter === 'completed'} 
              color={getStatusColor('completed')}
              onClick={() => handleFilterChange('completed')}
            >
              <FaCheck />
              {t('favorites.status.completed')}
            </FilterButton>
            
            <FilterButton 
              active={activeFilter === 'on_hold'} 
              color={getStatusColor('on_hold')}
              onClick={() => handleFilterChange('on_hold')}
            >
              <FaPause />
              {t('favorites.status.on_hold')}
            </FilterButton>
            
            <FilterButton 
              active={activeFilter === 'dropped'} 
              color={getStatusColor('dropped')}
              onClick={() => handleFilterChange('dropped')}
            >
              <FaTimesCircle />
              {t('favorites.status.dropped')}
            </FilterButton>
            
            <FilterButton 
              active={activeFilter === null} 
              onClick={() => handleFilterChange(null)}
            >
              {t('favorites.no_status')}
            </FilterButton>
          </FilterContainer>
          
          {filteredFavorites.length === 0 ? (
            <EmptyState>
              <EmptyStateText>{t('favorites.empty')}</EmptyStateText>
            </EmptyState>
          ) : (
            <AnimeGrid>
              {filteredFavorites.map(anime => (
                <AnimeCard 
                  key={anime.mal_id || anime.id} 
                  anime={anime} 
                />
              ))}
            </AnimeGrid>
          )}
        </>
      )}
    </div>
  );
}

export default FavoritesPage; 