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
```txt
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
```
## Content Management System

### CSV Structure

1. Case Studies (content/caseStudies.csv)

```csv
id,title,description,thumbnail
1,"Project Title","Description here","/images/thumbnail.jpg"
```

2. Case Study Details (content/caseStudyDetails.csv)

```csv
id,title,subtitle,thumbnail,duration,role,project_type,initial_vision_h1,problem_statement_h2,problem_body,technical_approach_h2,approach_list,architecture_h2,architecture_body,innovation_details_h2,innovation_body,collaboration_h2,collaboration_body,results_h2,results_list,process_image_url,process_image_alt,process_image_caption,system_image_url,system_image_alt,system_image_caption
1,AI Co-Development,Building schmitz.ai with Claude,/images/ai-collab-thumbnail.jpg,October 2024,UX Designer & AI Prompt Engineer,Personal Project,Redefining Portfolio Development Through AI Collaboration,The Development Challenge,"Traditional portfolio development often involves a trade-off: either invest in a complex CMS backend or sacrifice content maintainability for static hosting. I wondered: **Could AI assistance create a better approach?** \n\nWorking with Claude, we aimed to develop a system that would combine the flexibility of a CMS with the simplicity of static hosting, while documenting the entire process to showcase AI's potential in real-world development.",Collaborative Solution Design,Initial problem exploration and solution ideation with Claude;Development of CSV-based content management concept;Iterative refinement of image handling system;Creation of rich text formatting capabilities;Documentation of development process for future reference,System Architecture,"Our collaboration produced a **three-tier architecture** that elegantly solves the CMS challenge:\n\n1. *Content Management*\n<span class="text-primary">• Spreadsheet-based editing\n• Rich text formatting\n• Image integration\n• Content validation</span>\n\n2. *Processing Engine*\n<span class="text-secondary">• Automated conversion\n• Path resolution\n• Error handling\n• Build optimization</span>\n\n3. *Presentation Layer*\n<span class="text-success">• React components\n• Dynamic rendering\n• Error recovery\n• Performance monitoring</span>",Technical Innovations,"Through our collaboration, we developed several key innovations:\n\n**1. Intelligent Content Management**\n• CSV-based content editing with rich text support\n• *Format:* Markdown-style syntax with HTML enhancement\n• *Benefit:* Easy updates without technical knowledge\n\n**2. Advanced Image Handling**\n• Automatic path resolution across environments\n• *Process:* CSV → Development → Production paths\n• *Result:* Zero manual path management\n\n**3. Error-Resistant Build System**\n• Comprehensive error checking\n• Clear debugging messages\n• Fallback handling for missing assets",AI-Human Pair Programming,"Our development process revealed the power of human-AI collaboration:\n\n1. **Problem Solving**\n<span class="text-primary">Human: Strategic thinking and real-world requirements\nAI: Pattern recognition and solution generation</span>\n\n2. **Code Development**\n<span class="text-secondary">Human: Architecture decisions and edge cases\nAI: Implementation details and error handling</span>\n\n3. **System Refinement**\n<span class="text-success">Human: User experience and testing\nAI: Optimization and documentation</span>\n\nThis partnership created solutions neither could have developed alone.",Project Impact,"Created a maintainable, static portfolio site with CMS capabilities;Reduced content update time from hours to minutes;Eliminated common development pain points around image management;Achieved perfect Lighthouse scores for performance and accessibility;Demonstrated effective human-AI collaboration in real-world development;Established reusable patterns for future AI-assisted projects",/images/collaboration-flow.jpg,AI-Human collaboration diagram,Visualization of the iterative development process between human and AI,/images/system-architecture.jpg,System architecture diagram,Three-tier architecture showing the complete system flow
```


## Field Types and Formatting

1. Field Type Identification:

- Field types are determined by suffix patterns in column names
- Regular fields (no suffix): Standard text fields (e.g., `title`, `subtitle`)
- Rich text fields (with suffix):
  - `_h1`: First-level headings
  - `_h2`: Second-level headings
  - `_h3`: Third-level headings
  - `_body`: Body text with rich formatting support
  - `_list`: Semicolon-separated lists
- Image fields (with suffix):
  - `_image_url`: Image path
  - `_image_alt`: Image alt text
  - `_image_caption`: Image caption

2. Rich Text Formatting Support:

- Bold: Wrap text in double asterisks `**bold text**`
- Italic: Wrap text in single asterisks `*italic text*`
- Bold & Italic: Wrap text in triple asterisks `***bold italic text***`
- Line Breaks: Use `\n` for single line break
- Double Line Breaks: Use `\n\n` for paragraph breaks
```csv
field_body,"First paragraph text.\n\nSecond paragraph text.\nThis is on a new line but same paragraph."
```

3. List Formatting:

3.1 Fields ending in `_list`:
  - Use semicolons to separate items
  - Do not use bullet points or numbers
```csv
results_list,"Created a maintainable portfolio;Reduced content update time;Eliminated common pain points"
```
3.2 Fields ending in `_body`:
- Can use bullet points with any of these symbols: `•`, `-`, or `*`
- Can use numbered lists (1., 2., etc.)
- Can include nested lists with indentation
- Uses `\\n` for line breaks
```csv
field_body,"1. First Point\\n• Sub point one\\n• Sub point two\\n2. Second Point"
```
```csv
field_body,"• First bullet\\n• Second bullet\\n   - Sub bullet\\n   - Another sub bullet"
```
- Example content for a `_list` field:
```csv
approach_list,"Initial problem exploration and solution ideation with Claude;Development of CSV-based content management concept;Iterative refinement of image handling system"
```
- Example content for a `_body` field with formatted lists:
```csv
architecture_body,"Our architecture has three parts:\\n\\n1. *Content Management*\\n<span class=\"text-primary\">• Spreadsheet-based editing\\n• Rich text formatting\\n• Image integration</span>\\n\\n2. *Processing Engine*\\n<span class=\"text-secondary\">• Automated conversion\\n• Path resolution</span>"
```
This distinction is important because:

- `_list` fields are processed by `convertContent.js` to generate arrays of items.
- `_body` fields are processed by `RichText.js` to render formatted content including various list styles.

4. Image References:

- Use `/images/` prefix in CSV
- Case-insensitive matching with files in `src/images/`
- Automatic path resolution during build
- Example:
```csv
thumbnail,"/images/example-image.jpg"
```

## Text Formatting System

1. Colors

1.1 Theme Colors (matching theme.js):
```javascript
// These are the theme colors we can use in our content
primary: '#61dafb',     // Light blue
secondary: '#8be9fd',   // Lighter blue
background: '#282c34',  // Dark gray/blue
surface: '#3b3e47',     // Medium gray
text: '#ffffff',        // White
textSecondary: '#b3b3b3' // Light gray
```

1.2 Color Classes:
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

2. Color Span Usage (in `_body` fields):

- Architecture Tiers Example:
```csv
field_body,"1. *Content Management*\\n<span class="text-primary">• Spreadsheet-based editing\\n• Rich text formatting\\n• Image integration\\n• Content validation</span>\\n\\n2. *Processing Engine*\\n<span class="text-secondary">• Automated conversion\\n• Path resolution\\n• Error handling\\n• Build optimization</span>"
```
- Role Definition Example:
```csv
field_body,"1. **Problem Solving**\\n<span class="text-primary">Human: Strategic thinking and real-world requirements\\nAI: Pattern recognition and solution generation</span>"
```

3. Color Span Formatting Rules:
- Use `\\n` for new lines within spans
- Each line in a span must start on a new line
- Can contain bullet points (`•`, `-`, `*`)
- Can contain role definitions with colons
- Can combine with other formatting (bold, italic)
- Avoid nesting color spans

4. Processing Notes:

- `_list` fields are processed by `convertContent.js` to generate arrays
- `_body` fields are processed by `RichText.js` for formatted content
- All formatting is processed during build
- Inline styles are preserved in lists
- Color spans can wrap multiple lines
- Lists are automatically detected and formatted
- Special characters are preserved

5. RichText.js implementation:

```javascript
// src/components/RichText.js
const StyledText = styled.span`
  &.text-primary { color: ${({ theme }) => theme.colors.primary}; }
  &.text-secondary { color: ${({ theme }) => theme.colors.secondary}; }
  &.text-success { color: #4ade80; }
  &.text-warning { color: #fbbf24; }
  &.text-error { color: #ef4444; }
`;

const processInlineFormatting = (text) => {
  if (!text || typeof text !== 'string') {
    return '';
  }

  // First handle multi-line spans - match spans that contain line breaks
  let processed = text.replace(
    /<span class="(.*?)">([\s\S]*?)<\/span>/g,
    (match, className, content) => {
      // Process the content inside the span
      const lines = content.split('\n')
        .map(line => line.trim())
        .filter(line => line)
        .map(line => `<styled class="${className}">${line}</styled>`)
        .join('\n');
      return lines;
    }
  );

  // Now handle any remaining inline formatting
  processed = processed.replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>');
  processed = processed.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  processed = processed.replace(/\*(.*?)\*/g, '<em>$1</em>');

  return processed;
};
```

6. Examples with Combined Features:

```csv
architecture_body,"Our collaboration produced a **three-tier architecture** that elegantly solves the CMS challenge:\n\n1. *Content Management*\n<span class="text-primary">• Spreadsheet-based editing\n• Rich text formatting\n• Image integration\n• Content validation</span>\n\n2. *Processing Engine*\n<span class="text-secondary">• Automated conversion\n• Path resolution\n• Error handling\n• Build optimization</span>\n\n3. *Presentation Layer*\n<span class="text-success">• React components\n• Dynamic rendering\n• Error recovery\n• Performance monitoring</span>"
```
This content demonstrates:

- Bold text with `**three-tier architecture**`
- Italic text with `*Content Management*`
- Numbered lists with `1.`, `2.`, `3`.
- Bullet points within color spans
- Three different color spans (`text-primary`, `text-secondary`, `text-success`)
- Proper use of line breaks with `\n` and `\n\n`

Another example showing role-based formatting:
```csv
collaboration_body,"Our development process revealed the power of human-AI collaboration:\n\n1. **Problem Solving**\n<span class="text-primary">Human: Strategic thinking and real-world requirements\nAI: Pattern recognition and solution generation</span>\n\n2. **Code Development**\n<span class="text-secondary">Human: Architecture decisions and edge cases\nAI: Implementation details and error handling</span>\n\n3. **System Refinement**\n<span class="text-success">Human: User experience and testing\nAI: Optimization and documentation</span>\n\nThis partnership created solutions neither could have developed alone."
```
This shows:

- Section headers in bold
- Color-coded role descriptions
- Proper paragraph spacing
- Consistent formatting across similar content types

7. Best Practices:

- Use consistent formatting within each content type
- Avoid nested color spans
- Prefer semantic color classes (e.g., `success`, `warning`) over decorative ones
- Keep lists at consistent indentation levels
- Use appropriate heading levels (`h1`, `h2`, `h3`)
- Include alt text for all images
- Test complex formatting in preview before publishing

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

`npm run convert-content`  # Converts CSVs to JSON
`npm run build`           # Builds for production
`npm run deploy`          # Deploys to GitHub Pages

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

==================================
## Claude Project Knowledge Prompt

### schmitzai
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

Case Studies (homepage)
A list of Case Studies that comprise a Title, Description, Thumbnail image (PNG, GIF). For each case study, the user has the ability to navigate to and from its Case Study Detail page.

Case Study Detail
A page that presents the content of the case study.

Resume
A page that lets visitors view and download a PDF of Dan's resume.

About - A page that highlights Dan's personality and summary informally.
Contact - Provide links to Dan's LinkedIn profile page and list his email address.

### Development Notes
I am developing on a Windows machine, using Powershell, Sublime Text, and git.

It should use modern frameworks including React. It should allow me to easily edit and replace all text and graphics. The website must be responsive, accessible, and follow SEO best practices.

Use static files and not api calls to any server so that it can hosted via GitHub Pages.

It uses scripts to build for GitHub Pages by using the /docs folder from the main branch.

We've built a light and simple content management system so that I can edit text and image paths in a .csv or spreadsheet file, and then run a script (`npm run convert-contact`) to update the contents of the website files.

==================================
