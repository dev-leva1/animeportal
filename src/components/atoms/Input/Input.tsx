import React, { forwardRef } from 'react';
import { colors, spacing, borderRadius, transitions } from '../../../design-system/tokens';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: 'default' | 'error' | 'success';
  inputSize?: 'small' | 'medium' | 'large';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  label?: string;
  helperText?: string;
  errorMessage?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant = 'default',
      inputSize = 'medium',
      leftIcon,
      rightIcon,
      fullWidth = false,
      label,
      helperText,
      errorMessage,
      className = '',
      style,
      disabled,
      ...props
    },
    ref
  ) => {
    const getVariantStyles = (variant: InputProps['variant']) => {
      switch (variant) {
        case 'default':
          return {
            borderColor: colors.theme.light.border.primary,
            backgroundColor: colors.theme.light.background.primary,
            color: colors.theme.light.text.primary,
            ':focus': {
              borderColor: colors.theme.light.border.focus,
              boxShadow: `0 0 0 3px ${colors.primary[200]}`,
            },
            ':hover': {
              borderColor: colors.theme.light.border.secondary,
            },
          };
        
        case 'error':
          return {
            borderColor: colors.semantic.error[500],
            backgroundColor: colors.theme.light.background.primary,
            color: colors.theme.light.text.primary,
            ':focus': {
              borderColor: colors.semantic.error[500],
              boxShadow: `0 0 0 3px ${colors.semantic.error[200]}`,
            },
          };
        
        case 'success':
          return {
            borderColor: colors.semantic.success[500],
            backgroundColor: colors.theme.light.background.primary,
            color: colors.theme.light.text.primary,
            ':focus': {
              borderColor: colors.semantic.success[500],
              boxShadow: `0 0 0 3px ${colors.semantic.success[200]}`,
            },
          };
        
        default:
          return {};
      }
    };

    const getSizeStyles = (size: InputProps['inputSize']) => {
      switch (size) {
        case 'small':
          return {
            padding: `${spacing[2]} ${spacing[3]}`,
            fontSize: '0.875rem',
            lineHeight: '1.25rem',
          };
        
        case 'medium':
          return {
            padding: `${spacing[2.5]} ${spacing[3]}`,
            fontSize: '1rem',
            lineHeight: '1.5rem',
          };
        
        case 'large':
          return {
            padding: `${spacing[3]} ${spacing[4]}`,
            fontSize: '1.125rem',
            lineHeight: '1.75rem',
          };
        
        default:
          return {};
      }
    };

    const baseStyles = {
      border: '1px solid',
      borderRadius: borderRadius.md,
      transition: transitions.input,
      outline: 'none',
      width: fullWidth ? '100%' : 'auto',
      fontFamily: 'inherit',
    };

    const disabledStyles = {
      opacity: 0.6,
      cursor: 'not-allowed',
      backgroundColor: colors.neutral[100],
    };

    const variantStyles = getVariantStyles(variant);
    const sizeStyles = getSizeStyles(inputSize);

    const inputStyles = {
      ...baseStyles,
      ...variantStyles,
      ...sizeStyles,
      ...(disabled ? disabledStyles : {}),
      ...(leftIcon && { paddingLeft: `calc(${sizeStyles.padding?.split(' ')[1] || spacing[3]} + 1.5rem)` }),
      ...(rightIcon && { paddingRight: `calc(${sizeStyles.padding?.split(' ')[1] || spacing[3]} + 1.5rem)` }),
      ...style,
    };

    const containerStyles = {
      position: 'relative' as const,
      width: fullWidth ? '100%' : 'auto',
    };

    const iconStyles = {
      position: 'absolute' as const,
      top: '50%',
      transform: 'translateY(-50%)',
      color: colors.theme.light.text.muted,
      pointerEvents: 'none' as const,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '1rem',
      height: '1rem',
    };

    const leftIconStyles = {
      ...iconStyles,
      left: spacing[3],
    };

    const rightIconStyles = {
      ...iconStyles,
      right: spacing[3],
    };

    const labelStyles = {
      display: 'block',
      fontSize: '0.875rem',
      fontWeight: 500,
      color: colors.theme.light.text.primary,
      marginBottom: spacing[1],
    };

    const helperTextStyles = {
      fontSize: '0.75rem',
      color: variant === 'error' ? colors.semantic.error[600] : colors.theme.light.text.muted,
      marginTop: spacing[1],
    };

    return (
      <div className={className}>
        {label && (
          <label style={labelStyles}>
            {label}
          </label>
        )}
        
        <div style={containerStyles}>
          {leftIcon && (
            <span style={leftIconStyles}>
              {leftIcon}
            </span>
          )}
          
          <input
            ref={ref}
            style={inputStyles}
            disabled={disabled}
            {...props}
          />
          
          {rightIcon && (
            <span style={rightIconStyles}>
              {rightIcon}
            </span>
          )}
        </div>
        
        {(helperText || errorMessage) && (
          <div style={helperTextStyles}>
            {errorMessage || helperText}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input'; 