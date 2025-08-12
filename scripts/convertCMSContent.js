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
          thumbnail: content.thumbnail,
          thumbnail_type: content.thumbnail_type || 'image' // Add type
        });
        
        // Process media fields into array
        const media = [];
        
        // Process all media fields
        ['process', 'system', ...Array.from({length: 10}, (_, i) => `media${i+1}`)].forEach(prefix => {
          if (content[`${prefix}_media_url`] || content[`${prefix}_url`]) {
            media.push({
              url: content[`${prefix}_media_url`] || content[`${prefix}_url`],
              alt: content[`${prefix}_media_alt`] || content[`${prefix}_alt`],
              caption: content[`${prefix}_media_caption`] || content[`${prefix}_caption`],
              type: content[`${prefix}_media_type`] || content[`${prefix}_type`] || 'image'
            });
          }
        });
        
        // Build content sections
        const sections = [];
        
        // Process h1, h2, body fields
        Object.entries(content).forEach(([key, value]) => {
          if (key.endsWith('_h1') || key.endsWith('_h2') || key.endsWith('_body')) {
            const type = key.endsWith('_h1') ? 'h1' : 
                        key.endsWith('_h2') ? 'h2' : 'body';
            sections.push({
              type,
              content: value,
              key: key.replace(/_h[12]|_body/, '')
            });
          }
          if (key.endsWith('_list')) {
            sections.push({
              type: 'list',
              content: value.split(';').map(item => item.trim()),
              key: key.replace(/_list/, '')
            });
          }
        });
        
        // Process tags
        const tags = {
          designTools: content.design_tools?.split(';').map(t => t.trim()) || [],
          aiTools: content.ai_tools?.split(';').map(t => t.trim()) || [],
          devTools: content.dev_tools?.split(';').map(t => t.trim()) || [],
          skills: content.skills?.split(';').map(t => t.trim()) || [],
          roles: content.roles?.split(';').map(t => t.trim()) || [],
          artifactTypes: content.artifact_types?.split(';').map(t => t.trim()) || [],
          fidelity: content.fidelity?.split(';').map(t => t.trim()) || [],
          aiModels: content.ai_models?.split(';').map(t => t.trim()) || [],
          designPrinciples: content.design_principles?.split(';').map(t => t.trim()) || [],
          usabilityHeuristics: content.usability_heuristics?.split(';').map(t => t.trim()) || []
        };
        
        caseStudyDetails.push({
          id: content.id,
          title: content.title,
          subtitle: content.subtitle,
          thumbnail: content.thumbnail,
          duration: content.duration,
          role: content.role,
          content: sections,
          media: media,
          tags: tags
        });
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
    
    console.log('CMS content converted successfully!');
  }
}

convertCMSContent();