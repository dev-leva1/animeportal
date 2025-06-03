import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { useApp } from '../context/ThemeContext';
import { animeService } from '../services/animeService';
import { Anime } from '../types/anime';
import { AnimeCard, LoadingFallback, ErrorMessage } from '../components';
import React from 'react';

const HeroSection = styled.section`
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), 
              url('https://cdn.myanimelist.net/images/anime/5/87048l.jpg') center/cover no-repeat;
  color: white;
  padding: 4rem 2rem;
  text-align: center;
  border-radius: 8px;
  margin-bottom: 2rem;
`;

const HeroTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  max-width: 800px;
  margin: 0 auto 2rem;
  opacity: 0.9;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const HeroButton = styled(Link)`
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

const SectionTitle = styled.h2`
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#121212'};
  margin: 2rem 0 1.5rem;
  font-size: 1.8rem;
  position: relative;
  padding-bottom: 0.5rem;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 50px;
    height: 3px;
    background-color: #ff5f5f;
  }
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const AnimeGrid = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 1.5rem;
  padding: 1rem 0;
  scroll-behavior: smooth;
  scrollbar-width: none; /* Firefox */
  
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
  
  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

const AnimeCardWrapper = styled.div`
  flex: 0 0 auto;
  width: 200px;
  
  @media (max-width: 768px) {
    width: 150px;
  }
`;

const ScrollButton = styled.button<{ direction: 'left' | 'right' }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${props => props.direction === 'left' ? 'left: -15px;' : 'right: -15px;'}
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(255, 95, 95, 0.9);
  color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s ease, transform 0.3s ease;
  
  &:hover {
    background-color: #ff4040;
    transform: translateY(-50%) scale(1.1);
  }
  
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
  
  &::before {
    content: ${props => props.direction === 'left' ? '"\\2039"' : '"\\203A"'};
    font-size: 1.5rem;
    font-weight: bold;
  }
`;

const SectionContainer = styled.div`
  position: relative;
  margin-bottom: 2rem;
`;

const ViewAllLink = styled(Link)`
  color: #ff5f5f;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
  
  &:hover {
    color: #ff4040;
    text-decoration: underline;
  }
`;

function HomePage() {
  const { theme, t } = useApp();
  const [topAnime, setTopAnime] = useState<Anime[]>([]);
  const [seasonalAnime, setSeasonalAnime] = useState<Anime[]>([]);
  const [recommendedAnime, setRecommendedAnime] = useState<Anime[]>([]);
  const [loading, setLoading] = useState({
    top: true,
    seasonal: true,
    recommended: true
  });
  const [error, setError] = useState<{
    top: string | null,
    seasonal: string | null,
    recommended: string | null
  }>({
    top: null,
    seasonal: null,
    recommended: null
  });
  
  const topAnimeRef = React.useRef<HTMLDivElement>(null);
  const seasonalAnimeRef = React.useRef<HTMLDivElement>(null);
  const recommendedAnimeRef = React.useRef<HTMLDivElement>(null);
  
  type ScrollRef = typeof topAnimeRef;
  
  const scroll = (ref: ScrollRef, direction: 'left' | 'right') => {
    if (ref.current) {
      const container = ref.current;
      const scrollAmount = direction === 'left' ? -container.offsetWidth : container.offsetWidth;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(prev => ({ ...prev, top: true }));
        const topResponse = await animeService.getTopAnime();
        setTopAnime(topResponse.data.slice(0, 8));
        setError(prev => ({ ...prev, top: null }));
      } catch (err) {
        console.error('Error fetching top anime:', err);
        setError(prev => ({ 
          ...prev, 
          top: 'Не удалось загрузить список популярных аниме. API имеет ограничение на количество запросов. Пожалуйста, попробуйте позже.' 
        }));
      } finally {
        setLoading(prev => ({ ...prev, top: false }));
      }

      try {
        setLoading(prev => ({ ...prev, seasonal: true }));
        const seasonalResponse = await animeService.getSeasonalAnime();
        setSeasonalAnime(seasonalResponse.data.slice(0, 8));
        setError(prev => ({ ...prev, seasonal: null }));
      } catch (err) {
        console.error('Error fetching seasonal anime:', err);
        setError(prev => ({ 
          ...prev, 
          seasonal: 'Не удалось загрузить список сезонного аниме. API имеет ограничение на количество запросов. Пожалуйста, попробуйте позже.' 
        }));
      } finally {
        setLoading(prev => ({ ...prev, seasonal: false }));
      }

      try {
        setLoading(prev => ({ ...prev, recommended: true }));
        const recommendedResponse = await animeService.getRecommendedAnime();
        setRecommendedAnime(recommendedResponse.data.slice(0, 8));
        setError(prev => ({ ...prev, recommended: null }));
      } catch (err) {
        console.error('Error fetching recommended anime:', err);
        setError(prev => ({ 
          ...prev, 
          recommended: 'Не удалось загрузить список рекомендованного аниме. API имеет ограничение на количество запросов. Пожалуйста, попробуйте позже.' 
        }));
      } finally {
        setLoading(prev => ({ ...prev, recommended: false }));
      }
    };
    
    fetchData();
  }, []);
  
  const handleRetry = (section: 'top' | 'seasonal' | 'recommended') => {
    setError(prev => ({ ...prev, [section]: null }));
    setLoading(prev => ({ ...prev, [section]: true }));
    
    if (section === 'top') {
      animeService.getTopAnime()
        .then(response => {
          setTopAnime(response.data.slice(0, 8));
        })
        .catch(err => {
          setError(prev => ({ 
            ...prev, 
            top: 'Не удалось загрузить список популярных аниме. API имеет ограничение на количество запросов. Пожалуйста, попробуйте позже.' 
          }));
          console.error('Error retrying top anime fetch:', err);
        })
        .finally(() => {
          setLoading(prev => ({ ...prev, top: false }));
        });
    } else if (section === 'seasonal') {
      animeService.getSeasonalAnime()
        .then(response => {
          setSeasonalAnime(response.data.slice(0, 8));
        })
        .catch(err => {
          setError(prev => ({ 
            ...prev, 
            seasonal: 'Не удалось загрузить список сезонного аниме. API имеет ограничение на количество запросов. Пожалуйста, попробуйте позже.' 
          }));
          console.error('Error retrying seasonal anime fetch:', err);
        })
        .finally(() => {
          setLoading(prev => ({ ...prev, seasonal: false }));
        });
    } else if (section === 'recommended') {
      animeService.getRecommendedAnime()
        .then(response => {
          setRecommendedAnime(response.data.slice(0, 8));
        })
        .catch(err => {
          setError(prev => ({ 
            ...prev, 
            recommended: 'Не удалось загрузить список рекомендованного аниме. API имеет ограничение на количество запросов. Пожалуйста, попробуйте позже.' 
          }));
          console.error('Error retrying recommended anime fetch:', err);
        })
        .finally(() => {
          setLoading(prev => ({ ...prev, recommended: false }));
        });
    }
  };
  
  return (
    <div>
      <HeroSection>
        <HeroTitle>{t('home.welcome')}</HeroTitle>
        <HeroSubtitle>
          {t('home.subtitle')}
        </HeroSubtitle>
        <HeroButton to="/anime">{t('home.go_to_catalog')}</HeroButton>
      </HeroSection>
      
      <SectionHeader>
        <SectionTitle theme={theme}>{t('home.popular_anime')}</SectionTitle>
        <ViewAllLink to="/anime">{t('home.view_all')} &rarr;</ViewAllLink>
      </SectionHeader>
      
              {loading.top ? (
          <LoadingFallback />
      ) : error.top ? (
        <ErrorMessage message={error.top} onRetry={() => handleRetry('top')} />
      ) : (
        <SectionContainer>
          <ScrollButton 
            direction="left" 
            onClick={() => scroll(topAnimeRef, 'left')}
          />
          <AnimeGrid ref={topAnimeRef}>
            {topAnime.map((anime, index) => (
              <AnimeCardWrapper key={`top-${anime.id}-${index}`}>
                <AnimeCard anime={anime} />
              </AnimeCardWrapper>
            ))}
          </AnimeGrid>
          <ScrollButton 
            direction="right" 
            onClick={() => scroll(topAnimeRef, 'right')}
          />
        </SectionContainer>
      )}

      <SectionHeader>
        <SectionTitle theme={theme}>{t('home.seasonal_anime')}</SectionTitle>
        <ViewAllLink to="/anime">{t('home.view_all')} &rarr;</ViewAllLink>
      </SectionHeader>
      
              {loading.seasonal ? (
          <LoadingFallback />
      ) : error.seasonal ? (
        <ErrorMessage message={error.seasonal} onRetry={() => handleRetry('seasonal')} />
      ) : (
        <SectionContainer>
          <ScrollButton 
            direction="left" 
            onClick={() => scroll(seasonalAnimeRef, 'left')}
          />
          <AnimeGrid ref={seasonalAnimeRef}>
            {seasonalAnime.map((anime, index) => (
              <AnimeCardWrapper key={`seasonal-${anime.id}-${index}`}>
                <AnimeCard anime={anime} />
              </AnimeCardWrapper>
            ))}
          </AnimeGrid>
          <ScrollButton 
            direction="right" 
            onClick={() => scroll(seasonalAnimeRef, 'right')}
          />
        </SectionContainer>
      )}

      <SectionHeader>
        <SectionTitle theme={theme}>{t('home.recommended_anime')}</SectionTitle>
        <ViewAllLink to="/anime">{t('home.view_all')} &rarr;</ViewAllLink>
      </SectionHeader>
      
              {loading.recommended ? (
          <LoadingFallback />
      ) : error.recommended ? (
        <ErrorMessage message={error.recommended} onRetry={() => handleRetry('recommended')} />
      ) : (
        <SectionContainer>
          <ScrollButton 
            direction="left" 
            onClick={() => scroll(recommendedAnimeRef, 'left')}
          />
          <AnimeGrid ref={recommendedAnimeRef}>
            {recommendedAnime.map((anime, index) => (
              <AnimeCardWrapper key={`recommended-${anime.id}-${index}`}>
                <AnimeCard anime={anime} />
              </AnimeCardWrapper>
            ))}
          </AnimeGrid>
          <ScrollButton 
            direction="right" 
            onClick={() => scroll(recommendedAnimeRef, 'right')}
          />
        </SectionContainer>
      )}
    </div>
  );
}

export default HomePage; 