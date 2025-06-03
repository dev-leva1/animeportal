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

const HistoryItem = styled(Link)<{ theme: string }>`
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

const HistoryImage = styled.div<{ imageUrl: string }>`
  height: 120px;
  background-image: url(${props => props.imageUrl});
  background-size: cover;
  background-position: center;
  background-color: #333;
`;

const HistoryInfo = styled.div<{ theme: string }>`
  padding: 0.75rem;
  background-color: ${props => props.theme === 'dark' ? '#1a1a1a' : '#ffffff'};
`;

const HistoryTitle = styled.h3<{ theme: string }>`
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#121212'};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const HistoryDate = styled.p<{ theme: string }>`
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

const ClearButton = styled.button<{ theme: string }>`
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
  theme: string;
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

export const WatchHistory: React.FC<WatchHistoryProps> = ({
  theme,
  history,
  onClearHistory,
  formatDate,
  labels,
  className
}) => {
  return (
    <div className={className}>
      <SectionHeader theme={theme}>
        <SectionTitle theme={theme}>
          <FaHistory />
          {labels.title}
        </SectionTitle>
        {history.length > 0 && (
          <ClearButton onClick={onClearHistory} theme={theme}>
            <FaTrash />
            {labels.clear}
          </ClearButton>
        )}
      </SectionHeader>

      {history.length === 0 ? (
        <EmptyState theme={theme}>
          {labels.empty}
        </EmptyState>
      ) : (
        <HistoryGrid>
          {history.map((item) => (
            <HistoryItem 
              key={`${item.animeId}-${item.lastWatched}`}
              to={`/anime/${item.animeId}`}
              theme={theme}
            >
              <HistoryImage imageUrl={item.image} />
              <HistoryInfo theme={theme}>
                <HistoryTitle theme={theme}>{item.title}</HistoryTitle>
                <HistoryDate theme={theme}>
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