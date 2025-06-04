# Системные паттерны и архитектура

## Общая архитектура приложения

### Архитектурные принципы

1. **Компонентно-ориентированная архитектура**
   - Atomic Design: atoms → molecules → organisms → templates → pages
   - Переиспользуемые компоненты с четким API
   - Изоляция стилей через CSS-in-JS (Emotion)

2. **Разделение ответственности**
   - Презентационные компоненты (UI)
   - Контейнерные компоненты (логика)
   - Сервисы для работы с API
   - Hooks для бизнес-логики

3. **Реактивное программирование**
   - Односторонний поток данных
   - Управление состоянием через React Context
   - Подписка на изменения через useState/useEffect

### Структура проекта

```
src/
├── components/
│   ├── atoms/           # Базовые компоненты (Button, Input, etc.)
│   ├── molecules/       # Составные компоненты (SearchBox, UserMenu)
│   ├── organisms/       # Сложные компоненты (Header, Footer)
│   └── templates/       # Шаблоны страниц
├── pages/               # Страницы приложения
├── services/            # API сервисы
├── hooks/               # Пользовательские хуки
├── context/             # React контексты
├── types/               # TypeScript типы
├── utils/               # Утилиты
├── design-system/       # Дизайн токены
└── styles/              # Глобальные стили
```

## Ключевые технические решения

### 1. Управление состоянием

#### React Context для глобального состояния
```typescript
// ThemeContext для темы и языка
interface AppContextType {
  theme: string;
  toggleTheme: () => void;
  language: string;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

// AuthContext для аутентификации
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (credentials: UserCredentials) => Promise<void>;
  logout: () => void;
}
```

#### Local Storage для персистентности
- Избранные аниме (`favorites`)
- Настройки пользователя (`userSettings`)
- История просмотров (`watchHistory`)
- Токены аутентификации (`authToken`)

### 2. Маршрутизация

#### React Router v7 с HashRouter
```typescript
<HashRouter>
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/anime" element={<AnimePage />} />
    <Route path="/anime/:id" element={<AnimeDetailsPage />} />
    <Route path="/manga" element={<MangaPage />} />
    <Route path="/manga/:id" element={<MangaDetailsPage />} />
    <Route path="/favorites" element={<FavoritesPage />} />
    <Route path="/profile" element={<ProfilePage />} />
    <Route path="/admin" element={<AdminPage />} />
  </Routes>
</HashRouter>
```

**Почему HashRouter:**
- Совместимость со статическим хостингом
- Не требует серверной конфигурации
- Простое развертывание на Netlify/Vercel

### 3. Работа с API

#### Сервисная архитектура
```typescript
class AnimeService {
  private baseURL = 'https://api.jikan.moe/v4';
  
  async getAnimeList(page: number): Promise<AnimeResponse> {
    return retryWithBackoff(() => 
      axios.get(`${this.baseURL}/anime`, { params: { page } })
    );
  }
}
```

#### Паттерны обработки ошибок
- Retry с экспоненциальной задержкой
- Fallback состояния для UI
- Централизованная обработка HTTP ошибок
- Rate limiting для соблюдения лимитов API

#### Кэширование
```typescript
class LRUCache<T> {
  private cache = new Map<string, CacheItem<T>>();
  private maxSize: number;
  private defaultTTL: number;
}
```

### 4. Компонентная архитектура

#### Atomic Design Implementation

**Atoms** (Базовые строительные блоки):
- `Button`: Кнопки с вариантами и состояниями
- `Input`: Поля ввода с валидацией
- `Typography`: Типографика с дизайн токенами
- `Avatar`: Аватары пользователей
- `Badge`: Бейджи и метки

**Molecules** (Составные компоненты):
- `SearchBox`: Поиск с фильтрами
- `AnimeCard`: Карточка аниме
- `UserMenu`: Меню пользователя
- `Pagination`: Пагинация списков

**Organisms** (Сложные компоненты):
- `Header`: Шапка с навигацией
- `Footer`: Подвал сайта
- `AnimePlayer`: Плеер для просмотра

**Templates** (Шаблоны страниц):
- `ProfileLayout`: Макет профиля пользователя

### 5. Стилизация и темизация

#### CSS-in-JS с Emotion
```typescript
const Button = styled.button<ButtonProps>`
  background-color: ${props => props.variant === 'primary' ? '#ff5f5f' : 'transparent'};
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#000000'};
  transition: all 0.3s ease;
`;
```

#### Дизайн токены
```typescript
export const tokens = {
  colors: {
    primary: '#ff5f5f',
    secondary: '#4a90e2',
    // ...
  },
  typography: {
    fonts: {
      primary: 'Roboto, sans-serif',
    },
    sizes: {
      xs: '0.75rem',
      sm: '0.875rem',
      // ...
    }
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    // ...
  }
};
```

### 6. Производительность

#### Lazy Loading
```typescript
// Ленивая загрузка страниц
const HomePage = lazy(() => import('./pages/HomePage'));
const AnimePage = lazy(() => import('./pages/AnimePage'));

// Виртуализация для длинных списков
const VirtualList = ({ items, itemHeight, containerHeight }) => {
  // Реализация виртуального скроллинга
};
```

#### Оптимизация изображений
```typescript
const LazyImage = ({ src, alt, placeholder }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  
  // Intersection Observer для lazy loading
};
```

### 7. Интернационализация

#### Система переводов
```typescript
interface Translations {
  [key: string]: {
    ru: string;
    en: string;
  };
}

export const translations: Translations = {
  'page.title': {
    ru: 'АнимеПортал - Смотрите аниме онлайн',
    en: 'AnimePortal - Watch anime online'
  }
};
```

### 8. Безопасность

#### Валидация данных
- Client-side валидация форм
- Санитизация пользовательского ввода
- Защита от XSS через React's встроенные механизмы

#### Управление аутентификацией
```typescript
// Защищенные маршруты
const ProtectedRoute = ({ children, requireAuth = true }) => {
  const { isAuthenticated } = useAuth();
  
  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/auth" />;
  }
  
  return children;
};
```

## Паттерны интеграции

### 1. Jikan API Integration

#### Rate Limiting
- Максимум 3 запроса в секунду
- Очередь запросов с приоритизацией
- Кэширование ответов для снижения нагрузки

#### Error Handling
- Graceful degradation при недоступности API
- Fallback данные для критических компонентов
- User-friendly сообщения об ошибках

### 2. State Management Patterns

#### Lifting State Up
- Поднятие состояния на уровень ближайшего общего предка
- Передача данных через props

#### Context для глобального состояния
- Theme/Language preferences
- User authentication state
- Application-wide settings

#### Local Storage Synchronization
- Автоматическая синхронизация с localStorage
- Восстановление состояния при загрузке
- Handling storage events для multi-tab sync

## Принципы разработки

1. **Separation of Concerns**: Четкое разделение UI, логики и данных
2. **DRY (Don't Repeat Yourself)**: Переиспользование компонентов и утилит
3. **SOLID принципы**: Применение в архитектуре компонентов
4. **Progressive Enhancement**: Базовая функциональность работает без JavaScript
5. **Accessibility First**: Поддержка screen readers и keyboard navigation 