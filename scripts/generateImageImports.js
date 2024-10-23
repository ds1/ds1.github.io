const fs = require('fs');
const csv = require('csvtojson');
const path = require('path');

async function generateImageImports() {
  try {
    // Read CSV files
    const caseStudies = await csv().fromFile(path.join(__dirname, '../content/caseStudies.csv'));
    const caseStudyDetails = await csv().fromFile(path.join(__dirname, '../content/caseStudyDetails.csv'));
    const aboutData = await csv().fromFile(path.join(__dirname, '../content/about.csv'));
    
    // Collect all unique image paths
    const imagePaths = new Set();
    
    // Get all available images in src/images directory
    const availableImages = fs.readdirSync(path.join(__dirname, '../src/images'))
      .reduce((acc, file) => {
        acc[file.toLowerCase()] = file;  // Store original filename with lowercase key
        return acc;
      }, {});
    
    console.log('\nAvailable images in src/images/:');
    Object.values(availableImages).forEach(file => console.log(`  ${file}`));
    
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
        const fullPath = `/src/${cleanPath.replace(fileName, actualFileName)}`;
        console.log(`Found matching file: ${actualFileName}`);
        console.log(`Adding path to imageMap: ${fullPath}`);
        imagePaths.add(fullPath);
      } else {
        console.warn(`Warning: No matching file found for: ${fileName}`);
        console.log('Available files:', Object.values(availableImages).join(', '));
      }
    };
    
    // Process all CSV files for image paths
    console.log('\nProcessing CSV files for image paths...');
    [...caseStudies, ...caseStudyDetails, aboutData[0]].forEach(item => {
      if (!item) return;
      // Process any property that might contain an image path
      Object.entries(item).forEach(([key, value]) => {
        if (typeof value === 'string' && value.includes('/images/')) {
          console.log(`\nFound image path in ${key}:`);
          processImagePath(value);
        }
      });
    });

    // Generate import statements
    const imports = Array.from(imagePaths).map(imagePath => {
      const fileName = path.basename(imagePath);
      const variableName = fileName
        .replace(/\.[^/.]+$/, '')     // Remove extension
        .replace(/[^a-zA-Z0-9]/g, '') // Remove special characters
        .replace(/^\d+/, '');         // Remove leading numbers
      
      // Convert /src/images/... to ../images/... for imports
      const importPath = '../' + imagePath.split('/').slice(2).join('/');
      
      return {
        csvPath: imagePath,    // Keep full path for imageMap
        variableName,
        importPath
      };
    });

    console.log('\nGenerating imports and imageMap...');
    
    // Create the output content
    const outputContent = `// This file is auto-generated. Do not edit manually.
// Generated ${new Date().toISOString()}

${imports.map(({ variableName, importPath }) => {
  console.log(`Import: ${importPath} as ${variableName}`);
  return `import ${variableName} from '${importPath}';`
}).join('\n')}

export const imageMap = {
${imports.map(({ csvPath, variableName }) => {
  console.log(`ImageMap: ${csvPath} -> ${variableName}`);
  return `  '${csvPath}': ${variableName}`
}).join(',\n')}
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