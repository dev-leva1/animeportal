import { useState, useEffect, memo } from 'react';
import { useApp } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { authService } from '../../services/authService';
import { Card, Typography } from '../atoms';
import { useTheme } from '../../hooks/useTheme';

interface AnimePlayerProps {
  animeId: number;
  title: string;
  image: string;
}

const AnimePlayer = memo(function AnimePlayer({ animeId, title, image }: AnimePlayerProps) {
  const theme = useTheme();
  const { t } = useApp();
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
      <Card style={{ marginBottom: '2rem' }}>
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <Typography variant="body-lg" color="muted">
            {t('player.login_required')}
          </Typography>
        </div>
      </Card>
    );
  }
  
  return (
    <div style={{ marginBottom: '2rem' }}>
      <Card style={{ marginBottom: '1rem' }}>
        <div style={{
          position: 'relative',
          paddingTop: '56.25%', // 16:9 Aspect Ratio
          backgroundColor: '#000',
          borderRadius: '8px',
          overflow: 'hidden'
        }}>
          {isLoading ? (
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center'
            }}>
              <Typography variant="body-lg" color="muted">
                {t('player.loading')}
              </Typography>
            </div>
          ) : error ? (
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center'
            }}>
              <Typography variant="body-lg" color="error">
                {error}
              </Typography>
            </div>
          ) : (
            <video 
              controls 
              autoPlay 
              src={videoUrl}
              poster={image || ''}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                borderRadius: '8px'
              }}
            />
          )}
        </div>
      </Card>
      
      <Card>
        <div style={{
          padding: '1rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem',
          flexWrap: 'wrap'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Typography variant="body-md" weight="medium">
              {t('player.episode')}
            </Typography>
            <select 
              value={currentEpisode} 
              onChange={handleEpisodeChange}
              style={{
                padding: '0.5rem',
                borderRadius: '4px',
                border: `1px solid ${theme.mode === 'dark' ? '#444' : '#ddd'}`,
                backgroundColor: theme.mode === 'dark' ? '#333' : '#f5f5f5',
                color: theme.mode === 'dark' ? '#fff' : '#333'
              }}
            >
              {Array.from({ length: totalEpisodes }, (_, i) => i + 1).map(ep => (
                <option key={ep} value={ep}>
                  {ep}
                </option>
              ))}
            </select>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Typography variant="body-md" weight="medium">
              {t('player.quality')}
            </Typography>
            <select 
              value={quality} 
              onChange={handleQualityChange}
              style={{
                padding: '0.5rem',
                borderRadius: '4px',
                border: `1px solid ${theme.mode === 'dark' ? '#444' : '#ddd'}`,
                backgroundColor: theme.mode === 'dark' ? '#333' : '#f5f5f5',
                color: theme.mode === 'dark' ? '#fff' : '#333'
              }}
            >
              {qualities.map(q => (
                <option key={q} value={q}>
                  {q}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Card>
    </div>
  );
});

export default AnimePlayer; 