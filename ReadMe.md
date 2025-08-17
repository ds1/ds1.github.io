# schmitz.ai

Repo for custom content on schmitz.ai - A responsive, accessible React-based portfolio website showcasing Dan Schmitz's professional experience, skills, and projects.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build and deploy (automated via GitHub Actions)
git push origin main
```

## 📋 Table of Contents
- [Project Overview](#project-overview)
- [Automated Deployment](#automated-deployment)
- [Content Management System](#content-management-system)
- [Theme Management](#theme-management)
- [Development Workflow](#development-workflow)
- [Directory Structure](#directory-structure)
- [Troubleshooting](#troubleshooting)

## Project Overview

This website demonstrates excellence in interaction design, AI integration, and clean aesthetic. It features:
- **Visual Content Management**: Browser-based CMS for all content editing
- **Shared Theme System**: Single source of truth for styles across site and CMS
- **Automated Deployment**: GitHub Actions handles builds and deploys automatically
- **Flexible Content**: Dynamic content blocks for complete editorial freedom

## 🤖 Automated Deployment

### How It Works
The site now uses **GitHub Actions** for automatic building and deployment. You no longer need to manually run build commands!

```mermaid
graph LR
    A[Edit Content] --> B[Git Push/CMS Publish]
    B --> C[GitHub Actions]
    C --> D[Auto Build]
    D --> E[Deploy to GitHub Pages]
    E --> F[Live Site Updates]
```

### Deployment Methods

#### 1. CMS Changes
1. Edit at `schmitz.ai/admin/`
2. Click "Publish"
3. ✅ Site updates automatically in 2-3 minutes

#### 2. Code Changes
```bash
git add .
git commit -m "Update component"
git push origin main
# ✅ GitHub Actions handles everything else
```

## 📝 Content Management System

### Accessing the CMS
- **Production**: https://schmitz.ai/admin/
- **Local**: http://localhost:3000/admin/
- **Authentication**: GitHub account

### How Content Works
All content is managed through the visual CMS interface. When you publish changes:
1. Content saves to GitHub automatically
2. GitHub Actions triggers
3. Site rebuilds and deploys
4. Changes appear in 2-3 minutes

### Flexible Content Blocks
The CMS supports dynamic content sections:

#### Available Content Types
- **Headings**: H1, H2, H3
- **Text**: Paragraph, Rich Text (markdown)
- **Media**: Image, Video, GIF
- **Lists**: Dynamic bullet points
- **Special**: Code blocks, Quotes

#### Creating/Editing Case Studies
1. Log into CMS
2. Click "Case Studies" → "New Case Study" (or edit existing)
3. Add metadata (title, description, thumbnail)
4. Build content using "Add Content Section"
5. Choose section type (H2, paragraph, image, etc.)
6. Reorder sections by dragging
7. Publish when ready

### Example Content Structure
```
1. H1: "Project Title"
2. Image: hero-image.jpg
3. H2: "The Challenge"
4. Rich Text: Detailed problem with **bold** and *italic*
5. List: Key objectives
6. H2: "Solution"
7. Image: solution-screenshot.jpg
8. Quote: "Client testimonial"
```

## 💻 Development Workflow

### Local Development
```bash
# Start development server
npm start

# The site runs at http://localhost:3000
# The CMS runs at http://localhost:3000/admin
```

### Content Updates

#### All Content via CMS
1. Log into CMS at `/admin`
2. Edit or create content
3. Click "Publish"
4. Changes deploy automatically via GitHub Actions

### Code Updates
```bash
git add .
git commit -m "Update component"
git push origin main
# GitHub Actions handles the build and deploy
```

### Manual Build (If needed)
```bash
# Only if GitHub Actions is down
npm run convert-content  # Convert CSV/CMS to JSON
npm run build           # Build React app
npm run deploy          # Deploy to GitHub Pages
```

## 📁 Directory Structure

```
project-root/
├── .github/
│   └── workflows/
│       └── build-and-deploy.yml    # GitHub Actions automation
├── content/                        
│   └── cms/                        # CMS-generated content
│       └── case-studies/           # Individual JSON files from CMS
├── public/
│   └── admin/
│       ├── index.html              # CMS interface
│       └── config.yml              # CMS configuration
├── scripts/
│   ├── convertCMSContent.js        # CMS → JSON converter
├── src/
│   ├── components/                 # React components
│   ├── data/                       # Generated JSON (don't edit)
│   ├── images/                     # Image assets
│   ├── pages/                      # Page components
│   └── styles/
│       └── theme.js                # Theme configuration
└── docs/                           # GitHub Pages deployment
```

## 🔧 Configuration Files

### CMS Configuration (`public/admin/config.yml`)
- Defines content structure
- Sets up flexible content blocks
- Configures media handling

### GitHub Actions (`.github/workflows/build-and-deploy.yml`)
- Triggers on push to main
- Runs content conversion
- Builds React app
- Deploys to GitHub Pages

## 📚 Content Guidelines

### Rich Text Formatting
In CMS rich text fields:
- **Bold**: `**text**`
- **Italic**: `*text*`
- **Bold+Italic**: `***text***`
- **Line Break**: `\n`
- **Paragraph Break**: `\n\n`
- **Color Spans**: `<span class="text-primary">text</span>`

### Image Management
- Store images in `src/images/`
- Reference in content as `/images/filename.jpg`
- Supports: JPG, PNG, GIF, WebP
- Videos: MP4, WebM

## 🐛 Troubleshooting

### Content Not Updating
1. Check GitHub Actions: https://github.com/ds1/ds1.github.io/actions
2. Clear browser cache (Ctrl+Shift+R)
3. Wait 2-3 minutes for deployment

### CMS Login Issues
1. Clear cookies for schmitz.ai
2. Re-authenticate with GitHub
3. Check GitHub permissions

### Build Failures
1. Check GitHub Actions logs
2. Run locally to debug:
```bash
npm run convert-content
npm run build
```

## 🎯 Key Commands Reference

```bash
# Development
npm start                    # Start local server
npm run convert-content      # Manual content conversion

# Deployment (automatic via GitHub Actions)
git push origin main        # Triggers auto-deploy

# Manual Deployment (rarely needed)
npm run build              # Build for production
npm run deploy             # Deploy to GitHub Pages
```

---

Built with React, Decap CMS, and GitHub Pages. Automated with GitHub Actions.