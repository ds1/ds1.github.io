const fs = require('fs');
const path = require('path');

async function convertCMSContent() {
  const cmsDir = path.join(__dirname, '../content/cms');
  const dataDir = path.join(__dirname, '../src/data');
  
  // Read EXISTING data first (from CSV conversion)
  let existingCaseStudies = { caseStudies: [] };
  let existingCaseStudyDetails = { caseStudyDetails: [] };
  
  const caseStudiesPath = path.join(dataDir, 'caseStudies.json');
  const caseStudyDetailsPath = path.join(dataDir, 'caseStudyDetails.json');
  
  // Load existing data if it exists
  if (fs.existsSync(caseStudiesPath)) {
    existingCaseStudies = JSON.parse(fs.readFileSync(caseStudiesPath, 'utf8'));
  }
  if (fs.existsSync(caseStudyDetailsPath)) {
    existingCaseStudyDetails = JSON.parse(fs.readFileSync(caseStudyDetailsPath, 'utf8'));
  }
  
  // Read case studies from CMS format
  const caseStudiesDir = path.join(cmsDir, 'case-studies');
  
  if (fs.existsSync(caseStudiesDir)) {
    const files = fs.readdirSync(caseStudiesDir);
    const cmsCaseStudies = [];
    const cmsCaseStudyDetails = [];
    
    files.forEach(file => {
      if (file.endsWith('.json')) {
        const content = JSON.parse(fs.readFileSync(path.join(caseStudiesDir, file), 'utf8'));
        
        // Add to case studies list
        cmsCaseStudies.push({
          id: content.id,
          title: content.title,
          description: content.description || '',
          thumbnail: content.thumbnail || '',
          thumbnail_type: content.thumbnail_type || 'image'
        });
        
        // Process flexible content blocks
        const sections = [];
        const media = [];
        
        // Add project type if it exists
        if (content.project_type) {
          sections.push({
            type: 'p',
            content: content.project_type,
            key: 'project_type'
          });
        }
        
        // Process flexible content blocks if they exist
        if (content.content_blocks && Array.isArray(content.content_blocks)) {
          content.content_blocks.forEach((block, index) => {
            // Each block has a type and then content within it
            const blockType = block.type || Object.keys(block)[0]; // Get the type
            const blockData = block[blockType] || block; // Get the data
            
            switch(blockType) {
              case 'h1':
                sections.push({
                  type: 'h1',
                  content: blockData.text || blockData.content || '',
                  key: `section_${index}`
                });
                break;
                
              case 'h2':
                sections.push({
                  type: 'h2',
                  content: blockData.text || blockData.content || '',
                  key: `section_${index}`
                });
                break;
                
              case 'h3':
                sections.push({
                  type: 'h3',
                  content: blockData.text || blockData.content || '',
                  key: `section_${index}`
                });
                break;
                
              case 'paragraph':
                sections.push({
                  type: 'p',
                  content: blockData.text || blockData.content || '',
                  key: `section_${index}`
                });
                break;
                
              case 'body':
                sections.push({
                  type: 'body',
                  content: blockData.content || blockData.text || '',
                  key: `section_${index}`
                });
                break;
                
              case 'list':
                sections.push({
                  type: 'list',
                  content: blockData.items || [],
                  key: `section_${index}`
                });
                break;
                
              case 'image':
              case 'video':
              case 'gif':
                media.push({
                  url: blockData.url || '',
                  alt: blockData.alt || '',
                  caption: blockData.caption || '',
                  type: blockType
                });
                break;
                
              case 'code':
                sections.push({
                  type: 'code',
                  content: blockData.code || '',
                  language: blockData.language || 'javascript',
                  key: `section_${index}`
                });
                break;
                
              case 'quote':
                sections.push({
                  type: 'quote',
                  content: blockData.text || '',
                  author: blockData.author || '',
                  key: `section_${index}`
                });
                break;
                
              case 'divider':
                sections.push({
                  type: 'divider',
                  content: '---',
                  key: `section_${index}`
                });
                break;
            }
          });
        } else {
          // Fallback to old format if content_blocks doesn't exist
          // This handles the old predetermined field structure
          
          // Process old-style h1, h2, body fields
          const oldFields = [
            { field: 'initial_vision_h1', type: 'h1', key: 'initial_vision' },
            { field: 'problem_statement_h2', type: 'h2', key: 'problem_statement' },
            { field: 'problem_body', type: 'body', key: 'problem' },
            { field: 'technical_approach_h2', type: 'h2', key: 'technical_approach' },
            { field: 'approach_list', type: 'list', key: 'approach' },
            { field: 'architecture_h2', type: 'h2', key: 'architecture' },
            { field: 'architecture_body', type: 'body', key: 'architecture' },
            { field: 'innovation_details_h2', type: 'h2', key: 'innovation_details' },
            { field: 'innovation_body', type: 'body', key: 'innovation' },
            { field: 'collaboration_h2', type: 'h2', key: 'collaboration' },
            { field: 'collaboration_body', type: 'body', key: 'collaboration' },
            { field: 'business_model_h2', type: 'h2', key: 'business_model' },
            { field: 'business_model_body', type: 'body', key: 'business_model' },
            { field: 'challenges_h2', type: 'h2', key: 'challenges' },
            { field: 'challenges_body', type: 'body', key: 'challenges' },
            { field: 'results_h2', type: 'h2', key: 'results' },
            { field: 'results_list', type: 'list', key: 'results' }
          ];
          
          oldFields.forEach(({ field, type, key }) => {
            if (content[field]) {
              let processedContent = content[field];
              if (type === 'list' && typeof processedContent === 'string') {
                processedContent = processedContent.split(';').map(item => item.trim());
              }
              sections.push({
                type,
                content: processedContent,
                key
              });
            }
          });
          
          // Process old-style media fields
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
        }
        
        // Process tags (works for both old and new format)
        let tags = {};
        
        if (content.tags && typeof content.tags === 'object') {
          // New format - tags are already structured
          tags = {
            designTools: content.tags.design_tools || [],
            aiTools: content.tags.ai_tools || [],
            devTools: content.tags.dev_tools || [],
            skills: content.tags.skills || [],
            roles: content.tags.roles || [],
            artifactTypes: content.tags.artifact_types || [],
            fidelity: content.tags.fidelity || [],
            aiModels: content.tags.ai_models || [],
            designPrinciples: content.tags.design_principles || [],
            usabilityHeuristics: content.tags.usability_heuristics || []
          };
        } else {
          // Old format - tags are semicolon-separated strings
          tags = {
            designTools: content.design_tools?.split(';').map(t => t.trim()).filter(t => t) || [],
            aiTools: content.ai_tools?.split(';').map(t => t.trim()).filter(t => t) || [],
            devTools: content.dev_tools?.split(';').map(t => t.trim()).filter(t => t) || [],
            skills: content.skills?.split(';').map(t => t.trim()).filter(t => t) || [],
            roles: content.roles?.split(';').map(t => t.trim()).filter(t => t) || [],
            artifactTypes: content.artifact_types?.split(';').map(t => t.trim()).filter(t => t) || [],
            fidelity: content.fidelity?.split(';').map(t => t.trim()).filter(t => t) || [],
            aiModels: content.ai_models?.split(';').map(t => t.trim()).filter(t => t) || [],
            designPrinciples: content.design_principles?.split(';').map(t => t.trim()).filter(t => t) || [],
            usabilityHeuristics: content.usability_heuristics?.split(';').map(t => t.trim()).filter(t => t) || []
          };
        }
        
        cmsCaseStudyDetails.push({
          id: content.id,
          title: content.title,
          subtitle: content.subtitle || '',
          thumbnail: content.thumbnail || '',
          duration: content.duration || '',
          role: content.role || '',
          content: sections,
          media: media,
          tags: tags
        });
      }
    });
    
    // MERGE CMS content with existing content
    // Remove duplicates - CMS content takes precedence for matching IDs
    const cmsIds = cmsCaseStudies.map(s => s.id);
    const filteredExisting = existingCaseStudies.caseStudies.filter(s => !cmsIds.includes(s.id));
    const filteredExistingDetails = existingCaseStudyDetails.caseStudyDetails.filter(s => !cmsIds.includes(s.id));
    
    // Combine both sources
    const mergedCaseStudies = [...filteredExisting, ...cmsCaseStudies];
    const mergedCaseStudyDetails = [...filteredExistingDetails, ...cmsCaseStudyDetails];
    
    // Sort by ID for consistent ordering
    mergedCaseStudies.sort((a, b) => (a.id || 0) - (b.id || 0));
    mergedCaseStudyDetails.sort((a, b) => (a.id || 0) - (b.id || 0));
    
    // Write merged data
    fs.writeFileSync(
      path.join(dataDir, 'caseStudies.json'),
      JSON.stringify({ caseStudies: mergedCaseStudies }, null, 2)
    );
    
    fs.writeFileSync(
      path.join(dataDir, 'caseStudyDetails.json'),
      JSON.stringify({ caseStudyDetails: mergedCaseStudyDetails }, null, 2)
    );
    
    console.log('CMS content merged successfully!');
    console.log(`- CSV case studies: ${filteredExisting.length}`);
    console.log(`- CMS case studies: ${cmsCaseStudies.length}`);
    console.log(`- Total case studies: ${mergedCaseStudies.length}`);
  } else {
    console.log('No CMS content found - keeping existing data intact');
  }
  
  // Process other CMS pages (about, resume, contact) if they exist
  const cmsAboutPath = path.join(cmsDir, 'about.json');
  const cmsResumePath = path.join(cmsDir, 'resume.json');
  const cmsContactPath = path.join(cmsDir, 'contact.json');
  
  // Only update these if the CMS files exist
  if (fs.existsSync(cmsAboutPath)) {
    const aboutContent = JSON.parse(fs.readFileSync(cmsAboutPath, 'utf8'));
    fs.writeFileSync(
      path.join(dataDir, 'about.json'),
      JSON.stringify(aboutContent, null, 2)
    );
    console.log('About page updated from CMS');
  }
  
  if (fs.existsSync(cmsResumePath)) {
    const resumeContent = JSON.parse(fs.readFileSync(cmsResumePath, 'utf8'));
    fs.writeFileSync(
      path.join(dataDir, 'resume.json'),
      JSON.stringify(resumeContent, null, 2)
    );
    console.log('Resume page updated from CMS');
  }
  
  if (fs.existsSync(cmsContactPath)) {
    const contactContent = JSON.parse(fs.readFileSync(cmsContactPath, 'utf8'));
    fs.writeFileSync(
      path.join(dataDir, 'contact.json'),
      JSON.stringify(contactContent, null, 2)
    );
    console.log('Contact page updated from CMS');
  }
}

convertCMSContent();