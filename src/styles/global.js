// src/styles/global.js
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  /* Import premium fonts */
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
  
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
  }
  
  body {
    font-family: ${({ theme }) => theme.fonts.body};
    font-size: ${({ theme }) => theme.fontSizes.base};
    font-weight: ${({ theme }) => theme.fontWeights.normal};
    line-height: ${({ theme }) => theme.lineHeights.base};
    color: ${({ theme }) => theme.colors.text};
    background-color: ${({ theme }) => theme.colors.background};
    -webkit-text-size-adjust: 100%;
    overflow-x: hidden;
    
    /* Subtle ivory gradient with warm undertones */
    background: linear-gradient(
      180deg,
      ${({ theme }) => theme.colors.background} 0%,
      ${({ theme }) => theme.colors.backgroundSecondary} 100%
    );
    min-height: 100vh;
  }

  /* Typography System */
  h1, h2, h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
    line-height: ${({ theme }) => theme.lineHeights.tight};
    color: ${({ theme }) => theme.colors.text};
    margin: 0;
    letter-spacing: -0.02em;
  }
  
  h1 {
    font-size: ${({ theme }) => theme.fontSizes['5xl']};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    letter-spacing: -0.03em;
    margin-bottom: ${({ theme }) => theme.spacing.lg};
    
    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      font-size: ${({ theme }) => theme.fontSizes['4xl']};
    }
    
    @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
      font-size: ${({ theme }) => theme.fontSizes['3xl']};
    }
  }
  
  h2 {
    font-size: ${({ theme }) => theme.fontSizes['4xl']};
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
    margin-bottom: ${({ theme }) => theme.spacing.md};
    margin-top: ${({ theme }) => theme.spacing['2xl']};
    
    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      font-size: ${({ theme }) => theme.fontSizes['3xl']};
    }
    
    @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
      font-size: ${({ theme }) => theme.fontSizes['2xl']};
    }
  }
  
  h3 {
    font-size: ${({ theme }) => theme.fontSizes['2xl']};
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    margin-bottom: ${({ theme }) => theme.spacing.sm};
    margin-top: ${({ theme }) => theme.spacing.xl};
    
    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      font-size: ${({ theme }) => theme.fontSizes.xl};
    }
  }
  
  p {
    margin-bottom: ${({ theme }) => theme.spacing.md};
    line-height: ${({ theme }) => theme.lineHeights.relaxed};
    color: ${({ theme }) => theme.colors.textSecondary};
    
    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      margin-bottom: ${({ theme }) => theme.spacing.md};
    }
  }

  /* Links */
  a {
    color: ${({ theme }) => theme.colors.secondary};
    text-decoration: none;
    transition: ${({ theme }) => theme.transitions.fast};
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    
    &:hover {
      color: ${({ theme }) => theme.colors.accent};
      text-decoration: underline;
    }
    
    /* Remove tap highlight on mobile */
    -webkit-tap-highlight-color: transparent;
    
    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      display: inline-block;
      min-height: 44px;
      line-height: 44px;
    }
  }
  
  /* Lists */
  ul, ol {
    margin-bottom: ${({ theme }) => theme.spacing.md};
    padding-left: ${({ theme }) => theme.spacing.lg};
    color: ${({ theme }) => theme.colors.textSecondary};
    
    li {
      margin-bottom: ${({ theme }) => theme.spacing.sm};
      line-height: ${({ theme }) => theme.lineHeights.relaxed};
    }
  }
  
  /* Code */
  code {
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: ${({ theme }) => theme.fontSizes.sm};
    background: ${({ theme }) => theme.colors.backgroundSecondary};
    padding: ${({ theme }) => theme.spacing.xs};
    border-radius: ${({ theme }) => theme.borderRadius.sm};
    color: ${({ theme }) => theme.colors.secondary};
  }
  
  pre {
    font-family: ${({ theme }) => theme.fonts.mono};
    background: ${({ theme }) => theme.colors.backgroundSecondary};
    padding: ${({ theme }) => theme.spacing.md};
    border-radius: ${({ theme }) => theme.borderRadius.md};
    overflow-x: auto;
    margin-bottom: ${({ theme }) => theme.spacing.md};
    border: 1px solid ${({ theme }) => theme.colors.border};
    
    code {
      background: transparent;
      padding: 0;
    }
  }
  
  /* Blockquotes */
  blockquote {
    border-left: 4px solid ${({ theme }) => theme.colors.secondary};
    padding-left: ${({ theme }) => theme.spacing.md};
    margin: ${({ theme }) => theme.spacing.lg} 0;
    color: ${({ theme }) => theme.colors.textSecondary};
    font-style: italic;
    font-size: ${({ theme }) => theme.fontSizes.lg};
  }
  
  /* Images */
  img {
    max-width: 100%;
    height: auto;
    display: block;
    border-radius: ${({ theme }) => theme.borderRadius.md};
  }
  
  /* Buttons */
  button {
    font-family: inherit;
    font-size: ${({ theme }) => theme.fontSizes.base};
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    min-height: 44px;
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
    border-radius: ${({ theme }) => theme.borderRadius.base};
    cursor: pointer;
    transition: ${({ theme }) => theme.transitions.fast};
    
    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      min-height: 48px;
    }
  }
  
  /* Forms */
  input, textarea, select {
    font-family: inherit;
    font-size: ${({ theme }) => theme.fontSizes.base};
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.borderRadius.base};
    background: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.text};
    transition: ${({ theme }) => theme.transitions.fast};
    
    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.secondary};
      box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.secondary}20;
    }
    
    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      font-size: 16px !important; /* Prevent iOS zoom */
    }
  }
  
  /* Selection */
  ::selection {
    background: ${({ theme }) => theme.colors.secondary}30;
    color: ${({ theme }) => theme.colors.text};
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
    background: ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.borderRadius.full};
    border: 3px solid ${({ theme }) => theme.colors.backgroundSecondary};
    
    &:hover {
      background: ${({ theme }) => theme.colors.textTertiary};
    }
  }
  
  /* Focus Visible */
  *:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.secondary};
    outline-offset: 2px;
  }
  
  /* Transitions */
  * {
    transition-property: background-color, border-color, color, fill, stroke;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
  }
`;

export default GlobalStyle;