# 🎨 Дизайн-система

Современная модульная дизайн-система, построенная на принципах Atomic Design и TypeScript.

## 📁 Структура

```
design-system/
├── tokens/          # Дизайн-токены
│   ├── colors.ts      # Цвета и темы
│   ├── typography.ts  # Типографика
│   ├── spacing.ts     # Отступы и размеры
│   ├── breakpoints.ts # Брейкпоинты
│   ├── animations.ts  # Анимации и переходы
│   └── index.ts       # Экспорт всех токенов
└── components/
    └── atoms/       # Атомарные компоненты
        ├── Button/
        ├── Input/
        ├── Typography/
        ├── Card/
        ├── Avatar/
        ├── Badge/
        ├── Icon/
        └── Spinner/
```

## 🎯 Дизайн-токены

### Цвета
```typescript
import { colors } from '../design-system/tokens';

// Primary colors
colors.primary[500]   // #ff5f5f (основной красный)
colors.primary[100]   // Светлый оттенок
colors.primary[900]   // Темный оттенок

// Semantic colors
colors.semantic.success[500]
colors.semantic.error[500]
colors.semantic.warning[500]

// Theme colors
colors.theme.light.text.primary
colors.theme.dark.background.primary
```

### Типографика
```typescript
import { typography } from '../design-system/tokens';

// Готовые размеры текста
typography.textSize.display['2xl']  // Большие заголовки
typography.textSize.heading.xl     // Заголовки
typography.textSize.body.md        // Основной текст
typography.textSize.label.sm       // Метки
```

### Отступы
```typescript
import { spacing, padding, margin } from '../design-system/tokens';

spacing[4]    // 1rem (16px)
padding.md    // 1rem
margin.lg     // 1.5rem
```

## 🧱 Атомарные компоненты

### Button
```tsx
import { Button } from '../components/atoms';

<Button variant="primary" size="md">
  Кнопка
</Button>

<Button variant="secondary" size="lg" isLoading>
  Загрузка
</Button>

<Button variant="ghost" leftIcon={<Icon name="heart" />}>
  С иконкой
</Button>
```

### Input
```tsx
import { Input } from '../components/atoms';

<Input 
  label="Email"
  placeholder="your@email.com"
  type="email"
/>

<Input 
  variant="error"
  errorMessage="Обязательное поле"
  leftIcon={<Icon name="user" />}
/>
```

### Typography
```tsx
import { Typography } from '../components/atoms';

<Typography variant="display-xl" color="primary">
  Большой заголовок
</Typography>

<Typography variant="body-md" color="secondary">
  Основной текст
</Typography>

<Typography variant="label-sm" color="muted">
  Мелкий текст
</Typography>
```

### Card
```tsx
import { Card } from '../components/atoms';

<Card variant="elevated" padding="lg">
  Контент карточки
</Card>

<Card variant="outlined" interactive>
  Интерактивная карточка
</Card>
```

### Avatar
```tsx
import { Avatar } from '../components/atoms';

<Avatar src="/avatar.jpg" size="md" />
<Avatar fallback="AB" color="primary" shape="circle" />
<Avatar size="lg" color="success" />
```

### Badge
```tsx
import { Badge } from '../components/atoms';

<Badge variant="primary">Новое</Badge>
<Badge variant="success" size="sm">Активно</Badge>
<Badge dot variant="error" />
```

### Icon
```tsx
import { Icon } from '../components/atoms';

<Icon name="search" size="md" />
<Icon name="heart" color="error" />
<Icon name="star" size="lg" color="warning" />

// Кастомная иконка
<Icon size="md">
  <path d="..." />
</Icon>
```

### Spinner
```tsx
import { Spinner, DotSpinner } from '../components/atoms';

<Spinner size="md" color="primary" />
<Spinner size="lg" speed="fast" thickness={3} />
<DotSpinner size="sm" color="success" />
```

## 🎨 Принципы использования

### 1. Консистентность
Всегда используйте дизайн-токены вместо хардкода значений:
```tsx
// ✅ Правильно
color: colors.primary[500]
padding: spacing[4]

// ❌ Неправильно
color: '#ff5f5f'
padding: '16px'
```

### 2. Композиция
Комбинируйте атомарные компоненты для создания более сложных:
```tsx
<Card padding="lg">
  <div style={{ display: 'flex', alignItems: 'center', gap: spacing[3] }}>
    <Avatar src="/user.jpg" size="md" />
    <div>
      <Typography variant="heading-md">Имя пользователя</Typography>
      <Typography variant="body-sm" color="muted">Онлайн</Typography>
    </div>
    <Badge variant="success" dot />
  </div>
</Card>
```

### 3. Адаптивность
Используйте брейкпоинты для адаптивного дизайна:
```tsx
import { mediaQueries } from '../design-system/tokens';

const styles = {
  fontSize: '1rem',
  [mediaQueries.up.md]: {
    fontSize: '1.125rem',
  },
};
```

## 🔧 Расширение системы

### Добавление новых токенов
1. Обновите соответствующий файл в `tokens/`
2. Экспортируйте в `tokens/index.ts`
3. Обновите типы

### Создание новых компонентов
1. Создайте папку в `components/atoms/`
2. Используйте `forwardRef` и TypeScript
3. Следуйте существующим паттернам API
4. Экспортируйте в `index.ts`

## 📊 Метрики

- ✅ **8 атомарных компонентов** готовы к использованию
- ✅ **5 категорий дизайн-токенов** покрывают все потребности
- ✅ **100% TypeScript** покрытие
- ✅ **Консистентная API** между компонентами
- ✅ **Модульная архитектура** для легкого расширения 