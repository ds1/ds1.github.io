const fs = require('fs-extra');
const path = require('path');

async function postBuild() {
  console.log('Starting post-build process...');
  
  const buildDir = path.join(__dirname, '../build');
  const docsDir = path.join(__dirname, '../docs');
  const publicDir = path.join(__dirname, '../public');
  
  try {
    // 1. Clear docs directory (except CNAME if it exists)
    let cnameContent = null;
    const cnamePath = path.join(docsDir, 'CNAME');
    if (fs.existsSync(cnamePath)) {
      cnameContent = fs.readFileSync(cnamePath, 'utf8');
    }
    
    console.log('Clearing docs directory...');
    await fs.emptyDir(docsDir);
    
    // 2. Copy build output to docs
    console.log('Copying build files to docs...');
    await fs.copy(buildDir, docsDir);
    
    // 3. Copy admin folder from public to docs
    console.log('Copying admin folder...');
    const adminSource = path.join(publicDir, 'admin');
    const adminDest = path.join(docsDir, 'admin');
    if (fs.existsSync(adminSource)) {
      await fs.copy(adminSource, adminDest);
    }
    
    // 4. Copy shared-theme.css
    console.log('Copying shared-theme.css...');
    const themeSource = path.join(publicDir, 'shared-theme.css');
    const themeDest = path.join(docsDir, 'shared-theme.css');
    if (fs.existsSync(themeSource)) {
      await fs.copy(themeSource, themeDest);
    }
    
    // 5. Copy any other static files that should be in docs
    const staticFiles = ['DanSchmitzResume.pdf', 'favicon.ico', 'robots.txt'];
    for (const file of staticFiles) {
      const source = path.join(publicDir, file);
      const dest = path.join(docsDir, file);
      if (fs.existsSync(source)) {
        console.log(`Copying ${file}...`);
        await fs.copy(source, dest);
      }
    }
    
    // 6. Restore CNAME if it existed
    if (cnameContent) {
      console.log('Restoring CNAME file...');
      fs.writeFileSync(cnamePath, cnameContent);
    }
    
    console.log('Post-build process completed successfully!');
    console.log('Files copied to docs directory:');
    console.log('- Build output');
    console.log('- Admin folder (CMS)');
    console.log('- shared-theme.css');
    console.log('- Static files');
    
  } catch (error) {
    console.error('Error during post-build:', error);
    process.exit(1);
  }
}

postBuild();