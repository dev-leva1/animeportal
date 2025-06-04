import React, { forwardRef } from 'react';
import { colors, spacing, borderRadius, transitions } from '../../../design-system/tokens';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'small' | 'medium' | 'large';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'medium',
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      children,
      disabled,
      className = '',
      style,
      ...props
    },
    ref
  ) => {
    const getVariantStyles = (variant: ButtonProps['variant']) => {
      switch (variant) {
        case 'primary':
          return {
            backgroundColor: colors.primary[500],
            color: colors.theme.light.text.inverse,
            border: 'none',
            ':hover': {
              backgroundColor: colors.primary[600],
            },
            ':active': {
              backgroundColor: colors.primary[700],
            },
            ':focus': {
              boxShadow: `0 0 0 3px ${colors.primary[200]}`,
            },
          };
        
        case 'secondary':
          return {
            backgroundColor: colors.secondary[100],
            color: colors.secondary[900],
            border: `1px solid ${colors.secondary[300]}`,
            ':hover': {
              backgroundColor: colors.secondary[200],
              borderColor: colors.secondary[400],
            },
            ':active': {
              backgroundColor: colors.secondary[300],
            },
            ':focus': {
              boxShadow: `0 0 0 3px ${colors.secondary[200]}`,
            },
          };
        
        case 'ghost':
          return {
            backgroundColor: 'transparent',
            color: colors.secondary[700],
            border: 'none',
            ':hover': {
              backgroundColor: colors.secondary[100],
            },
            ':active': {
              backgroundColor: colors.secondary[200],
            },
            ':focus': {
              boxShadow: `0 0 0 3px ${colors.secondary[200]}`,
            },
          };
        
        case 'danger':
          return {
            backgroundColor: colors.semantic.error[500],
            color: colors.theme.light.text.inverse,
            border: 'none',
            ':hover': {
              backgroundColor: colors.semantic.error[600],
            },
            ':active': {
              backgroundColor: colors.semantic.error[700],
            },
            ':focus': {
              boxShadow: `0 0 0 3px ${colors.semantic.error[200]}`,
            },
          };
        
        default:
          return {};
      }
    };

    const getSizeStyles = (size: ButtonProps['size']) => {
      switch (size) {
        case 'small':
          return {
            padding: `${spacing[2.5]} ${spacing[3]}`, // Увеличиваем для touch
            fontSize: '0.875rem',
            lineHeight: '1.25rem',
            minHeight: '2.25rem', // 36px минимум для touch targets
          };
        
        case 'medium':
          return {
            padding: `${spacing[3]} ${spacing[4]}`, // Увеличиваем для touch
            fontSize: '1rem',
            lineHeight: '1.5rem',
            minHeight: '2.75rem', // 44px - рекомендуемый размер для touch
          };
        
        case 'large':
          return {
            padding: `${spacing[4]} ${spacing[6]}`, // Увеличиваем для touch
            fontSize: '1.125rem',
            lineHeight: '1.75rem',
            minHeight: '3.25rem', // 52px для крупных кнопок
          };
        
        default:
          return {};
      }
    };

    const baseStyles = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: spacing[2],
      fontWeight: 500,
      borderRadius: borderRadius.md,
      cursor: 'pointer',
      transition: transitions.button,
      textDecoration: 'none',
      outline: 'none',
      position: 'relative' as const,
      width: fullWidth ? '100%' : 'auto',
    };

    const disabledStyles = {
      opacity: 0.6,
      cursor: 'not-allowed',
      pointerEvents: 'none' as const,
    };

    const variantStyles = getVariantStyles(variant);
    const sizeStyles = getSizeStyles(size);

    const buttonStyles = {
      ...baseStyles,
      ...variantStyles,
      ...sizeStyles,
      ...(disabled || isLoading ? disabledStyles : {}),
      ...style,
    };

    return (
      <button
        ref={ref}
        className={className}
        style={buttonStyles}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <div
            style={{
              width: '1rem',
              height: '1rem',
              border: '2px solid currentColor',
              borderTopColor: 'transparent',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
            }}
          />
        )}
        
        {!isLoading && leftIcon && (
          <span style={{ display: 'flex', alignItems: 'center' }}>
            {leftIcon}
          </span>
        )}
        
        {children}
        
        {!isLoading && rightIcon && (
          <span style={{ display: 'flex', alignItems: 'center' }}>
            {rightIcon}
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button'; 