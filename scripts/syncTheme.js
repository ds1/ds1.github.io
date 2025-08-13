const fs = require('fs');
const path = require('path');

// Simple script to sync theme.js colors with CSS variables
// This is OPTIONAL - only use if you want to generate CSS from theme.js

function syncThemeToCSS() {
  try {
    // Import your theme
    const theme = require('../src/styles/theme').default;
    
    const sharedCSSPath = path.join(__dirname, '../public/shared-theme.css');
    
    // Read the existing CSS
    if (!fs.existsSync(sharedCSSPath)) {
      console.log('⚠️  shared-theme.css not found. Please create it first.');
      console.log('   Copy the CSS from the artifact to public/shared-theme.css');
      return;
    }
    
    let css = fs.readFileSync(sharedCSSPath, 'utf8');
    
    // Extract raw color values from theme.js
    // If using the updated theme.js with rawColors, use those
    // Otherwise, extract from the CSS variable syntax
    const colors = theme.rawColors || {
      primary: theme.colors.primary.match(/#[0-9a-f]{6}/i)?.[0] || '#61dafb',
      secondary: theme.colors.secondary.match(/#[0-9a-f]{6}/i)?.[0] || '#8be9fd',
      background: theme.colors.background.match(/#[0-9a-f]{6}/i)?.[0] || '#282c34',
      surface: theme.colors.surface.match(/#[0-9a-f]{6}/i)?.[0] || '#3b3e47',
      text: theme.colors.text.match(/#[0-9a-f]{6}/i)?.[0] || '#ffffff',
      textSecondary: theme.colors.textSecondary.match(/#[0-9a-f]{6}/i)?.[0] || '#b3b3b3',
    };
    
    // Update the CSS variable values
    css = css.replace(/--color-primary:\s*#[0-9a-f]{6}/i, `--color-primary: ${colors.primary}`);
    css = css.replace(/--color-secondary:\s*#[0-9a-f]{6}/i, `--color-secondary: ${colors.secondary}`);
    css = css.replace(/--color-background:\s*#[0-9a-f]{6}/i, `--color-background: ${colors.background}`);
    css = css.replace(/--color-surface:\s*#[0-9a-f]{6}/i, `--color-surface: ${colors.surface}`);
    css = css.replace(/--color-text:\s*#[0-9a-f]{6}/i, `--color-text: ${colors.text}`);
    css = css.replace(/--color-text-secondary:\s*#[0-9a-f]{6}/i, `--color-text-secondary: ${colors.textSecondary}`);
    
    // Write back
    fs.writeFileSync(sharedCSSPath, css);
    
    // Also copy to docs if it exists
    const docsPath = path.join(__dirname, '../docs/shared-theme.css');
    if (fs.existsSync(path.join(__dirname, '../docs'))) {
      fs.writeFileSync(docsPath, css);
    }
    
    console.log('✅ Theme synced to CSS variables');
    console.log('   Colors updated:', colors);
    
  } catch (error) {
    console.error('Error syncing theme:', error);
  }
}

// Run the sync
syncThemeToCSS();

// Optional: Watch for changes
if (process.argv.includes('--watch')) {
  const themePath = path.join(__dirname, '../src/styles/theme.js');
  
  console.log('👀 Watching theme.js for changes...');
  
  fs.watchFile(themePath, () => {
    console.log('📝 Theme changed, syncing to CSS...');
    delete require.cache[require.resolve('../src/styles/theme')];
    syncThemeToCSS();
  });
}