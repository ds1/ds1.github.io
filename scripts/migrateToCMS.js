const fs = require('fs');
const path = require('path');

// IDs to migrate (4-12)
const CASE_STUDY_IDS_TO_MIGRATE = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

async function migrateToCMS() {
  console.log('Starting migration to CMS...\n');
  
  // Read the existing case study details
  const dataDir = path.join(__dirname, '../src/data');
  const caseStudyDetailsPath = path.join(dataDir, 'caseStudyDetails.json');
  const caseStudiesPath = path.join(dataDir, 'caseStudies.json');
  
  if (!fs.existsSync(caseStudyDetailsPath) || !fs.existsSync(caseStudiesPath)) {
    console.error('Error: Case study data files not found. Run "npm run convert-content" first.');
    return;
  }
  
  const caseStudyDetails = JSON.parse(fs.readFileSync(caseStudyDetailsPath, 'utf8'));
  const caseStudies = JSON.parse(fs.readFileSync(caseStudiesPath, 'utf8'));
  
  // Create CMS directory if it doesn't exist
  const cmsDir = path.join(__dirname, '../content/cms');
  const cmsCaseStudiesDir = path.join(cmsDir, 'case-studies');
  
  if (!fs.existsSync(cmsDir)) {
    fs.mkdirSync(cmsDir, { recursive: true });
  }
  if (!fs.existsSync(cmsCaseStudiesDir)) {
    fs.mkdirSync(cmsCaseStudiesDir, { recursive: true });
  }
  
  let migrated = 0;
  let skipped = 0;
  
  CASE_STUDY_IDS_TO_MIGRATE.forEach(id => {
    const detail = caseStudyDetails.caseStudyDetails.find(d => d.id === id);
    const summary = caseStudies.caseStudies.find(s => s.id === id);
    
    if (!detail || !summary) {
      console.log(`⚠️  Case study ${id} not found - skipping`);
      skipped++;
      return;
    }
    
    // Create CMS-format JSON
    const cmsData = {
      id: detail.id,
      title: detail.title || summary.title,
      description: summary.description || '',
      subtitle: detail.subtitle || '',
      thumbnail: detail.thumbnail || summary.thumbnail || '',
      thumbnail_type: summary.thumbnail_type || 'image',
      duration: detail.duration || '',
      role: detail.role || '',
      project_type: '',
      
      // Main content sections - extract from structured content
      initial_vision_h1: '',
      problem_statement_h2: '',
      problem_body: '',
      technical_approach_h2: '',
      approach_list: '',
      architecture_h2: '',
      architecture_body: '',
      innovation_details_h2: '',
      innovation_body: '',
      collaboration_h2: '',
      collaboration_body: '',
      business_model_h2: '',
      business_model_body: '',
      challenges_h2: '',
      challenges_body: '',
      results_h2: '',
      results_list: ''
    };
    
    // Extract content from structured sections
    if (detail.content && Array.isArray(detail.content)) {
      detail.content.forEach(section => {
        const key = section.key;
        const content = section.content;
        const type = section.type;
        
        // Map content to CMS fields
        if (key === 'project_type' && type === 'p') {
          cmsData.project_type = content;
        } else if (key === 'initial_vision' && type === 'h1') {
          cmsData.initial_vision_h1 = content;
        } else if (key === 'problem_statement' && type === 'h2') {
          cmsData.problem_statement_h2 = content;
        } else if (key === 'problem' && type === 'body') {
          cmsData.problem_body = content;
        } else if (key === 'technical_approach' && type === 'h2') {
          cmsData.technical_approach_h2 = content;
        } else if (key === 'approach' && type === 'list') {
          cmsData.approach_list = Array.isArray(content) ? content.join(';') : content;
        } else if (key === 'architecture' && type === 'h2') {
          cmsData.architecture_h2 = content;
        } else if (key === 'architecture' && type === 'body') {
          cmsData.architecture_body = content;
        } else if (key === 'innovation_details' && type === 'h2') {
          cmsData.innovation_details_h2 = content;
        } else if (key === 'innovation' && type === 'body') {
          cmsData.innovation_body = content;
        } else if (key === 'collaboration' && type === 'h2') {
          cmsData.collaboration_h2 = content;
        } else if (key === 'collaboration' && type === 'body') {
          cmsData.collaboration_body = content;
        } else if (key === 'business_model' && type === 'h2') {
          cmsData.business_model_h2 = content;
        } else if (key === 'business_model' && type === 'body') {
          cmsData.business_model_body = content;
        } else if (key === 'challenges' && type === 'h2') {
          cmsData.challenges_h2 = content;
        } else if (key === 'challenges' && type === 'body') {
          cmsData.challenges_body = content;
        } else if (key === 'results' && type === 'h2') {
          cmsData.results_h2 = content;
        } else if (key === 'results' && type === 'list') {
          cmsData.results_list = Array.isArray(content) ? content.join(';') : content;
        }
      });
    }
    
    // Process media/images
    if (detail.media && Array.isArray(detail.media)) {
      detail.media.forEach((media, index) => {
        if (index === 0) {
          cmsData.process_media_type = media.type || 'image';
          cmsData.process_media_url = media.url || '';
          cmsData.process_media_alt = media.alt || '';
          cmsData.process_media_caption = media.caption || '';
        } else if (index === 1) {
          cmsData.system_media_type = media.type || 'image';
          cmsData.system_media_url = media.url || '';
          cmsData.system_media_alt = media.alt || '';
          cmsData.system_media_caption = media.caption || '';
        } else if (index <= 11) {
          const num = index - 1;
          cmsData[`media${num}_type`] = media.type || 'image';
          cmsData[`media${num}_url`] = media.url || '';
          cmsData[`media${num}_alt`] = media.alt || '';
          cmsData[`media${num}_caption`] = media.caption || '';
        }
      });
    } else if (detail.images && Array.isArray(detail.images)) {
      // Fallback to old images format
      detail.images.forEach((image, index) => {
        if (index === 0) {
          cmsData.process_media_type = 'image';
          cmsData.process_media_url = image.url || '';
          cmsData.process_media_alt = image.alt || '';
          cmsData.process_media_caption = image.caption || '';
        } else if (index === 1) {
          cmsData.system_media_type = 'image';
          cmsData.system_media_url = image.url || '';
          cmsData.system_media_alt = image.alt || '';
          cmsData.system_media_caption = image.caption || '';
        }
      });
    }
    
    // Process tags
    if (detail.tags) {
      cmsData.design_tools = detail.tags.designTools?.join(';') || '';
      cmsData.ai_tools = detail.tags.aiTools?.join(';') || '';
      cmsData.dev_tools = detail.tags.devTools?.join(';') || '';
      cmsData.skills = detail.tags.skills?.join(';') || '';
      cmsData.roles = detail.tags.roles?.join(';') || '';
      cmsData.artifact_types = detail.tags.artifactTypes?.join(';') || '';
      cmsData.fidelity = detail.tags.fidelity?.join(';') || '';
      cmsData.ai_models = detail.tags.aiModels?.join(';') || '';
      cmsData.design_principles = detail.tags.designPrinciples?.join(';') || '';
      cmsData.usability_heuristics = detail.tags.usabilityHeuristics?.join(';') || '';
    }
    
    // Create a slug from the title
    const slug = detail.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    
    // Write to CMS directory
    const filename = `${slug}.json`;
    const filepath = path.join(cmsCaseStudiesDir, filename);
    
    fs.writeFileSync(filepath, JSON.stringify(cmsData, null, 2));
    
    console.log(`✅ Migrated case study ${id}: "${detail.title}" → ${filename}`);
    migrated++;
  });
  
  console.log('\n=================================');
  console.log(`Migration complete!`);
  console.log(`✅ Migrated: ${migrated} case studies`);
  if (skipped > 0) {
    console.log(`⚠️  Skipped: ${skipped} case studies (not found)`);
  }
  console.log('\nNext steps:');
  console.log('1. Commit these new files to git');
  console.log('2. Push to GitHub');
  console.log('3. Access your CMS at /admin to see and edit the migrated case studies');
  console.log('\nFiles created in: content/cms/case-studies/');
}

// Run the migration
migrateToCMS();