import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { FaHistory, FaTrash } from 'react-icons/fa';
import { WatchHistory as WatchHistoryType } from '../../types/user';

const HistoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
`;

const HistoryItem = styled(Link)`
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

const HistoryImage = styled.div<{ imageUrl: string }>`
  height: 120px;
  background-image: url(${props => props.imageUrl});
  background-size: cover;
  background-position: center;
  background-color: #333;
`;

const HistoryInfo = styled.div`
  padding: 0.75rem;
  background-color: ${props => props.theme.background.primary};
`;

const HistoryTitle = styled.h3`
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.text.primary};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const HistoryDate = styled.p`
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

const ClearButton = styled.button`
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  border: none;
  background-color: #666;
  color: white;
  font-size: 0.875rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #555;
  }
`;

interface WatchHistoryProps {
  history: WatchHistoryType[];
  onClearHistory: () => void;
  formatDate: (dateString: string) => string;
  labels: {
    title: string;
    clear: string;
    empty: string;
  };
  className?: string;
}

export const WatchHistory: React.FC<WatchHistoryProps> = ({ history,
  onClearHistory,
  formatDate,
  labels,
  className
}) => {
  return (
    <div className={className}>
      <SectionHeader>
        <SectionTitle>
          <FaHistory />
          {labels.title}
        </SectionTitle>
        {history.length > 0 && (
          <ClearButton onClick={onClearHistory}>
            <FaTrash />
            {labels.clear}
          </ClearButton>
        )}
      </SectionHeader>

      {history.length === 0 ? (
        <EmptyState>
          {labels.empty}
        </EmptyState>
      ) : (
        <HistoryGrid>
          {history.map((item) => (
            <HistoryItem 
              key={`${item.animeId}-${item.lastWatched}`}
              to={`/anime/${item.animeId}`}
            >
              <HistoryImage imageUrl={item.image} />
              <HistoryInfo>
                <HistoryTitle>{item.title}</HistoryTitle>
                <HistoryDate>
                  {formatDate(item.lastWatched)}
                  {item.episodeNumber && ` • Эпизод ${item.episodeNumber}`}
                </HistoryDate>
              </HistoryInfo>
            </HistoryItem>
          ))}
        </HistoryGrid>
      )}
    </div>
  );
};

export default WatchHistory; 