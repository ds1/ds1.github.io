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
        
        // Process flexible content sections
        const sections = [];
        
        // Add project type if it exists
        if (content.project_type) {
          sections.push({
            type: 'p',
            content: content.project_type,
            key: 'project_type'
          });
        }
        
        // Process flexible content sections
        if (content.content_sections && Array.isArray(content.content_sections)) {
          content.content_sections.forEach((section, index) => {
            if (section.type === 'list' && typeof section.content === 'string') {
              // Handle both markdown lists and semicolon-separated lists
              if (section.content.includes(';')) {
                sections.push({
                  type: 'list',
                  content: section.content.split(';').map(item => item.trim()).filter(item => item),
                  key: `section_${index}`
                });
              } else {
                // Keep markdown lists as-is for RichText component to handle
                sections.push({
                  type: 'list',
                  content: [section.content], // Wrap in array for consistency
                  key: `section_${index}`
                });
              }
            } else {
              sections.push({
                type: section.type || 'body',
                content: section.content || '',
                key: `section_${index}`
              });
            }
          });
        }
        
        // Process media
        const media = content.media || [];
        
        // Process tags
        const tags = {
          designTools: content.design_tools?.split(';').map(t => t.trim()).filter(t => t) || [],
          aiTools: content.ai_tools?.split(';').map(t => t.trim()).filter(t => t) || [],
          devTools: content.dev_tools?.split(';').map(t => t.trim()).filter(t => t) || [],
          skills: content.skills?.split(';').map(t => t.trim()).filter(t => t) || [],
          roles: content.roles?.split(';').map(t => t.trim()).filter(t => t) || [],
          artifactTypes: [],
          fidelity: [],
          aiModels: [],
          designPrinciples: [],
          usabilityHeuristics: []
        };
        
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
  
  if (fs.existsSync(cmsAboutPath)) {
    const aboutContent = JSON.parse(fs.readFileSync(cmsAboutPath, 'utf8'));
    
    // Process flexible content sections if they exist
    if (aboutContent.content_sections) {
      const sections = [];
      aboutContent.content_sections.forEach((section, index) => {
        sections.push({
          type: section.type || 'body',
          content: section.content || '',
          key: `section_${index}`
        });
      });
      aboutContent.content = sections;
    }
    
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