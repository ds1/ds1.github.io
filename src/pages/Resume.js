// src/pages/Resume.js
import React from 'react';
import styled, { keyframes } from 'styled-components';
import RichText from '../components/RichText';
import resumeData from '../data/resume.json';

// Animations
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -200% center;
  }
  100% {
    background-position: 200% center;
  }
`;

const downloadIcon = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  25% {
    transform: translateY(-3px);
  }
  75% {
    transform: translateY(3px);
  }
`;

// Main wrapper with refined spacing
const ResumeWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing['2xl']} ${({ theme }) => theme.spacing.lg};
  position: relative;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing['3xl']} 0;
  }
`;

// Enhanced page title with Geist font
const PageTitle = styled.h1`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.text};
  font-size: clamp(${({ theme }) => theme.fontSizes['3xl']}, 4vw, ${({ theme }) => theme.fontSizes['5xl']});
  font-weight: ${({ theme }) => theme.fontWeights.black};
  letter-spacing: ${({ theme }) => theme.letterSpacing.tighter};
  line-height: 1.1;
  font-feature-settings: "kern" 1, "liga" 1, "ss01" 1;
  animation: ${fadeInUp} 0.6s ${({ theme }) => theme.transitions.easeOut};
  
  /* Gradient text effect */
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary} 0%,
    ${({ theme }) => theme.colors.primary} 60%,
    ${({ theme }) => theme.colors.secondary} 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
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
  padding: ${({ theme }) => theme.spacing.base} ${({ theme }) => theme.spacing.xl};
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
  overflow: hidden;
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
  
  /* Ripple effect */
  &::after {
    content: '↓';
    position: absolute;
    right: ${({ theme }) => theme.spacing.lg};
    font-size: ${({ theme }) => theme.fontSizes.xl};
    animation: ${downloadIcon} 2s ease-in-out infinite;
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
    padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.xl};
    margin: ${({ theme }) => theme.spacing.xl} 0;
    font-size: ${({ theme }) => theme.fontSizes.base};
    
    &:hover {
      transform: none;
    }
    
    &:active {
      transform: scale(0.98);
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
  backdrop-filter: blur(10px) saturate(180%);
  -webkit-backdrop-filter: blur(10px) saturate(180%);
  background: ${({ theme }) => theme.colors.glassSurface};
  padding: ${({ theme }) => theme.spacing['2xl']};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  box-shadow: ${({ theme }) => theme.shadows.base};
  position: relative;
  overflow: hidden;
  
  /* Subtle gradient overlay */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      135deg,
      ${({ theme }) => theme.colors.secondary}03 0%,
      transparent 100%
    );
    pointer-events: none;
  }
  
  /* Enhanced typography */
  h2 {
    margin-top: ${({ theme }) => theme.spacing['3xl']};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
    color: ${({ theme }) => theme.colors.secondary};
    font-size: ${({ theme }) => theme.fontSizes['2xl']};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    letter-spacing: ${({ theme }) => theme.letterSpacing.tight};
    position: relative;
    animation: ${slideIn} 0.5s ${({ theme }) => theme.transitions.easeOut};
    
    /* Decorative line */
    &::after {
      content: '';
      position: absolute;
      bottom: -${({ theme }) => theme.spacing.xs};
      left: 0;
      width: 60px;
      height: 3px;
      background: linear-gradient(
        90deg,
        ${({ theme }) => theme.colors.secondary},
        ${({ theme }) => theme.colors.accent}
      );
      border-radius: ${({ theme }) => theme.borderRadius.full};
    }
    
    &:first-child {
      margin-top: 0;
    }
    
    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      margin-top: ${({ theme }) => theme.spacing['2xl']};
      margin-bottom: ${({ theme }) => theme.spacing.base};
      font-size: ${({ theme }) => theme.fontSizes.xl};
    }
  }
  
  h3 {
    margin-top: ${({ theme }) => theme.spacing.xl};
    margin-bottom: ${({ theme }) => theme.spacing.sm};
    color: ${({ theme }) => theme.colors.text};
    font-size: ${({ theme }) => theme.fontSizes.xl};
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
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
  }
  
  ul, ol {
    margin-bottom: ${({ theme }) => theme.spacing.base};
    padding-left: ${({ theme }) => theme.spacing.xl};
    
    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      padding-left: ${({ theme }) => theme.spacing.lg};
    }
  }
  
  li {
    margin-bottom: ${({ theme }) => theme.spacing.sm};
    line-height: ${({ theme }) => theme.lineHeights.relaxed};
    color: ${({ theme }) => theme.colors.textSecondary};
    position: relative;
    
    /* Custom bullet style */
    &::marker {
      color: ${({ theme }) => theme.colors.secondary};
      font-weight: ${({ theme }) => theme.fontWeights.bold};
    }
    
    /* Hover effect for list items */
    transition: all ${({ theme }) => theme.transitions.fast};
    padding-left: ${({ theme }) => theme.spacing.xs};
    margin-left: -${({ theme }) => theme.spacing.xs};
    border-radius: ${({ theme }) => theme.borderRadius.sm};
    
    &:hover {
      background: ${({ theme }) => theme.colors.backgroundSecondary};
      padding-left: ${({ theme }) => theme.spacing.sm};
    }
    
    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      margin-bottom: ${({ theme }) => theme.spacing.sm};
      font-size: ${({ theme }) => theme.fontSizes.base};
      line-height: ${({ theme }) => theme.lineHeights.relaxed};
    }
  }
  
  /* Enhanced links */
  a {
    color: ${({ theme }) => theme.colors.secondary};
    text-decoration: none;
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    position: relative;
    transition: all ${({ theme }) => theme.transitions.fast};
    
    &::after {
      content: '';
      position: absolute;
      bottom: -1px;
      left: 0;
      right: 0;
      height: 1px;
      background: ${({ theme }) => theme.colors.secondary};
      transform: scaleX(0);
      transform-origin: left;
      transition: transform ${({ theme }) => theme.transitions.base};
    }
    
    &:hover {
      color: ${({ theme }) => theme.colors.primary};
      
      &::after {
        transform: scaleX(1);
      }
    }
  }
  
  /* Code blocks with enhanced styling */
  code {
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: ${({ theme }) => theme.fontSizes.sm};
    background: ${({ theme }) => theme.colors.codeBackground};
    padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
    border-radius: ${({ theme }) => theme.borderRadius.xs};
    color: ${({ theme }) => theme.colors.secondary};
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    border: 1px solid ${({ theme }) => theme.colors.borderLight};
  }
  
  /* Blockquotes with style */
  blockquote {
    border-left: 4px solid ${({ theme }) => theme.colors.secondary};
    padding: ${({ theme }) => theme.spacing.base} ${({ theme }) => theme.spacing.lg};
    margin: ${({ theme }) => theme.spacing.xl} 0;
    color: ${({ theme }) => theme.colors.textSecondary};
    font-style: italic;
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
          <RichText content={resumeData.content} />
        </ResumeContent>
      </ContentSection>
    </ResumeWrapper>
  );
};

export default Resume;