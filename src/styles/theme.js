// src/styles/theme.js
// World-class theme with Geist font and sophisticated systems

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
    
    // Surface Colors with refined shadows
    surface: '#FFFFFF',           // Pure white for cards (subtle contrast with ivory)
    surfaceHover: '#FDFCF8',      // Slight hover state
    surfaceElevated: 'rgba(255, 255, 255, 0.95)', // For glass morphism
    
    // Borders - Green-tinted grays with more variety
    border: '#E2E8E4',            // Light sage border
    borderLight: '#EEF2EF',       // Very light green-gray
    borderDark: '#D4DDD6',        // Deeper green-gray
    borderSubtle: 'rgba(226, 232, 228, 0.6)', // For glass effects
    
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
    focusRing: 'rgba(22, 163, 74, 0.2)', // Focus outline color
    
    // Glass morphism colors
    glassSurface: 'rgba(255, 253, 247, 0.85)',
    glassEdge: 'rgba(255, 255, 255, 0.2)',
    
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
    // Geist font system with optimal fallbacks
    heading: '"Geist", -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", sans-serif',
    body: '"Geist", -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", sans-serif',
    mono: '"Geist Mono", "JetBrains Mono", "SF Mono", Monaco, "Courier New", monospace',
    // Optional elegant serif for special headings
    display: '"Playfair Display", Georgia, "Times New Roman", serif',
  },
  
  // Refined font sizes with better scaling
  fontSizes: {
    '2xs': '0.625rem',  // 10px - tiny labels
    xs: '0.75rem',      // 12px - small labels
    sm: '0.875rem',     // 14px - secondary text
    base: '1rem',       // 16px - body text
    lg: '1.125rem',     // 18px - large body
    xl: '1.25rem',      // 20px - small headings
    '2xl': '1.5rem',    // 24px - h3
    '3xl': '1.875rem',  // 30px - h2
    '4xl': '2.25rem',   // 36px - h1 mobile
    '5xl': '3rem',      // 48px - h1 desktop
    '6xl': '3.75rem',   // 60px - hero
    '7xl': '4.5rem',    // 72px - display
  },
  
  // Optimized font weights for Geist variable font
  fontWeights: {
    thin: 100,
    light: 300,
    normal: 425,      // Slightly heavier for ivory background
    medium: 500,
    semibold: 580,    // Perfect Geist semi-bold
    bold: 700,
    extrabold: 800,
    black: 900,
  },
  
  // Refined line heights
  lineHeights: {
    none: 1,
    tight: 1.2,
    snug: 1.4,
    base: 1.6,
    relaxed: 1.75,
    loose: 2,
  },
  
  // Letter spacing optimized for Geist
  letterSpacing: {
    tighter: '-0.03em',
    tight: '-0.025em',
    normal: '-0.011em',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
  
  // Musical spacing rhythm system (4-8-12-16-24-32-48-64)
  spacing: {
    px: '1px',
    '2xs': '0.125rem',  // 2px
    xs: '0.25rem',      // 4px - base unit
    sm: '0.5rem',       // 8px
    md: '0.75rem',      // 12px
    base: '1rem',       // 16px
    lg: '1.5rem',       // 24px
    xl: '2rem',         // 32px
    '2xl': '3rem',      // 48px
    '3xl': '4rem',      // 64px
    '4xl': '6rem',      // 96px
    '5xl': '8rem',      // 128px
  },
  
  // Consistent corner radius system
  borderRadius: {
    none: '0',
    xs: '0.125rem',     // 2px - subtle details
    sm: '0.375rem',     // 6px - buttons, tags
    base: '0.5rem',     // 8px - inputs, small cards
    md: '0.75rem',      // 12px - images, content
    lg: '1rem',         // 16px - cards, containers
    xl: '1.25rem',      // 20px - large cards
    '2xl': '1.5rem',    // 24px - hero sections
    '3xl': '2rem',      // 32px - special features
    full: '9999px',     // pills, avatars
  },
  
  // Enhanced shadows with green tint
  shadows: {
    xs: '0 1px 2px 0 rgba(26, 47, 42, 0.03)',
    sm: '0 1px 3px 0 rgba(26, 47, 42, 0.05), 0 1px 2px 0 rgba(26, 47, 42, 0.03)',
    base: '0 2px 4px -1px rgba(26, 47, 42, 0.06), 0 1px 2px 0 rgba(26, 47, 42, 0.04)',
    md: '0 4px 6px -2px rgba(26, 47, 42, 0.08), 0 2px 4px -1px rgba(26, 47, 42, 0.06)',
    lg: '0 10px 15px -3px rgba(26, 47, 42, 0.1), 0 4px 6px -2px rgba(26, 47, 42, 0.05)',
    xl: '0 20px 25px -5px rgba(26, 47, 42, 0.1), 0 10px 10px -5px rgba(26, 47, 42, 0.04)',
    '2xl': '0 25px 50px -12px rgba(26, 47, 42, 0.25)',
    '3xl': '0 35px 60px -15px rgba(26, 47, 42, 0.3)',
    inner: 'inset 0 2px 4px 0 rgba(26, 47, 42, 0.06)',
    'inner-sm': 'inset 0 1px 2px 0 rgba(26, 47, 42, 0.04)',
    glow: '0 0 20px rgba(22, 163, 74, 0.15)',
    'glow-lg': '0 0 40px rgba(22, 163, 74, 0.2)',
  },
  
  // Refined transitions with custom easings
  transitions: {
    instant: '50ms ease-out',
    fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    base: '250ms cubic-bezier(0.4, 0, 0.2, 1)',
    slow: '350ms cubic-bezier(0.4, 0, 0.2, 1)',
    slower: '500ms cubic-bezier(0.4, 0, 0.2, 1)',
    // Custom easings
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  },
  
  // Responsive breakpoints
  breakpoints: {
    xs: '475px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  
  // Z-index scale
  zIndex: {
    below: -1,
    base: 0,
    dropdown: 1000,
    sticky: 1100,
    overlay: 1200,
    modal: 1300,
    popover: 1400,
    tooltip: 1500,
    toast: 1600,
  },
  
  // Animation durations
  durations: {
    instant: '50ms',
    fast: '150ms',
    base: '250ms',
    slow: '350ms',
    slower: '500ms',
    slowest: '700ms',
  },
  
  // Blur values for glass morphism
  blurs: {
    sm: '4px',
    base: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    '2xl': '40px',
  },
};

export default theme;