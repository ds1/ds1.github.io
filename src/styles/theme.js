// src/styles/theme.js
// Sophisticated Green & Ivory Palette with Accessibility

const theme = {
  colors: {
    // Primary Colors
    primary: '#1A2F2A',           // Deep forest green (almost black)
    secondary: '#16A34A',         // Vibrant green for links/primary actions
    accent: '#7C3AED',            // Purple for special accents (colorblind safe)
    
    // Backgrounds - Warm ivory/cream tones
    background: '#FFFDF7',        // Ivory white (subtle warmth)
    backgroundSecondary: '#FAF8F2', // Cream (slightly deeper)
    backgroundTertiary: '#F5F2E8', // Light parchment for special sections
    
    // Surface Colors
    surface: '#FFFFFF',           // Pure white for cards (subtle contrast with ivory)
    surfaceHover: '#FDFCF8',      // Slight hover state
    
    // Borders - Green-tinted grays
    border: '#E2E8E4',            // Light sage border
    borderLight: '#EEF2EF',       // Very light green-gray
    borderDark: '#D4DDD6',        // Deeper green-gray
    
    // Text Colors - Green-descended grays
    text: '#1A2F2A',              // Same as primary (deep forest)
    textSecondary: '#4A5F56',     // Sage gray (green-tinted)
    textTertiary: '#6B7F74',      // Light sage
    textQuaternary: '#8A9A90',    // Very light sage
    
    // Semantic Colors (colorblind safe)
    success: '#16A34A',           // Green (same as secondary)
    info: '#6366F1',              // Indigo (safe with green)
    warning: '#EAB308',           // Yellow (safe with green)
    error: '#DC2626',             // Red (used sparingly, high contrast)
    
    // Special Purpose
    codeBackground: '#F7FAF8',    // Very light green tint for code blocks
    quoteBorder: '#16A34A',       // Green for blockquotes
    linkHover: '#14532D',         // Dark green for hover states
    
    // Tag Colors (all colorblind safe with green theme)
    tagPurple: '#7C3AED',
    tagBlue: '#3B82F6',
    tagTeal: '#14B8A6',
    tagGreen: '#16A34A',
    tagYellow: '#EAB308',
    tagPink: '#EC4899',
    tagIndigo: '#6366F1',
    tagGray: '#6B7F74',
  },
  
  fonts: {
    // Professional typography stack
    heading: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", sans-serif',
    body: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", sans-serif',
    mono: '"JetBrains Mono", "SF Mono", Monaco, "Courier New", monospace',
  },
  
  fontSizes: {
    xs: '0.75rem',     // 12px
    sm: '0.875rem',    // 14px
    base: '1rem',      // 16px
    lg: '1.125rem',    // 18px
    xl: '1.25rem',     // 20px
    '2xl': '1.5rem',   // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem',  // 36px
    '5xl': '3rem',     // 48px
    '6xl': '3.75rem',  // 60px
  },
  
  fontWeights: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  
  lineHeights: {
    tight: 1.2,
    base: 1.6,
    relaxed: 1.8,
  },
  
  spacing: {
    xs: '0.25rem',   // 4px
    sm: '0.5rem',    // 8px
    md: '1rem',      // 16px
    lg: '1.5rem',    // 24px
    xl: '2rem',      // 32px
    '2xl': '3rem',   // 48px
    '3xl': '4rem',   // 64px
    '4xl': '6rem',   // 96px
  },
  
  borderRadius: {
    sm: '0.25rem',   // 4px
    base: '0.5rem',  // 8px
    md: '0.75rem',   // 12px
    lg: '1rem',      // 16px
    xl: '1.5rem',    // 24px
    full: '9999px',
  },
  
  shadows: {
    // Softer shadows with slight green tint
    sm: '0 1px 2px 0 rgba(26, 47, 42, 0.05)',
    base: '0 1px 3px 0 rgba(26, 47, 42, 0.1), 0 1px 2px 0 rgba(26, 47, 42, 0.06)',
    md: '0 4px 6px -1px rgba(26, 47, 42, 0.1), 0 2px 4px -1px rgba(26, 47, 42, 0.06)',
    lg: '0 10px 15px -3px rgba(26, 47, 42, 0.1), 0 4px 6px -2px rgba(26, 47, 42, 0.05)',
    xl: '0 20px 25px -5px rgba(26, 47, 42, 0.1), 0 10px 10px -5px rgba(26, 47, 42, 0.04)',
    '2xl': '0 25px 50px -12px rgba(26, 47, 42, 0.25)',
    inner: 'inset 0 2px 4px 0 rgba(26, 47, 42, 0.06)',
  },
  
  transitions: {
    fast: '150ms ease-in-out',
    base: '250ms ease-in-out',
    slow: '350ms ease-in-out',
  },
  
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
};

export default theme;