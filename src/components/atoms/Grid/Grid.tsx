import React, { forwardRef } from 'react';
import { spacing as spacingTokens, breakpoints } from '../../../design-system/tokens';

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  container?: boolean;
  item?: boolean;
  spacing?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  justify?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
  align?: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  
  // Responsive grid columns (mobile-first)
  cols?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  
  // Grid spans for items
  span?: number;
  smSpan?: number;
  mdSpan?: number;
  lgSpan?: number;
  xlSpan?: number;
  
  // Offset
  offset?: number;
  smOffset?: number;
  mdOffset?: number;
  lgOffset?: number;
  xlOffset?: number;
}

export const Grid = forwardRef<HTMLDivElement, GridProps>(
  (
    {
      container = false,
      item = false,
      spacing: spacingProp = 'md',
      direction = 'row',
      justify = 'flex-start',
      align = 'stretch',
      wrap = 'wrap',
      cols,
      sm,
      md,
      lg,
      xl,
      span,
      smSpan,
      mdSpan,
      lgSpan,
      xlSpan,
      offset,
      smOffset,
      mdOffset,
      lgOffset,
      xlOffset,
      className = '',
      style,
      children,
      ...props
    },
    ref
  ) => {
    const getSpacingValue = (spacing: GridProps['spacing']) => {
      switch (spacing) {
        case 'none':
          return '0';
        case 'xs':
          return spacingTokens[2]; // 8px
        case 'sm':
          return spacingTokens[3]; // 12px
        case 'md':
          return spacingTokens[4]; // 16px
        case 'lg':
          return spacingTokens[6]; // 24px
        case 'xl':
          return spacingTokens[8]; // 32px
        case '2xl':
          return spacingTokens[12]; // 48px
        default:
          return spacingTokens[4];
      }
    };

    const generateGridStyles = () => {
      const styles: React.CSSProperties = {};

      if (container) {
        if (cols || sm || md || lg || xl) {
          // CSS Grid Layout
          styles.display = 'grid';
          styles.gap = getSpacingValue(spacingProp);
          
          // Mobile-first grid columns
          if (cols) {
            styles.gridTemplateColumns = `repeat(${cols}, 1fr)`;
          }
        } else {
          // Flexbox Layout
          styles.display = 'flex';
          styles.flexDirection = direction;
          styles.justifyContent = justify;
          styles.alignItems = align;
          styles.flexWrap = wrap;
          styles.gap = getSpacingValue(spacingProp);
        }
      }

      if (item && (span || smSpan || mdSpan || lgSpan || xlSpan)) {
        // Grid item spans
        if (span) {
          styles.gridColumn = `span ${span}`;
        }
      }

      if (item && (offset || smOffset || mdOffset || lgOffset || xlOffset)) {
        // Grid item offset
        if (offset) {
          styles.gridColumnStart = offset + 1;
        }
      }

      return styles;
    };

    const generateResponsiveStyles = () => {
      const mediaStyles: string[] = [];

      // Small screens (480px+)
      if (sm || smSpan || smOffset) {
        const smRules: string[] = [];
        if (sm && container) {
          smRules.push(`grid-template-columns: repeat(${sm}, 1fr)`);
        }
        if (smSpan && item) {
          smRules.push(`grid-column: span ${smSpan}`);
        }
        if (smOffset && item) {
          smRules.push(`grid-column-start: ${smOffset + 1}`);
        }
        if (smRules.length > 0) {
          mediaStyles.push(`@media (min-width: ${breakpoints.sm}) { ${smRules.join('; ')} }`);
        }
      }

      // Medium screens (768px+)
      if (md || mdSpan || mdOffset) {
        const mdRules: string[] = [];
        if (md && container) {
          mdRules.push(`grid-template-columns: repeat(${md}, 1fr)`);
        }
        if (mdSpan && item) {
          mdRules.push(`grid-column: span ${mdSpan}`);
        }
        if (mdOffset && item) {
          mdRules.push(`grid-column-start: ${mdOffset + 1}`);
        }
        if (mdRules.length > 0) {
          mediaStyles.push(`@media (min-width: ${breakpoints.md}) { ${mdRules.join('; ')} }`);
        }
      }

      // Large screens (1024px+)
      if (lg || lgSpan || lgOffset) {
        const lgRules: string[] = [];
        if (lg && container) {
          lgRules.push(`grid-template-columns: repeat(${lg}, 1fr)`);
        }
        if (lgSpan && item) {
          lgRules.push(`grid-column: span ${lgSpan}`);
        }
        if (lgOffset && item) {
          lgRules.push(`grid-column-start: ${lgOffset + 1}`);
        }
        if (lgRules.length > 0) {
          mediaStyles.push(`@media (min-width: ${breakpoints.lg}) { ${lgRules.join('; ')} }`);
        }
      }

      // Extra large screens (1280px+)
      if (xl || xlSpan || xlOffset) {
        const xlRules: string[] = [];
        if (xl && container) {
          xlRules.push(`grid-template-columns: repeat(${xl}, 1fr)`);
        }
        if (xlSpan && item) {
          xlRules.push(`grid-column: span ${xlSpan}`);
        }
        if (xlOffset && item) {
          xlRules.push(`grid-column-start: ${xlOffset + 1}`);
        }
        if (xlRules.length > 0) {
          mediaStyles.push(`@media (min-width: ${breakpoints.xl}) { ${xlRules.join('; ')} }`);
        }
      }

      return mediaStyles;
    };

    const baseStyles = generateGridStyles();
    const responsiveStyles = generateResponsiveStyles();

    return (
      <>
        {responsiveStyles.length > 0 && (
          <style>
            {responsiveStyles.join('\n')}
          </style>
        )}
        <div
          ref={ref}
          className={className}
          style={{
            ...baseStyles,
            ...style,
          }}
          {...props}
        >
          {children}
        </div>
      </>
    );
  }
);

Grid.displayName = 'Grid'; 