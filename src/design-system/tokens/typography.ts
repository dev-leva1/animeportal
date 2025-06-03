export const typography = {
  fontFamily: {
    sans: [
      'Inter',
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'Roboto',
      'Helvetica Neue',
      'Arial',
      'sans-serif',
    ],
    serif: [
      'Georgia',
      'Cambria',
      'Times New Roman',
      'Times',
      'serif',
    ],
    mono: [
      'JetBrains Mono',
      'Fira Code',
      'Consolas',
      'Monaco',
      'Courier New',
      'monospace',
    ],
  },

  fontSize: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem', // 36px
    '5xl': '3rem',    // 48px
    '6xl': '3.75rem', // 60px
    '7xl': '4.5rem',  // 72px
    '8xl': '6rem',    // 96px
    '9xl': '8rem',    // 128px
  },

  fontWeight: {
    thin: 100,
    extralight: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },

  lineHeight: {
    none: 1,
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
    3: 0.75,
    4: 1,
    5: 1.25,
    6: 1.5,
    7: 1.75,
    8: 2,
    9: 2.25,
    10: 2.5,
  },

  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0em',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },

  textSize: {
    display: {
      '2xl': {
        fontSize: '4.5rem',
        lineHeight: 1,
        letterSpacing: '-0.025em',
        fontWeight: 800,
      },
      xl: {
        fontSize: '3.75rem',
        lineHeight: 1,
        letterSpacing: '-0.025em',
        fontWeight: 800,
      },
      lg: {
        fontSize: '3rem',
        lineHeight: 1,
        letterSpacing: '-0.025em',
        fontWeight: 800,
      },
      md: {
        fontSize: '2.25rem',
        lineHeight: 1.111,
        letterSpacing: '-0.025em',
        fontWeight: 800,
      },
      sm: {
        fontSize: '1.875rem',
        lineHeight: 1.2,
        letterSpacing: '-0.025em',
        fontWeight: 800,
      },
      xs: {
        fontSize: '1.5rem',
        lineHeight: 1.25,
        letterSpacing: '0em',
        fontWeight: 700,
      },
    },
    
    heading: {
      '4xl': {
        fontSize: '2.25rem',
        lineHeight: 1.111,
        letterSpacing: '-0.025em',
        fontWeight: 700,
      },
      '3xl': {
        fontSize: '1.875rem',
        lineHeight: 1.2,
        letterSpacing: '-0.025em',
        fontWeight: 700,
      },
      '2xl': {
        fontSize: '1.5rem',
        lineHeight: 1.25,
        letterSpacing: '0em',
        fontWeight: 700,
      },
      xl: {
        fontSize: '1.25rem',
        lineHeight: 1.2,
        letterSpacing: '0em',
        fontWeight: 600,
      },
      lg: {
        fontSize: '1.125rem',
        lineHeight: 1.333,
        letterSpacing: '0em',
        fontWeight: 600,
      },
      md: {
        fontSize: '1rem',
        lineHeight: 1.5,
        letterSpacing: '0em',
        fontWeight: 600,
      },
    },

    body: {
      xl: {
        fontSize: '1.25rem',
        lineHeight: 1.6,
        letterSpacing: '0em',
        fontWeight: 400,
      },
      lg: {
        fontSize: '1.125rem',
        lineHeight: 1.556,
        letterSpacing: '0em',
        fontWeight: 400,
      },
      md: {
        fontSize: '1rem',
        lineHeight: 1.5,
        letterSpacing: '0em',
        fontWeight: 400,
      },
      sm: {
        fontSize: '0.875rem',
        lineHeight: 1.429,
        letterSpacing: '0em',
        fontWeight: 400,
      },
      xs: {
        fontSize: '0.75rem',
        lineHeight: 1.5,
        letterSpacing: '0em',
        fontWeight: 400,
      },
    },

    label: {
      lg: {
        fontSize: '0.875rem',
        lineHeight: 1.429,
        letterSpacing: '0em',
        fontWeight: 500,
      },
      md: {
        fontSize: '0.75rem',
        lineHeight: 1.5,
        letterSpacing: '0em',
        fontWeight: 500,
      },
      sm: {
        fontSize: '0.75rem',
        lineHeight: 1.5,
        letterSpacing: '0.025em',
        fontWeight: 500,
      },
    },
  },
} as const;

export type TypographyTokens = typeof typography; 