// scripts/generateImageImports.js

// Script that scans the CSV files for image paths and automatically generates the necessary import statements and imageMap code. 

const fs = require('fs');
const csv = require('csvtojson');
const path = require('path');

async function generateImageImports() {
  try {
    // Read CSV files
    const caseStudies = await csv().fromFile(path.join(__dirname, '../content/caseStudies.csv'));
    const caseStudyDetails = await csv().fromFile(path.join(__dirname, '../content/caseStudyDetails.csv'));
    
    // Collect all unique image paths
    const imagePaths = new Set();
    
    // Helper to process and validate image paths
    const processImagePath = (imagePath) => {
      if (!imagePath) return;
      
      // Convert /images/ path to relative path
      const normalizedPath = imagePath.replace(
        /^\/images\//,
        '../images/'
      );
      
      // Verify the image exists
      const fullPath = path.join(__dirname, '..', 'src', 'images', path.basename(imagePath));
      if (fs.existsSync(fullPath)) {
        imagePaths.add(normalizedPath);
      } else {
        console.warn(`Warning: Image not found: ${fullPath}`);
      }
    };
    
    // Process thumbnails and detail images
    caseStudies.forEach(study => {
      processImagePath(study.thumbnail);
    });
    
    caseStudyDetails.forEach(study => {
      processImagePath(study.thumbnail);
      processImagePath(study.image1_url);
      processImagePath(study.image2_url);
    });

    // Generate import statements
    const imports = Array.from(imagePaths).map(imagePath => {
      const fileName = path.basename(imagePath);
      const variableName = fileName
        .replace(/\.[^/.]+$/, '') // Remove extension
        .replace(/[^a-zA-Z0-9]/g, '') // Remove special characters
        .replace(/^\d+/, ''); // Remove leading numbers if any
      
      return {
        path: imagePath,
        variableName,
        import: `import ${variableName} from '${imagePath}';`
      };
    });

    // Generate imageMap
    const imageMapEntries = imports.map(({ path, variableName }) => 
      `  '${path}': ${variableName}`
    );

    // Create the output content
    const outputContent = `// This file is auto-generated. Do not edit manually.
// Generated ${new Date().toISOString()}

${imports.map(i => i.import).join('\n')}

export const imageMap = {
${imageMapEntries.join(',\n')}
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

    console.log('Image imports generated successfully!');
  } catch (error) {
    console.error('Error generating image imports:', error);
    process.exit(1);
  }
}

generateImageImports();