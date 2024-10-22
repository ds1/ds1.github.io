# schmitzai
Repo for custom content on schmitz.ai

# Claude Project Instructions

This project is a responsive, accessible React-based portfolio website for me, Dan Schmitz, a user experience designer, that demonstrates his excellence in interaction design, AI integration, and clean aesthetic. 

## Project Overview 
This website (Schmitz.ai) showcases Dan Schmitz's professional experience, skills, and projects.

Hi, Claude. Your role, as an expert in programming and software development best practices, is to develop clean, readable (well-commented) code for the project. Retain context of the website as a comprehensive whole, ensuring that patterns used for one file should be used across the website where possible and it makes sense to do so.

## Your Interaction with Dan
You do not need to provide summary paragraphs or ask questions at the end of your responses. I want to use the majority of the allowed chat length space for providing updates to the code.

When suggesting code updates, make it very obvious which lines were modified.

Facilitate the process for me to make edits to the text content. Consider creating a light and simple content management system so that I can edit text and image paths in a .csv or spreadsheet file, and then run a script to update the contents of the website files.

Before engaging, review the project file contents added to the Project Knowledge contents so that you maintain your understanding of the project, its files, and considerations for the codebase as well as how you and I interact.

In your first reply of this chat, suggest what to build, based on your comprehensive knowledge of the project and missing pieces.

# Website Sections 
Global navigation: Case Studies, Resume, About, Contact

## Case Studies (homepage) 
A list of Case Studies that comprise a Title, Description, Thumbnail image (PNG, GIF). For each case study, the user has the ability to navigate to and from its Case Study Detail page.

## Case Study Detail 
A page that presents the content of the case study.

## Resume
A page that lets visitors view and download a PDF of Dan's resume.

## About - A page that highlights Dan's personality and summary informally.

## Contact - Provide links to Dan's LinkedIn profile page and list his email address.

# Development Notes
I am developing on a Windows machine, using Powershell, Sublime Text, and git. 

It should use modern frameworks including React. It should allow me to easily edit and replace all text and graphics. The website must be responsive, accessible, and follow SEO best practices.

Use static files and not api calls to any server so that it can hosted via GitHub Pages.

It uses scripts to build for GitHub Pages by using the /docs folder from the main branch.

## Technologies Used

- React
- React Router
- Styled Components

## Dev and Deploy Steps

`git add .`
`git commit -m "message"`
`git push origin main`
`npm run build` (includes predeploy scripts)
`npm run deploy`

# Repository file structure
Repository structure:

ds1.github.io/
├── .gitignore
├── ReadMe.md
├── package-lock.json
├── package.json
├── repo_structure.py
└── repo_structure.txt
├── docs/
│   ├── CNAME
│   ├── DanSchmitzResume.pdf
│   ├── asset-manifest.json
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
│   ├── images/
│   ├── static/
│   │   ├── css/
│   │   │   ├── main.e6c13ad2.css
│   │   │   └── main.e6c13ad2.css.map
│   │   ├── js/
│   │   │   ├── 453.d5c4626d.chunk.js
│   │   │   ├── 453.d5c4626d.chunk.js.map
│   │   │   ├── main.3effaf75.js
│   │   │   ├── main.3effaf75.js.LICENSE.txt
│   │   │   └── main.3effaf75.js.map
│   │   ├── media/
│   │   │   ├── apple-thumbnail.bd3ca23da417abe2a296.jpg
│   │   │   ├── dan-eldorado.f8c402fa3e4c7948aeb4.jpg
│   │   │   ├── ironnet-thumbnail.0584678cbe41d94cac35.gif
│   │   │   ├── magic-leap-thumbnail.95ef1520708235a8cee5.gif
│   │   │   ├── petal-brow-click-thumbnail.0a82b2a400d8d7a89c64.gif
│   │   │   └── petal-metrics-thumbnail.1c2737daef8c52a18e08.gif
├── public/
│   ├── CNAME
│   ├── DanSchmitzResume.pdf
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
│   ├── images/
├── scripts/
│   └── postbuild.js
├── src/
│   ├── App.css
│   ├── App.js
│   ├── App.test.js
│   ├── index.css
│   ├── index.js
│   ├── logo.svg
│   ├── reportWebVitals.js
│   └── setupTests.js
│   ├── components/
│   │   ├── Layout.js
│   │   └── Navigation.js
│   ├── images/
│   │   ├── apple-thumbnail.jpg
│   │   ├── dan-eldorado.jpg
│   │   ├── ironnet-thumbnail.gif
│   │   ├── magic-leap-thumbnail.gif
│   │   ├── petal-brow-click-thumbnail.gif
│   │   ├── petal-metrics-thumbnail.gif
│   │   └── wendys-thumnail.jpg
│   ├── pages/
│   │   ├── About.js
│   │   ├── CaseStudies.js
│   │   ├── CaseStudyDetail.js
│   │   ├── Contact.js
│   │   └── Resume.js
│   ├── styles/
│   │   ├── global.js
│   │   └── theme.js
│   ├── utils/
│   │   └── api.js

-------------------------------------------------------------------------------------