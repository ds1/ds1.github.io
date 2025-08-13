// Use CSS variables so changes here automatically sync with CMS
const theme = {
  colors: {
    primary: 'var(--color-primary, #61dafb)',
    secondary: 'var(--color-secondary, #8be9fd)',
    background: 'var(--color-background, #282c34)',
    surface: 'var(--color-surface, #3b3e47)',
    text: 'var(--color-text, #ffffff)',
    textSecondary: 'var(--color-text-secondary, #b3b3b3)',
  },
  fonts: {
    body: 'var(--font-body, Arial, sans-serif)',
    heading: 'var(--font-heading, Arial, sans-serif)',
  },
  // Raw values for the sync script
  rawColors: {
    primary: '#61dafb',
    secondary: '#8be9fd',
    background: '#282c34',
    surface: '#3b3e47',
    text: '#ffffff',
    textSecondary: '#b3b3b3',
  },
  rawFonts: {
    body: 'Arial, sans-serif',
    heading: 'Arial, sans-serif',
  }
};

export default theme;