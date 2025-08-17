import React from 'react';
import styled, { keyframes } from 'styled-components';
import resumeData from '../data/resume.json';

// Animations
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const shimmer = keyframes`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
`;

const downloadIcon = keyframes`
  0%, 100% {
    transform: translateY(-50%);
  }
  50% {
    transform: translateY(calc(-50% + 4px));
  }
`;

// Main wrapper
const ResumeWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing['2xl']} ${({ theme }) => theme.spacing.lg};
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing['3xl']} 0;
  }
`;

// Enhanced page title
const PageTitle = styled.h1`
  font-size: clamp(${({ theme }) => theme.fontSizes['3xl']}, 4vw, ${({ theme }) => theme.fontSizes['5xl']});
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.text} 0%,
    ${({ theme }) => theme.colors.secondary} 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${fadeInUp} 0.6s ${({ theme }) => theme.transitions.easeOut};
  letter-spacing: ${({ theme }) => theme.letterSpacing.tight};
  line-height: ${({ theme }) => theme.lineHeights.tight};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.fontSizes['3xl']};
    margin-bottom: ${({ theme }) => theme.spacing.base};
  }
`;

// Enhanced introduction with better typography
const Introduction = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
  font-weight: ${({ theme }) => theme.fontWeights.normal};
  letter-spacing: ${({ theme }) => theme.letterSpacing.normal};
  animation: ${fadeInUp} 0.6s 0.1s both ${({ theme }) => theme.transitions.easeOut};
  
  /* Highlight important text */
  strong {
    color: ${({ theme }) => theme.colors.secondary};
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.fontSizes.lg};
    margin-bottom: ${({ theme }) => theme.spacing.xl};
    line-height: ${({ theme }) => theme.lineHeights.relaxed};
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: ${({ theme }) => theme.fontSizes.base};
  }
`;

// Premium download button with animations
const DownloadButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.secondary} 0%,
    ${({ theme }) => theme.colors.primary} 100%
  );
  color: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.spacing.base} ${({ theme }) => theme.spacing['3xl']} ${({ theme }) => theme.spacing.base} ${({ theme }) => theme.spacing.xl};
  text-decoration: none;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  margin: ${({ theme }) => theme.spacing['2xl']} 0;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  letter-spacing: ${({ theme }) => theme.letterSpacing.tight};
  text-align: center;
  border: none;
  cursor: pointer;
  position: relative;
  overflow: visible;
  box-shadow: ${({ theme }) => theme.shadows.lg};
  animation: ${fadeInUp} 0.6s 0.2s both ${({ theme }) => theme.transitions.easeOut};
  transition: all ${({ theme }) => theme.transitions.base};
  
  /* Shimmer effect overlay */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(255, 255, 255, 0.2) 50%,
      transparent 100%
    );
    transform: translateX(-100%);
    transition: transform 0.6s;
  }
  
  /* Down arrow icon - FIXED vertical centering */
  &::after {
    content: '↓';
    position: absolute;
    right: ${({ theme }) => theme.spacing.xl};
    top: 50%;
    transform: translateY(-50%);
    font-size: ${({ theme }) => theme.fontSizes.xl};
    animation: ${downloadIcon} 2s ease-in-out infinite;
    opacity: 0.9;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
  }

  &:hover {
    transform: translateY(-3px) scale(1.02);
    box-shadow: ${({ theme }) => theme.shadows['2xl']};
    
    &::before {
      animation: ${shimmer} 1.5s ease-in-out infinite;
    }
    
    &::after {
      animation: ${downloadIcon} 0.5s ease-in-out infinite;
    }
  }
  
  &:active {
    transform: translateY(-1px) scale(1);
  }
  
  /* Icon styling */
  svg {
    width: 20px;
    height: 20px;
    transition: transform ${({ theme }) => theme.transitions.fast};
  }
  
  &:hover svg {
    transform: translateY(2px);
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: flex;
    width: 100%;
    justify-content: center;
    padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing['3xl']} ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.xl};
    margin: ${({ theme }) => theme.spacing.xl} 0;
    font-size: ${({ theme }) => theme.fontSizes.base};
    
    &:hover {
      transform: none;
    }
    
    &:active {
      transform: scale(0.98);
    }
    
    &::after {
      right: ${({ theme }) => theme.spacing.lg};
    }
  }
`;

// Enhanced content section
const ContentSection = styled.div`
  margin-top: ${({ theme }) => theme.spacing['3xl']};
  animation: ${fadeInUp} 0.6s 0.3s both ${({ theme }) => theme.transitions.easeOut};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-top: ${({ theme }) => theme.spacing['2xl']};
  }
`;

// Glass morphism content card
const ResumeContent = styled.div`
  backdrop-filter: blur(10px);
  background: ${({ theme }) => 
    theme.mode === 'dark' 
      ? 'rgba(255, 255, 255, 0.03)' 
      : 'rgba(255, 255, 255, 0.9)'
  };
  border: 1px solid ${({ theme }) => 
    theme.mode === 'dark' 
      ? 'rgba(255, 255, 255, 0.1)' 
      : 'rgba(0, 0, 0, 0.1)'
  };
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing['3xl']};
  box-shadow: ${({ theme }) => theme.shadows.xl};
  position: relative;
  overflow: hidden;
  
  /* Gradient border effect */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: ${({ theme }) => theme.borderRadius.xl};
    padding: 1px;
    background: linear-gradient(
      135deg,
      ${({ theme }) => theme.colors.secondary}22,
      transparent 50%,
      ${({ theme }) => theme.colors.primary}22
    );
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask-composite: exclude;
    pointer-events: none;
  }
  
  h2 {
    color: ${({ theme }) => theme.colors.text};
    font-size: ${({ theme }) => theme.fontSizes['2xl']};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    margin-top: ${({ theme }) => theme.spacing['2xl']};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
    position: relative;
    letter-spacing: ${({ theme }) => theme.letterSpacing.tight};
    
    /* Section underline */
    &::after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 0;
      width: 60px;
      height: 3px;
      background: ${({ theme }) => theme.colors.secondary};
      border-radius: ${({ theme }) => theme.borderRadius.full};
    }
    
    &:first-child {
      margin-top: 0;
    }
    
    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      font-size: ${({ theme }) => theme.fontSizes.xl};
      margin-top: ${({ theme }) => theme.spacing.xl};
      margin-bottom: ${({ theme }) => theme.spacing.base};
    }
  }
  
  h3 {
    color: ${({ theme }) => theme.colors.text};
    font-size: ${({ theme }) => theme.fontSizes.lg};
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
    margin-top: ${({ theme }) => theme.spacing.xl};
    margin-bottom: ${({ theme }) => theme.spacing.sm};
    letter-spacing: ${({ theme }) => theme.letterSpacing.tight};
    
    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      margin-top: ${({ theme }) => theme.spacing.lg};
      margin-bottom: ${({ theme }) => theme.spacing.xs};
      font-size: ${({ theme }) => theme.fontSizes.lg};
    }
  }
  
  p {
    margin-bottom: ${({ theme }) => theme.spacing.base};
    line-height: ${({ theme }) => theme.lineHeights.relaxed};
    color: ${({ theme }) => theme.colors.textSecondary};
    font-weight: ${({ theme }) => theme.fontWeights.normal};
    font-size: ${({ theme }) => theme.fontSizes.base};
  }
  
  .role-date {
    color: ${({ theme }) => theme.colors.text};
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }
  
  ul, ol {
    margin-bottom: ${({ theme }) => theme.spacing.xl};
    padding-left: ${({ theme }) => theme.spacing.xl};
    list-style: none;
    
    &:last-child {
      margin-bottom: 0;
    }
    
    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      padding-left: ${({ theme }) => theme.spacing.lg};
      margin-bottom: ${({ theme }) => theme.spacing.lg};
    }
  }
  
  li {
    margin-bottom: ${({ theme }) => theme.spacing.sm};
    line-height: ${({ theme }) => theme.lineHeights.relaxed};
    color: ${({ theme }) => theme.colors.textSecondary};
    position: relative;
    padding-left: ${({ theme }) => theme.spacing.lg};  /* Reduced from 2xl to lg */
    border-radius: ${({ theme }) => theme.borderRadius.sm};
    
    /* Custom bullet style */
    &::before {
      content: '▸';
      position: absolute;
      left: 0;
      color: ${({ theme }) => theme.colors.secondary};
      font-weight: ${({ theme }) => theme.fontWeights.bold};
    }
    
    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      margin-bottom: ${({ theme }) => theme.spacing.sm};
      font-size: ${({ theme }) => theme.fontSizes.sm};
      line-height: ${({ theme }) => theme.lineHeights.relaxed};
    }
  }
  
  /* Quote styling */
  blockquote {
    margin: ${({ theme }) => theme.spacing.xl} 0;
    padding: ${({ theme }) => theme.spacing.lg};
    border-left: 4px solid ${({ theme }) => theme.colors.secondary};
    background: ${({ theme }) => theme.colors.backgroundSecondary};
    border-radius: ${({ theme }) => theme.borderRadius.sm};
    position: relative;
    
    &::before {
      content: '"';
      position: absolute;
      top: -10px;
      left: 20px;
      font-size: 3rem;
      color: ${({ theme }) => theme.colors.secondary};
      opacity: 0.2;
      font-family: ${({ theme }) => theme.fonts.display};
    }
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.xl};
  }
`;

const Resume = () => {
  // Parse the special resume content format
  const parseResumeContent = (content) => {
    if (!content || !Array.isArray(content)) return null;
    
    // Find the content object with the actual resume data
    const resumeContentObj = content.find(item => 
      item.content && item.content.includes('#h2#')
    );
    
    if (!resumeContentObj || !resumeContentObj.content) return null;
    
    // Split the content by markers and parse
    const parsedSections = [];
    const lines = resumeContentObj.content.split('\\n');
    
    lines.forEach(line => {
      if (line.startsWith('#h2#')) {
        parsedSections.push({ type: 'h2', content: line.replace('#h2#', '') });
      } else if (line.startsWith('#h3#')) {
        parsedSections.push({ type: 'h3', content: line.replace('#h3#', '') });
      } else if (line.startsWith('#p#')) {
        parsedSections.push({ type: 'p', content: line.replace('#p#', '') });
      } else if (line.startsWith('#list#')) {
        const items = line.replace('#list#', '').split(';').filter(item => item.trim());
        parsedSections.push({ type: 'list', items });
      }
    });
    
    return parsedSections;
  };
  
  const parsedContent = parseResumeContent(resumeData.content);
  
  return (
    <ResumeWrapper>
      <PageTitle>{resumeData.title}</PageTitle>
      
      <Introduction>{resumeData.introduction}</Introduction>
      
      <DownloadButton 
        href={resumeData.downloadLink} 
        download
        aria-label="Download Resume PDF"
      >
        Download Resume (PDF)
      </DownloadButton>
      
      <ContentSection>
        <ResumeContent>
          {parsedContent && parsedContent.length > 0 ? (
            parsedContent.map((section, index) => {
              switch(section.type) {
                case 'h2':
                  return <h2 key={index}>{section.content}</h2>;
                case 'h3':
                  return <h3 key={index}>{section.content}</h3>;
                case 'p':
                  return (
                    <p key={index} className={section.content.includes('|') ? 'role-date' : ''}>
                      {section.content}
                    </p>
                  );
                case 'list':
                  return (
                    <ul key={index}>
                      {section.items.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  );
                default:
                  return null;
              }
            })
          ) : (
            <p style={{ 
              textAlign: 'center', 
              padding: '2rem',
              color: 'var(--text-secondary)',
              fontStyle: 'italic'
            }}>
              Resume content is being updated. Please download the PDF above for the complete resume.
            </p>
          )}
        </ResumeContent>
      </ContentSection>
    </ResumeWrapper>
  );
};

export default Resume;