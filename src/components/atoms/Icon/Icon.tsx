import React, { forwardRef } from 'react';
import { colors, spacing } from '../../../design-system/tokens';

export interface IconProps extends React.SVGAttributes<SVGElement> {
  name?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  color?: 'primary' | 'secondary' | 'muted' | 'inverse' | 'success' | 'warning' | 'error' | 'info' | 'inherit';
  children?: React.ReactNode;
}

export const Icon = forwardRef<SVGSVGElement, IconProps>(
  (
    {
      name,
      size = 'md',
      color = 'inherit',
      className = '',
      style,
      children,
      ...props
    },
    ref
  ) => {
    const getSizeValue = (size: IconProps['size']) => {
      switch (size) {
        case 'xs':
          return spacing[3]; // 12px
        case 'sm':
          return spacing[4]; // 16px
        case 'md':
          return spacing[5]; // 20px
        case 'lg':
          return spacing[6]; // 24px
        case 'xl':
          return spacing[8]; // 32px
        case '2xl':
          return spacing[10]; // 40px
        default:
          return spacing[5]; // 20px
      }
    };

    const getColorValue = (color: IconProps['color']) => {
      switch (color) {
        case 'primary':
          return colors.theme.light.text.primary;
        case 'secondary':
          return colors.theme.light.text.secondary;
        case 'muted':
          return colors.theme.light.text.muted;
        case 'inverse':
          return colors.theme.light.text.inverse;
        case 'success':
          return colors.semantic.success[600];
        case 'warning':
          return colors.semantic.warning[600];
        case 'error':
          return colors.semantic.error[600];
        case 'info':
          return colors.semantic.info[600];
        case 'inherit':
          return 'currentColor';
        default:
          return 'currentColor';
      }
    };

    const sizeValue = getSizeValue(size);
    const colorValue = getColorValue(color);

    const iconStyles = {
      width: sizeValue,
      height: sizeValue,
      fill: colorValue,
      color: colorValue,
      flexShrink: 0,
      display: 'inline-block',
      ...style,
    };

    // Общие SVG иконки
    const getIconPath = (iconName: string) => {
      switch (iconName) {
        case 'search':
          return (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          );
        case 'menu':
          return (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          );
        case 'close':
          return (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          );
        case 'user':
          return (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          );
        case 'heart':
          return (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
            />
          );
        case 'star':
          return (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
            />
          );
        case 'play':
          return (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
            />
          );
        case 'pause':
          return (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 5.25v13.5m-7.5-13.5v13.5"
            />
          );
        case 'chevron-left':
          return (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          );
        case 'chevron-right':
          return (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          );
        case 'chevron-up':
          return (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m4.5 15.75 7.5-7.5 7.5 7.5"
            />
          );
        case 'chevron-down':
          return (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          );
        case 'home':
          return (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          );
        case 'settings':
          return (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a6.759 6.759 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
            />
          );
        case 'sun':
          return (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
            />
          );
        case 'moon':
          return (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
            />
          );
        default:
          return null;
      }
    };

    // Если передан name, используем встроенную иконку
    if (name) {
      return (
        <svg
          ref={ref}
          className={className}
          style={iconStyles}
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          {...props}
        >
          {getIconPath(name)}
        </svg>
      );
    }

    // Если передан children, используем кастомную иконку
    return (
      <svg
        ref={ref}
        className={className}
        style={iconStyles}
        fill="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        {children}
      </svg>
    );
  }
);

Icon.displayName = 'Icon'; 