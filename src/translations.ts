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
  'favorites.all': {
    ru: 'Все',
    en: 'All'
  },
  'favorites.no_status': {
    ru: 'Без статуса',
    en: 'No status'
  },
  'favorites.status': {
    ru: 'Статус',
    en: 'Status'
  },
  'favorites.status.watching': {
    ru: 'Смотрю',
    en: 'Watching'
  },
  'favorites.status.planned': {
    ru: 'Запланировано',
    en: 'Planned'
  },
  'favorites.status.completed': {
    ru: 'Просмотрено',
    en: 'Completed'
  },
  'favorites.status.on_hold': {
    ru: 'Отложено',
    en: 'On Hold'
  },
  'favorites.status.dropped': {
    ru: 'Брошено',
    en: 'Dropped'
  },
  'favorites.set_status': {
    ru: 'Установить статус',
    en: 'Set status'
  },
  'favorites.filter_by_status': {
    ru: 'Фильтр по статусу',
    en: 'Filter by status'
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
    ru: 'Введите URL изображения',
    en: 'Enter image URL'
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
    ru: 'Редактировать',
    en: 'Edit'
  },
  'profile.change_password': {
    ru: 'Сменить пароль',
    en: 'Change Password'
  },
  'profile.current_password': {
    ru: 'Текущий пароль',
    en: 'Current Password'
  },
  'profile.new_password': {
    ru: 'Новый пароль',
    en: 'New Password'
  },
  'profile.confirm_new_password': {
    ru: 'Подтвердите новый пароль',
    en: 'Confirm New Password'
  },
  'profile.passwords_not_match': {
    ru: 'Пароли не совпадают',
    en: 'Passwords do not match'
  },
  'profile.password_changed': {
    ru: 'Пароль успешно изменен',
    en: 'Password successfully changed'
  },
  'profile.password_error': {
    ru: 'Ошибка при смене пароля',
    en: 'Error changing password'
  },
  'profile.watch_history': {
    ru: 'История просмотров',
    en: 'Watch History'
  },
  'profile.clear_history': {
    ru: 'Очистить историю',
    en: 'Clear History'
  },
  'profile.confirm_clear_history': {
    ru: 'Вы уверены, что хотите очистить историю просмотров?',
    en: 'Are you sure you want to clear your watch history?'
  },
  'profile.not_logged_in': {
    ru: 'Вы не вошли в систему',
    en: 'You are not logged in'
  },
  'profile.no_history': {
    ru: 'История просмотров пуста',
    en: 'Watch history is empty'
  },
  'profile.stats': {
    ru: 'Статистика',
    en: 'Statistics'
  },
  'profile.stats.watched_anime': {
    ru: 'Просмотрено аниме',
    en: 'Watched anime'
  },
  'profile.stats.read_manga': {
    ru: 'Прочитано манги',
    en: 'Read manga'
  },
  'profile.stats.ratings': {
    ru: 'Поставлено оценок',
    en: 'Ratings given'
  },
  'profile.stats.favorite_anime': {
    ru: 'Избранное аниме',
    en: 'Favorite anime'
  },
  'profile.stats.favorite_manga': {
    ru: 'Избранная манга',
    en: 'Favorite manga'
  },
  'profile.registered_date': {
    ru: 'Дата регистрации',
    en: 'Registration date'
  },
  'profile.bio': {
    ru: 'О себе',
    en: 'About me'
  },
  'profile.bio_placeholder': {
    ru: 'Расскажите о себе...',
    en: 'Tell about yourself...'
  },
  'profile.comments': {
    ru: 'Комментарии',
    en: 'Comments'
  },
  'profile.add_comment': {
    ru: 'Добавить комментарий',
    en: 'Add comment'
  },
  'profile.edit_comment': {
    ru: 'Редактировать',
    en: 'Edit'
  },
  'profile.delete_comment': {
    ru: 'Удалить',
    en: 'Delete'
  },
  'profile.confirm_delete_comment': {
    ru: 'Вы уверены, что хотите удалить этот комментарий?',
    en: 'Are you sure you want to delete this comment?'
  },
  'profile.comment_placeholder': {
    ru: 'Напишите комментарий...',
    en: 'Write a comment...'
  },
  'profile.no_comments': {
    ru: 'Нет комментариев',
    en: 'No comments'
  },
  'profile.updated_at': {
    ru: 'обновлено',
    en: 'updated'
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
    ru: 'О нас',
    en: 'About us'
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
  'footer.data_source': {
    ru: 'Источник данных',
    en: 'Data Source'
  },
  'footer.copyright_page': {
    ru: 'Авторские права',
    en: 'Copyright'
  },
  'footer.copyright': {
    ru: '© {year} АнимеПортал. Все права защищены.',
    en: '© {year} AnimePortal. All rights reserved.'
  },
  
  'home.recommended_anime': {
    ru: 'Рекомендуемые аниме',
    en: 'Recommended anime'
  },
  
  'anime.search': {
    ru: 'Поиск',
    en: 'Search'
  },
  'anime.catalog': {
    ru: 'Каталог аниме',
    en: 'Anime catalog'
  },
  'anime.genre': {
    ru: 'Жанр',
    en: 'Genre'
  },
  'anime.all_genres': {
    ru: 'Все жанры',
    en: 'All genres'
  },
  'anime.search_results': {
    ru: 'Результаты поиска',
    en: 'Search results'
  },
  'anime.no_results': {
    ru: 'Ничего не найдено',
    en: 'No results found'
  },
  'anime.show_filters': {
    ru: 'Показать фильтры',
    en: 'Show filters'
  },
  'anime.hide_filters': {
    ru: 'Скрыть фильтры',
    en: 'Hide filters'
  },
  'anime.reset_filters': {
    ru: 'Сбросить фильтры',
    en: 'Reset filters'
  },
  'anime.genres': {
    ru: 'Жанры',
    en: 'Genres'
  },
  'anime.year': {
    ru: 'Год',
    en: 'Year'
  },
  'anime.all_years': {
    ru: 'Все годы',
    en: 'All years'
  },
  'anime.all_seasons': {
    ru: 'Все сезоны',
    en: 'All seasons'
  },
  'anime.all_statuses': {
    ru: 'Все статусы',
    en: 'All statuses'
  },
  'anime.all_types': {
    ru: 'Все типы',
    en: 'All types'
  },
  'anime.all_ratings': {
    ru: 'Все рейтинги',
    en: 'All ratings'
  },
  'anime.min_score': {
    ru: 'Мин. оценка',
    en: 'Min score'
  },
  'anime.max_score': {
    ru: 'Макс. оценка',
    en: 'Max score'
  },
  'anime.any_score': {
    ru: 'Любая оценка',
    en: 'Any score'
  },
  'anime.sort_by': {
    ru: 'Сортировать по',
    en: 'Sort by'
  },
  'anime.sort_order': {
    ru: 'Порядок',
    en: 'Order'
  },
  'anime.ascending': {
    ru: 'По возрастанию',
    en: 'Ascending'
  },
  'anime.descending': {
    ru: 'По убыванию',
    en: 'Descending'
  },
  
  'manga.search': {
    ru: 'Поиск',
    en: 'Search'
  },
  'manga.catalog': {
    ru: 'Каталог манги',
    en: 'Manga catalog'
  },
  'manga.genre': {
    ru: 'Жанр',
    en: 'Genre'
  },
  'manga.search_results': {
    ru: 'Результаты поиска',
    en: 'Search results'
  },
  'manga.no_results': {
    ru: 'Ничего не найдено',
    en: 'No results found'
  },
  'manga.show_filters': {
    ru: 'Показать фильтры',
    en: 'Show filters'
  },
  'manga.hide_filters': {
    ru: 'Скрыть фильтры',
    en: 'Hide filters'
  },
  'manga.reset_filters': {
    ru: 'Сбросить фильтры',
    en: 'Reset filters'
  },
  'manga.genres': {
    ru: 'Жанры',
    en: 'Genres'
  },
  'manga.year': {
    ru: 'Год',
    en: 'Year'
  },
  'manga.all_years': {
    ru: 'Все годы',
    en: 'All years'
  },
  'manga.status': {
    ru: 'Статус',
    en: 'Status'
  },
  'manga.all_statuses': {
    ru: 'Все статусы',
    en: 'All statuses'
  },
  'manga.type': {
    ru: 'Тип',
    en: 'Type'
  },
  'manga.all_types': {
    ru: 'Все типы',
    en: 'All types'
  },
  'manga.min_score': {
    ru: 'Мин. оценка',
    en: 'Min score'
  },
  'manga.max_score': {
    ru: 'Макс. оценка',
    en: 'Max score'
  },
  'manga.any_score': {
    ru: 'Любая оценка',
    en: 'Any score'
  },
  'manga.sort_by': {
    ru: 'Сортировать по',
    en: 'Sort by'
  },
  'manga.sort_order': {
    ru: 'Порядок',
    en: 'Order'
  },
  'manga.ascending': {
    ru: 'По возрастанию',
    en: 'Ascending'
  },
  'manga.descending': {
    ru: 'По убыванию',
    en: 'Descending'
  },
  
  'season.winter': {
    ru: 'Зима',
    en: 'Winter'
  },
  'season.spring': {
    ru: 'Весна',
    en: 'Spring'
  },
  'season.summer': {
    ru: 'Лето',
    en: 'Summer'
  },
  'season.fall': {
    ru: 'Осень',
    en: 'Fall'
  },
  
  'status.airing': {
    ru: 'Выходит',
    en: 'Airing'
  },
  'status.complete': {
    ru: 'Завершено',
    en: 'Complete'
  },
  'status.upcoming': {
    ru: 'Анонсировано',
    en: 'Upcoming'
  },
  'status.publishing': {
    ru: 'Выпускается',
    en: 'Publishing'
  },
  'status.hiatus': {
    ru: 'Приостановлено',
    en: 'On hiatus'
  },
  'status.discontinued': {
    ru: 'Прекращено',
    en: 'Discontinued'
  },
  
  'rating.g': {
    ru: 'G - Для всех возрастов',
    en: 'G - All ages'
  },
  'rating.pg': {
    ru: 'PG - Дети',
    en: 'PG - Children'
  },
  'rating.pg13': {
    ru: 'PG-13 - Подростки 13+',
    en: 'PG-13 - Teens 13+'
  },
  'rating.r17': {
    ru: 'R - 17+ (насилие и ненормативная лексика)',
    en: 'R - 17+ (violence & profanity)'
  },
  'rating.r': {
    ru: 'R+ - Легкая эротика',
    en: 'R+ - Mild nudity'
  },
  
  'type.manga': {
    ru: 'Манга',
    en: 'Manga'
  },
  'type.novel': {
    ru: 'Новелла',
    en: 'Novel'
  },
  'type.lightnovel': {
    ru: 'Ранобэ',
    en: 'Light Novel'
  },
  'type.oneshot': {
    ru: 'Ваншот',
    en: 'One-shot'
  },
  'type.doujin': {
    ru: 'Додзинси',
    en: 'Doujinshi'
  },
  'type.manhwa': {
    ru: 'Манхва',
    en: 'Manhwa'
  },
  'type.manhua': {
    ru: 'Маньхуа',
    en: 'Manhua'
  },
  
  'sort.title': {
    ru: 'Название',
    en: 'Title'
  },
  'sort.score': {
    ru: 'Оценка',
    en: 'Score'
  },
  'sort.popularity': {
    ru: 'Популярность',
    en: 'Popularity'
  },
  'sort.rank': {
    ru: 'Рейтинг',
    en: 'Rank'
  },
  'sort.start_date': {
    ru: 'Дата начала',
    en: 'Start date'
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
  
  'manga.published': {
    ru: 'Период публикации',
    en: 'Published'
  },
  
  'error.retry': {
    ru: 'Повторить попытку',
    en: 'Retry'
  },
  'data_source.api_title': {
    ru: 'API и источники данных',
    en: 'API and Data Sources'
  },
  'data_source.api_text': {
    ru: 'Наш сайт использует данные, полученные через ',
    en: 'Our website uses data obtained through '
  },
  'data_source.api_text2': {
    ru: ' — неофициальное API для доступа к базе данных ',
    en: ' — an unofficial API for accessing the '
  },
  'data_source.usage_title': {
    ru: 'Использование данных',
    en: 'Data Usage'
  },
  'data_source.usage_text': {
    ru: 'Мы используем полученные данные для следующих целей:',
    en: 'We use the obtained data for the following purposes:'
  },
  'data_source.usage_item1': {
    ru: 'Отображение информации об аниме и манге',
    en: 'Displaying information about anime and manga'
  },
  'data_source.usage_item2': {
    ru: 'Предоставление возможности поиска и фильтрации контента',
    en: 'Providing search and filtering capabilities'
  },
  'data_source.usage_item3': {
    ru: 'Создание персонализированных рекомендаций',
    en: 'Creating personalized recommendations'
  },
  'data_source.limitations_title': {
    ru: 'Ограничения',
    en: 'Limitations'
  },
  'data_source.limitations_text': {
    ru: 'При использовании данных API мы сталкиваемся со следующими ограничениями:',
    en: 'When using API data, we face the following limitations:'
  },
  'data_source.limitations_item1': {
    ru: 'Ограничения на количество запросов в единицу времени',
    en: 'Rate limits on the number of requests per time unit'
  },
  'data_source.limitations_item2': {
    ru: 'Возможные задержки в обновлении информации',
    en: 'Possible delays in information updates'
  },
  'data_source.limitations_item3': {
    ru: 'Зависимость от доступности внешнего API',
    en: 'Dependency on external API availability'
  },
  'data_source.attribution_title': {
    ru: 'Атрибуция',
    en: 'Attribution'
  },
  'data_source.attribution_text': {
    ru: 'Мы признаем, что все данные, отображаемые на нашем сайте, принадлежат их соответствующим владельцам. Мы не претендуем на владение этими данными и используем их в соответствии с условиями использования API.',
    en: 'We acknowledge that all data displayed on our website belongs to their respective owners. We do not claim ownership of this data and use it in accordance with the API terms of use.'
  },
  'data_source.contact_title': {
    ru: 'Связаться с нами',
    en: 'Contact Us'
  },
  'data_source.contact_text': {
    ru: 'Если у вас есть вопросы или проблемы, связанные с использованием данных на нашем сайте, пожалуйста, свяжитесь с нами через страницу Контакты.',
    en: 'If you have any questions or concerns regarding the use of data on our website, please contact us through the Contacts page.'
  },
  'copyright.title': {
    ru: 'Авторские права',
    en: 'Copyright'
  },
  'copyright.ownership_title': {
    ru: 'Права собственности',
    en: 'Ownership Rights'
  },
  'copyright.ownership_text': {
    ru: '© {year} АнимеПортал. Все содержимое и материалы, представленные на этом веб-сайте, включая, но не ограничиваясь текстом, графикой, логотипами, изображениями, аудио и видео клипами, защищены авторским правом и являются собственностью АнимеПортала или наших лицензиаров.',
    en: '© {year} AnimePortal. All content and materials presented on this website, including but not limited to text, graphics, logos, images, audio and video clips, are protected by copyright and are the property of AnimePortal or our licensors.'
  },
  'copyright.content_title': {
    ru: 'Использование контента',
    en: 'Content Usage'
  },
  'copyright.content_text': {
    ru: 'Без предварительного письменного разрешения запрещается:',
    en: 'Without prior written permission, it is prohibited to:'
  },
  'copyright.content_item1': {
    ru: 'Копировать, воспроизводить или распространять любые материалы с нашего сайта',
    en: 'Copy, reproduce, or distribute any materials from our site'
  },
  'copyright.content_item2': {
    ru: 'Использовать наши материалы в коммерческих целях',
    en: 'Use our materials for commercial purposes'
  },
  'copyright.content_item3': {
    ru: 'Модифицировать или создавать производные работы на основе наших материалов',
    en: 'Modify or create derivative works based on our materials'
  },
  'copyright.content_item4': {
    ru: 'Удалять или изменять любые уведомления об авторских правах или товарных знаках',
    en: 'Remove or alter any copyright or trademark notices'
  },
  'copyright.fair_use_title': {
    ru: 'Добросовестное использование',
    en: 'Fair Use'
  },
  'copyright.fair_use_text': {
    ru: 'Вы можете использовать ограниченные части нашего контента для личного, некоммерческого использования, при условии сохранения всех уведомлений об авторских правах и других уведомлений о собственности.',
    en: 'You may use limited portions of our content for personal, non-commercial use, provided that you retain all copyright and other proprietary notices.'
  },
  'copyright.dmca_title': {
    ru: 'Уведомления о нарушении авторских прав',
    en: 'Copyright Infringement Notices'
  },
  'copyright.dmca_text': {
    ru: 'Если вы считаете, что ваши авторские права были нарушены материалами на нашем сайте, пожалуйста, отправьте нам уведомление, содержащее информацию о предполагаемом нарушении, включая идентификацию защищенного авторским правом произведения, описание места на нашем сайте, где находится материал, который вы считаете нарушающим, и вашу контактную информацию.',
    en: 'If you believe that your copyright has been infringed by materials on our site, please send us a notice containing information about the alleged infringement, including identification of the copyrighted work, a description of where on our site the material that you claim is infringing is located, and your contact information.'
  },
  'copyright.contact_title': {
    ru: 'Контактная информация',
    en: 'Contact Information'
  },
  'copyright.contact_text': {
    ru: 'По вопросам, связанным с авторскими правами, пожалуйста, свяжитесь с нами через страницу Контакты.',
    en: 'For copyright-related inquiries, please contact us through the Contacts page.'
  },
  
  'about.mission_title': {
    ru: 'Наша миссия',
    en: 'Our Mission'
  },
  'about.mission_text': {
    ru: 'Наша миссия — создать удобную и информативную платформу для любителей аниме и манги, где каждый может найти интересующий его контент, получить актуальную информацию и поделиться своими впечатлениями с единомышленниками.',
    en: 'Our mission is to create a convenient and informative platform for anime and manga enthusiasts, where everyone can find content of interest, get up-to-date information, and share their impressions with like-minded people.'
  },
  'about.what_we_offer_title': {
    ru: 'Что мы предлагаем',
    en: 'What We Offer'
  },
  'about.what_we_offer_text1': {
    ru: 'АнимеПортал предоставляет обширную базу данных аниме и манги с подробным описанием, рейтингами, обзорами и рекомендациями. Мы постоянно обновляем информацию, чтобы вы всегда были в курсе последних новинок и трендов в мире аниме.',
    en: 'AnimePortal provides an extensive database of anime and manga with detailed descriptions, ratings, reviews, and recommendations. We constantly update information so that you are always aware of the latest releases and trends in the anime world.'
  },
  'about.what_we_offer_text2': {
    ru: 'Наш сайт также предлагает возможность создания личного профиля, где вы можете отслеживать просмотренные аниме, добавлять тайтлы в избранное и взаимодействовать с другими пользователями.',
    en: 'Our site also offers the ability to create a personal profile where you can track watched anime, add titles to favorites, and interact with other users.'
  },
  'about.team_title': {
    ru: 'Наша команда',
    en: 'Our Team'
  },
  'about.team_text': {
    ru: 'За АнимеПорталом стоит команда увлеченных аниме-фанатов и профессиональных разработчиков. Мы объединены общей страстью к японской анимации и стремлением создать лучший ресурс для сообщества любителей аниме.',
    en: 'Behind AnimePortal is a team of passionate anime fans and professional developers. We are united by a common passion for Japanese animation and the desire to create the best resource for the anime community.'
  },
  'about.contact_title': {
    ru: 'Связаться с нами',
    en: 'Contact Us'
  },
  'about.contact_text': {
    ru: 'Если у вас есть вопросы, предложения или отзывы о нашем сайте, пожалуйста, не стесняйтесь связаться с нами через страницу Контакты. Мы ценим ваше мнение и всегда открыты для общения.',
    en: 'If you have any questions, suggestions, or feedback about our site, please feel free to contact us through the Contacts page. We value your opinion and are always open to communication.'
  },
  
  'terms.acceptance_title': {
    ru: 'Принятие условий',
    en: 'Acceptance of Terms'
  },
  'terms.acceptance_text': {
    ru: 'Используя этот веб-сайт, вы соглашаетесь с настоящими Условиями использования. Если вы не согласны с какой-либо частью этих условий, пожалуйста, не используйте наш сайт.',
    en: 'By using this website, you agree to these Terms of Service. If you disagree with any part of these terms, please do not use our site.'
  },
  'terms.use_title': {
    ru: 'Правила использования',
    en: 'Rules of Use'
  },
  'terms.use_text': {
    ru: 'При использовании нашего сайта вы соглашаетесь не нарушать следующие правила:',
    en: 'When using our site, you agree not to violate the following rules:'
  },
  'terms.use_item1': {
    ru: 'Не публиковать или передавать любой незаконный, угрожающий, клеветнический, оскорбительный, непристойный или порнографический материал',
    en: 'Do not post or transmit any unlawful, threatening, defamatory, offensive, obscene, or pornographic material'
  },
  'terms.use_item2': {
    ru: 'Не нарушать права интеллектуальной собственности других лиц',
    en: 'Do not infringe on the intellectual property rights of others'
  },
  'terms.use_item3': {
    ru: 'Не использовать сайт для распространения спама или вредоносного программного обеспечения',
    en: 'Do not use the site to distribute spam or malicious software'
  },
  'terms.use_item4': {
    ru: 'Не пытаться получить несанкционированный доступ к нашим системам или сетям',
    en: 'Do not attempt to gain unauthorized access to our systems or networks'
  },
  'terms.content_title': {
    ru: 'Содержание сайта',
    en: 'Site Content'
  },
  'terms.content_text': {
    ru: 'Весь контент, представленный на нашем сайте, включая тексты, графику, логотипы, изображения и программное обеспечение, защищен авторским правом и является собственностью АнимеПортала или наших партнеров. Несанкционированное использование этого контента запрещено.',
    en: 'All content presented on our site, including text, graphics, logos, images, and software, is protected by copyright and is the property of AnimePortal or our partners. Unauthorized use of this content is prohibited.'
  },
  'terms.accounts_title': {
    ru: 'Учетные записи пользователей',
    en: 'User Accounts'
  },
  'terms.accounts_text': {
    ru: 'Вы несете ответственность за сохранение конфиденциальности вашей учетной записи и пароля, а также за ограничение доступа к вашему компьютеру. Вы соглашаетесь принять ответственность за все действия, которые происходят под вашей учетной записью или паролем.',
    en: 'You are responsible for maintaining the confidentiality of your account and password, as well as for restricting access to your computer. You agree to accept responsibility for all activities that occur under your account or password.'
  },
  'terms.termination_title': {
    ru: 'Прекращение доступа',
    en: 'Termination of Access'
  },
  'terms.termination_text': {
    ru: 'Мы оставляем за собой право прекратить или приостановить ваш доступ к сайту немедленно, без предварительного уведомления или ответственности, по любой причине, включая, без ограничений, нарушение Условий использования.',
    en: 'We reserve the right to terminate or suspend your access to the site immediately, without prior notice or liability, for any reason, including, without limitation, breach of the Terms of Service.'
  },
  'terms.changes_title': {
    ru: 'Изменения в условиях',
    en: 'Changes to Terms'
  },
  'terms.changes_text': {
    ru: 'Мы оставляем за собой право изменять или заменять эти условия в любое время. Ваше продолжение использования сайта после таких изменений означает ваше согласие с новыми условиями.',
    en: 'We reserve the right to modify or replace these terms at any time. Your continued use of the site after such changes constitutes your agreement to the new terms.'
  },
  'terms.contact_title': {
    ru: 'Контактная информация',
    en: 'Contact Information'
  },
  'terms.contact_text': {
    ru: 'Если у вас есть вопросы об этих Условиях использования, пожалуйста, свяжитесь с нами через страницу Контакты.',
    en: 'If you have any questions about these Terms of Service, please contact us through the Contacts page.'
  },
  
  'privacy.intro_title': {
    ru: 'Введение',
    en: 'Introduction'
  },
  'privacy.intro_text': {
    ru: 'Мы уважаем вашу конфиденциальность и стремимся защищать ваши персональные данные. Эта политика конфиденциальности объясняет, как мы собираем, используем и защищаем информацию, которую вы предоставляете нам при использовании нашего сайта.',
    en: 'We respect your privacy and are committed to protecting your personal data. This privacy policy explains how we collect, use, and safeguard the information you provide to us when using our site.'
  },
  'privacy.collection_title': {
    ru: 'Сбор информации',
    en: 'Information Collection'
  },
  'privacy.collection_text': {
    ru: 'Мы можем собирать следующие типы информации:',
    en: 'We may collect the following types of information:'
  },
  'privacy.collection_item1': {
    ru: 'Личная информация, такая как имя, адрес электронной почты и данные профиля, которые вы предоставляете при регистрации',
    en: 'Personal information such as name, email address, and profile data that you provide when registering'
  },
  'privacy.collection_item2': {
    ru: 'Информация о вашей активности на сайте, включая просмотренные аниме и добавленные в избранное тайтлы',
    en: 'Information about your activity on the site, including viewed anime and titles added to favorites'
  },
  'privacy.collection_item3': {
    ru: 'Технические данные, такие как IP-адрес, тип браузера и устройства, время доступа',
    en: 'Technical data such as IP address, browser and device type, access time'
  },
  'privacy.collection_item4': {
    ru: 'Файлы cookie и аналогичные технологии для улучшения вашего опыта использования сайта',
    en: 'Cookies and similar technologies to enhance your site experience'
  },
  'privacy.use_title': {
    ru: 'Использование информации',
    en: 'Use of Information'
  },
  'privacy.use_text': {
    ru: 'Мы используем собранную информацию для следующих целей:',
    en: 'We use the collected information for the following purposes:'
  },
  'privacy.use_item1': {
    ru: 'Предоставление и улучшение наших услуг, включая персонализацию контента и рекомендаций',
    en: 'Providing and improving our services, including personalizing content and recommendations'
  },
  'privacy.use_item2': {
    ru: 'Обработка ваших запросов и транзакций',
    en: 'Processing your requests and transactions'
  },
  'privacy.use_item3': {
    ru: 'Отправка уведомлений и обновлений, связанных с нашими услугами',
    en: 'Sending notifications and updates related to our services'
  },
  'privacy.sharing_title': {
    ru: 'Раскрытие информации',
    en: 'Information Disclosure'
  },
  'privacy.sharing_text': {
    ru: 'Мы не продаем, не обмениваем и не передаем вашу личную информацию третьим лицам без вашего согласия, за исключением случаев, когда это необходимо для предоставления запрошенных вами услуг или когда это требуется по закону.',
    en: 'We do not sell, trade, or transfer your personal information to third parties without your consent, except as necessary to provide services you have requested or as required by law.'
  },
  'privacy.cookies_title': {
    ru: 'Файлы cookie',
    en: 'Cookies'
  },
  'privacy.cookies_text': {
    ru: 'Наш сайт использует файлы cookie для улучшения вашего опыта. Вы можете настроить свой браузер так, чтобы отклонять файлы cookie или уведомлять вас, когда они отправляются. Однако это может повлиять на функциональность нашего сайта.',
    en: 'Our site uses cookies to enhance your experience. You can set your browser to refuse cookies or alert you when cookies are being sent. However, this may affect the functionality of our site.'
  },
  'privacy.security_title': {
    ru: 'Безопасность',
    en: 'Security'
  },
  'privacy.security_text': {
    ru: 'Мы применяем соответствующие меры безопасности для защиты от несанкционированного доступа, изменения, раскрытия или уничтожения вашей личной информации, имени пользователя, пароля, информации о транзакциях и данных, хранящихся на нашем сайте.',
    en: 'We implement appropriate security measures to protect against unauthorized access, alteration, disclosure, or destruction of your personal information, username, password, transaction information, and data stored on our site.'
  },
  'privacy.changes_title': {
    ru: 'Изменения в политике',
    en: 'Changes to Policy'
  },
  'privacy.changes_text': {
    ru: 'Мы можем обновлять нашу политику конфиденциальности время от времени. Мы уведомим вас о любых изменениях, разместив новую политику конфиденциальности на этой странице. Рекомендуется периодически проверять эту политику на наличие изменений.',
    en: 'We may update our privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page. It is advised to review this policy periodically for changes.'
  },
  'privacy.contact_title': {
    ru: 'Контактная информация',
    en: 'Contact Information'
  },
  'privacy.contact_text': {
    ru: 'Если у вас есть вопросы или предложения относительно нашей политики конфиденциальности, пожалуйста, свяжитесь с нами через страницу Контакты.',
    en: 'If you have any questions or suggestions regarding our privacy policy, please contact us through the Contacts page.'
  },

  'contacts.get_in_touch': {
    ru: 'Связаться с нами',
    en: 'Get in Touch'
  },
  'contacts.get_in_touch_text': {
    ru: 'Если у вас есть вопросы, предложения или отзывы, пожалуйста, заполните форму ниже, и мы свяжемся с вами в ближайшее время.',
    en: 'If you have any questions, suggestions, or feedback, please fill out the form below, and we will get back to you as soon as possible.'
  },
  'contacts.name': {
    ru: 'Имя',
    en: 'Name'
  },
  'contacts.email': {
    ru: 'Email',
    en: 'Email'
  },
  'contacts.subject': {
    ru: 'Тема',
    en: 'Subject'
  },
  'contacts.message': {
    ru: 'Сообщение',
    en: 'Message'
  },
  'contacts.send': {
    ru: 'Отправить',
    en: 'Send'
  },
  'contacts.contact_info': {
    ru: 'Контактная информация',
    en: 'Contact Information'
  },
  'contacts.form_success': {
    ru: 'Ваше сообщение успешно отправлено! Мы свяжемся с вами в ближайшее время.',
    en: 'Your message has been successfully sent! We will contact you shortly.'
  },
  'profile.reply': {
    ru: 'Ответить',
    en: 'Reply'
  },
  'profile.reply_placeholder': {
    ru: 'Напишите ответ...',
    en: 'Write a reply...'
  },
  'profile.submit_reply': {
    ru: 'Отправить ответ',
    en: 'Submit reply'
  },
  'profile.edit_reply': {
    ru: 'Редактировать',
    en: 'Edit'
  },
  'profile.delete_reply': {
    ru: 'Удалить',
    en: 'Delete'
  },
  'profile.confirm_delete_reply': {
    ru: 'Вы уверены, что хотите удалить этот ответ?',
    en: 'Are you sure you want to delete this reply?'
  },
  'profile.liked': {
    ru: 'Понравилось',
    en: 'Liked'
  },
  'profile.likes': {
    ru: 'Лайков',
    en: 'Likes'
  },
  'profile.replies': {
    ru: 'Ответы',
    en: 'Replies'
  },
  'profile.reply_to': {
    ru: 'Ответить пользователю',
    en: 'Reply to user'
  },
  'profile.no_replies': {
    ru: 'Нет ответов',
    en: 'No replies'
  },
  'profile.reply_added': {
    ru: 'Ответ добавлен',
    en: 'Reply added'
  },
  'profile.edit_comment_success': {
    ru: 'Комментарий успешно обновлён',
    en: 'Comment successfully updated'
  },
  'profile.edit_reply_success': {
    ru: 'Ответ успешно обновлён',
    en: 'Reply successfully updated'
  },
  'profile.delete_comment_success': {
    ru: 'Комментарий успешно удалён',
    en: 'Comment successfully deleted'
  },
  'profile.delete_reply_success': {
    ru: 'Ответ успешно удалён',
    en: 'Reply successfully deleted'
  },
  'details.add_to_favorites': {
    ru: 'Добавить в избранное',
    en: 'Add to favorites'
  },
  'details.remove_from_favorites': {
    ru: 'Удалить из избранного',
    en: 'Remove from favorites'
  },
  'manga.add_to_favorites': {
    ru: 'Добавить в избранное',
    en: 'Add to favorites'
  },
  'manga.remove_from_favorites': {
    ru: 'Удалить из избранного',
    en: 'Remove from favorites'
  },
  'manga.ongoing': {
    ru: 'Выходит',
    en: 'Ongoing'
  },
  'manga.unknown': {
    ru: 'Неизвестно',
    en: 'Unknown'
  },
  'manga.synopsis': {
    ru: 'Описание',
    en: 'Synopsis'
  },
  'manga.back_to_catalog': {
    ru: 'Вернуться к каталогу',
    en: 'Back to catalog'
  },
  'manga.no_synopsis': {
    ru: 'Описание отсутствует',
    en: 'No synopsis available'
  }
}