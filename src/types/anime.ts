export interface Anime {
  id: number;
  title: string;
  title_japanese?: string;
  image_url: string;
  synopsis: string;
  episodes: number;
  score: number;
  aired?: {
    from: string;
    to: string | null;
  };
  status: string;
  genres: Genre[];
  studios: Studio[];
  source: string;
  rating: string;
  duration: string;
  trailer_url?: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface Studio {
  id: number;
  name: string;
}

export interface AnimeResponse {
  data: Anime[];
  pagination: {
    last_visible_page: number;
    has_next_page: boolean;
    current_page: number;
    items: {
      count: number;
      total: number;
      per_page: number;
    };
  };
}

export interface AnimeDetailsResponse {
  data: Anime;
} 