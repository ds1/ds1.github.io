const fs = require('fs');
const path = require('path');

async function convertCMSContent() {
  const cmsDir = path.join(__dirname, '../content/cms');
  const dataDir = path.join(__dirname, '../src/data');
  
  // Read case studies from CMS format
  const caseStudiesDir = path.join(cmsDir, 'case-studies');
  
  if (fs.existsSync(caseStudiesDir)) {
    const files = fs.readdirSync(caseStudiesDir);
    const caseStudies = [];
    const caseStudyDetails = [];
    
    files.forEach(file => {
      if (file.endsWith('.json')) {
        const content = JSON.parse(fs.readFileSync(path.join(caseStudiesDir, file), 'utf8'));
        
        // Add to case studies list
        caseStudies.push({
          id: content.id,
          title: content.title,
          description: content.description,
          thumbnail: content.thumbnail
        });
        
        // Process for details
        const details = {
          ...content,
          content: [], // Build content array from fields
          images: content.images || [],
          tags: content.tags || {}
        };
        
        // Convert semicolon lists to arrays
        if (content.approach_list) {
          details.content.push({
            type: 'list',
            content: content.approach_list.split(';').map(item => item.trim()),
            key: 'approach'
          });
        }
        
        caseStudyDetails.push(details);
      }
    });
    
    // Write processed data
    fs.writeFileSync(
      path.join(dataDir, 'caseStudies.json'),
      JSON.stringify({ caseStudies }, null, 2)
    );
    
    fs.writeFileSync(
      path.join(dataDir, 'caseStudyDetails.json'),
      JSON.stringify({ caseStudyDetails }, null, 2)
    );
  }
  
  console.log('CMS content converted successfully!');
}

convertCMSContent();