interface Translations {
  [key: string]: {
    ru: string;
    en: string;
  };
}

export const translations: Translations = {
  // Header
  'header.home': {
    ru: 'Главная',
    en: 'Home'
  },
  'header.catalog': {
    ru: 'Каталог',
    en: 'Catalog'
  },
  'header.favorites': {
    ru: 'Избранное',
    en: 'Favorites'
  },
  'header.search': {
    ru: 'Поиск аниме...',
    en: 'Search anime...'
  },
  
  // HomePage
  'home.welcome': {
    ru: 'Добро пожаловать на АнимеПортал',
    en: 'Welcome to AnimePortal'
  },
  'home.subtitle': {
    ru: 'Исследуйте мир аниме, находите новые сериалы и фильмы, добавляйте их в избранное и следите за своими любимыми тайтлами.',
    en: 'Explore the world of anime, find new series and movies, add them to favorites and keep track of your favorite titles.'
  },
  'home.go_to_catalog': {
    ru: 'Перейти к каталогу',
    en: 'Go to catalog'
  },
  'home.popular_anime': {
    ru: 'Популярные аниме',
    en: 'Popular anime'
  },
  'home.seasonal_anime': {
    ru: 'Сезонное аниме',
    en: 'Seasonal anime'
  },
  'home.recommended_anime': {
    ru: 'Рекомендованное аниме',
    en: 'Recommended anime'
  },
  'home.view_all': {
    ru: 'Смотреть все',
    en: 'View all'
  },
  
  // AnimePage
  'anime.catalog': {
    ru: 'Каталог аниме',
    en: 'Anime catalog'
  },
  'anime.search_results': {
    ru: 'Результаты поиска',
    en: 'Search results'
  },
  'anime.genre': {
    ru: 'Аниме жанра',
    en: 'Anime genre'
  },
  'anime.search': {
    ru: 'Найти',
    en: 'Search'
  },
  'anime.all_genres': {
    ru: 'Все жанры',
    en: 'All genres'
  },
  'anime.no_results': {
    ru: 'Ничего не найдено. Попробуйте изменить параметры поиска.',
    en: 'No results found. Try changing your search parameters.'
  },
  'anime.episodes': {
    ru: 'эп.',
    en: 'ep.'
  },
  
  // Genres
  'genre.action': {
    ru: 'Экшен',
    en: 'Action'
  },
  'genre.adventure': {
    ru: 'Приключения',
    en: 'Adventure'
  },
  'genre.comedy': {
    ru: 'Комедия',
    en: 'Comedy'
  },
  'genre.drama': {
    ru: 'Драма',
    en: 'Drama'
  },
  'genre.fantasy': {
    ru: 'Фэнтези',
    en: 'Fantasy'
  },
  'genre.mystery': {
    ru: 'Мистика',
    en: 'Mystery'
  },
  'genre.romance': {
    ru: 'Романтика',
    en: 'Romance'
  },
  'genre.sci_fi': {
    ru: 'Научная фантастика',
    en: 'Sci-Fi'
  },
  'genre.slice_of_life': {
    ru: 'Повседневность',
    en: 'Slice of Life'
  },
  'genre.sports': {
    ru: 'Спорт',
    en: 'Sports'
  },
  
  // FavoritesPage
  'favorites.title': {
    ru: 'Избранное аниме',
    en: 'Favorite anime'
  },
  'favorites.empty': {
    ru: 'У вас пока нет избранного аниме. Добавьте аниме в избранное, нажав на значок сердца на карточке аниме.',
    en: 'You don\'t have any favorite anime yet. Add anime to favorites by clicking the heart icon on the anime card.'
  },
  
  // AnimeDetailsPage
  'details.episodes': {
    ru: 'Эпизоды',
    en: 'Episodes'
  },
  'details.status': {
    ru: 'Статус',
    en: 'Status'
  },
  'details.aired': {
    ru: 'Выпущено',
    en: 'Aired'
  },
  'details.genres': {
    ru: 'Жанры',
    en: 'Genres'
  },
  'details.studios': {
    ru: 'Студии',
    en: 'Studios'
  },
  'details.source': {
    ru: 'Источник',
    en: 'Source'
  },
  'details.rating': {
    ru: 'Рейтинг',
    en: 'Rating'
  },
  'details.duration': {
    ru: 'Длительность',
    en: 'Duration'
  },
  'details.synopsis': {
    ru: 'Описание',
    en: 'Synopsis'
  },
  'details.trailer': {
    ru: 'Трейлер',
    en: 'Trailer'
  },
  'details.add_to_favorites': {
    ru: 'Добавить в избранное',
    en: 'Add to favorites'
  },
  'details.remove_from_favorites': {
    ru: 'Удалить из избранного',
    en: 'Remove from favorites'
  },
  
  // NotFoundPage
  'notfound.title': {
    ru: 'Страница не найдена',
    en: 'Page not found'
  },
  'notfound.message': {
    ru: 'Извините, запрашиваемая страница не существует.',
    en: 'Sorry, the requested page does not exist.'
  },
  'notfound.back_home': {
    ru: 'Вернуться на главную',
    en: 'Back to home'
  },
  
  // ErrorMessage
  'error.retry': {
    ru: 'Повторить',
    en: 'Retry'
  },
  
  // Loading
  'loading': {
    ru: 'Загрузка...',
    en: 'Loading...'
  },
  
  // Page title
  'page.title': {
    ru: 'АнимеПортал - Смотрите аниме онлайн',
    en: 'AnimePortal - Watch anime online'
  },
  
  // Site name
  'site.name': {
    ru: 'АнимеПортал',
    en: 'AnimePortal'
  },
  
  // Footer
  'footer.about': {
    ru: 'О проекте',
    en: 'About'
  },
  'footer.terms': {
    ru: 'Правила использования',
    en: 'Terms of Use'
  },
  'footer.privacy': {
    ru: 'Политика конфиденциальности',
    en: 'Privacy Policy'
  },
  'footer.contacts': {
    ru: 'Контакты',
    en: 'Contacts'
  },
  'footer.copyright': {
    ru: 'Все права защищены.',
    en: 'All rights reserved.'
  },
  'footer.data_source': {
    ru: 'Данные предоставлены API Jikan (неофициальное API MyAnimeList).',
    en: 'Data provided by Jikan API (unofficial MyAnimeList API).'
  }
}; 