import { useState, useEffect } from 'react';

/**
 * Хук для определения touch-устройств
 * Использует множественные проверки для максимальной точности
 * @returns Объект с информацией о touch возможностях устройства
 * 
 * @example
 * ```tsx
 * function Component() {
 *   const { isTouch, isMobile, hasHover } = useTouchDevice();
 *   
 *   return (
 *     <button 
 *       className={hasHover ? 'hover:bg-blue-500' : ''}
 *       style={{ 
 *         minHeight: isTouch ? '44px' : '36px' // Touch-friendly размер
 *       }}
 *     >
 *       {isMobile ? 'Tap' : 'Click'} me
 *     </button>
 *   );
 * }
 * ```
 */
export const useTouchDevice = () => {
  const [touchInfo, setTouchInfo] = useState(() => {
    if (typeof window === 'undefined') {
      return {
        isTouch: false,
        hasHover: true,
        isMobile: false,
        supportsTouchEvents: false,
        supportsPointerEvents: false,
        maxTouchPoints: 0
      };
    }

    return detectTouchCapabilities();
  });

  useEffect(() => {
    // Переопределяем при изменении размера окна (поворот устройства)
    const handleResize = () => {
      setTouchInfo(detectTouchCapabilities());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return touchInfo;
};

/**
 * Определяет touch возможности устройства
 */
function detectTouchCapabilities() {
  // Проверка поддержки Touch Events
  const supportsTouchEvents = 'ontouchstart' in window || 
    (window.navigator && 'maxTouchPoints' in window.navigator && window.navigator.maxTouchPoints > 0);

  // Проверка поддержки Pointer Events  
  const supportsPointerEvents = 'onpointerdown' in window;

  // Максимальное количество одновременных touch точек
  const maxTouchPoints = window.navigator?.maxTouchPoints || 0;

  // CSS Media Query для hover
  const hasHover = window.matchMedia?.('(hover: hover)')?.matches ?? true;

  // CSS Media Query для pointer precision
  const hasCoarsePointer = window.matchMedia?.('(pointer: coarse)')?.matches ?? false;

  // Определение мобильного устройства по User Agent (резервный метод)
  const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    window.navigator.userAgent
  );

  // Определение мобильного устройства по размеру экрана
  const isMobileScreen = window.innerWidth <= 768;

  // Комбинированное определение touch устройства
  const isTouch = supportsTouchEvents || 
    maxTouchPoints > 0 || 
    hasCoarsePointer || 
    !hasHover;

  // Комбинированное определение мобильного устройства  
  const isMobile = (isTouch && isMobileScreen) || 
    (maxTouchPoints > 0 && isMobileScreen) || 
    isMobileUA;

  return {
    isTouch,
    hasHover,
    isMobile,
    supportsTouchEvents,
    supportsPointerEvents,
    maxTouchPoints,
    // Дополнительные флаги
    hasCoarsePointer,
    isMobileUA,
    isMobileScreen,
    // Utility методы
    shouldUseTouchOptimization: isTouch,
    shouldShowHoverEffects: hasHover && !isTouch,
    recommendedMinTouchTarget: isTouch ? 44 : 36, // px
  };
}

export type TouchDeviceInfo = ReturnType<typeof useTouchDevice>; 