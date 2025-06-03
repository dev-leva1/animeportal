import React, { forwardRef, useState } from 'react';
import { colors, spacing, borderRadius } from '../../../design-system/tokens';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  shape?: 'circle' | 'square';
  fallback?: string;
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
}

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      src,
      alt = 'Avatar',
      size = 'md',
      shape = 'circle',
      fallback,
      color = 'primary',
      className = '',
      style,
      ...props
    },
    ref
  ) => {
    const [hasError, setHasError] = useState(false);

    const getSizeStyles = (size: AvatarProps['size']) => {
      switch (size) {
        case 'xs':
          return { width: spacing[6], height: spacing[6], fontSize: '0.75rem' };
        case 'sm':
          return { width: spacing[8], height: spacing[8], fontSize: '0.875rem' };
        case 'md':
          return { width: spacing[10], height: spacing[10], fontSize: '1rem' };
        case 'lg':
          return { width: spacing[12], height: spacing[12], fontSize: '1.125rem' };
        case 'xl':
          return { width: spacing[16], height: spacing[16], fontSize: '1.25rem' };
        case '2xl':
          return { width: spacing[20], height: spacing[20], fontSize: '1.5rem' };
        default:
          return { width: spacing[10], height: spacing[10], fontSize: '1rem' };
      }
    };

    const getColorStyles = (color: AvatarProps['color']) => {
      switch (color) {
        case 'primary':
          return {
            backgroundColor: colors.primary[100],
            color: colors.primary[700],
          };
        case 'secondary':
          return {
            backgroundColor: colors.secondary[100],
            color: colors.secondary[700],
          };
        case 'success':
          return {
            backgroundColor: colors.semantic.success[100],
            color: colors.semantic.success[700],
          };
        case 'warning':
          return {
            backgroundColor: colors.semantic.warning[100],
            color: colors.semantic.warning[700],
          };
        case 'error':
          return {
            backgroundColor: colors.semantic.error[100],
            color: colors.semantic.error[700],
          };
        default:
          return {
            backgroundColor: colors.primary[100],
            color: colors.primary[700],
          };
      }
    };

    const generateFallback = (alt: string): string => {
      return alt
        .split(' ')
        .map(word => word.charAt(0))
        .join('')
        .toUpperCase()
        .slice(0, 2);
    };

    const sizeStyles = getSizeStyles(size);
    const colorStyles = getColorStyles(color);

    const baseStyles = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      position: 'relative' as const,
      userSelect: 'none' as const,
      verticalAlign: 'middle',
      borderRadius: shape === 'circle' ? borderRadius.full : borderRadius.md,
      fontWeight: 500,
      ...sizeStyles,
    };

    const avatarStyles = {
      ...baseStyles,
      ...colorStyles,
      ...style,
    };

    const imageStyles = {
      width: '100%',
      height: '100%',
      objectFit: 'cover' as const,
      borderRadius: 'inherit',
    };

    const showImage = src && !hasError;
    const displayFallback = fallback || generateFallback(alt);

    return (
      <div
        ref={ref}
        className={className}
        style={avatarStyles}
        {...props}
      >
        {showImage ? (
          <img
            src={src}
            alt={alt}
            style={imageStyles}
            onError={() => setHasError(true)}
          />
        ) : (
          <span style={{ fontSize: 'inherit', fontWeight: 'inherit' }}>
            {displayFallback}
          </span>
        )}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar'; 