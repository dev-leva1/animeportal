import axios from 'axios';
import { AnimeResponse, AnimeDetailsResponse, Anime } from '../types/anime';

const API_BASE_URL = 'https://api.jikan.moe/v4';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const retryWithBackoff = async <T>(
  fn: () => Promise<T>,
  retries = 3,
  initialDelay = 1000,
  maxDelay = 10000
): Promise<T> => {
  let currentDelay = initialDelay;
  
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (error: any) {
      if (i === retries - 1 || (error.response && error.response.status !== 429)) {
        throw error;
      }
      
      await delay(currentDelay);
      currentDelay = Math.min(currentDelay * 2, maxDelay);
    }
  }
  
  throw new Error('Превышено максимальное количество попыток');
};

const mapAnimeData = (apiData: any): Anime => {
  return {
    id: apiData.mal_id,
    title: apiData.title,
    title_japanese: apiData.title_japanese,
    image_url: apiData.images?.jpg?.image_url || apiData.images?.webp?.image_url || '',
    synopsis: apiData.synopsis || '',
    episodes: apiData.episodes || 0,
    score: apiData.score || null,
    aired: apiData.aired,
    status: apiData.status || '',
    genres: apiData.genres || [],
    studios: apiData.studios || [],
    source: apiData.source || '',
    rating: apiData.rating || '',
    duration: apiData.duration || '',
    trailer_url: apiData.trailer?.embed_url || ''
  };
};

export const animeService = {
  async getAnimeList(page: number = 1, limit: number = 20): Promise<AnimeResponse> {
    try {
      await delay(1000);
      
      return await retryWithBackoff(async () => {
        const response = await axios.get(`${API_BASE_URL}/anime`, {
          params: {
            page,
            limit,
            order_by: 'score',
            sort: 'desc',
            status: 'complete'
          }
        });
        
        return {
          data: response.data.data.map(mapAnimeData),
          pagination: response.data.pagination
        };
      });
    } catch (error) {
      console.error('Error fetching anime list:', error);
      throw error;
    }
  },

  async searchAnime(query: string, page: number = 1): Promise<AnimeResponse> {
    try {
      await delay(1500);
      
      return await retryWithBackoff(async () => {
        const response = await axios.get(`${API_BASE_URL}/anime`, {
          params: {
            q: query,
            page,
            limit: 20
          }
        });
        
        return {
          data: response.data.data.map(mapAnimeData),
          pagination: response.data.pagination
        };
      });
    } catch (error) {
      console.error('Error searching anime:', error);
      throw error;
    }
  },

  async getAnimeById(id: number): Promise<AnimeDetailsResponse> {
    try {
      await delay(500);
      
      return await retryWithBackoff(async () => {
        const response = await axios.get(`${API_BASE_URL}/anime/${id}`);
        
        return {
          data: mapAnimeData(response.data.data)
        };
      });
    } catch (error) {
      console.error(`Error fetching anime with id ${id}:`, error);
      throw error;
    }
  },

  async getTopAnime(page: number = 1): Promise<AnimeResponse> {
    try {
      return await retryWithBackoff(async () => {
        const response = await axios.get(`${API_BASE_URL}/top/anime`, {
          params: {
            page,
            limit: 20
          }
        });
        
        return {
          data: response.data.data.map(mapAnimeData),
          pagination: response.data.pagination
        };
      });
    } catch (error) {
      console.error('Error fetching top anime:', error);
      throw error;
    }
  },

  async getAnimeByGenre(genreId: number, page: number = 1): Promise<AnimeResponse> {
    try {
      await delay(1200);
      
      return await retryWithBackoff(async () => {
        const response = await axios.get(`${API_BASE_URL}/anime`, {
          params: {
            genres: genreId,
            page,
            limit: 20
          }
        });
        
        return {
          data: response.data.data.map(mapAnimeData),
          pagination: response.data.pagination
        };
      });
    } catch (error) {
      console.error(`Error fetching anime by genre ${genreId}:`, error);
      throw error;
    }
  },

  async getSeasonalAnime(page: number = 1): Promise<AnimeResponse> {
    try {
      const date = new Date();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      
      let season = 'winter';
      if (month >= 3 && month <= 5) {
        season = 'spring';
      } else if (month >= 6 && month <= 8) {
        season = 'summer';
      } else if (month >= 9 && month <= 11) {
        season = 'fall';
      }
      
      await delay(1000);
      
      return await retryWithBackoff(async () => {
        const response = await axios.get(`${API_BASE_URL}/seasons/${year}/${season}`, {
          params: {
            page,
            limit: 20
          }
        });
        
        return {
          data: response.data.data.map(mapAnimeData),
          pagination: response.data.pagination
        };
      });
    } catch (error) {
      console.error('Error fetching seasonal anime:', error);
      throw error;
    }
  },

  async getRecommendedAnime(page: number = 1): Promise<AnimeResponse> {
    try {
      await delay(2000);
      
      return await retryWithBackoff(async () => {
        const response = await axios.get(`${API_BASE_URL}/anime`, {
          params: {
            page,
            limit: 20,
            order_by: 'score',
            sort: 'desc',
            min_score: 8.5
          }
        });
        
        return {
          data: response.data.data.map(mapAnimeData),
          pagination: response.data.pagination
        };
      });
    } catch (error) {
      console.error('Error fetching recommended anime:', error);
      throw error;
    }
  }
}; 