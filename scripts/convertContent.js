const fs = require('fs');
const csv = require('csvtojson');
const path = require('path');

// Helper to determine heading level from column name
const getStyleFromColumnName = (columnName) => {
  if (columnName.endsWith('_h1')) return 'h1';
  if (columnName.endsWith('_h2')) return 'h2';
  if (columnName.endsWith('_h3')) return 'h3';
  if (columnName.endsWith('_list')) return 'list';
  return 'p'; // default to paragraph
};

// Helper to structure content based on column naming
const structureContent = (data) => {
  const content = [];
  
  Object.entries(data).forEach(([key, value]) => {
    if (!value || key.includes('image') || ['id', 'title', 'subtitle', 'thumbnail', 'duration', 'role', 'company'].includes(key)) {
      return; // Skip non-content fields
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
      let i = 1;
      while (study[`image${i}_url`]) {
        images.push({
          src: study[`image${i}_url`],
          alt: study[`image${i}_alt`],
          caption: study[`image${i}_caption`]
        });
        i++;
      }

      return {
        id: parseInt(study.id),
        title: study.title,
        subtitle: study.subtitle,
        thumbnail: study.thumbnail,
        duration: study.duration,
        role: study.role,
        company: study.company,
        content: structureContent(study),
        images
      };
    });

    // Convert about page
    const aboutData = await csv().fromFile(path.join(__dirname, '../content/about.csv'));
    const processedAbout = {
      ...aboutData[0],
      facts: aboutData[0].facts.split(';').map(fact => fact.trim()),
      content: structureContent(aboutData[0])
    };
    
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
  } catch (error) {
    console.error('Error converting content:', error);
    process.exit(1);
  }
}

convertContent();