import { Anime } from '../types/anime';

const FAVORITES_KEY = 'anime_favorites';

export const favoritesService = {
  getFavorites(): Anime[] {
    const favorites = localStorage.getItem(FAVORITES_KEY);
    return favorites ? JSON.parse(favorites) : [];
  },

  addToFavorites(anime: Anime): void {
    const favorites = this.getFavorites();
    
    if (!favorites.some(item => (item.mal_id === anime.mal_id) || (item.id === anime.id))) {
      const updatedFavorites = [...favorites, anime];
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
  }
}; 