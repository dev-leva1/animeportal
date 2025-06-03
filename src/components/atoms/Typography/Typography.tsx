import React, { forwardRef } from 'react';
import { typography, colors } from '../../../design-system/tokens';

type VariantType = 
  | 'display-2xl' | 'display-xl' | 'display-lg' | 'display-md' | 'display-sm' | 'display-xs'
  | 'heading-4xl' | 'heading-3xl' | 'heading-2xl' | 'heading-xl' | 'heading-lg' | 'heading-md'
  | 'body-xl' | 'body-lg' | 'body-md' | 'body-sm' | 'body-xs'
  | 'label-lg' | 'label-md' | 'label-sm';

export interface TypographyProps {
  variant?: VariantType;
  color?: 'primary' | 'secondary' | 'muted' | 'inverse' | 'error' | 'success' | 'warning';
  align?: 'left' | 'center' | 'right' | 'justify';
  weight?: 'thin' | 'extralight' | 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold' | 'black';
  transform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
  decoration?: 'none' | 'underline' | 'line-through';
  truncate?: boolean;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

export const Typography = forwardRef<HTMLElement, TypographyProps>(
  (
    {
      variant = 'body-md',
      color = 'primary',
      align = 'left',
      weight,
      transform = 'none',
      decoration = 'none',
      truncate = false,
      as,
      className = '',
      style,
      children,
      ...props
    },
    ref
  ) => {
    const getVariantStyles = (variant: VariantType) => {
      const [category, size] = variant.split('-') as [string, string];
      
      switch (category) {
        case 'display':
          return typography.textSize.display[size as keyof typeof typography.textSize.display];
        case 'heading':
          return typography.textSize.heading[size as keyof typeof typography.textSize.heading];
        case 'body':
          return typography.textSize.body[size as keyof typeof typography.textSize.body];
        case 'label':
          return typography.textSize.label[size as keyof typeof typography.textSize.label];
        default:
          return typography.textSize.body.md;
      }
    };

    const getColorStyles = (color: TypographyProps['color']) => {
      switch (color) {
        case 'primary':
          return colors.theme.light.text.primary;
        case 'secondary':
          return colors.theme.light.text.secondary;
        case 'muted':
          return colors.theme.light.text.muted;
        case 'inverse':
          return colors.theme.light.text.inverse;
        case 'error':
          return colors.semantic.error[600];
        case 'success':
          return colors.semantic.success[600];
        case 'warning':
          return colors.semantic.warning[600];
        default:
          return colors.theme.light.text.primary;
      }
    };

    const getDefaultElement = (variant: VariantType): keyof React.JSX.IntrinsicElements => {
      const [category, size] = variant.split('-') as [string, string];
      
      if (category === 'display') {
        switch (size) {
          case '2xl': return 'h1';
          case 'xl': return 'h1';
          case 'lg': return 'h1';
          case 'md': return 'h2';
          case 'sm': return 'h2';
          case 'xs': return 'h3';
          default: return 'h1';
        }
      }
      
      if (category === 'heading') {
        switch (size) {
          case '4xl': return 'h1';
          case '3xl': return 'h1';
          case '2xl': return 'h2';
          case 'xl': return 'h3';
          case 'lg': return 'h4';
          case 'md': return 'h5';
          default: return 'h3';
        }
      }
      
      if (category === 'label') {
        return 'label';
      }
      
      return 'p';
    };

    const variantStyles = getVariantStyles(variant || 'body-md');
    const colorValue = getColorStyles(color);
    const Element = as || getDefaultElement(variant || 'body-md');

    const typographyStyles = {
      fontFamily: typography.fontFamily.sans.join(', '),
      fontSize: variantStyles.fontSize,
      lineHeight: variantStyles.lineHeight,
      letterSpacing: variantStyles.letterSpacing,
      fontWeight: weight ? typography.fontWeight[weight] : variantStyles.fontWeight,
      color: colorValue,
      textAlign: align,
      textTransform: transform,
      textDecoration: decoration,
      margin: 0,
      ...(truncate && {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap' as const,
      }),
      ...style,
    };

    return React.createElement(
      Element,
      {
        ref,
        className,
        style: typographyStyles,
        ...props,
      },
      children
    );
  }
);

Typography.displayName = 'Typography'; 