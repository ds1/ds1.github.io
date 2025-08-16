const fs = require('fs');
const path = require('path');

function migrateToFlexibleContent() {
  const cmsDir = path.join(__dirname, '../content/cms/case-studies');
  
  if (!fs.existsSync(cmsDir)) {
    console.log('No CMS case studies to migrate');
    return;
  }
  
  const files = fs.readdirSync(cmsDir);
  
  files.forEach(file => {
    if (file.endsWith('.json')) {
      const filepath = path.join(cmsDir, file);
      const content = JSON.parse(fs.readFileSync(filepath, 'utf8'));
      
      // Check if already migrated
      if (content.content_sections) {
        console.log(`✓ ${file} already uses flexible content`);
        return;
      }
      
      // Convert old format to flexible content sections
      const sections = [];
      
      // Map old fields to new flexible sections
      const fieldMappings = [
        { old: 'initial_vision_h1', type: 'h1' },
        { old: 'problem_statement_h2', type: 'h2' },
        { old: 'problem_body', type: 'body' },
        { old: 'technical_approach_h2', type: 'h2' },
        { old: 'approach_list', type: 'list' },
        { old: 'architecture_h2', type: 'h2' },
        { old: 'architecture_body', type: 'body' },
        { old: 'innovation_details_h2', type: 'h2' },
        { old: 'innovation_body', type: 'body' },
        { old: 'collaboration_h2', type: 'h2' },
        { old: 'collaboration_body', type: 'body' },
        { old: 'business_model_h2', type: 'h2' },
        { old: 'business_model_body', type: 'body' },
        { old: 'challenges_h2', type: 'h2' },
        { old: 'challenges_body', type: 'body' },
        { old: 'results_h2', type: 'h2' },
        { old: 'results_list', type: 'list' }
      ];
      
      fieldMappings.forEach(mapping => {
        if (content[mapping.old]) {
          sections.push({
            type: mapping.type,
            content: content[mapping.old]
          });
          // Remove old field
          delete content[mapping.old];
        }
      });
      
      // Add the new flexible content sections
      content.content_sections = sections;
      
      // Process media fields
      const media = [];
      
      // Look for old media fields
      ['process', 'system'].forEach(prefix => {
        if (content[`${prefix}_image_url`] || content[`${prefix}_media_url`]) {
          media.push({
            type: content[`${prefix}_media_type`] || 'image',
            url: content[`${prefix}_image_url`] || content[`${prefix}_media_url`],
            alt: content[`${prefix}_image_alt`] || content[`${prefix}_media_alt`] || '',
            caption: content[`${prefix}_image_caption`] || content[`${prefix}_media_caption`] || ''
          });
          
          // Clean up old fields
          delete content[`${prefix}_image_url`];
          delete content[`${prefix}_media_url`];
          delete content[`${prefix}_image_alt`];
          delete content[`${prefix}_media_alt`];
          delete content[`${prefix}_image_caption`];
          delete content[`${prefix}_media_caption`];
          delete content[`${prefix}_media_type`];
        }
      });
      
      if (media.length > 0) {
        content.media = media;
      }
      
      // Write back the migrated content
      fs.writeFileSync(filepath, JSON.stringify(content, null, 2));
      console.log(`✅ Migrated ${file} to flexible content format`);
    }
  });
  
  console.log('\nMigration complete!');
}

// Run the migration
migrateToFlexibleContent();