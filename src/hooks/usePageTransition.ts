import { useState, useCallback, useRef } from 'react';

export type TransitionType = 
  | 'fade' 
  | 'slide-up' 
  | 'slide-down' 
  | 'slide-left' 
  | 'slide-right' 
  | 'scale' 
  | 'none';

export type TransitionState = 'idle' | 'entering' | 'entered' | 'exiting' | 'exited';

interface TransitionConfig {
  type?: TransitionType;
  duration?: number;
  delay?: number;
  easing?: string;
}

interface UsePageTransitionReturn {
  state: TransitionState;
  isAnimating: boolean;
  trigger: (config?: TransitionConfig) => Promise<void>;
  reset: () => void;
  getTransitionClasses: () => string;
  getTransitionStyles: () => React.CSSProperties;
}

const defaultConfig: Required<TransitionConfig> = {
  type: 'fade',
  duration: 300,
  delay: 0,
  easing: 'ease-in-out'
};

/**
 * Хук для управления page transitions и анимациями состояний
 * @param initialConfig Начальная конфигурация анимации
 * @returns Объект с состоянием и методами управления переходами
 * 
 * @example
 * ```tsx
 * function Component() {
 *   const transition = usePageTransition({
 *     type: 'fade',
 *     duration: 300
 *   });
 *   
 *   const handleClick = async () => {
 *     await transition.trigger({ type: 'slide-up' });
 *     // Выполнить действие после анимации
 *   };
 *   
 *   return (
 *     <div 
 *       className={transition.getTransitionClasses()}
 *       style={transition.getTransitionStyles()}
 *     >
 *       <button onClick={handleClick}>
 *         {transition.isAnimating ? 'Loading...' : 'Click me'}
 *       </button>
 *     </div>
 *   );
 * }
 * ```
 */
export const usePageTransition = (
  initialConfig: TransitionConfig = {}
): UsePageTransitionReturn => {
  const [state, setState] = useState<TransitionState>('idle');
  const [config, setConfig] = useState<Required<TransitionConfig>>({
    ...defaultConfig,
    ...initialConfig
  });
  
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isAnimating = state === 'entering' || state === 'exiting';

  const reset = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setState('idle');
  }, []);

  const trigger = useCallback(async (newConfig?: TransitionConfig): Promise<void> => {
    return new Promise((resolve) => {
      // Обновляем конфигурацию если передана
      if (newConfig) {
        setConfig(prev => ({ ...prev, ...newConfig }));
      }

      const currentConfig = { ...config, ...newConfig };

      // Очищаем предыдущий timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Если анимация отключена
      if (currentConfig.type === 'none') {
        setState('entered');
        resolve();
        return;
      }

      // Фаза 1: Начало анимации (exiting)
      setState('exiting');

      timeoutRef.current = setTimeout(() => {
        // Фаза 2: Завершение exit, начало entering
        setState('entering');
        
        timeoutRef.current = setTimeout(() => {
          // Фаза 3: Завершение анимации
          setState('entered');
          resolve();
        }, currentConfig.duration + currentConfig.delay);
      }, currentConfig.delay);
    });
  }, [config]);

  const getTransitionClasses = useCallback((): string => {
    const classes: string[] = ['page-transition'];
    
    // Базовые классы для типа анимации
    classes.push(`transition-${config.type}`);
    
    // Классы состояния
    switch (state) {
      case 'entering':
        classes.push('transition-entering');
        break;
      case 'entered':
        classes.push('transition-entered');
        break;
      case 'exiting':
        classes.push('transition-exiting');
        break;
      case 'exited':
        classes.push('transition-exited');
        break;
      default:
        classes.push('transition-idle');
    }

    return classes.join(' ');
  }, [config.type, state]);

  const getTransitionStyles = useCallback((): React.CSSProperties => {
    const baseStyles: React.CSSProperties = {
      transitionDuration: `${config.duration}ms`,
      transitionDelay: `${config.delay}ms`,
      transitionTimingFunction: config.easing,
    };

    // Стили в зависимости от типа анимации и состояния
    switch (config.type) {
      case 'fade':
        baseStyles.transitionProperty = 'opacity';
        if (state === 'exiting' || state === 'idle') {
          baseStyles.opacity = 0;
        } else {
          baseStyles.opacity = 1;
        }
        break;
        
      case 'slide-up':
        baseStyles.transitionProperty = 'transform, opacity';
        if (state === 'exiting' || state === 'idle') {
          baseStyles.transform = 'translateY(20px)';
          baseStyles.opacity = 0;
        } else {
          baseStyles.transform = 'translateY(0)';
          baseStyles.opacity = 1;
        }
        break;
        
      case 'slide-down':
        baseStyles.transitionProperty = 'transform, opacity';
        if (state === 'exiting' || state === 'idle') {
          baseStyles.transform = 'translateY(-20px)';
          baseStyles.opacity = 0;
        } else {
          baseStyles.transform = 'translateY(0)';
          baseStyles.opacity = 1;
        }
        break;
        
      case 'slide-left':
        baseStyles.transitionProperty = 'transform, opacity';
        if (state === 'exiting' || state === 'idle') {
          baseStyles.transform = 'translateX(20px)';
          baseStyles.opacity = 0;
        } else {
          baseStyles.transform = 'translateX(0)';
          baseStyles.opacity = 1;
        }
        break;
        
      case 'slide-right':
        baseStyles.transitionProperty = 'transform, opacity';
        if (state === 'exiting' || state === 'idle') {
          baseStyles.transform = 'translateX(-20px)';
          baseStyles.opacity = 0;
        } else {
          baseStyles.transform = 'translateX(0)';
          baseStyles.opacity = 1;
        }
        break;
        
      case 'scale':
        baseStyles.transitionProperty = 'transform, opacity';
        if (state === 'exiting' || state === 'idle') {
          baseStyles.transform = 'scale(0.95)';
          baseStyles.opacity = 0;
        } else {
          baseStyles.transform = 'scale(1)';
          baseStyles.opacity = 1;
        }
        break;
        
      default:
        // Нет стилей для 'none' типа
        break;
    }

    return baseStyles;
  }, [config, state]);

  return {
    state,
    isAnimating,
    trigger,
    reset,
    getTransitionClasses,
    getTransitionStyles
  };
};

export type { TransitionConfig, UsePageTransitionReturn }; 