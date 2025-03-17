import axios from 'axios';
import { MangaResponse, MangaDetailsResponse, Manga } from '../types/anime';

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

const mapMangaData = (apiData: any): Manga => {
  return {
    id: apiData.mal_id,
    title: apiData.title,
    title_japanese: apiData.title_japanese,
    image_url: apiData.images?.jpg?.image_url || apiData.images?.webp?.image_url || '',
    synopsis: apiData.synopsis || '',
    chapters: apiData.chapters || 0,
    volumes: apiData.volumes || 0,
    score: apiData.score || null,
    published: apiData.published,
    status: apiData.status || '',
    genres: apiData.genres || [],
    authors: apiData.authors?.map((author: any) => ({
      id: author.mal_id,
      name: author.name
    })) || [],
    type: apiData.type || ''
  };
};

export interface MangaSearchParams {
  query?: string;
  genres?: number[];
  year?: number;
  status?: string;
  minScore?: number;
  maxScore?: number;
  type?: string;
  orderBy?: string;
  sort?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export const mangaService = {
  async getMangaList(page: number = 1, limit: number = 20): Promise<MangaResponse> {
    try {
      await delay(1000);
      
      return await retryWithBackoff(async () => {
        const response = await axios.get(`${API_BASE_URL}/manga`, {
          params: {
            page,
            limit,
            order_by: 'score',
            sort: 'desc'
          }
        });
        
        return {
          data: response.data.data.map(mapMangaData),
          pagination: response.data.pagination
        };
      });
    } catch (error) {
      console.error('Error fetching manga list:', error);
      throw error;
    }
  },

  async searchManga(params: string | MangaSearchParams, page: number = 1): Promise<MangaResponse> {
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
          if (params.status) queryParams.status = params.status;
          if (params.minScore) queryParams.min_score = params.minScore;
          if (params.maxScore) queryParams.max_score = params.maxScore;
          if (params.type) queryParams.type = params.type;
          if (params.orderBy) queryParams.order_by = params.orderBy;
          if (params.sort) queryParams.sort = params.sort;
        }
        
        const response = await axios.get(`${API_BASE_URL}/manga`, {
          params: queryParams
        });
        
        return {
          data: response.data.data.map(mapMangaData),
          pagination: response.data.pagination
        };
      });
    } catch (error) {
      console.error('Error searching manga:', error);
      throw error;
    }
  },

  async getMangaById(id: number): Promise<MangaDetailsResponse> {
    try {
      await delay(500);
      
      return await retryWithBackoff(async () => {
        const response = await axios.get(`${API_BASE_URL}/manga/${id}`);
        
        return {
          data: mapMangaData(response.data.data)
        };
      });
    } catch (error) {
      console.error(`Error fetching manga with id ${id}:`, error);
      throw error;
    }
  },

  async getTopManga(page: number = 1): Promise<MangaResponse> {
    try {
      return await retryWithBackoff(async () => {
        const response = await axios.get(`${API_BASE_URL}/top/manga`, {
          params: {
            page,
            limit: 20
          }
        });
        
        return {
          data: response.data.data.map(mapMangaData),
          pagination: response.data.pagination
        };
      });
    } catch (error) {
      console.error('Error fetching top manga:', error);
      throw error;
    }
  },

  async getMangaByGenre(genreId: number, page: number = 1): Promise<MangaResponse> {
    try {
      await delay(1200);
      
      return await retryWithBackoff(async () => {
        const response = await axios.get(`${API_BASE_URL}/manga`, {
          params: {
            genres: genreId,
            page,
            limit: 20
          }
        });
        
        return {
          data: response.data.data.map(mapMangaData),
          pagination: response.data.pagination
        };
      });
    } catch (error) {
      console.error(`Error fetching manga by genre ${genreId}:`, error);
      throw error;
    }
  }
}; 