# Технологический контекст

## Основной технологический стек

### Frontend Core
- **React 19.0.0**: Библиотека для создания пользовательских интерфейсов
- **TypeScript 5.7.2**: Типизированный JavaScript для масштабируемых приложений
- **Vite 6.2.0**: Современный build tool с быстрой горячей перезагрузкой

### Стилизация
- **@emotion/react 11.14.0**: CSS-in-JS библиотека для стилизации
- **@emotion/styled 11.14.0**: Styled components для Emotion
- **@swc/plugin-emotion 9.0.0**: SWC плагин для оптимизации Emotion

### Роутинг и навигация
- **react-router-dom 7.3.0**: Декларативный роутинг для React

### HTTP клиент
- **axios 1.8.3**: Promise-based HTTP клиент для API запросов

### Иконки
- **react-icons 5.5.0**: Популярная библиотека иконок для React

### Инструменты разработки
- **@vitejs/plugin-react-swc 3.8.0**: Vite плагин для React с SWC
- **eslint 9.21.0**: Линтер для проверки качества кода
- **eslint-plugin-react-hooks 5.1.0**: ESLint правила для React hooks
- **eslint-plugin-react-refresh 0.4.19**: ESLint правила для React Refresh

## Конфигурация сборки

### Vite Configuration
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  // Конфигурация для оптимизации сборки
})
```

### TypeScript Configuration
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true
  }
}
```

### ESLint Configuration
```javascript
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
)
```

## Настройка окружения разработки

### Package Manager
**Рекомендация**: Использовать `bun` для управления пакетами (как указано в правилах пользователя)

```bash
# Установка зависимостей
bun install

# Запуск development сервера
bun run dev

# Сборка для production
bun run build

# Линтинг кода
bun run lint

# Preview production build
bun run preview
```

### Scripts в package.json
```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  }
}
```

## Внешние API и интеграции

### Jikan API v4
- **URL**: `https://api.jikan.moe/v4`
- **Документация**: https://docs.api.jikan.moe/
- **Rate Limits**: 3 запроса в секунду, 60 запросов в минуту
- **Источник данных**: MyAnimeList

#### Основные эндпоинты:
```typescript
interface JikanEndpoints {
  anime: '/anime';                    // Список аниме
  animeById: '/anime/{id}';          // Детали аниме
  animeCharacters: '/anime/{id}/characters'; // Персонажи
  animeStaff: '/anime/{id}/staff';   // Создатели
  animeReviews: '/anime/{id}/reviews'; // Обзоры
  manga: '/manga';                   // Список манги
  mangaById: '/manga/{id}';          // Детали манги
  topAnime: '/top/anime';            // Топ аниме
  topManga: '/top/manga';            // Топ манги
  genres: '/genres/anime';           // Жанры
  seasons: '/seasons/{year}/{season}'; // Сезонные аниме
  random: '/random/anime';           // Случайное аниме
}
```

### HTTP клиент настройки
```typescript
// Базовая конфигурация Axios
const apiClient = axios.create({
  baseURL: 'https://api.jikan.moe/v4',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptors для обработки ошибок
apiClient.interceptors.response.use(
  response => response,
  error => {
    // Логирование и обработка ошибок
    return Promise.reject(error);
  }
);
```

## Управление состоянием

### Local Storage структура
```typescript
interface LocalStorageSchema {
  // Аутентификация
  authToken?: string;
  currentUser?: User;
  
  // Пользовательские настройки
  userSettings: {
    theme: 'dark' | 'light';
    language: 'ru' | 'en';
    viewMode: 'grid' | 'list';
  };
  
  // Избранное
  favorites: number[]; // ID аниме
  watchStatus: Record<number, WatchStatus>;
  
  // История
  watchHistory: WatchHistory[];
  searchHistory: string[];
  
  // Кэш
  apiCache: Record<string, CacheItem>;
}
```

### Context Providers
```typescript
// Главный провайдер приложения
<AppProvider value={{ theme, toggleTheme, language, toggleLanguage, t }}>
  <AuthProvider>
    <ErrorBoundary>
      <Router>
        <App />
      </Router>
    </ErrorBoundary>
  </AuthProvider>
</AppProvider>
```

## Производительность и оптимизация

### Code Splitting
```typescript
// Lazy loading страниц
const HomePage = lazy(() => import('./pages/HomePage'));
const AnimePage = lazy(() => import('./pages/AnimePage'));
const AnimeDetailsPage = lazy(() => import('./pages/AnimeDetailsPage'));

// Suspense с fallback
<Suspense fallback={<LoadingFallback />}>
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/anime" element={<AnimePage />} />
    <Route path="/anime/:id" element={<AnimeDetailsPage />} />
  </Routes>
</Suspense>
```

### Оптимизация изображений
```typescript
// Ленивая загрузка изображений
const LazyImage = ({ src, alt, placeholder }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView] = useIntersectionObserver();
  
  return (
    <div>
      {isInView && (
        <img 
          src={src} 
          alt={alt}
          onLoad={() => setIsLoaded(true)}
          style={{ opacity: isLoaded ? 1 : 0 }}
        />
      )}
    </div>
  );
};
```

### Кэширование
```typescript
// LRU Cache для API ответов
class LRUCache<T> {
  private cache = new Map<string, CacheItem<T>>();
  private maxSize = 100;
  private defaultTTL = 5 * 60 * 1000; // 5 минут
  
  get(key: string): T | null {
    const item = this.cache.get(key);
    if (!item) return null;
    
    if (Date.now() - item.timestamp > item.ttl) {
      this.cache.delete(key);
      return null;
    }
    
    // Перемещаем в конец (LRU)
    this.cache.delete(key);
    this.cache.set(key, item);
    return item.value;
  }
}
```

## Constraints и ограничения

### Технические ограничения
1. **Статический хостинг**: Развертывание только на статических платформах
2. **Client-side routing**: Использование HashRouter для совместимости
3. **API Rate Limits**: Ограничения Jikan API требуют кэширования
4. **Браузерная совместимость**: Поддержка ES2020+ (современные браузеры)

### Deployment требования
- **Node.js**: v18+ для development
- **Browser support**: Chrome 91+, Firefox 90+, Safari 14+, Edge 91+
- **Mobile support**: iOS Safari 14+, Chrome Mobile 91+

### Безопасность
- **CSP Headers**: Content Security Policy для защиты от XSS
- **HTTPS**: Обязательное использование HTTPS в production
- **Input validation**: Client-side валидация всех пользовательских данных
- **Dependency security**: Регулярное обновление зависимостей

## Мониторинг и отладка

### Development tools
```typescript
// React DevTools совместимость
if (process.env.NODE_ENV === 'development') {
  // Development-only код
}

// Error boundary для production
class ErrorBoundary extends Component {
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Логирование ошибок в production
    console.error('Error caught by boundary:', error, errorInfo);
  }
}
```

### Performance monitoring
```typescript
// Web Vitals измерения
const reportWebVitals = (metric: any) => {
  if (process.env.NODE_ENV === 'production') {
    // Отправка метрик в аналитику
  }
};
```

## Будущие технологические улучшения

### Планируемые добавления
1. **Service Worker**: Для offline функциональности
2. **Web Workers**: Для тяжелых вычислений
3. **IndexedDB**: Для расширенного кэширования
4. **PWA features**: Установка приложения, push уведомления

### Возможные миграции
1. **React Query/TanStack Query**: Для более продвинутого управления серверным состоянием
2. **Zustand**: Для упрощения глобального состояния
3. **Next.js**: Для SSR/SSG возможностей
4. **Tauri**: Для создания desktop приложения 