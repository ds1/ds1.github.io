// scripts/testImageSystem.js

const fs = require('fs');
const path = require('path');

function testImageSystem() {
  console.log('Testing Image System...\n');

  // 1. Check directory structure
  console.log('Checking directories...');
  const requiredDirs = [
    'content',
    'src/images',
    'src/utils'
  ];

  requiredDirs.forEach(dir => {
    const exists = fs.existsSync(path.join(__dirname, '..', dir));
    console.log(`${dir}: ${exists ? '✓' : '✗'}`);
    if (!exists) {
      fs.mkdirSync(path.join(__dirname, '..', dir), { recursive: true });
      console.log(`Created ${dir}`);
    }
  });

  // 2. Check CSV files
  console.log('\nChecking CSV files...');
  const requiredCSV = [
    'content/caseStudies.csv',
    'content/caseStudyDetails.csv'
  ];

  requiredCSV.forEach(file => {
    const exists = fs.existsSync(path.join(__dirname, '..', file));
    console.log(`${file}: ${exists ? '✓' : '✗'}`);
  });

  // 3. Check image references
  console.log('\nChecking image references in CSV files...');
  requiredCSV.forEach(csvFile => {
    if (fs.existsSync(path.join(__dirname, '..', csvFile))) {
      const content = fs.readFileSync(path.join(__dirname, '..', csvFile), 'utf8');
      const imageRefs = content.match(/\/images\/[^,"\n]+/g) || [];
      console.log(`\nFound ${imageRefs.length} image references in ${csvFile}:`);
      imageRefs.forEach(ref => {
        const imageExists = fs.existsSync(path.join(__dirname, '..', 'src', 'images', path.basename(ref)));
        console.log(`${ref}: ${imageExists ? '✓' : '✗'}`);
      });
    }
  });

  console.log('\nAvailable images in src/images:');
  const imagesDir = path.join(__dirname, '..', 'src', 'images');
  if (fs.existsSync(imagesDir)) {
    const availableImages = fs.readdirSync(imagesDir);
    availableImages.forEach(image => {
      console.log(image);
    });
  }
  
}

testImageSystem();