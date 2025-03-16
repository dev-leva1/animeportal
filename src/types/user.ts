export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  createdAt: string;
}

export interface UserCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends UserCredentials {
  username: string;
  confirmPassword: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface WatchHistory {
  animeId: number;
  title: string;
  image: string;
  lastWatched: string;
  episodeNumber?: number;
}

export interface UserProfile {
  user: User;
  watchHistory: WatchHistory[];
} 