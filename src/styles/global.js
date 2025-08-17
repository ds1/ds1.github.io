import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  /* CSS Reset and Box Model */
  * {
    box-sizing: border-box;
  }
  
  /* Prevent horizontal scroll on mobile */
  html, body {
    overflow-x: hidden;
    width: 100%;
  }
  
  body {
    margin: 0;
    padding: 0;
    font-family: ${({ theme }) => theme.fonts.body};
    line-height: 1.6;
    color: ${({ theme }) => theme.colors.text};
    background-color: ${({ theme }) => theme.colors.background};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    
    /* Improve text rendering on mobile */
    text-rendering: optimizeLegibility;
    
    /* Prevent iOS text size adjustment */
    -webkit-text-size-adjust: 100%;
  }

  h1, h2, h3, h4, h5, h6 {
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.colors.text};
    line-height: 1.2;
    
    /* Prevent orphan headings */
    page-break-after: avoid;
    break-after: avoid;
  }
  
  /* Responsive typography */
  h1 {
    font-size: 2.5rem;
    
    @media (max-width: 768px) {
      font-size: 2rem;
    }
    
    @media (max-width: 480px) {
      font-size: 1.75rem;
    }
  }
  
  h2 {
    font-size: 2rem;
    
    @media (max-width: 768px) {
      font-size: 1.5rem;
    }
    
    @media (max-width: 480px) {
      font-size: 1.375rem;
    }
  }
  
  h3 {
    font-size: 1.5rem;
    
    @media (max-width: 768px) {
      font-size: 1.25rem;
    }
  }
  
  p {
    margin-bottom: 1rem;
    
    @media (max-width: 768px) {
      margin-bottom: 0.875rem;
    }
  }

  a {
    color: ${({ theme }) => theme.colors.text};
    text-decoration: underline;
    opacity: 0.9;
    
    /* Improve touch target size on mobile */
    @media (max-width: 768px) {
      display: inline-block;
      min-height: 44px; /* iOS touch target recommendation */
      line-height: 44px;
      padding: 0 0.25rem;
      margin: -0.25rem;
    }
    
    &:hover {
      opacity: 1;
      text-decoration: underline;
    }
    
    /* Remove tap highlight on mobile */
    -webkit-tap-highlight-color: transparent;
  }
  
  /* Responsive images */
  img {
    max-width: 100%;
    height: auto;
    display: block;
  }
  
  /* Better button defaults for mobile */
  button {
    font-family: inherit;
    font-size: inherit;
    min-height: 44px; /* iOS touch target recommendation */
    padding: 0.5rem 1rem;
    
    @media (max-width: 768px) {
      min-height: 48px; /* Slightly larger on mobile */
    }
  }
  
  /* Prevent zoom on input focus on iOS */
  input, textarea, select {
    font-size: 16px;
    
    @media (max-width: 768px) {
      font-size: 16px !important; /* Prevent iOS zoom */
    }
  }
  
  /* Hide scrollbars but keep functionality */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  
  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.background};
  }
  
  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.surface};
    border-radius: 4px;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.textSecondary};
  }
`;

export default GlobalStyle;