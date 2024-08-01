const fs = require('fs');
const path = require('path');

const buildPath = path.join(__dirname, '..', 'build');
const docsPath = path.join(__dirname, '..', 'docs');

if (fs.existsSync(docsPath)) {
  fs.rmSync(docsPath, { recursive: true, force: true });
}

fs.renameSync(buildPath, docsPath);

console.log('Build folder renamed to docs');