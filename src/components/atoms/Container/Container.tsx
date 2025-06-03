import React, { forwardRef } from 'react';
import { spacing as spacingTokens } from '../../../design-system/tokens';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full' | false;
  padding?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  center?: boolean;
  fluid?: boolean;
}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  (
    {
      maxWidth = 'lg',
      padding = 'md',
      center = true,
      fluid = false,
      className = '',
      style,
      children,
      ...props
    },
    ref
  ) => {
    const getMaxWidth = () => {
      if (fluid || maxWidth === false) return '100%';
      
      switch (maxWidth) {
        case 'xs':
          return '475px';
        case 'sm':
          return '640px';
        case 'md':
          return '768px';
        case 'lg':
          return '1024px';
        case 'xl':
          return '1280px';
        case '2xl':
          return '1536px';
        case 'full':
          return '100%';
        default:
          return '1024px';
      }
    };

    const getPadding = () => {
      switch (padding) {
        case 'none':
          return '0';
        case 'xs':
          return `0 ${spacingTokens[2]}`;
        case 'sm':
          return `0 ${spacingTokens[4]}`;
        case 'md':
          return `0 ${spacingTokens[6]}`;
        case 'lg':
          return `0 ${spacingTokens[8]}`;
        case 'xl':
          return `0 ${spacingTokens[12]}`;
        default:
          return `0 ${spacingTokens[6]}`;
      }
    };

    const containerStyles: React.CSSProperties = {
      width: '100%',
      maxWidth: getMaxWidth(),
      margin: center ? '0 auto' : '0',
      padding: getPadding(),
      ...style,
    };

    return (
      <div
        ref={ref}
        className={className}
        style={containerStyles}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Container.displayName = 'Container'; 