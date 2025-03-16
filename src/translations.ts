interface Translations {
  [key: string]: {
    ru: string;
    en: string;
  };
}

export const translations: Translations = {
  'site.name': {
    ru: 'АнимеПортал',
    en: 'AnimePortal'
  },
  'page.title': {
    ru: 'АнимеПортал - Смотрите аниме онлайн',
    en: 'AnimePortal - Watch anime online'
  },
  
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
  'header.login': {
    ru: 'Войти',
    en: 'Login'
  },
  'header.logout': {
    ru: 'Выйти',
    en: 'Logout'
  },
  'header.profile': {
    ru: 'Профиль',
    en: 'Profile'
  },
  
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
  'home.upcoming_anime': {
    ru: 'Предстоящие аниме',
    en: 'Upcoming anime'
  },
  'home.view_all': {
    ru: 'Смотреть все',
    en: 'View all'
  },
  
  'catalog.title': {
    ru: 'Каталог аниме',
    en: 'Anime catalog'
  },
  'catalog.filter': {
    ru: 'Фильтр',
    en: 'Filter'
  },
  'catalog.sort': {
    ru: 'Сортировка',
    en: 'Sort'
  },
  'catalog.search_results': {
    ru: 'Результаты поиска',
    en: 'Search results'
  },
  'catalog.no_results': {
    ru: 'Ничего не найдено',
    en: 'No results found'
  },
  'catalog.try_different': {
    ru: 'Попробуйте изменить параметры поиска',
    en: 'Try different search parameters'
  },
  
  'manga.title': {
    ru: 'Каталог манги',
    en: 'Manga catalog'
  },
  'manga.chapters': {
    ru: 'Главы',
    en: 'Chapters'
  },
  'manga.volumes': {
    ru: 'Тома',
    en: 'Volumes'
  },
  'manga.read_online': {
    ru: 'Читать онлайн',
    en: 'Read online'
  },
  'manga.authors': {
    ru: 'Авторы',
    en: 'Authors'
  },
  'manga.serialization': {
    ru: 'Публикация',
    en: 'Serialization'
  },
  
  'favorites.title': {
    ru: 'Избранное',
    en: 'Favorites'
  },
  'favorites.empty': {
    ru: 'Ваш список избранного пуст',
    en: 'Your favorites list is empty'
  },
  'favorites.add_some': {
    ru: 'Добавьте аниме в избранное, чтобы они отображались здесь',
    en: 'Add some anime to favorites to see them here'
  },
  
  'common.loading': {
    ru: 'Загрузка...',
    en: 'Loading...'
  },
  'common.error': {
    ru: 'Произошла ошибка',
    en: 'An error occurred'
  },
  'common.retry': {
    ru: 'Повторить',
    en: 'Retry'
  },
  'common.not_found': {
    ru: 'Страница не найдена',
    en: 'Page not found'
  },
  'common.go_home': {
    ru: 'На главную',
    en: 'Go home'
  },
  
  'auth.login': {
    ru: 'Вход',
    en: 'Login'
  },
  'auth.register': {
    ru: 'Регистрация',
    en: 'Register'
  },
  'auth.email': {
    ru: 'Email',
    en: 'Email'
  },
  'auth.password': {
    ru: 'Пароль',
    en: 'Password'
  },
  'auth.confirm_password': {
    ru: 'Подтвердите пароль',
    en: 'Confirm password'
  },
  'auth.username': {
    ru: 'Имя пользователя',
    en: 'Username'
  },
  'auth.loading': {
    ru: 'Загрузка...',
    en: 'Loading...'
  },
  'auth.login_error': {
    ru: 'Ошибка входа. Проверьте ваши данные.',
    en: 'Login error. Check your credentials.'
  },
  'auth.register_error': {
    ru: 'Ошибка регистрации. Попробуйте другие данные.',
    en: 'Registration error. Try different credentials.'
  },
  'auth.passwords_not_match': {
    ru: 'Пароли не совпадают',
    en: 'Passwords do not match'
  },
  'auth.no_account': {
    ru: 'Нет аккаунта? Зарегистрироваться',
    en: 'No account? Register'
  },
  'auth.have_account': {
    ru: 'Уже есть аккаунт? Войти',
    en: 'Already have an account? Login'
  },
  
  'profile.username': {
    ru: 'Имя пользователя',
    en: 'Username'
  },
  'profile.email': {
    ru: 'Email',
    en: 'Email'
  },
  'profile.avatar_url': {
    ru: 'URL аватара',
    en: 'Avatar URL'
  },
  'profile.avatar_url_placeholder': {
    ru: 'https://example.com/avatar.jpg',
    en: 'https://example.com/avatar.jpg'
  },
  'profile.save': {
    ru: 'Сохранить',
    en: 'Save'
  },
  'profile.cancel': {
    ru: 'Отмена',
    en: 'Cancel'
  },
  'profile.edit': {
    ru: 'Редактировать профиль',
    en: 'Edit profile'
  },
  'profile.watch_history': {
    ru: 'История просмотров',
    en: 'Watch history'
  },
  'profile.clear_history': {
    ru: 'Очистить историю',
    en: 'Clear history'
  },
  'profile.confirm_clear_history': {
    ru: 'Вы уверены, что хотите очистить историю просмотров?',
    en: 'Are you sure you want to clear your watch history?'
  },
  'profile.no_history': {
    ru: 'История просмотров пуста',
    en: 'Watch history is empty'
  },
  'profile.not_logged_in': {
    ru: 'Вы не авторизованы. Пожалуйста, войдите в систему.',
    en: 'You are not logged in. Please log in.'
  },
  
  'player.episode': {
    ru: 'Эпизод',
    en: 'Episode'
  },
  'player.quality': {
    ru: 'Качество',
    en: 'Quality'
  },
  'player.loading': {
    ru: 'Загрузка видео...',
    en: 'Loading video...'
  },
  'player.login_required': {
    ru: 'Для просмотра аниме необходимо авторизоваться',
    en: 'You need to log in to watch anime'
  },
  
  'anime.watch_online': {
    ru: 'Смотреть онлайн',
    en: 'Watch online'
  },
  'anime.hide_player': {
    ru: 'Скрыть плеер',
    en: 'Hide player'
  },
  'anime.error_loading': {
    ru: 'Ошибка при загрузке данных',
    en: 'Error loading data'
  },
  'anime.score': {
    ru: 'Рейтинг',
    en: 'Score'
  },
  'anime.type': {
    ru: 'Тип',
    en: 'Type'
  },
  'anime.episodes': {
    ru: 'Эпизоды',
    en: 'Episodes'
  },
  'anime.status': {
    ru: 'Статус',
    en: 'Status'
  },
  'anime.aired': {
    ru: 'Период выхода',
    en: 'Aired'
  },
  'anime.season': {
    ru: 'Сезон',
    en: 'Season'
  },
  'anime.duration': {
    ru: 'Длительность',
    en: 'Duration'
  },
  'anime.rating': {
    ru: 'Возрастной рейтинг',
    en: 'Rating'
  },
  'anime.studios': {
    ru: 'Студии',
    en: 'Studios'
  },
  'anime.unknown': {
    ru: 'Неизвестно',
    en: 'Unknown'
  },
  'anime.synopsis': {
    ru: 'Описание',
    en: 'Synopsis'
  },
  'anime.no_synopsis': {
    ru: 'Описание отсутствует',
    en: 'No synopsis available'
  },
  'anime.characters': {
    ru: 'Персонажи',
    en: 'Characters'
  },
  'anime.staff': {
    ru: 'Персонал',
    en: 'Staff'
  },
  'anime.reviews': {
    ru: 'Обзоры',
    en: 'Reviews'
  },
  'anime.show_less': {
    ru: 'Свернуть',
    en: 'Show less'
  },
  'anime.read_more': {
    ru: 'Читать далее',
    en: 'Read more'
  },
  'anime.loading': {
    ru: 'Загрузка...',
    en: 'Loading...'
  },
  'anime.load_more_reviews': {
    ru: 'Загрузить еще обзоры',
    en: 'Load more reviews'
  },
  'anime.add_to_favorites': {
    ru: 'Добавить в избранное',
    en: 'Add to favorites'
  },
  'anime.remove_from_favorites': {
    ru: 'Удалить из избранного',
    en: 'Remove from favorites'
  },
  'anime.back_to_catalog': {
    ru: 'Вернуться к каталогу',
    en: 'Back to catalog'
  },
  'error.title': {
    ru: 'Что-то пошло не так',
    en: 'Something went wrong'
  },
  'error.message': {
    ru: 'Произошла ошибка при отображении этого компонента.',
    en: 'An error occurred while rendering this component.'
  },
  'error.details': {
    ru: 'Технические детали',
    en: 'Technical details'
  },
  'error.try_again': {
    ru: 'Попробовать снова',
    en: 'Try again'
  },
  'anime.show_more': {
    ru: 'Показать больше',
    en: 'Show more'
  },
  
  'footer.about': {
    ru: 'О проекте',
    en: 'About'
  },
  'footer.terms': {
    ru: 'Условия использования',
    en: 'Terms of Service'
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
    ru: 'Все права защищены',
    en: 'All rights reserved'
  },
  'footer.data_source': {
    ru: 'Данные предоставлены MyAnimeList API',
    en: 'Data provided by MyAnimeList API'
  },
  
  'home.recommended_anime': {
    ru: 'Рекомендуемые аниме',
    en: 'Recommended anime'
  },
  
  'anime.catalog': {
    ru: 'Каталог аниме',
    en: 'Anime catalog'
  },
  'anime.search': {
    ru: 'Поиск аниме',
    en: 'Search anime'
  },
  'anime.all_genres': {
    ru: 'Все жанры',
    en: 'All genres'
  },
  
  'manga.catalog': {
    ru: 'Каталог манги',
    en: 'Manga catalog'
  },
  'manga.search': {
    ru: 'Поиск манги',
    en: 'Search manga'
  },
  'manga.back_to_catalog': {
    ru: 'Вернуться к каталогу манги',
    en: 'Back to manga catalog'
  },
  'manga.unknown': {
    ru: 'Неизвестно',
    en: 'Unknown'
  },
  'manga.add_to_favorites': {
    ru: 'Добавить в избранное',
    en: 'Add to favorites'
  },
  'manga.remove_from_favorites': {
    ru: 'Удалить из избранного',
    en: 'Remove from favorites'
  },
  'manga.synopsis': {
    ru: 'Описание',
    en: 'Synopsis'
  },
  'manga.genres': {
    ru: 'Жанры',
    en: 'Genres'
  },
  
  'genre.all_genres': {
    ru: 'Все жанры',
    en: 'All genres'
  },
  
  'notfound.title': {
    ru: 'Страница не найдена',
    en: 'Page not found'
  },
  'notfound.message': {
    ru: 'Запрашиваемая страница не существует или была перемещена',
    en: 'The requested page does not exist or has been moved'
  },
  'notfound.back_home': {
    ru: 'Вернуться на главную',
    en: 'Back to home'
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
  'genre.horror': {
    ru: 'Ужасы',
    en: 'Horror'
  },
  'genre.mystery': {
    ru: 'Детектив',
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
  'genre.supernatural': {
    ru: 'Сверхъестественное',
    en: 'Supernatural'
  },
  'genre.thriller': {
    ru: 'Триллер',
    en: 'Thriller'
  },
  'genre.mecha': {
    ru: 'Меха',
    en: 'Mecha'
  },
  'genre.music': {
    ru: 'Музыка',
    en: 'Music'
  },
  'genre.psychological': {
    ru: 'Психологическое',
    en: 'Psychological'
  },
  
  'manga.status': {
    ru: 'Статус',
    en: 'Status'
  },
  'manga.published': {
    ru: 'Период публикации',
    en: 'Published'
  },
  'manga.type': {
    ru: 'Тип',
    en: 'Type'
  },
  
  'error.retry': {
    ru: 'Повторить попытку',
    en: 'Retry'
  }
}; 