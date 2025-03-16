import { User, UserCredentials, RegisterData, AuthResponse, WatchHistory } from '../types/user';

// const API_URL = 'https://api.example.com'; // Замените на реальный URL API
const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';
const WATCH_HISTORY_KEY = 'watch_history';

export const authService = {
  async login(credentials: UserCredentials): Promise<AuthResponse> {
    // В реальном приложении здесь будет запрос к API
    return new Promise((resolve) => {
      setTimeout(() => {
        const user: User = {
          id: '1',
          username: credentials.email.split('@')[0],
          email: credentials.email,
          createdAt: new Date().toISOString()
        };
        
        const token = 'mock_jwt_token_' + Math.random().toString(36).substring(2);
        
        localStorage.setItem(TOKEN_KEY, token);
        localStorage.setItem(USER_KEY, JSON.stringify(user));
        
        resolve({ user, token });
      }, 500);
    });
  },
  
  async register(data: RegisterData): Promise<AuthResponse> {
    // В реальном приложении здесь будет запрос к API
    return new Promise((resolve) => {
      setTimeout(() => {
        const user: User = {
          id: '1',
          username: data.username,
          email: data.email,
          createdAt: new Date().toISOString()
        };
        
        const token = 'mock_jwt_token_' + Math.random().toString(36).substring(2);
        
        localStorage.setItem(TOKEN_KEY, token);
        localStorage.setItem(USER_KEY, JSON.stringify(user));
        
        resolve({ user, token });
      }, 500);
    });
  },
  
  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },
  
  getCurrentUser(): User | null {
    const userJson = localStorage.getItem(USER_KEY);
    return userJson ? JSON.parse(userJson) : null;
  },
  
  isAuthenticated(): boolean {
    return !!localStorage.getItem(TOKEN_KEY);
  },
  
  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },
  
  updateUserProfile(user: User): void {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },
  
  getWatchHistory(): WatchHistory[] {
    const history = localStorage.getItem(WATCH_HISTORY_KEY);
    return history ? JSON.parse(history) : [];
  },
  
  addToWatchHistory(item: WatchHistory): void {
    const history = this.getWatchHistory();
    
    const filteredHistory = history.filter(h => h.animeId !== item.animeId);
    
    const updatedHistory = [item, ...filteredHistory].slice(0, 50);
    
    localStorage.setItem(WATCH_HISTORY_KEY, JSON.stringify(updatedHistory));
  },
  
  clearWatchHistory(): void {
    localStorage.removeItem(WATCH_HISTORY_KEY);
  }
}; 