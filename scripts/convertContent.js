const fs = require('fs');
const csv = require('csvtojson');
const path = require('path');

// Helper to determine heading level from column name
const getStyleFromColumnName = (columnName) => {
  if (columnName.endsWith('_h1')) return 'h1';
  if (columnName.endsWith('_h2')) return 'h2';
  if (columnName.endsWith('_h3')) return 'h3';
  if (columnName.endsWith('_list')) return 'list';
  if (columnName.endsWith('_body')) return 'body';
  return 'p'; // default to paragraph
};

// Function to process tags
const processTags = (tagString) => {
  if (!tagString) return [];
  return tagString.split(';').map(tag => tag.trim()).filter(tag => tag);
};

// Helper to structure content based on column naming
const structureContent = (data) => {
  const content = [];
  
  Object.entries(data).forEach(([key, value]) => {
    if (!value || ['id', 'title', 'subtitle', 'thumbnail', 'duration', 'role', 'company'].includes(key)) {
      return; // Skip non-content fields
    }

    // Skip image-related fields as they're handled separately
    if (key.includes('_image_url') || key.includes('_image_alt') || key.includes('_image_caption')) {
      return;
    }

    const style = getStyleFromColumnName(key);
    const cleanKey = key.replace(/_h[123]|_list|_body/g, '');

    content.push({
      type: style,
      content: style === 'list' ? value.split(';').map(item => item.trim()) : value,
      key: cleanKey
    });
  });

  return content;
};

async function convertContent() {
  try {
    // Convert case studies list
    const caseStudies = await csv().fromFile(path.join(__dirname, '../content/caseStudies.csv'));
    const processedCaseStudies = caseStudies.map(study => ({
      id: parseInt(study.id),
      title: study.title,
      description: study.description,
      thumbnail: study.thumbnail
    }));

    // Convert case study details
    const caseStudyDetails = await csv().fromFile(path.join(__dirname, '../content/caseStudyDetails.csv'));
    const processedDetails = caseStudyDetails.map(study => {
      // Extract image data
      const images = [];
      
      // Find all image fields (_image_url pattern)
      Object.entries(study).forEach(([key, value]) => {
        if (key.includes('_image_url')) {
          const baseKey = key.replace('_image_url', '');
          images.push({
            url: value,
            alt: study[`${baseKey}_image_alt`] || '',
            caption: study[`${baseKey}_image_caption`] || ''
          });
        }
      });

      console.log('Processing images for study:', study.title);
      console.log('Found images:', images);

      return {
        id: parseInt(study.id),
        title: study.title,
        subtitle: study.subtitle,
        thumbnail: study.thumbnail,
        duration: study.duration,
        role: study.role,
        content: structureContent(study),
        images: images,
        tags: {
              tools: processTags(study.tools),
              aiTools: processTags(study.ai_tools),
              devTools: processTags(study.dev_tools),
              skills: processTags(study.skills),
              roles: processTags(study.roles),
              artifactTypes: processTags(study.artifact_types),
              fidelity: processTags(study.fidelity),
              aiModels: processTags(study.ai_models),
              designPrinciples: processTags(study.design_principles),
              usabilityHeuristics: processTags(study.usability_heuristics)
            }
      };
    });

    // Convert about page
    const aboutData = await csv().fromFile(path.join(__dirname, '../content/about.csv'));
    const processedAbout = aboutData.map(item => ({
      id: parseInt(item.id),
      headline: item.headline,
      introduction: item.introduction,
      profileImage: item.profileImage,
      facts: item.facts.split(';').map(fact => fact.trim()),
      content: structureContent(item)
    }))[0]; // Take first item since we only have one about page
    
    // Convert resume page
    const resumeData = await csv().fromFile(path.join(__dirname, '../content/resume.csv'));
    const processedResume = {
      ...resumeData[0],
      content: structureContent(resumeData[0])
    };
    
    // Convert contact page
    const contactData = await csv().fromFile(path.join(__dirname, '../content/contact.csv'));
    const processedContact = {
      ...contactData[0],
      content: structureContent(contactData[0])
    };

    // Ensure data directory exists
    const dataDir = path.join(__dirname, '../src/data');
    if (!fs.existsSync(dataDir)){
      fs.mkdirSync(dataDir);
    }

    // Write all JSON files
    fs.writeFileSync(
      path.join(dataDir, 'caseStudies.json'),
      JSON.stringify({ caseStudies: processedCaseStudies }, null, 2)
    );

    fs.writeFileSync(
      path.join(dataDir, 'caseStudyDetails.json'),
      JSON.stringify({ caseStudyDetails: processedDetails }, null, 2)
    );

    fs.writeFileSync(
      path.join(dataDir, 'about.json'),
      JSON.stringify(processedAbout, null, 2)
    );
    
    fs.writeFileSync(
      path.join(dataDir, 'resume.json'),
      JSON.stringify(processedResume, null, 2)
    );
    
    fs.writeFileSync(
      path.join(dataDir, 'contact.json'),
      JSON.stringify(processedContact, null, 2)
    );

    console.log('All content converted successfully!');
    
    // Log the case study details for debugging
    console.log('\nCase Study Details:');
    processedDetails.forEach(study => {
      console.log(`\nStudy: ${study.title}`);
      console.log('Images:', study.images);
    });

  } catch (error) {
    console.error('Error converting content:', error);
    process.exit(1);
  }
}

convertContent();