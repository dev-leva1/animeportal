import { useEffect, useRef, useState, useCallback } from 'react';

interface SwipeGestureOptions {
  threshold?: number; // Минимальное расстояние для срабатывания свайпа (px)
  velocity?: number;  // Минимальная скорость (px/ms)
  preventScroll?: boolean; // Предотвращать скролл при свайпе
  touch?: boolean;    // Включить touch события
  mouse?: boolean;    // Включить mouse события
}

interface SwipeState {
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
  startTime: number;
  isActive: boolean;
  direction: 'left' | 'right' | 'up' | 'down' | null;
}

interface SwipeCallbacks {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  onSwipeStart?: (state: SwipeState) => void;
  onSwipeMove?: (state: SwipeState) => void;
  onSwipeEnd?: (state: SwipeState) => void;
}

export const useSwipeGesture = (
  callbacks: SwipeCallbacks,
  options: SwipeGestureOptions = {}
) => {
  const {
    threshold = 50,
    velocity = 0.3,
    preventScroll = false,
    touch = true,
    mouse = false
  } = options;

  const [swipeState, setSwipeState] = useState<SwipeState>({
    startX: 0,
    startY: 0,
    currentX: 0,
    currentY: 0,
    startTime: 0,
    isActive: false,
    direction: null,
  });

  const elementRef = useRef<HTMLElement | null>(null);

  const handleStart = useCallback((clientX: number, clientY: number) => {
    const newState: SwipeState = {
      startX: clientX,
      startY: clientY,
      currentX: clientX,
      currentY: clientY,
      startTime: Date.now(),
      isActive: true,
      direction: null,
    };
    
    setSwipeState(newState);
    callbacks.onSwipeStart?.(newState);
  }, [callbacks]);

  const handleMove = useCallback((clientX: number, clientY: number) => {
    if (!swipeState.isActive) return;

    const newState: SwipeState = {
      ...swipeState,
      currentX: clientX,
      currentY: clientY,
    };

    setSwipeState(newState);
    callbacks.onSwipeMove?.(newState);

    if (preventScroll) {
      const deltaX = Math.abs(clientX - swipeState.startX);
      const deltaY = Math.abs(clientY - swipeState.startY);
      
      // Предотвращаем скролл если горизонтальный свайп больше вертикального
      if (deltaX > deltaY && deltaX > 10) {
        return false;
      }
    }
  }, [swipeState, callbacks, preventScroll]);

  const handleEnd = useCallback(() => {
    if (!swipeState.isActive) return;

    const deltaX = swipeState.currentX - swipeState.startX;
    const deltaY = swipeState.currentY - swipeState.startY;
    const deltaTime = Date.now() - swipeState.startTime;
    
    const absX = Math.abs(deltaX);
    const absY = Math.abs(deltaY);
    const velocityX = absX / deltaTime;
    const velocityY = absY / deltaTime;

    let direction: SwipeState['direction'] = null;

    // Определяем направление свайпа
    if (absX > absY) {
      // Горизонтальный свайп
      if (absX > threshold && velocityX > velocity) {
        direction = deltaX > 0 ? 'right' : 'left';
      }
    } else {
      // Вертикальный свайп
      if (absY > threshold && velocityY > velocity) {
        direction = deltaY > 0 ? 'down' : 'up';
      }
    }

    const finalState: SwipeState = {
      ...swipeState,
      isActive: false,
      direction,
    };

    setSwipeState(finalState);
    callbacks.onSwipeEnd?.(finalState);

    // Вызываем соответствующий callback
    switch (direction) {
      case 'left':
        callbacks.onSwipeLeft?.();
        break;
      case 'right':
        callbacks.onSwipeRight?.();
        break;
      case 'up':
        callbacks.onSwipeUp?.();
        break;
      case 'down':
        callbacks.onSwipeDown?.();
        break;
    }
  }, [swipeState, callbacks, threshold, velocity]);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Touch события
    const handleTouchStart = (e: TouchEvent) => {
      if (!touch) return;
      const touchEvent = e.touches[0];
      handleStart(touchEvent.clientX, touchEvent.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!touch) return;
      const touchEvent = e.touches[0];
      if (handleMove(touchEvent.clientX, touchEvent.clientY) === false) {
        e.preventDefault();
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!touch) return;
      e.preventDefault();
      handleEnd();
    };

    // Mouse события (для тестирования на десктопе)
    const handleMouseDown = (e: MouseEvent) => {
      if (!mouse) return;
      handleStart(e.clientX, e.clientY);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!mouse) return;
      if (handleMove(e.clientX, e.clientY) === false) {
        e.preventDefault();
      }
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (!mouse) return;
      e.preventDefault();
      handleEnd();
    };

    // Добавляем слушатели
    if (touch) {
      element.addEventListener('touchstart', handleTouchStart, { passive: false });
      element.addEventListener('touchmove', handleTouchMove, { passive: false });
      element.addEventListener('touchend', handleTouchEnd, { passive: false });
    }

    if (mouse) {
      element.addEventListener('mousedown', handleMouseDown);
      element.addEventListener('mousemove', handleMouseMove);
      element.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      // Удаляем слушатели
      if (touch) {
        element.removeEventListener('touchstart', handleTouchStart);
        element.removeEventListener('touchmove', handleTouchMove);
        element.removeEventListener('touchend', handleTouchEnd);
      }

      if (mouse) {
        element.removeEventListener('mousedown', handleMouseDown);
        element.removeEventListener('mousemove', handleMouseMove);
        element.removeEventListener('mouseup', handleMouseUp);
      }
    };
  }, [touch, mouse, handleStart, handleMove, handleEnd]);

  return {
    elementRef,
    swipeState,
    isSwping: swipeState.isActive,
  };
}; 