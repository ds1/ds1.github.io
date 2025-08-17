// src/styles/global.js
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  /* CSS Reset and Base Styles */
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  html {
    scroll-behavior: smooth;
    font-size: 16px;
    -webkit-text-size-adjust: 100%;
    -webkit-tap-highlight-color: transparent;
  }
  
  body {
    margin: 0;
    font-family: ${({ theme }) => theme.fonts.body};
    font-size: ${({ theme }) => theme.fontSizes.base};
    font-weight: ${({ theme }) => theme.fontWeights.normal};
    line-height: ${({ theme }) => theme.lineHeights.base};
    color: ${({ theme }) => theme.colors.text};
    background: ${({ theme }) => theme.colors.background};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    font-feature-settings: "kern" 1, "liga" 1, "calt" 1;
    min-height: 100vh;
    position: relative;
    
    /* Subtle gradient background */
    &::before {
      content: '';
      position: fixed;
      inset: 0;
      background: radial-gradient(
        ellipse at top left,
        ${({ theme }) => theme.colors.secondary}04 0%,
        transparent 50%
      ),
      radial-gradient(
        ellipse at bottom right,
        ${({ theme }) => theme.colors.accent}03 0%,
        transparent 50%
      );
      pointer-events: none;
      z-index: -1;
    }
    
    /* Subtle texture overlay */
    &::after {
      content: '';
      position: fixed;
      inset: 0;
      background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.02'/%3E%3C/svg%3E");
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
    font-size: clamp(${({ theme }) => theme.fontSizes.xl}, 2.5vw, ${({ theme }) => theme.fontSizes['2xl']});
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
    margin-bottom: ${({ theme }) => theme.spacing.sm};
    margin-top: ${({ theme }) => theme.spacing.lg};
    line-height: 1.4;
  }
  
  /* Body text */
  p {
    margin-bottom: ${({ theme }) => theme.spacing.base};
    line-height: ${({ theme }) => theme.lineHeights.relaxed};
    font-weight: ${({ theme }) => theme.fontWeights.normal};
    letter-spacing: ${({ theme }) => theme.letterSpacing.normal};
    text-wrap: pretty;
  }
  
  /* Links with refined style */
  a {
    color: ${({ theme }) => theme.colors.secondary};
    text-decoration: none;
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    transition: all ${({ theme }) => theme.transitions.fast};
    position: relative;
    
    &:hover {
      color: ${({ theme }) => theme.colors.primary};
      text-decoration: underline;
      text-underline-offset: 0.2em;
      text-decoration-thickness: 1px;
    }
    
    &:active {
      transform: translateY(1px);
    }
  }
  
  /* Lists with better spacing */
  ul, ol {
    margin-bottom: ${({ theme }) => theme.spacing.base};
    padding-left: ${({ theme }) => theme.spacing.xl};
    
    li {
      margin-bottom: ${({ theme }) => theme.spacing.sm};
      line-height: ${({ theme }) => theme.lineHeights.relaxed};
      
      &::marker {
        color: ${({ theme }) => theme.colors.secondary};
        font-weight: ${({ theme }) => theme.fontWeights.bold};
      }
    }
  }
  
  /* Enhanced code styling */
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