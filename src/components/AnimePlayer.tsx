import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { useApp } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/authService';

interface AnimePlayerProps {
  animeId: number;
  title: string;
  image: string;
}

const PlayerContainer = styled.div`
  margin-bottom: 2rem;
`;

const VideoContainer = styled.div`
  position: relative;
  padding-top: 56.25%; /* 16:9 Aspect Ratio */
  background-color: #000;
  margin-bottom: 1rem;
  border-radius: 8px;
  overflow: hidden;
`;

const StyledVideo = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 8px;
`;

const PlayerControls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const EpisodeSelector = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Label = styled.label`
  font-weight: 500;
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#121212'};
`;

const Select = styled.select`
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid ${props => props.theme === 'dark' ? '#444' : '#ddd'};
  background-color: ${props => props.theme === 'dark' ? '#333' : '#f5f5f5'};
  color: ${props => props.theme === 'dark' ? '#fff' : '#333'};
  
  &:focus {
    outline: none;
    border-color: #ff5f5f;
  }
`;

const QualitySelector = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Message = styled.div`
  padding: 1rem;
  text-align: center;
  background-color: ${props => props.theme === 'dark' ? '#1a1a1a' : '#f5f5f5'};
  border-radius: 8px;
  color: ${props => props.theme === 'dark' ? '#aaa' : '#666'};
`;

function AnimePlayer({ animeId, title, image }: AnimePlayerProps) {
  const { theme, t } = useApp();
  const { isAuthenticated } = useAuth();
  const [currentEpisode, setCurrentEpisode] = useState(1);
  const [quality, setQuality] = useState('720p');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  
  const totalEpisodes = 12;
  const qualities = ['480p', '720p', '1080p'];
  
  // В реальном приложении здесь будет запрос к API
  const videoUrl = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
  
  useEffect(() => {
    if (isAuthenticated) {
      setIsLoading(true);
      setError('');
      
      const timer = setTimeout(() => {
        setIsLoading(false);
        
        authService.addToWatchHistory({
          animeId: animeId || 0,
          title: title || '',
          image: image || '',
          lastWatched: new Date().toISOString(),
          episodeNumber: currentEpisode
        });
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [animeId, currentEpisode, quality, isAuthenticated, title, image]);
  
  const handleEpisodeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentEpisode(Number(e.target.value));
  };
  
  const handleQualityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQuality(e.target.value);
  };
  
  if (!isAuthenticated) {
    return (
      <Message theme={theme}>
        {t('player.login_required')}
      </Message>
    );
  }
  
  return (
    <PlayerContainer>
      <VideoContainer>
        {isLoading ? (
          <Message theme={theme}>
            {t('player.loading')}
          </Message>
        ) : error ? (
          <Message theme={theme}>
            {error}
          </Message>
        ) : (
          <StyledVideo 
            controls 
            autoPlay 
            src={videoUrl}
            poster={image || ''}
          />
        )}
      </VideoContainer>
      
      <PlayerControls>
        <EpisodeSelector>
          <Label theme={theme}>{t('player.episode')}</Label>
          <Select 
            value={currentEpisode} 
            onChange={handleEpisodeChange}
            theme={theme}
          >
            {Array.from({ length: totalEpisodes }, (_, i) => i + 1).map(ep => (
              <option key={ep} value={ep}>
                {ep}
              </option>
            ))}
          </Select>
        </EpisodeSelector>
        
        <QualitySelector>
          <Label theme={theme}>{t('player.quality')}</Label>
          <Select 
            value={quality} 
            onChange={handleQualityChange}
            theme={theme}
          >
            {qualities.map(q => (
              <option key={q} value={q}>
                {q}
              </option>
            ))}
          </Select>
        </QualitySelector>
      </PlayerControls>
    </PlayerContainer>
  );
}

export default AnimePlayer; 