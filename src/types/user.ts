export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  avatar?: string;
  bio?: string;
  stats?: UserStats;
  comments?: UserComment[];
  createdAt: string;
  updatedAt?: string;
}

export interface UserStats {
  watchedAnime: number;
  readManga: number;
  ratings: number;
  favoriteAnime: number;
  favoriteManga: number;
}

export interface UserComment {
  id: string;
  text: string;
  createdAt: string;
  updatedAt?: string;
  likes: number;
  replies?: UserReply[];
}

export interface UserReply {
  id: string;
  text: string;
  createdAt: string;
  updatedAt?: string;
  author: string;
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

export interface PasswordChangeData {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
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