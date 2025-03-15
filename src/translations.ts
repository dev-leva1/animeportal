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
  'header.manga': {
    ru: 'Манга',
    en: 'Manga'
  },
  'header.random_anime': {
    ru: 'Случайное аниме',
    en: 'Random anime'
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
  'genre.all_genres': {
    ru: 'Все жанры',
    en: 'All genres'
  },
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
  
  // MangaPage
  'manga.catalog': {
    ru: 'Каталог манги',
    en: 'Manga catalog'
  },
  'manga.search_results': {
    ru: 'Результаты поиска',
    en: 'Search results'
  },
  'manga.genre': {
    ru: 'Манга жанра',
    en: 'Manga genre'
  },
  'manga.search': {
    ru: 'Найти',
    en: 'Search'
  },
  'manga.no_results': {
    ru: 'Ничего не найдено. Попробуйте изменить параметры поиска.',
    en: 'No results found. Try changing your search parameters.'
  },
  'manga.chapters': {
    ru: 'Главы',
    en: 'Chapters'
  },
  'manga.volumes': {
    ru: 'Тома',
    en: 'Volumes'
  },
  'manga.status': {
    ru: 'Статус',
    en: 'Status'
  },
  'manga.published': {
    ru: 'Выпущено',
    en: 'Published'
  },
  'manga.type': {
    ru: 'Тип',
    en: 'Type'
  },
  'manga.authors': {
    ru: 'Авторы',
    en: 'Authors'
  },
  'manga.genres': {
    ru: 'Жанры',
    en: 'Genres'
  },
  'manga.synopsis': {
    ru: 'Описание',
    en: 'Synopsis'
  },
  'manga.add_to_favorites': {
    ru: 'Добавить в избранное',
    en: 'Add to favorites'
  },
  'manga.remove_from_favorites': {
    ru: 'Удалить из избранного',
    en: 'Remove from favorites'
  },
  'manga.back_to_catalog': {
    ru: 'Вернуться к каталогу манги',
    en: 'Back to manga catalog'
  },
  'manga.unknown': {
    ru: 'Неизвестно',
    en: 'Unknown'
  },
  'manga.ongoing': {
    ru: 'Онгоинг',
    en: 'Ongoing'
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
  'details.characters': {
    ru: 'Персонажи',
    en: 'Characters'
  },
  'details.staff': {
    ru: 'Персонал',
    en: 'Staff'
  },
  'details.reviews': {
    ru: 'Обзоры',
    en: 'Reviews'
  },
  'details.voice_actors': {
    ru: 'Актеры озвучки',
    en: 'Voice actors'
  },
  'details.character_role': {
    ru: 'Роль',
    en: 'Role'
  },
  'details.staff_positions': {
    ru: 'Должности',
    en: 'Positions'
  },
  'details.review_score': {
    ru: 'Оценка',
    en: 'Score'
  },
  'details.review_date': {
    ru: 'Дата',
    en: 'Date'
  },
  'details.show_more': {
    ru: 'Показать больше',
    en: 'Show more'
  },
  'details.show_less': {
    ru: 'Показать меньше',
    en: 'Show less'
  },
  'details.no_reviews': {
    ru: 'Нет обзоров',
    en: 'No reviews'
  },
  'details.no_characters': {
    ru: 'Нет информации о персонажах',
    en: 'No character information'
  },
  'details.no_staff': {
    ru: 'Нет информации о персонале',
    en: 'No staff information'
  },
  'details.load_more_reviews': {
    ru: 'Загрузить еще обзоры',
    en: 'Load more reviews'
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
  },
  'footer.github': {
    ru: 'GitHub',
    en: 'GitHub'
  },
  'anime.back_to_catalog': {
    ru: 'Вернуться к каталогу аниме',
    en: 'Back to anime catalog'
  }
}; 