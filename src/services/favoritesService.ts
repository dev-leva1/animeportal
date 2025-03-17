import { Anime, WatchStatus } from '../types/anime';

const FAVORITES_KEY = 'anime_favorites';

export const favoritesService = {
  getFavorites(): Anime[] {
    const favorites = localStorage.getItem(FAVORITES_KEY);
    return favorites ? JSON.parse(favorites) : [];
  },

  addToFavorites(anime: Anime, watchStatus: WatchStatus = null): void {
    const favorites = this.getFavorites();
    
    if (!favorites.some(item => (item.mal_id === anime.mal_id) || (item.id === anime.id))) {
      const animeWithStatus = { ...anime, watchStatus };
      const updatedFavorites = [...favorites, animeWithStatus];
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
    }
  },

  removeFromFavorites(animeId: number): void {
    const favorites = this.getFavorites();
    const updatedFavorites = favorites.filter(anime => 
      (anime.mal_id !== animeId) && (anime.id !== animeId)
    );
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
  },

  isFavorite(animeId: number): boolean {
    const favorites = this.getFavorites();
    return favorites.some(anime => 
      (anime.mal_id === animeId) || (anime.id === animeId)
    );
  },
  
  getWatchStatus(animeId: number): WatchStatus {
    const favorites = this.getFavorites();
    const anime = favorites.find(anime => 
      (anime.mal_id === animeId) || (anime.id === animeId)
    );
    return anime?.watchStatus || null;
  },
  
  updateWatchStatus(animeId: number, watchStatus: WatchStatus): void {
    const favorites = this.getFavorites();
    const updatedFavorites = favorites.map(anime => {
      if ((anime.mal_id === animeId) || (anime.id === animeId)) {
        return { ...anime, watchStatus };
      }
      return anime;
    });
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
  },
  
  getFavoritesByStatus(watchStatus: WatchStatus | 'all'): Anime[] {
    const favorites = this.getFavorites();
    
    if (watchStatus === 'all') {
      return favorites;
    }
    
    if (watchStatus === null) {
      return favorites.filter(anime => anime.watchStatus === null);
    }
    
    return favorites.filter(anime => anime.watchStatus === watchStatus);
  }
}; 