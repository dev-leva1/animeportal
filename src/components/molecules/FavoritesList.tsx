import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { FaHeart, FaStar } from 'react-icons/fa';

const FavoritesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
`;

const FavoriteItem = styled(Link)`
  text-decoration: none;
  color: inherit;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  background-color: ${props => props.theme.background.primary};
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const FavoriteImage = styled.div<{ imageUrl: string }>`
  height: 200px;
  background-image: url(${props => props.imageUrl});
  background-size: cover;
  background-position: center;
  background-color: #333;
  position: relative;
`;

const FavoriteRating = styled.div`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const FavoriteInfo = styled.div`
  padding: 0.75rem;
  background-color: ${props => props.theme.background.primary};
`;

const FavoriteTitle = styled.h3`
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.text.primary};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const FavoriteGenres = styled.p`
  font-size: 0.75rem;
  color: ${props => props.theme.text.muted};
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 2rem;
  color: ${props => props.theme.text.muted};
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  color: ${props => props.theme.text.primary};
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

interface FavoriteAnime {
  id: number;
  title: string;
  image: string;
  rating?: number;
  genres?: string[];
}

interface FavoritesListProps {
  favorites: FavoriteAnime[];
  labels: {
    title: string;
    empty: string;
  };
  className?: string;
}

export const FavoritesList: React.FC<FavoritesListProps> = ({ favorites,
  labels,
  className
}) => {
  return (
    <div className={className}>
      <SectionHeader>
        <SectionTitle>
          <FaHeart />
          {labels.title}
        </SectionTitle>
      </SectionHeader>

      {favorites.length === 0 ? (
        <EmptyState>
          {labels.empty}
        </EmptyState>
      ) : (
        <FavoritesGrid>
          {favorites.map((item) => (
            <FavoriteItem 
              key={item.id}
              to={`/anime/${item.id}`}
            >
              <FavoriteImage imageUrl={item.image}>
                {item.rating && (
                  <FavoriteRating>
                    <FaStar />
                    {item.rating}
                  </FavoriteRating>
                )}
              </FavoriteImage>
              <FavoriteInfo>
                <FavoriteTitle>{item.title}</FavoriteTitle>
                {item.genres && (
                  <FavoriteGenres>
                    {item.genres.slice(0, 2).join(', ')}
                  </FavoriteGenres>
                )}
              </FavoriteInfo>
            </FavoriteItem>
          ))}
        </FavoritesGrid>
      )}
    </div>
  );
};

export default FavoritesList; 