# Project Instructions

## Project Purpose
This project is a responsive, accessible React-based portfolio website for me, Dan Schmitz, a user experience designer, that demonstrates his excellence in interaction design, AI integration, and clean aesthetic. This website (Schmitz.ai) showcases Dan Schmitz's professional experience, skills, and projects.

## Role and Engagement between Claude and Dan
Hi, Claude. Your role, as an expert in programming and software development best practices, is to develop clean, readable (well-commented) code for the project. Retain context of the website as a comprehensive whole, ensuring that patterns used for one file should be used across the website where possible and it makes sense to do so.

You do not need to provide summary paragraphs or ask questions at the end of your responses. I want to use the majority of the allowed chat length space for providing updates to the code.

When suggesting code updates, make it very obvious which lines were modified.

Facilitate the process for me to make edits to the text content. Consider creating a light and simple content management system so that I can edit text and image paths in a .csv or spreadsheet file, and then run a script to update the contents of the website files.

Before engaging, review the project file contents added to the Project Knowledge contents so that you maintain your understanding of the project, its files, and considerations for the codebase as well as how you and I interact.

In your first reply of this chat, suggest what to build, based on your comprehensive knowledge of the project and missing pieces.

## Development Environment

- Windows machine
- Powershell
- Sublime Text
- Git
- Node.js
- npm

## Technical Requirements

- Modern React frameworks
- Responsive and accessible design
- SEO best practices
- Static file hosting (GitHub Pages)
- No server-side API calls

# Content Management System

## Content & Image Management Workflow

### Directory Structure

project-root/
├── content/                    # CSV content files
│   ├── caseStudies.csv         # Homepage case study cards
│   └── caseStudyDetails.csv    # Detailed case study content
├── src/
│   ├── images/                 # Source images
│   ├── data/                   # Generated JSON (don't edit directly)
│   └── utils/
│       └── imageImports.js     # Generated image imports (don't edit directly)
└── scripts/
├── convertContent.js       # CSV to JSON converter
├── generateImageImports.js # Image import generator
├── copyImages.js          # Image file manager
└── testImageSystem.js     # System verification

### Working with Content and Images

1. **Initial Setup**
```bash```
// Install required dependency
`npm install csvtojson --save-dev`

# Create necessary directories
`mkdir content`
`mkdir src/images`

2. Adding/Updating Images
 - Place new images in src/images/
 - Image filenames should be kebab-case (e.g., case-study-diagram.jpg)
 - Supported formats: jpg, gif, png

// Copy images from public to src/images
`npm run copy-images`

3. Managing Content
Edit CSV files in the content/ directory using spreadsheet software
Reference images using path format: /images/filename.jpg
CSV Files:

caseStudies.csv: Homepage grid content
caseStudyDetails.csv: Individual case study pages

4. Content Structure

CaseStudies.csv columns:
`id,title,description,thumbnail`

CaseStudyDetails.csv columns:
`id,title,subtitle,thumbnail,duration,role,company,
overview_h1,challenge_h2,challenge_body,
responsibilities_h2,responsibilities_list,
impact_h2,impact_list,
image1_url,image1_alt,image1_caption,
image2_url,image2_alt,image2_caption`

5. Testing Changes
// Verify directory structure and image references
`npm run test-images`

This checks:

 - Required directories exist
 - CSV files are present
 - Image references are valid
 - Images exist in correct location

6. Converting Content

// Convert CSVs to JSON and generate image imports
`npm run convert-content`

This:

 - Runs image system test
 - Converts CSV to JSON
 - Generates image import mappings
 - Creates required directories if missing

7. Troubleshooting

 - Check console output for warnings/errors
 - Verify image paths in CSV match filenames exactly (case-sensitive)
 - Ensure images exist in src/images/
 - Use forward slashes (/) in paths
 - Run `npm run test-images` to identify issues

## Common Tasks

1. Adding a New Case Study

 - Add row to `caseStudies.csv` for homepage card
 - Add row to `caseStudyDetails.csv` for detail page
 - Add images to `src/images/`
 - Run conversion process
`npm run copy-images`
`npm run convert-content`

2. Updating Images

 - Place new images in `src/images/`
 - Update image references in CSV files
 - Run conversion process
`npm run convert-content`

3. Modifying Content

 - Edit CSV files directly or with spreadsheet software
 - Run conversion without copying images
`npm run convert-content`

## Important Notes

Never edit JSON files in src/data/ directly
Never edit imageImports.js directly
Always use forward slashes in image paths
Keep image references consistent between CSVs
Run tests before committing changes
Backup CSV files before major changes

## Script Descriptions

convertContent.js: Transforms CSV files into JSON for React components
generateImageImports.js: Creates image import mappings for components
copyImages.js: Manages image file locations
testImageSystem.js: Verifies system integrity

## Best Practices

1. Image Management

 - Use descriptive filenames
 - Maintain consistent naming conventions
 - Optimize images for web before adding
 - Verify images in test environment

2. Content Updates

 - Keep CSV backups
 - Test after major changes
 - Verify all image references
 - Maintain consistent formatting

3. Version Control

 - Commit both CSV and generated files
 - Include clear commit messages
 - Regular backups of content directory


















## CSV File Specifications

1. `caseStudies.csv` (Homepage Cards)

`id,title,description,thumbnail`
`1,"Project Title","Brief description","/images/thumbnail.jpg"`

2. `caseStudyDetails.csv` (Detailed Pages)

`id,title,subtitle,thumbnail,duration,role,company,overview_h1,challenge_h2,challenge_body,responsibilities_h2,responsibilities_list,impact_h2,impact_list,image1_url,image1_alt,image1_caption,image2_url,image2_alt,image2_caption`

3. `about.csv`

`headline,introduction,profileImage,facts,content_h1,overview_body,journey_h2,journey_body,focus_h2,focus_body`

4. `resume.csv`

```title,introduction,downloadLink,content```

5. `contact.csv`

`title,introduction,email,linkedin,message`

## Content Formatting Rules

### 1. Lists:
Separate items with semicolons.

`facts,"Item 1;Item 2;Item 3"`

### 2. Rich-Text Column Suffixes:

- `_h1`: Heading 1
- `_h2`: Heading 2
- `_h3`: Heading 3
- `_list`: Bulleted list
- `_body`: Paragraph text

### 3. Multiple Images:
Use numbered suffixes.

`image1_url,image1_alt,image1_caption,image2_url,image2_alt,image2_caption`

## Content Conversion Process

1. Install converter dependency:

`npm install csvtojson --save-dev`

2. Add to package.json:

`{
  "scripts": {
    "convert-content": "node scripts/convertContent.js"
  }
}`

3. Run conversion:

`npm run convert-content`

## Rich Text System

### Component Implementation

The `RichText` component (`src/components/RichText.js`) handles conversion of structured content into styled HTML elements:
```jsx
import React from 'react';
import styled from 'styled-components';

// Styled components for each text element
const Heading1 = styled.h1`...`;
const Heading2 = styled.h2`...`;
const Heading3 = styled.h3`...`;
const Paragraph = styled.p`...`;
const List = styled.ul`...`;
const ListItem = styled.li`...`;

const RichText = ({ content }) => {
  return (
    <>
      {content.map((block, index) => {
        switch (block.type) {
          case 'h1': return <Heading1 key={index}>{block.content}</Heading1>;
          case 'h2': return <Heading2 key={index}>{block.content}</Heading2>;
          case 'h3': return <Heading3 key={index}>{block.content}</Heading3>;
          case 'list': return (
            <List key={index}>
              {block.content.map((item, i) => (
                <ListItem key={i}>{item}</ListItem>
              ))}
            </List>
          );
          default: return <Paragraph key={index}>{block.content}</Paragraph>;
        }
      })}
    </>
  );
};
```

### Usage in Components
```jsx
import RichText from '../components/RichText';
import contentData from '../data/content.json';

const MyComponent = () => (
  <RichText content={contentData.content} />
);
```

## Development Workflow

1. Content Updates:

 - Edit CSV files in spreadsheet software
 - Run conversion script
 - Test changes locally
 - Commit both CSV and JSON files

2. Code Updates:

 - Modify React components
 - Update styling in theme.js
 - Test responsiveness
 - Verify accessibility

3. Deployment:

`git add .`
`git commit -m "message"`
`git push origin main`
`npm run build`
`npm run deploy`


## Troubleshooting

1. Content Conversion Issues:
 - Verify CSV formatting
 - Check for special characters
 - Validate semicolon usage
 - Confirm column names


2. Styling Issues:
 - Check theme variables
 - Verify styled-components
 - Test responsive breakpoints


3. Build Issues:
 - Clear npm cache
 - Rebuild node_modules
 - Verify script permissions

 