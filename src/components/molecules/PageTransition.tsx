import React, { ReactNode, useEffect, useState } from 'react';
import { duration, easing } from '../../design-system/tokens';

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
  direction?: 'fade' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'scale';
  duration?: 'fast' | 'normal' | 'slow';
  isVisible?: boolean;
}

export const PageTransition: React.FC<PageTransitionProps> = ({
  children,
  className = '',
  direction = 'fade',
  duration: durationProp = 'normal',
  isVisible = true,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getDuration = () => {
    switch (durationProp) {
      case 'fast':
        return duration.fast;
      case 'normal':
        return duration.normal;
      case 'slow':
        return duration.slow;
      default:
        return duration.normal;
    }
  };

  const getTransitionStyles = () => {
    const transitionDuration = getDuration();
    const transitionEasing = easing.smooth;

    const baseStyles: React.CSSProperties = {
      transition: `all ${transitionDuration} ${transitionEasing}`,
      willChange: 'transform, opacity',
    };

    if (!mounted || !isVisible) {
      switch (direction) {
        case 'fade':
          return {
            ...baseStyles,
            opacity: 0,
          };
        
        case 'slide-up':
          return {
            ...baseStyles,
            opacity: 0,
            transform: 'translateY(20px)',
          };
        
        case 'slide-down':
          return {
            ...baseStyles,
            opacity: 0,
            transform: 'translateY(-20px)',
          };
        
        case 'slide-left':
          return {
            ...baseStyles,
            opacity: 0,
            transform: 'translateX(20px)',
          };
        
        case 'slide-right':
          return {
            ...baseStyles,
            opacity: 0,
            transform: 'translateX(-20px)',
          };
        
        case 'scale':
          return {
            ...baseStyles,
            opacity: 0,
            transform: 'scale(0.95)',
          };
        
        default:
          return {
            ...baseStyles,
            opacity: 0,
          };
      }
    }

    // Visible state
    return {
      ...baseStyles,
      opacity: 1,
      transform: 'translateX(0) translateY(0) scale(1)',
    };
  };

  return (
    <div 
      className={className} 
      style={getTransitionStyles()}
    >
      {children}
    </div>
  );
};

// Хук для управления переходами
export const usePageTransition = (initialVisible: boolean = true) => {
  const [isVisible, setIsVisible] = useState(initialVisible);

  const show = () => setIsVisible(true);
  const hide = () => setIsVisible(false);
  const toggle = () => setIsVisible(prev => !prev);

  return {
    isVisible,
    show,
    hide,
    toggle,
  };
}; 