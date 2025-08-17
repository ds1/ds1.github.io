const fs = require('fs');
const path = require('path');

async function generateImageImports() {
  try {
    // Read JSON data files (generated from CMS)
    const dataDir = path.join(__dirname, '../src/data');
    const caseStudies = JSON.parse(fs.readFileSync(path.join(dataDir, 'caseStudies.json'), 'utf8'));
    const caseStudyDetails = JSON.parse(fs.readFileSync(path.join(dataDir, 'caseStudyDetails.json'), 'utf8'));
    const aboutData = JSON.parse(fs.readFileSync(path.join(dataDir, 'about.json'), 'utf8'));
    
    // Use a Map to track unique image paths and their corresponding data
    const imagePathMap = new Map();
    
    // Get all available images in src/images directory
    const availableImages = fs.readdirSync(path.join(__dirname, '../src/images'))
      .reduce((acc, file) => {
        acc[file.toLowerCase()] = file;  // Store original filename with lowercase key
        return acc;
      }, {});
    
    console.log('\nAvailable images in src/images/:');
    Object.values(availableImages).forEach(file => console.log(`  ${file}`));
    
    // Helper to create variable name
    const createVariableName = (fileName) => {
      return fileName
        .replace(/\.[^/.]+$/, '')     // Remove extension
        .replace(/[^a-zA-Z0-9]/g, '') // Remove special characters
        .replace(/^\d+/, '');         // Remove leading numbers
    };

    // Helper to process and validate image paths
    const processImagePath = (imagePath) => {
      if (!imagePath) return;
      
      // Normalize the path to always use forward slashes
      const normalizedPath = imagePath.replace(/\\/g, '/');
      
      // Strip any leading slash and get just the filename
      const cleanPath = normalizedPath.replace(/^\//, '');
      const fileName = path.basename(cleanPath);
      
      console.log(`\nProcessing image path: ${normalizedPath}`);
      console.log(`Looking for file: ${fileName}`);
      
      // Case-insensitive lookup
      const actualFileName = availableImages[fileName.toLowerCase()];
      
      if (actualFileName) {
        // Keep the original format (/images/...) for the imageMap
        const mapPath = `/images/${actualFileName}`;
        
        // Only add if we haven't processed this image yet
        if (!imagePathMap.has(mapPath)) {
          console.log(`Found matching file: ${actualFileName}`);
          console.log(`Adding path to imageMap: ${mapPath}`);
          
          imagePathMap.set(mapPath, {
            variableName: createVariableName(actualFileName),
            importPath: `../images/${actualFileName}`
          });
        }
      } else {
        console.warn(`Warning: No matching file found for: ${fileName}`);
      }
    };
    
    // Process all data files for image paths
    console.log('\nProcessing data files for image paths...');
    
    // Process case studies
    if (caseStudies.caseStudies) {
      caseStudies.caseStudies.forEach(item => {
        if (item.thumbnail) processImagePath(item.thumbnail);
      });
    }
    
    // Process case study details
    if (caseStudyDetails.caseStudyDetails) {
      caseStudyDetails.caseStudyDetails.forEach(item => {
        if (item.thumbnail) processImagePath(item.thumbnail);
        
        // Process media array if exists
        if (item.media && Array.isArray(item.media)) {
          item.media.forEach(media => {
            if (media.url) processImagePath(media.url);
          });
        }
        
        // Process old images array if exists (backward compatibility)
        if (item.images && Array.isArray(item.images)) {
          item.images.forEach(image => {
            if (image.url) processImagePath(image.url);
          });
        }
      });
    }
    
    // Process about page
    if (aboutData.profileImage) {
      processImagePath(aboutData.profileImage);
    }

    console.log('\nGenerating imports and imageMap...');
    
    // Create the output content
    const outputContent = `// This file is auto-generated. Do not edit manually.
// Generated ${new Date().toISOString()}

${Array.from(imagePathMap.values())
  .map(({ variableName, importPath }) => `import ${variableName} from '${importPath}';`)
  .join('\n')}

export const imageMap = {
${Array.from(imagePathMap.entries())
  .map(([mapPath, { variableName }]) => `  '${mapPath}': ${variableName}`)
  .join(',\n')}
};
`;

    // Ensure utils directory exists
    const utilsDir = path.join(__dirname, '../src/utils');
    if (!fs.existsSync(utilsDir)) {
      fs.mkdirSync(utilsDir, { recursive: true });
    }

    // Write to src/utils/imageImports.js
    fs.writeFileSync(
      path.join(utilsDir, 'imageImports.js'),
      outputContent
    );

    console.log('\nImage imports generated successfully!');
  } catch (error) {
    console.error('Error generating image imports:', error);
    process.exit(1);
  }
}

generateImageImports();