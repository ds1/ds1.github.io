# schmitzai
Repo for custom content on schmitz.ai

## Project Overview
This website (Schmitz.ai) showcases Dan Schmitz's professional experience, skills, and projects. It's a responsive, accessible React-based portfolio website that demonstrates excellence in interaction design, AI integration, and clean aesthetic.

## Content Management System
The website uses a CSV-based content management system that enables easy content updates without modifying code:

- Content is managed through CSV files that can be edited with spreadsheet software
- A conversion script transforms CSV files into JSON for the React components
- Rich text formatting is handled through column naming conventions
- Images and lists are managed through structured CSV columns

### Quick Start

1. Install dependencies:

`bash`
`npm install`

2. Edit content in the CSV files:

content/
  ├── about.csv          # About page content
  ├── caseStudies.csv    # Homepage case study cards
  ├── caseStudyDetails.csv # Detailed case study pages
  ├── contact.csv        # Contact page content
  └── resume.csv         # Resume page content

3. Convert content to JSON:

`npm run convert-content`

4. Start development server:

`npm start`

5. Build and deploy

`npm run build`
`npm run deploy`

## Technologies Used

- React
- React Router
- Styled Components
- CSV to JSON conversion
- GitHub Pages deployment

## Dev and Deploy Steps

`git add .`
`git commit -m "message"`
`git push origin main`
`npm run build  # includes predeploy scripts`
`npm run deploy`

## Project Structure

project-root/
├── content/                     # Content management
│   ├── about.csv               # About page content
│   ├── caseStudies.csv         # Homepage case study cards
│   ├── caseStudyDetails.csv    # Individual case study content
│   ├── contact.csv             # Contact page content
│   └── resume.csv              # Resume page content
├── docs/                       # GitHub Pages deployment folder
│   ├── CNAME
│   ├── DanSchmitzResume.pdf
│   ├── asset-manifest.json
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   ├── robots.txt
│   ├── images/
│   └── static/
│       ├── css/
│       ├── js/
│       └── media/
├── public/                     # Static public assets
│   ├── CNAME
│   ├── DanSchmitzResume.pdf
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   ├── robots.txt
│   └── images/
├── scripts/                    # Build and conversion scripts
│   └── convertContent.js       # CSV to JSON converter
└── src/                        # Source code
    ├── components/             # Reusable React components
    │   ├── Layout.js
    │   ├── Navigation.js
    │   └── RichText.js
    ├── data/                   # Generated JSON content
    │   ├── about.json
    │   ├── caseStudies.json
    │   ├── caseStudyDetails.json
    │   ├── contact.json
    │   └── resume.json
    ├── images/                 # Image assets
    │   ├── apple-thumbnail.jpg
    │   ├── dan-eldorado.jpg
    │   ├── ironnet-thumbnail.gif
    │   ├── magic-leap-thumbnail.gif
    │   ├── petal-brow-click-thumbnail.gif
    │   └── petal-metrics-thumbnail.gif
    ├── pages/                  # Page components
    │   ├── About.js
    │   ├── CaseStudies.js
    │   ├── CaseStudyDetail.js
    │   ├── Contact.js
    │   └── Resume.js
    ├── styles/                 # Global styling
    │   ├── global.js
    │   └── theme.js
    ├── utils/                  # Utility functions
    │   └── api.js
    ├── App.css
    ├── App.js
    ├── App.test.js
    ├── index.css
    ├── index.js
    ├── logo.svg
    ├── reportWebVitals.js
    └── setupTests.js
## Website Sections
- Global navigation: Case Studies, Resume, About, Contact
- Case Studies (homepage) - Portfolio showcases
- Case Study Detail - In-depth project presentations
- Resume - Professional experience overview
- About - Personal introduction
- Contact - Professional contact information

For detailed documentation on content management, rich text formatting, and development guidelines, see the Project Instructions in the repository.