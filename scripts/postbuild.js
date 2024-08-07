const fs = require('fs');
const path = require('path');

const buildPath = path.join(__dirname, '..', 'build');
const docsPath = path.join(__dirname, '..', 'docs');

console.log('Checking if build directory exists...');
console.log('Build path:', buildPath);

if (!fs.existsSync(buildPath)) {
    console.error('Build directory does not exist. Make sure the build process completed successfully.');
    process.exit(1);
}

console.log('Build directory exists. Proceeding with renaming...');

if (fs.existsSync(docsPath)) {
    console.log('Docs directory already exists. Removing it...');
    fs.rmSync(docsPath, { recursive: true, force: true });
}

try {
    fs.renameSync(buildPath, docsPath);
    console.log('Successfully renamed build directory to docs');
} catch (error) {
    console.error('Error renaming directory:', error);
    process.exit(1);
}

// Create CNAME file
fs.writeFileSync(path.join(docsPath, 'CNAME'), 'schmitz.ai');
console.log('CNAME file created');

console.log('Post-build process completed successfully');