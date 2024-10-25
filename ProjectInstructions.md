# Project Instructions

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

## Directory Structure
project-root/
├── content/                      # CSV content files
│   ├── about.csv                 # About page content
│   ├── caseStudies.csv           # Homepage case study cards
│   ├── caseStudyDetails.csv      # Individual case study content
│   ├── contact.csv               # Contact page content
│   └── resume.csv                # Resume page content
├── docs/                         # GitHub Pages deployment folder
├── scripts/
│   ├── convertContent.js         # CSV to JSON converter
│   ├── generateImageImports.js   # Image import generator
│   └── postbuild.js              # Build process script
└── src/
│   └── components/               # Reusable React components
│   └── data/                     # Generated JSON files
│   └── images/                   # Image assets
│   └── pages/                    # Page components
│   └── styles/                   # Global styling
│   └── utils/                    # Utility functions

## Content Management System

### CSV Structure

1. Case Studies (content/caseStudies.csv)

```csv
id,title,description,thumbnail
1,"Project Title","Description here","/images/thumbnail.jpg"
```

2. Case Study Details (content/caseStudyDetails.csv)

```csv
id,title,subtitle,thumbnail,duration,role,company,overview_h1,challenge_h2,challenge_body,responsibilities_h2,responsibilities_list,impact_h2,impact_list,image1_url,image1_alt,image1_caption,image2_url,image2_alt,image2_caption
```

## Field Types and Formatting

1. Basic Field Types:

- Regular text: Standard fields without suffixes
- Rich text: Fields ending in `_h1`, `_h2`, `_h3`, `_body`
- Lists: Fields ending in `_list` (semicolon-separated)
- Images: Fields ending in `_url`

2. Text Formatting in CSV:
```csv
field_body,"This is regular text with some *italic words* and some **bold words** and some ***bold italic words***"
```

3. Special Formatting:
- Bold: Wrap text in double asterisks **bold text**
- Italic: Wrap text in single asterisks *italic text*
- Bold & Italic: Wrap text in triple asterisks ***bold italic text***
- Line Break: Use \n for a new line
- Color: Use HTML span tags <span class="text-blue-500">blue text</span>

4. List Types:

- Bullet List: Use field suffix `_list` with semicolon separators
```csv
achievements_list,"First achievement;Second achievement;Third achievement"
```

- Numbered List: Use field suffix `_numbered_list` with semicolon separators
```csv
steps_numbered_list,"First step;Second step;Third step"
```

## Text Formatting System

1. Theme Colors (matching theme.js):
```javascript
// These are the theme colors we can use in our content
primary: '#61dafb',     // Light blue
secondary: '#8be9fd',   // Lighter blue
background: '#282c34',  // Dark gray/blue
surface: '#3b3e47',     // Medium gray
text: '#ffffff',        // White
textSecondary: '#b3b3b3' // Light gray
```

2. Available Color Classes:
```csv
Format,Example,Usage in CSV,Rendered Appearance
Primary Blue,Link color,<span class="text-primary">highlighted text</span>,Light blue text (#61dafb)
Secondary Blue,Hover state,<span class="text-secondary">highlighted text</span>,Lighter blue text (#8be9fd)
White,Main text,<span class="text-white">highlighted text</span>,White text (#ffffff)
Light Gray,Secondary text,<span class="text-secondary-text">highlighted text</span>,Gray text (#b3b3b3)
Success,Positive results,<span class="text-success">increased by 50%</span>,Green text (#4ade80)
Warning,Important notes,<span class="text-warning">deadline approaching</span>,Yellow text (#fbbf24)
Error,Critical info,<span class="text-error">discontinued</span>,Red text (#ef4444)
```

3. Text Formatting Examples:

A. Basic Formatting:
```csv
field_body,"Regular text
**Bold text**
*Italic text*
***Bold italic text***
<span class="text-primary">Primary colored text</span>
<span class="text-secondary">Secondary colored text</span>"
```

B. Combined Formatting:
```csv
overview_body,"**<span class="text-primary">Bold Blue Heading</span>**\n\n*Key Achievement:* <span class="text-success">Increased efficiency by 200%</span>\n\n***<span class="text-warning">Critical Update:</span>*** Project timeline adjusted"
```

4. Component Rendering Example:
```javascript
// src/components/RichText.js
const StyledText = styled.span`
  &.text-primary { color: ${({ theme }) => theme.colors.primary}; }
  &.text-secondary { color: ${({ theme }) => theme.colors.secondary}; }
  &.text-white { color: ${({ theme }) => theme.colors.text}; }
  &.text-secondary-text { color: ${({ theme }) => theme.colors.textSecondary}; }
  &.text-success { color: #4ade80; }
  &.text-warning { color: #fbbf24; }
  &.text-error { color: #ef4444; }
`;

const formatText = (text) => {
  return text
    // Bold & Italic
    .replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>')
    // Bold
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // Preserve color spans
    .replace(/<span class="(.*?)">(.*?)<\/span>/g, 
      (match, className, content) => 
        `<StyledText className="${className}">${content}</StyledText>`
    );
};
```

5. Complex Example with All Features:
```csv
case_study_body,"**<span class="text-primary">Project Overview</span>**\n\n
*Client:* **Acme Corporation**\n\n
***Key Objectives:***\n
1. Improve system efficiency
2. Reduce operational costs
3. Enhance user experience\n\n

*Results Achieved:*\n
- <span class="text-success">Efficiency increased by 150%</span>
- <span class="text-primary">Costs reduced by 50%</span>
- <span class="text-warning">User satisfaction at 98%</span>\n\n

***<span class="text-secondary">Technical Implementation</span>***\n
The project utilized several cutting-edge technologies:\n
- **Frontend:** React, TypeScript
- **Backend:** Node.js, GraphQL
- **Infrastructure:** AWS, Docker\n\n

<span class="text-error">Note:</span> *This case study contains confidential information.*"
```

This would render as:

- "Project Overview" in bold and light blue
- Structured content with mixed formatting
- Clear hierarchy with headings
- Highlighted statistics in appropriate colors
- Professional color scheme matching the site's theme

## Image Management

1. Image Path Structure:

CSV References: Use /images/ prefix
Storage: Place files in src/images/
Build: Webpack processes to /static/media/

2. Example Paths:

CSV: /images/example.jpg
Storage: src/images/example.jpg
Built: /static/media/example.[hash].jpg

3. Image Handling Best Practices:

Use lowercase filenames with hyphens
Place all images in src/images
Include meaningful alt text
Optimize images before adding
Use appropriate formats (jpg, png, gif)

## Content Workflow

1. Edit Content:

Modify CSV files in content/ directory
Add images to src/images/
Run conversion process

2. Build Process:

`npm run convert-content`     # Converts CSVs to JSON
`npm run build`               # Builds for production
`npm run deploy`              # Deploys to GitHub Pages

3. File Updates:

Content changes: Edit CSV files
Image updates: Replace in src/images
Style changes: Modify theme.js

## Development Workflow

1. Setup:
`npm install`              # Install dependencies

2. Development:
`npm start`               # Start development server

3. Content Updates:
`npm run convert-content` # After CSV changes

4. Deployment:
`git add .`
`git commit -m "message"`
`git push origin main`
`npm run build`
`npm run deploy`

## Component Structure

1. Page Components:

Import data from generated JSON
Use imageMap for image paths
Include error handling
Follow accessibility guidelines


2. Example Component:

```javascript
import data from '../data/example.json';
import { imageMap } from '../utils/imageImports';

const getImage = (path) => {
  if (!path) return null;
  const srcPath = path.replace('/images/', '/src/images/');
  return imageMap[srcPath];
};

const ExampleComponent = () => {
  return (
    <img 
      src={getImage(imagePath)} 
      alt={alt}
      onError={(e) => {
        console.warn(`Failed to load: ${imagePath}`);
        e.target.style.display = 'none';
      }}
    />
  );
};
```

## Error Handling

1. Image Loading:

Validate paths during build
Handle missing images gracefully
Log meaningful warnings
Provide fallback display

2. Content Validation:

Check required fields
Validate data types
Handle missing content
Preserve layout integrity

## Best Practices

1. Content Management:

Keep CSV backups
Test after major changes
Maintain consistent formatting
Document content structure

2. Development:

Use semantic HTML
Follow accessibility guidelines
Test responsive layouts
Comment complex logic

3. Version Control:

Commit both CSV and generated files
Use clear commit messages
Regular backups
Document changes

## Troubleshooting

1. Image Issues:

Verify file exists in src/images
Check path in CSV matches exactly
Confirm image format is supported
Check console for specific errors

2. Content Issues:

Validate CSV formatting
Check for special characters
Verify semicolon usage in lists
Confirm column names match expected

3. Build Issues:

Clear npm cache
Rebuild node_modules
Verify script permissions
Check build logs
==========================================================
# Claude Project Knowledge Prompt

#### schmitzai
Repo for custom content on schmitz.ai

This project is a responsive, accessible React-based portfolio website for me, Dan Schmitz, a user experience designer, that demonstrates his excellence in interaction design, AI integration, and clean aesthetic. 

### Project Overview 
This website (Schmitz.ai) showcases Dan Schmitz's professional experience, skills, and projects.

Hi, Claude. Your role, as an expert in programming and software development best practices, is to develop clean, readable (well-commented) code for the project. Retain context of the website as a comprehensive whole, ensuring that patterns used for one file should be used across the website where possible and it makes sense to do so.

### Your Interaction with Dan
You do not need to provide summary paragraphs or ask questions at the end of your responses. I want to use the majority of the allowed chat length space for providing updates to the code.

When suggesting code updates, make it very obvious which lines were modified (i.e., adding a comment 'change this line'.

Facilitate the process for me to make edits to the text content.

Before engaging, review the project file contents added to the Project Knowledge contents so that you maintain your understanding of the project, its files, and considerations for the codebase as well as how you and I interact.

ProjectInstructions.md is an important file to be aware of for project context.

In your first reply of this chat, suggest what to build or where in the process to continue working, based on your comprehensive knowledge of the project and missing pieces.

### Website Sections 
Global navigation: Case Studies, Resume, About, Contact

#### Case Studies (homepage) 
A list of Case Studies that comprise a Title, Description, Thumbnail image (PNG, GIF). For each case study, the user has the ability to navigate to and from its Case Study Detail page.

#### Case Study Detail 
A page that presents the content of the case study.

#### Resume
A page that lets visitors view and download a PDF of Dan's resume.

#### About - A page that highlights Dan's personality and summary informally.

#### Contact - Provide links to Dan's LinkedIn profile page and list his email address.

#### Development Notes
I am developing on a Windows machine, using Powershell, Sublime Text, and git. 

It should use modern frameworks including React. It should allow me to easily edit and replace all text and graphics. The website must be responsive, accessible, and follow SEO best practices.

Use static files and not api calls to any server so that it can hosted via GitHub Pages.

It uses scripts to build for GitHub Pages by using the /docs folder from the main branch.

We've built a light and simple content management system so that I can edit text and image paths in a .csv or spreadsheet file, and then run a script (npm run convert-contact) to update the contents of the website files.
==========================================================
