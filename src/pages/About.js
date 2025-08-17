// src/pages/About.js
import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import RichText from '../components/RichText';
import aboutData from '../data/about.json';
import { imageMap } from '../utils/imageImports';

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

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const imageParallax = keyframes`
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-10px) rotate(1deg); }
`;

const shimmer = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

// Loading skeleton
const SkeletonContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing['2xl']} ${({ theme }) => theme.spacing.lg};
`;

const SkeletonElement = styled.div`
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  position: relative;
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      90deg,
      transparent 0%,
      ${({ theme }) => theme.colors.surface}40 50%,
      transparent 100%
    );
    animation: ${shimmer} 2s infinite;
  }
`;

const SkeletonTitle = styled(SkeletonElement)`
  height: 48px;
  width: 60%;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const SkeletonText = styled(SkeletonElement)`
  height: 24px;
  margin-bottom: ${({ theme }) => theme.spacing.base};
  width: ${({ width }) => width || '100%'};
`;

const SkeletonImage = styled(SkeletonElement)`
  width: 100%;
  max-width: 400px;
  height: 400px;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  margin: 0 auto ${({ theme }) => theme.spacing['2xl']};
`;

// Main wrapper with animations
const AboutWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing['2xl']} ${({ theme }) => theme.spacing.lg};
  position: relative;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing['3xl']} 0;
  }
`;

// Enhanced page title
const PageTitle = styled.h1`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.text};
  font-size: clamp(${({ theme }) => theme.fontSizes['3xl']}, 4vw, ${({ theme }) => theme.fontSizes['5xl']});
  font-weight: ${({ theme }) => theme.fontWeights.black};
  letter-spacing: ${({ theme }) => theme.letterSpacing.tighter};
  line-height: 1.1;
  animation: ${fadeInUp} 0.6s ${({ theme }) => theme.transitions.easeOut};
  
  /* Gradient text effect */
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.text} 0%,
    ${({ theme }) => theme.colors.text} 50%,
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
  }
`;

// Enhanced profile image container
const ProfileImageContainer = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing['3xl']};
  position: relative;
  animation: ${fadeInUp} 0.6s 0.2s both ${({ theme }) => theme.transitions.easeOut};
  
  /* Decorative elements */
  &::before,
  &::after {
    content: '';
    position: absolute;
    border-radius: ${({ theme }) => theme.borderRadius.full};
    pointer-events: none;
  }
  
  &::before {
    top: -20px;
    left: 50%;
    transform: translateX(-50%);
    width: 120%;
    max-width: 480px;
    height: 120%;
    background: radial-gradient(
      circle,
      ${({ theme }) => theme.colors.secondary}08 0%,
      transparent 70%
    );
    animation: ${pulse} 4s ease-in-out infinite;
  }
  
  &::after {
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80%;
    max-width: 320px;
    height: 4px;
    background: linear-gradient(
      90deg,
      transparent,
      ${({ theme }) => theme.colors.secondary}30,
      transparent
    );
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-bottom: ${({ theme }) => theme.spacing['2xl']};
  }
`;

// Enhanced profile image with hover effects
const ProfileImage = styled.img`
  width: 100%;
  max-width: 400px;
  height: auto;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  display: inline-block;
  box-shadow: ${({ theme }) => theme.shadows['2xl']};
  transition: all ${({ theme }) => theme.transitions.slow};
  position: relative;
  z-index: 1;
  
  &:hover {
    transform: scale(1.02);
    box-shadow: ${({ theme }) => theme.shadows['3xl']};
    animation: ${imageParallax} 4s ease-in-out infinite;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    max-width: 100%;
    border-radius: ${({ theme }) => theme.borderRadius.md};
  }
`;

// Enhanced content section
const ContentSection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
  animation: ${fadeInUp} 0.6s 0.3s both ${({ theme }) => theme.transitions.easeOut};
  
  /* Enhanced typography for content */
  h1 {
    font-size: ${({ theme }) => theme.fontSizes['4xl']};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    margin: ${({ theme }) => theme.spacing['2xl']} 0 ${({ theme }) => theme.spacing.lg} 0;
    color: ${({ theme }) => theme.colors.text};
    letter-spacing: ${({ theme }) => theme.letterSpacing.tight};
  }
  
  h2 {
    font-size: ${({ theme }) => theme.fontSizes['2xl']};
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
    margin: ${({ theme }) => theme.spacing.xl} 0 ${({ theme }) => theme.spacing.base} 0;
    color: ${({ theme }) => theme.colors.secondary};
    letter-spacing: ${({ theme }) => theme.letterSpacing.tight};
    position: relative;
    
    /* Decorative accent */
    &::before {
      content: '';
      position: absolute;
      left: -${({ theme }) => theme.spacing.lg};
      top: 50%;
      transform: translateY(-50%);
      width: 4px;
      height: 80%;
      background: ${({ theme }) => theme.colors.secondary};
      border-radius: ${({ theme }) => theme.borderRadius.full};
      opacity: 0.6;
    }
  }
  
  p {
    color: ${({ theme }) => theme.colors.textSecondary};
    line-height: ${({ theme }) => theme.lineHeights.relaxed};
    margin-bottom: ${({ theme }) => theme.spacing.base};
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-bottom: ${({ theme }) => theme.spacing.xl};
  }
`;

// Enhanced facts section with glass morphism
const FactsSection = styled.section`
  margin-top: ${({ theme }) => theme.spacing['3xl']};
  background: ${({ theme }) => theme.colors.surface};
  backdrop-filter: blur(10px);
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid ${({ theme }) => theme.colors.borderLight};
  box-shadow: 
    ${({ theme }) => theme.shadows.sm},
    inset 0 1px 0 ${({ theme }) => theme.colors.glassEdge};
  animation: ${fadeInUp} 0.6s 0.4s both ${({ theme }) => theme.transitions.easeOut};
  position: relative;
  overflow: hidden;
  
  /* Gradient overlay */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      135deg,
      ${({ theme }) => theme.colors.secondary}03 0%,
      transparent 50%,
      ${({ theme }) => theme.colors.accent}02 100%
    );
    pointer-events: none;
  }
  
  > * {
    position: relative;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-top: ${({ theme }) => theme.spacing['2xl']};
    padding: ${({ theme }) => theme.spacing.lg};
  }
`;

const FactsTitle = styled.h2`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  letter-spacing: ${({ theme }) => theme.letterSpacing.tight};
  
  /* Gradient text */
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.text} 0%,
    ${({ theme }) => theme.colors.secondary} 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.fontSizes.xl};
    margin-bottom: ${({ theme }) => theme.spacing.base};
  }
`;

const FactsList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: ${({ theme }) => theme.spacing.base};
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
    gap: ${({ theme }) => theme.spacing.lg};
  }
`;

// Enhanced fact item with hover effects
const FactItem = styled.li`
  padding: ${({ theme }) => theme.spacing.base};
  padding-left: ${({ theme }) => theme.spacing['2xl']};
  position: relative;
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
  color: ${({ theme }) => theme.colors.textSecondary};
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: all ${({ theme }) => theme.transitions.fast};
  border: 1px solid transparent;
  animation: ${slideInRight} 0.5s ${({ index }) => 0.5 + index * 0.05}s both ${({ theme }) => theme.transitions.easeOut};
  
  /* Custom bullet */
  &::before {
    content: "✨";
    position: absolute;
    left: ${({ theme }) => theme.spacing.base};
    top: ${({ theme }) => theme.spacing.base};
    font-size: ${({ theme }) => theme.fontSizes.lg};
  }
  
  &:hover {
    transform: translateX(4px);
    background: ${({ theme }) => theme.colors.surface};
    border-color: ${({ theme }) => theme.colors.borderLight};
    box-shadow: ${({ theme }) => theme.shadows.sm};
    
    &::before {
      animation: ${pulse} 1s ease-in-out;
    }
  }
  
  strong {
    color: ${({ theme }) => theme.colors.text};
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.sm};
    padding-left: ${({ theme }) => theme.spacing.xl};
    font-size: ${({ theme }) => theme.fontSizes.base};
  }
`;

// Floating decoration
const FloatingOrb = styled.div`
  position: fixed;
  width: 500px;
  height: 500px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: radial-gradient(
    circle,
    ${({ theme }) => theme.colors.accent}08 0%,
    transparent 70%
  );
  filter: blur(80px);
  pointer-events: none;
  z-index: -1;
  bottom: -250px;
  left: -250px;
  animation: ${imageParallax} 15s ease-in-out infinite;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

const About = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setIsLoading(false), 600);
    // Scroll to top on mount
    window.scrollTo(0, 0);
  }, []);

  // Verify data loaded
  if (!aboutData) {
    console.warn('About data not found');
    return <AboutWrapper>Loading...</AboutWrapper>;
  }

  // Check for required image
  const profileImageSrc = imageMap[aboutData.profileImage];
  if (!profileImageSrc) {
    console.warn(`Profile image not found: ${aboutData.profileImage}`);
  }

  if (isLoading) {
    return (
      <SkeletonContainer>
        <SkeletonTitle />
        <SkeletonText width="80%" />
        <SkeletonImage />
        <SkeletonText />
        <SkeletonText width="90%" />
        <SkeletonText width="75%" />
      </SkeletonContainer>
    );
  }

  return (
    <>
      <FloatingOrb />
      <AboutWrapper>
        <PageTitle>{aboutData.headline}</PageTitle>
        <Introduction>
          {aboutData.introduction.split(' ').map((word, index) => {
            // Highlight key words
            if (['AI', 'product', 'design', 'strategy'].includes(word)) {
              return <strong key={index}>{word} </strong>;
            }
            return word + ' ';
          })}
        </Introduction>
        
        {profileImageSrc && (
          <ProfileImageContainer>
            <ProfileImage 
              src={profileImageSrc}
              alt="Dan Schmitz Profile"
              loading="eager"
              onError={(e) => {
                console.warn(`Failed to load profile image: ${aboutData.profileImage}`);
                e.target.style.display = 'none';
              }}
            />
          </ProfileImageContainer>
        )}

        <ContentSection>
          <RichText content={aboutData.content} />
        </ContentSection>
        
        {aboutData.facts && aboutData.facts.length > 0 && (
          <FactsSection>
            <FactsTitle>Quick Facts</FactsTitle>
            <FactsList>
              {aboutData.facts.map((fact, index) => (
                <FactItem key={index} index={index}>
                  {fact.split(' ').map((word, wordIndex) => {
                    // Highlight numbers and key terms
                    if (/\d+/.test(word) || ['Master\'s', 'Valedictorian', 'AI', 'founder'].includes(word)) {
                      return <strong key={wordIndex}>{word} </strong>;
                    }
                    return word + ' ';
                  })}
                </FactItem>
              ))}
            </FactsList>
          </FactsSection>
        )}
      </AboutWrapper>
    </>
  );
};

export default About;