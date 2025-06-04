import React, { forwardRef } from 'react';
import { spacing, borderRadius, useTheme } from '../../../design-system/tokens';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'elevated' | 'outlined' | 'filled';
  elevation?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  padding?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  radius?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  interactive?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = 'elevated',
      elevation = 'md',
      padding: paddingProp = 'md',
      radius = 'lg',
      interactive = false,
      className = '',
      style,
      children,
      ...props
    },
    ref
  ) => {
    const { theme } = useTheme();

    const getVariantStyles = (variant: CardProps['variant'], elevation: CardProps['elevation']) => {
      switch (variant) {
        case 'elevated':
          return {
            backgroundColor: theme.background.primary,
            border: 'none',
            boxShadow: theme.shadow[elevation as keyof typeof theme.shadow] || theme.shadow.md,
          };
        
        case 'outlined':
          return {
            backgroundColor: theme.background.primary,
            border: `1px solid ${theme.border.primary}`,
            boxShadow: 'none',
          };
        
        case 'filled':
          return {
            backgroundColor: theme.background.secondary,
            border: 'none',
            boxShadow: 'none',
          };
        
        default:
          return {};
      }
    };

    const getPaddingValue = (padding: CardProps['padding']) => {
      switch (padding) {
        case 'none':
          return '0';
        case 'xs':
          return spacing[2];
        case 'sm':
          return spacing[3];
        case 'md':
          return spacing[4];
        case 'lg':
          return spacing[6];
        case 'xl':
          return spacing[8];
        default:
          return spacing[4];
      }
    };

    const getRadiusValue = (radius: CardProps['radius']) => {
      switch (radius) {
        case 'none':
          return borderRadius.none;
        case 'xs':
          return borderRadius.xs;
        case 'sm':
          return borderRadius.sm;
        case 'md':
          return borderRadius.md;
        case 'lg':
          return borderRadius.lg;
        case 'xl':
          return borderRadius.xl;
        case '2xl':
          return borderRadius['2xl'];
        case '3xl':
          return borderRadius['3xl'];
        default:
          return borderRadius.lg;
      }
    };

    const baseStyles = {
      position: 'relative' as const,
      overflow: 'hidden' as const,
      borderRadius: getRadiusValue(radius),
      padding: getPaddingValue(paddingProp),
    };

    const interactiveStyles = interactive ? {
      cursor: 'pointer',
      transition: 'transform 150ms ease, box-shadow 150ms ease',
      ':hover': {
        transform: 'translateY(-2px)',
        boxShadow: theme.shadow.lg,
      },
      ':active': {
        transform: 'translateY(0)',
      },
    } : {};

    const variantStyles = getVariantStyles(variant, elevation);

    const cardStyles = {
      ...baseStyles,
      ...variantStyles,
      ...interactiveStyles,
      ...style,
    };

    return (
      <div
        ref={ref}
        className={className}
        style={cardStyles}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card'; 