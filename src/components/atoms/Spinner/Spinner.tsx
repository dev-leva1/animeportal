import React, { forwardRef } from 'react';
import { colors, spacing } from '../../../design-system/tokens';

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'inherit';
  thickness?: 1 | 2 | 3 | 4;
  speed?: 'slow' | 'normal' | 'fast';
}

export const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(
  (
    {
      size = 'md',
      color = 'primary',
      thickness = 2,
      speed = 'normal',
      className = '',
      style,
      ...props
    },
    ref
  ) => {
    const getSizeValue = (size: SpinnerProps['size']) => {
      switch (size) {
        case 'xs':
          return spacing[3]; // 12px
        case 'sm':
          return spacing[4]; // 16px
        case 'md':
          return spacing[6]; // 24px
        case 'lg':
          return spacing[8]; // 32px
        case 'xl':
          return spacing[10]; // 40px
        case '2xl':
          return spacing[12]; // 48px
        default:
          return spacing[6]; // 24px
      }
    };

    const getColorValue = (color: SpinnerProps['color']) => {
      switch (color) {
        case 'primary':
          return colors.primary[500];
        case 'secondary':
          return colors.secondary[500];
        case 'success':
          return colors.semantic.success[500];
        case 'warning':
          return colors.semantic.warning[500];
        case 'error':
          return colors.semantic.error[500];
        case 'info':
          return colors.semantic.info[500];
        case 'inherit':
          return 'currentColor';
        default:
          return colors.primary[500];
      }
    };

    const getAnimationDuration = (speed: SpinnerProps['speed']) => {
      switch (speed) {
        case 'slow':
          return '1.5s';
        case 'normal':
          return '1s';
        case 'fast':
          return '0.75s';
        default:
          return '1s';
      }
    };

    const sizeValue = getSizeValue(size);
    const colorValue = getColorValue(color);
    const animationDuration = getAnimationDuration(speed);

    // Создаем уникальное имя для keyframes
    const spinKeyframeName = `spin-${Math.random().toString(36).substr(2, 9)}`;

    const spinnerStyles = {
      width: sizeValue,
      height: sizeValue,
      border: `${thickness}px solid transparent`,
      borderTopColor: colorValue,
      borderRadius: '50%',
      display: 'inline-block',
      animation: `${spinKeyframeName} ${animationDuration} linear infinite`,
      ...style,
    };

    // Добавляем keyframes в document head
    React.useEffect(() => {
      const keyframes = `
        @keyframes ${spinKeyframeName} {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `;

      const styleSheet = document.createElement('style');
      styleSheet.textContent = keyframes;
      document.head.appendChild(styleSheet);

      return () => {
        if (document.head.contains(styleSheet)) {
          document.head.removeChild(styleSheet);
        }
      };
    }, [spinKeyframeName]);

    return (
      <div
        ref={ref}
        className={className}
        style={spinnerStyles}
        role="status"
        aria-label="Loading"
        {...props}
      />
    );
  }
);

Spinner.displayName = 'Spinner';

// Дополнительные варианты спиннеров
export const DotSpinner = forwardRef<HTMLDivElement, Omit<SpinnerProps, 'thickness'>>(
  (
    {
      size = 'md',
      color = 'primary',
      speed = 'normal',
      className = '',
      style,
      ...props
    },
    ref
  ) => {
    const getSizeValue = (size: SpinnerProps['size']) => {
      switch (size) {
        case 'xs':
          return spacing[1]; // 4px
        case 'sm':
          return spacing[1.5]; // 6px
        case 'md':
          return spacing[2]; // 8px
        case 'lg':
          return spacing[2.5]; // 10px
        case 'xl':
          return spacing[3]; // 12px
        case '2xl':
          return spacing[4]; // 16px
        default:
          return spacing[2]; // 8px
      }
    };

    const getColorValue = (color: SpinnerProps['color']) => {
      switch (color) {
        case 'primary':
          return colors.primary[500];
        case 'secondary':
          return colors.secondary[500];
        case 'success':
          return colors.semantic.success[500];
        case 'warning':
          return colors.semantic.warning[500];
        case 'error':
          return colors.semantic.error[500];
        case 'info':
          return colors.semantic.info[500];
        case 'inherit':
          return 'currentColor';
        default:
          return colors.primary[500];
      }
    };

    const getAnimationDuration = (speed: SpinnerProps['speed']) => {
      switch (speed) {
        case 'slow':
          return '1.5s';
        case 'normal':
          return '1.2s';
        case 'fast':
          return '0.8s';
        default:
          return '1.2s';
      }
    };

    const dotSize = getSizeValue(size);
    const colorValue = getColorValue(color);
    const animationDuration = getAnimationDuration(speed);

    const containerStyles = {
      display: 'inline-flex',
      alignItems: 'center',
      gap: spacing[1],
      ...style,
    };

    const dotStyles = (delay: string) => ({
      width: dotSize,
      height: dotSize,
      backgroundColor: colorValue,
      borderRadius: '50%',
      animation: `pulse ${animationDuration} ease-in-out ${delay} infinite`,
    });

    return (
      <div
        ref={ref}
        className={className}
        style={containerStyles}
        role="status"
        aria-label="Loading"
        {...props}
      >
        <div style={dotStyles('0s')} />
        <div style={dotStyles('0.15s')} />
        <div style={dotStyles('0.3s')} />
      </div>
    );
  }
);

DotSpinner.displayName = 'DotSpinner'; 