// src/styles/global.js
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  /* CSS Reset and Box Model */
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  /* Prevent horizontal scroll on mobile */
  html {
    overflow-x: hidden;
    width: 100%;
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    scroll-behavior: smooth;
    
    /* Prevent iOS zoom on inputs */
    -webkit-text-size-adjust: 100%;
  }
  
  body {
    font-family: ${({ theme }) => theme.fonts.body};
    font-size: ${({ theme }) => theme.fontSizes.base};
    font-weight: ${({ theme }) => theme.fontWeights.normal};
    line-height: ${({ theme }) => theme.lineHeights.base};
    letter-spacing: ${({ theme }) => theme.letterSpacing.normal};
    color: ${({ theme }) => theme.colors.text};
    background-color: ${({ theme }) => theme.colors.background};
    overflow-x: hidden;
    position: relative;
    
    /* Sophisticated gradient background with orbs */
    background: 
      radial-gradient(
        ellipse 800px 600px at 10% 20%,
        rgba(22, 163, 74, 0.03) 0%,
        transparent 50%
      ),
      radial-gradient(
        ellipse 600px 800px at 90% 80%,
        rgba(124, 58, 237, 0.02) 0%,
        transparent 50%
      ),
      radial-gradient(
        circle 1000px at 50% 50%,
        rgba(22, 163, 74, 0.01) 0%,
        transparent 70%
      ),
      linear-gradient(
        180deg,
        ${({ theme }) => theme.colors.background} 0%,
        ${({ theme }) => theme.colors.backgroundSecondary} 100%
      );
    min-height: 100vh;
    
    /* Subtle noise texture overlay */
    &::before {
      content: '';
      position: fixed;
      inset: 0;
      background-image: 
        url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.02'/%3E%3C/svg%3E");
      pointer-events: none;
      opacity: 0.4;
      mix-blend-mode: multiply;
      z-index: 1;
    }
    
    /* Ensure content is above texture */
    > * {
      position: relative;
      z-index: 2;
    }
  }

  /* Typography System with Geist optimization */
  h1, h2, h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    line-height: ${({ theme }) => theme.lineHeights.tight};
    color: ${({ theme }) => theme.colors.text};
    margin: 0;
    letter-spacing: ${({ theme }) => theme.letterSpacing.tight};
    font-feature-settings: "kern" 1, "liga" 1, "calt" 1, "ss01" 1, "ss02" 1;
    text-wrap: balance;
    
    /* Subtle gradient on headings */
    position: relative;
    background: linear-gradient(
      135deg,
      ${({ theme }) => theme.colors.text} 0%,
      ${({ theme }) => theme.colors.text} 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  h1 {
    font-size: clamp(${({ theme }) => theme.fontSizes['4xl']}, 5vw, ${({ theme }) => theme.fontSizes['6xl']});
    font-weight: ${({ theme }) => theme.fontWeights.black};
    letter-spacing: ${({ theme }) => theme.letterSpacing.tighter};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
    line-height: 1.1;
  }
  
  h2 {
    font-size: clamp(${({ theme }) => theme.fontSizes['3xl']}, 4vw, ${({ theme }) => theme.fontSizes['5xl']});
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    letter-spacing: ${({ theme }) => theme.letterSpacing.tight};
    margin-bottom: ${({ theme }) => theme.spacing.base};
    margin-top: ${({ theme }) => theme.spacing['2xl']};
    line-height: 1.2;
  }
  
  h3 {
    font-size: clamp(${({ theme }) => theme.fontSizes['2xl']}, 3vw, ${({ theme }) => theme.fontSizes['3xl']});
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
    margin-bottom: ${({ theme }) => theme.spacing.sm};
    margin-top: ${({ theme }) => theme.spacing.xl};
    line-height: 1.3;
  }
  
  h4 {
    font-size: ${({ theme }) => theme.fontSizes.xl};
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
    margin-bottom: ${({ theme }) => theme.spacing.sm};
    margin-top: ${({ theme }) => theme.spacing.lg};
  }
  
  p {
    margin-bottom: ${({ theme }) => theme.spacing.base};
    line-height: ${({ theme }) => theme.lineHeights.relaxed};
    color: ${({ theme }) => theme.colors.textSecondary};
    letter-spacing: ${({ theme }) => theme.letterSpacing.normal};
    font-feature-settings: "kern" 1, "liga" 1, "calt" 1;
    text-wrap: pretty;
  }

  /* Links with refined hover states */
  a {
    color: ${({ theme }) => theme.colors.secondary};
    text-decoration: none;
    transition: all ${({ theme }) => theme.transitions.fast};
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    position: relative;
    
    /* Subtle underline animation */
    &::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 0;
      height: 1px;
      background: ${({ theme }) => theme.colors.secondary};
      transition: width ${({ theme }) => theme.transitions.base};
    }
    
    &:hover {
      color: ${({ theme }) => theme.colors.accent};
      
      &::after {
        width: 100%;
      }
    }
    
    /* Remove tap highlight on mobile */
    -webkit-tap-highlight-color: transparent;
    
    /* Ensure touch targets */
    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      display: inline-block;
      min-height: 44px;
      padding: ${({ theme }) => theme.spacing.xs} 0;
    }
  }
  
  /* Lists with refined styling */
  ul, ol {
    margin-bottom: ${({ theme }) => theme.spacing.base};
    padding-left: ${({ theme }) => theme.spacing.lg};
    color: ${({ theme }) => theme.colors.textSecondary};
    
    li {
      margin-bottom: ${({ theme }) => theme.spacing.sm};
      line-height: ${({ theme }) => theme.lineHeights.relaxed};
      position: relative;
      
      /* Custom bullet points */
      &::marker {
        color: ${({ theme }) => theme.colors.secondary};
      }
    }
  }
  
  /* Code with enhanced styling */
  code {
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: ${({ theme }) => theme.fontSizes.sm};
    background: ${({ theme }) => theme.colors.codeBackground};
    padding: ${({ theme }) => theme.spacing['2xs']} ${({ theme }) => theme.spacing.xs};
    border-radius: ${({ theme }) => theme.borderRadius.xs};
    color: ${({ theme }) => theme.colors.secondary};
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    border: 1px solid ${({ theme }) => theme.colors.borderLight};
  }
  
  pre {
    font-family: ${({ theme }) => theme.fonts.mono};
    background: ${({ theme }) => theme.colors.codeBackground};
    padding: ${({ theme }) => theme.spacing.lg};
    border-radius: ${({ theme }) => theme.borderRadius.md};
    overflow-x: auto;
    margin-bottom: ${({ theme }) => theme.spacing.lg};
    border: 1px solid ${({ theme }) => theme.colors.border};
    box-shadow: ${({ theme }) => theme.shadows.inner};
    
    code {
      background: transparent;
      padding: 0;
      border: none;
      color: ${({ theme }) => theme.colors.text};
    }
  }
  
  /* Blockquotes with style */
  blockquote {
    border-left: 4px solid ${({ theme }) => theme.colors.secondary};
    padding: ${({ theme }) => theme.spacing.base} ${({ theme }) => theme.spacing.lg};
    margin: ${({ theme }) => theme.spacing.xl} 0;
    color: ${({ theme }) => theme.colors.textSecondary};
    font-style: italic;
    font-size: ${({ theme }) => theme.fontSizes.lg};
    background: ${({ theme }) => theme.colors.backgroundSecondary};
    border-radius: ${({ theme }) => theme.borderRadius.sm};
    position: relative;
    
    &::before {
      content: '"';
      position: absolute;
      top: -10px;
      left: 20px;
      font-size: 4rem;
      color: ${({ theme }) => theme.colors.secondary};
      opacity: 0.2;
      font-family: ${({ theme }) => theme.fonts.display};
    }
  }
  
  /* Images with polish */
  img {
    max-width: 100%;
    height: auto;
    display: block;
    border-radius: ${({ theme }) => theme.borderRadius.md};
  }
  
  /* Buttons with refined design */
  button {
    font-family: inherit;
    font-size: ${({ theme }) => theme.fontSizes.base};
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    min-height: 44px;
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
    border-radius: ${({ theme }) => theme.borderRadius.sm};
    cursor: pointer;
    transition: all ${({ theme }) => theme.transitions.fast};
    position: relative;
    overflow: hidden;
    
    /* Ripple effect preparation */
    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 0;
      height: 0;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.5);
      transform: translate(-50%, -50%);
      transition: width 0.6s, height 0.6s;
    }
    
    &:active::before {
      width: 300px;
      height: 300px;
    }
    
    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      min-height: 48px;
    }
  }
  
  /* Forms with polish */
  input, textarea, select {
    font-family: inherit;
    font-size: ${({ theme }) => theme.fontSizes.base};
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.base};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.borderRadius.base};
    background: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.text};
    transition: all ${({ theme }) => theme.transitions.fast};
    
    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.secondary};
      box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.focusRing};
      background: ${({ theme }) => theme.colors.background};
    }
    
    &::placeholder {
      color: ${({ theme }) => theme.colors.textTertiary};
    }
    
    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      font-size: 16px !important; /* Prevent iOS zoom */
    }
  }
  
  /* Selection with brand colors */
  ::selection {
    background: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.background};
  }
  
  ::-moz-selection {
    background: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.background};
  }
  
  /* Scrollbar Styling */
  ::-webkit-scrollbar {
    width: 12px;
    height: 12px;
  }
  
  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.backgroundSecondary};
    border-radius: ${({ theme }) => theme.borderRadius.full};
  }
  
  ::-webkit-scrollbar-thumb {
    background: linear-gradient(
      180deg,
      ${({ theme }) => theme.colors.borderDark},
      ${({ theme }) => theme.colors.border}
    );
    border-radius: ${({ theme }) => theme.borderRadius.full};
    border: 3px solid ${({ theme }) => theme.colors.backgroundSecondary};
    
    &:hover {
      background: linear-gradient(
        180deg,
        ${({ theme }) => theme.colors.textTertiary},
        ${({ theme }) => theme.colors.borderDark}
      );
    }
  }
  
  /* Focus Visible for accessibility */
  *:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.secondary};
    outline-offset: 2px;
    border-radius: ${({ theme }) => theme.borderRadius.xs};
  }
  
  /* Skip to content link for accessibility */
  .skip-to-content {
    position: absolute;
    top: -40px;
    left: 0;
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.background};
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.base};
    text-decoration: none;
    z-index: 100;
    border-radius: ${({ theme }) => theme.borderRadius.sm};
    
    &:focus {
      top: 10px;
      left: 10px;
    }
  }
  
  /* Reduced motion preferences */
  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
  
  /* Print styles */
  @media print {
    body {
      background: white;
      color: black;
    }
    
    a {
      color: black;
      text-decoration: underline;
    }
  }
`;

export default GlobalStyle;