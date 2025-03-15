export interface Anime {
  id: number;
  title: string;
  title_japanese?: string;
  image_url: string;
  synopsis: string;
  episodes: number;
  score: number | null;
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

export interface Character {
  id: number;
  name: string;
  image_url: string;
  role: string;
  voice_actors: VoiceActor[];
}

export interface VoiceActor {
  id: number;
  name: string;
  image_url: string;
  language: string;
}

export interface StaffMember {
  id: number;
  name: string;
  image_url: string;
  positions: string[];
}

export interface Review {
  id: number;
  user: {
    username: string;
    image_url: string;
  };
  content: string;
  score: number;
  date: string;
}

export interface Manga {
  id: number;
  title: string;
  title_japanese?: string;
  image_url: string;
  synopsis: string;
  chapters: number;
  volumes: number;
  score: number | null;
  published?: {
    from: string;
    to: string | null;
  };
  status: string;
  genres: Genre[];
  authors: Author[];
  type: string;
}

export interface Author {
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

export interface MangaResponse {
  data: Manga[];
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

export interface MangaDetailsResponse {
  data: Manga;
}

export interface CharactersResponse {
  data: Character[];
}

export interface StaffResponse {
  data: StaffMember[];
}

export interface ReviewsResponse {
  data: Review[];
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