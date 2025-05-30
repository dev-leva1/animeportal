import axios from 'axios';
import { AnimeResponse, AnimeDetailsResponse, Anime, CharactersResponse, StaffResponse, ReviewsResponse, Character, StaffMember, Review } from '../types/anime';

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
    mal_id: apiData.mal_id,
    id: apiData.mal_id,
    title: apiData.title,
    title_english: apiData.title_english,
    title_japanese: apiData.title_japanese,
    image_url: apiData.images?.jpg?.image_url || apiData.images?.webp?.image_url || '',
    images: apiData.images || {
      jpg: {
        image_url: '',
        small_image_url: '',
        large_image_url: ''
      },
      webp: {
        image_url: '',
        small_image_url: '',
        large_image_url: ''
      }
    },
    synopsis: apiData.synopsis || '',
    episodes: apiData.episodes || 0,
    score: apiData.score || null,
    aired: apiData.aired || {
      from: '',
      to: null,
      string: ''
    },
    status: apiData.status || '',
    genres: apiData.genres || [],
    studios: apiData.studios || [],
    source: apiData.source || '',
    rating: apiData.rating || '',
    duration: apiData.duration || '',
    trailer_url: apiData.trailer?.embed_url || '',
    season: apiData.season || '',
    year: apiData.year || null,
    type: apiData.type || ''
  };
};

const mapCharacterData = (apiData: any): Character => {
  return {
    character: {
      mal_id: apiData.character.mal_id,
      name: apiData.character.name,
      images: apiData.character.images || {
        jpg: { image_url: '' },
        webp: { image_url: '' }
      }
    },
    role: apiData.role || '',
    voice_actors: apiData.voice_actors?.map((va: any) => ({
      id: va.person?.mal_id,
      name: va.person?.name || '',
      image_url: va.person?.images?.jpg?.image_url || '',
      language: va.language || ''
    })) || []
  };
};

const mapStaffData = (apiData: any): StaffMember => {
  return {
    person: {
      mal_id: apiData.person.mal_id,
      name: apiData.person.name,
      images: apiData.person.images || {
        jpg: { image_url: '' }
      }
    },
    positions: apiData.positions || []
  };
};

const mapReviewData = (apiData: any): Review => {
  return {
    mal_id: apiData.mal_id,
    user: {
      username: apiData.user.username,
      url: apiData.user.url,
      images: apiData.user.images || {
        jpg: { image_url: '' }
      }
    },
    review: apiData.review,
    score: apiData.score,
    date: apiData.date
  };
};

export interface AnimeSearchParams {
  query?: string;
  genres?: number[];
  year?: number;
  season?: string;
  status?: string;
  rating?: string;
  minScore?: number;
  maxScore?: number;
  type?: string;
  orderBy?: string;
  sort?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

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

  async searchAnime(params: string | AnimeSearchParams, page: number = 1): Promise<AnimeResponse> {
    try {
      await delay(1500);
      
      return await retryWithBackoff(async () => {
        let queryParams: any = {};
        
        if (typeof params === 'string') {
          queryParams = {
            q: params,
            page,
            limit: 20
          };
        } else {
          queryParams = {
            page: params.page || page,
            limit: params.limit || 20
          };
          
          if (params.query) queryParams.q = params.query;
          if (params.genres && params.genres.length > 0) queryParams.genres = params.genres.join(',');
          if (params.year) queryParams.start_date = `${params.year}`;
          if (params.season) queryParams.season = params.season;
          if (params.status) queryParams.status = params.status;
          if (params.rating) queryParams.rating = params.rating;
          if (params.minScore) queryParams.min_score = params.minScore;
          if (params.maxScore) queryParams.max_score = params.maxScore;
          if (params.type) queryParams.type = params.type;
          if (params.orderBy) queryParams.order_by = params.orderBy;
          if (params.sort) queryParams.sort = params.sort;
        }
        
        const response = await axios.get(`${API_BASE_URL}/anime`, {
          params: queryParams
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
  },

  async getRandomAnime(): Promise<AnimeDetailsResponse> {
    try {
      await delay(500);
      
      return await retryWithBackoff(async () => {
        const response = await axios.get(`${API_BASE_URL}/random/anime`);
        
        return {
          data: mapAnimeData(response.data.data)
        };
      });
    } catch (error) {
      console.error('Error fetching random anime:', error);
      throw error;
    }
  },

  async getAnimeCharacters(animeId: number): Promise<CharactersResponse> {
    try {
      await delay(1000);
      
      return await retryWithBackoff(async () => {
        const response = await axios.get(`${API_BASE_URL}/anime/${animeId}/characters`);
        
        return {
          data: response.data.data.map(mapCharacterData)
        };
      });
    } catch (error) {
      console.error(`Error fetching characters for anime ${animeId}:`, error);
      throw error;
    }
  },

  async getAnimeStaff(animeId: number): Promise<StaffResponse> {
    try {
      await delay(1000);
      
      return await retryWithBackoff(async () => {
        const response = await axios.get(`${API_BASE_URL}/anime/${animeId}/staff`);
        
        return {
          data: response.data.data.map(mapStaffData)
        };
      });
    } catch (error) {
      console.error(`Error fetching staff for anime ${animeId}:`, error);
      throw error;
    }
  },

  async getAnimeReviews(animeId: number, page: number = 1): Promise<ReviewsResponse> {
    try {
      await delay(1500);
      
      return await retryWithBackoff(async () => {
        const response = await axios.get(`${API_BASE_URL}/anime/${animeId}/reviews`, {
          params: {
            page,
            limit: 10
          }
        });
        
        return {
          data: response.data.data.map(mapReviewData),
          pagination: response.data.pagination
        };
      });
    } catch (error) {
      console.error(`Error fetching reviews for anime ${animeId}:`, error);
      throw error;
    }
  }
}; 