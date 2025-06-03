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

const FavoriteItem = styled(Link)<{ theme: string }>`
  text-decoration: none;
  color: inherit;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  background-color: ${props => props.theme === 'dark' ? '#1a1a1a' : '#ffffff'};
  
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

const FavoriteInfo = styled.div<{ theme: string }>`
  padding: 0.75rem;
  background-color: ${props => props.theme === 'dark' ? '#1a1a1a' : '#ffffff'};
`;

const FavoriteTitle = styled.h3<{ theme: string }>`
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#121212'};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const FavoriteGenres = styled.p<{ theme: string }>`
  font-size: 0.75rem;
  color: ${props => props.theme === 'dark' ? '#aaa' : '#666'};
`;

const EmptyState = styled.div<{ theme: string }>`
  text-align: center;
  padding: 2rem;
  color: ${props => props.theme === 'dark' ? '#aaa' : '#666'};
`;

const SectionHeader = styled.div<{ theme: string }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const SectionTitle = styled.h2<{ theme: string }>`
  font-size: 1.5rem;
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#121212'};
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
  theme: string;
  favorites: FavoriteAnime[];
  labels: {
    title: string;
    empty: string;
  };
  className?: string;
}

export const FavoritesList: React.FC<FavoritesListProps> = ({
  theme,
  favorites,
  labels,
  className
}) => {
  return (
    <div className={className}>
      <SectionHeader theme={theme}>
        <SectionTitle theme={theme}>
          <FaHeart />
          {labels.title}
        </SectionTitle>
      </SectionHeader>

      {favorites.length === 0 ? (
        <EmptyState theme={theme}>
          {labels.empty}
        </EmptyState>
      ) : (
        <FavoritesGrid>
          {favorites.map((item) => (
            <FavoriteItem 
              key={item.id}
              to={`/anime/${item.id}`}
              theme={theme}
            >
              <FavoriteImage imageUrl={item.image}>
                {item.rating && (
                  <FavoriteRating>
                    <FaStar />
                    {item.rating}
                  </FavoriteRating>
                )}
              </FavoriteImage>
              <FavoriteInfo theme={theme}>
                <FavoriteTitle theme={theme}>{item.title}</FavoriteTitle>
                {item.genres && (
                  <FavoriteGenres theme={theme}>
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