const fs = require('fs');
const path = require('path');

function copyImages() {
  console.log('Copying images to correct locations...\n');

  // Source image locations
  const sourceImagesDir = path.join(__dirname, '../public/images');
  const srcImagesDir = path.join(__dirname, '../src/images');

  // Create src/images if it doesn't exist
  if (!fs.existsSync(srcImagesDir)) {
    fs.mkdirSync(srcImagesDir, { recursive: true });
  }

  // Get list of images from public/images
  const images = fs.readdirSync(sourceImagesDir);

  // Copy each image to src/images
  images.forEach(image => {
    const sourcePath = path.join(sourceImagesDir, image);
    const destPath = path.join(srcImagesDir, image);

    fs.copyFileSync(sourcePath, destPath);
    console.log(`Copied: ${image}`);
  });

  console.log('\nImage copying complete!');
}

copyImages();