import React, { forwardRef } from 'react';
import { colors, spacing, borderRadius } from '../../../design-system/tokens';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md' | 'lg';
  shape?: 'rounded' | 'pill';
  dot?: boolean;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      shape = 'rounded',
      dot = false,
      className = '',
      style,
      children,
      ...props
    },
    ref
  ) => {
    const getVariantStyles = (variant: BadgeProps['variant']) => {
      switch (variant) {
        case 'primary':
          return {
            backgroundColor: colors.primary[100],
            color: colors.primary[800],
            border: `1px solid ${colors.primary[200]}`,
          };
        case 'secondary':
          return {
            backgroundColor: colors.secondary[100],
            color: colors.secondary[800],
            border: `1px solid ${colors.secondary[200]}`,
          };
        case 'success':
          return {
            backgroundColor: colors.semantic.success[100],
            color: colors.semantic.success[800],
            border: `1px solid ${colors.semantic.success[200]}`,
          };
        case 'warning':
          return {
            backgroundColor: colors.semantic.warning[100],
            color: colors.semantic.warning[800],
            border: `1px solid ${colors.semantic.warning[200]}`,
          };
        case 'error':
          return {
            backgroundColor: colors.semantic.error[100],
            color: colors.semantic.error[800],
            border: `1px solid ${colors.semantic.error[200]}`,
          };
        case 'info':
          return {
            backgroundColor: colors.semantic.info[100],
            color: colors.semantic.info[800],
            border: `1px solid ${colors.semantic.info[200]}`,
          };
        default:
          return {
            backgroundColor: colors.primary[100],
            color: colors.primary[800],
            border: `1px solid ${colors.primary[200]}`,
          };
      }
    };

    const getSizeStyles = (size: BadgeProps['size'], dot: boolean) => {
      if (dot) {
        switch (size) {
          case 'sm':
            return { width: spacing[2], height: spacing[2] };
          case 'md':
            return { width: spacing[2.5], height: spacing[2.5] };
          case 'lg':
            return { width: spacing[3], height: spacing[3] };
          default:
            return { width: spacing[2.5], height: spacing[2.5] };
        }
      }

      switch (size) {
        case 'sm':
          return {
            padding: `${spacing[0.5]} ${spacing[2]}`,
            fontSize: '0.75rem',
            lineHeight: '1rem',
          };
        case 'md':
          return {
            padding: `${spacing[1]} ${spacing[2.5]}`,
            fontSize: '0.875rem',
            lineHeight: '1.25rem',
          };
        case 'lg':
          return {
            padding: `${spacing[1.5]} ${spacing[3]}`,
            fontSize: '1rem',
            lineHeight: '1.5rem',
          };
        default:
          return {
            padding: `${spacing[1]} ${spacing[2.5]}`,
            fontSize: '0.875rem',
            lineHeight: '1.25rem',
          };
      }
    };

    const getShapeStyles = (shape: BadgeProps['shape']) => {
      switch (shape) {
        case 'rounded':
          return { borderRadius: borderRadius.sm };
        case 'pill':
          return { borderRadius: borderRadius.full };
        default:
          return { borderRadius: borderRadius.sm };
      }
    };

    const variantStyles = getVariantStyles(variant);
    const sizeStyles = getSizeStyles(size, dot);
    const shapeStyles = getShapeStyles(shape);

    const baseStyles = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 500,
      textAlign: 'center' as const,
      whiteSpace: 'nowrap' as const,
      verticalAlign: 'baseline',
      ...(dot && {
        borderRadius: borderRadius.full,
        flexShrink: 0,
      }),
    };

    const badgeStyles = {
      ...baseStyles,
      ...variantStyles,
      ...sizeStyles,
      ...(!dot && shapeStyles),
      ...style,
    };

    if (dot) {
      return (
        <span
          ref={ref}
          className={className}
          style={badgeStyles}
          {...props}
        />
      );
    }

    return (
      <span
        ref={ref}
        className={className}
        style={badgeStyles}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge'; 