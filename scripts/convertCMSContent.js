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
          description: content.description,
          thumbnail: content.thumbnail,
          thumbnail_type: content.thumbnail_type || 'image'
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
        
        // Add project type if exists
        if (content.project_type) {
          sections.push({
            type: 'p',
            content: content.project_type,
            key: 'project_type'
          });
        }
        
        // Process h1, h2, body fields
        const fieldOrder = [
          'initial_vision_h1',
          'problem_statement_h2',
          'problem_body',
          'technical_approach_h2',
          'approach_list',
          'architecture_h2',
          'architecture_body',
          'innovation_details_h2',
          'innovation_body',
          'collaboration_h2',
          'collaboration_body',
          'business_model_h2',
          'business_model_body',
          'challenges_h2',
          'challenges_body',
          'results_h2',
          'results_list'
        ];
        
        fieldOrder.forEach(fieldName => {
          if (content[fieldName]) {
            let type = 'p';
            let processedContent = content[fieldName];
            
            if (fieldName.endsWith('_h1')) type = 'h1';
            else if (fieldName.endsWith('_h2')) type = 'h2';
            else if (fieldName.endsWith('_body')) type = 'body';
            else if (fieldName.endsWith('_list')) {
              type = 'list';
              processedContent = content[fieldName].split(';').map(item => item.trim());
            }
            
            sections.push({
              type,
              content: processedContent,
              key: fieldName.replace(/_h[12]|_body|_list/, '')
            });
          }
        });
        
        // Process tags
        const tags = {
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
        
        cmsCaseStudyDetails.push({
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