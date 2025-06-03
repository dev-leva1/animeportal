export const duration = {
  instant: '0ms',
  fast: '150ms',
  normal: '200ms',
  slow: '300ms',
  slower: '500ms',
  slowest: '800ms',
} as const;

export const easing = {
  // Стандартные функции
  linear: 'cubic-bezier(0, 0, 1, 1)',
  ease: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
  easeIn: 'cubic-bezier(0.42, 0, 1, 1)',
  easeOut: 'cubic-bezier(0, 0, 0.58, 1)',
  easeInOut: 'cubic-bezier(0.42, 0, 0.58, 1)',
  
  // Кастомные функции для современного UI
  smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
  bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  elastic: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)',
  
  // Специальные эффекты
  spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  anticipate: 'cubic-bezier(0.4, 0, 0.6, 1)',
  overshoot: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
} as const;

export const commonAnimations = {
  // Fade анимации
  fadeIn: {
    from: { opacity: 0 },
    to: { opacity: 1 },
    duration: duration.normal,
    easing: easing.smooth,
  },
  
  fadeOut: {
    from: { opacity: 1 },
    to: { opacity: 0 },
    duration: duration.normal,
    easing: easing.smooth,
  },
  
  // Scale анимации
  scaleIn: {
    from: { 
      opacity: 0,
      transform: 'scale(0.95)',
    },
    to: { 
      opacity: 1,
      transform: 'scale(1)',
    },
    duration: duration.normal,
    easing: easing.smooth,
  },
  
  scaleOut: {
    from: { 
      opacity: 1,
      transform: 'scale(1)',
    },
    to: { 
      opacity: 0,
      transform: 'scale(0.95)',
    },
    duration: duration.fast,
    easing: easing.smooth,
  },
  
  // Slide анимации
  slideUp: {
    from: { 
      opacity: 0,
      transform: 'translateY(10px)',
    },
    to: { 
      opacity: 1,
      transform: 'translateY(0)',
    },
    duration: duration.normal,
    easing: easing.smooth,
  },
  
  slideDown: {
    from: { 
      opacity: 0,
      transform: 'translateY(-10px)',
    },
    to: { 
      opacity: 1,
      transform: 'translateY(0)',
    },
    duration: duration.normal,
    easing: easing.smooth,
  },
  
  slideLeft: {
    from: { 
      opacity: 0,
      transform: 'translateX(10px)',
    },
    to: { 
      opacity: 1,
      transform: 'translateX(0)',
    },
    duration: duration.normal,
    easing: easing.smooth,
  },
  
  slideRight: {
    from: { 
      opacity: 0,
      transform: 'translateX(-10px)',
    },
    to: { 
      opacity: 1,
      transform: 'translateX(0)',
    },
    duration: duration.normal,
    easing: easing.smooth,
  },
  
  // Специальные эффекты
  bounce: {
    keyframes: {
      '0%, 20%, 53%, 80%, to': {
        transform: 'translate3d(0,0,0)',
      },
      '40%, 43%': {
        transform: 'translate3d(0, -30px, 0)',
      },
      '70%': {
        transform: 'translate3d(0, -15px, 0)',
      },
      '90%': {
        transform: 'translate3d(0, -4px, 0)',
      },
    },
    duration: duration.slowest,
    easing: easing.bounce,
  },
  
  pulse: {
    keyframes: {
      '0%, 100%': {
        opacity: 1,
      },
      '50%': {
        opacity: 0.5,
      },
    },
    duration: duration.slower,
    easing: easing.easeInOut,
    iterationCount: 'infinite',
  },
  
  spin: {
    keyframes: {
      from: {
        transform: 'rotate(0deg)',
      },
      to: {
        transform: 'rotate(360deg)',
      },
    },
    duration: duration.slowest,
    easing: easing.linear,
    iterationCount: 'infinite',
  },
} as const;

// Transitions для interactive элементов
export const transitions = {
  // Кнопки
  button: `all ${duration.fast} ${easing.smooth}`,
  buttonHover: `all ${duration.fast} ${easing.smooth}`,
  
  // Ссылки  
  link: `color ${duration.fast} ${easing.smooth}`,
  
  // Формы
  input: `border-color ${duration.fast} ${easing.smooth}, box-shadow ${duration.fast} ${easing.smooth}`,
  
  // Модальные окна
  modal: `all ${duration.normal} ${easing.smooth}`,
  overlay: `opacity ${duration.normal} ${easing.smooth}`,
  
  // Навигация
  page: `all ${duration.slow} ${easing.smooth}`,
  
  // Общие
  default: `all ${duration.normal} ${easing.smooth}`,
  fast: `all ${duration.fast} ${easing.smooth}`,
  slow: `all ${duration.slow} ${easing.smooth}`,
} as const;

export type DurationTokens = typeof duration;
export type EasingTokens = typeof easing;
export type AnimationTokens = typeof commonAnimations;
export type TransitionTokens = typeof transitions; 