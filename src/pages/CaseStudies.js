// src/pages/CaseStudies.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes, css } from 'styled-components';
import caseStudiesData from '../data/caseStudies.json';
import caseStudyDetailsData from '../data/caseStudyDetails.json';
import { imageMap } from '../utils/imageImports';
import CaseStudyFilters from '../components/CaseStudyFilters';

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

const shimmer = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`;

const glowPulse = keyframes`
  0%, 100% { opacity: 0; }
  50% { opacity: 1; }
`;

// Page wrapper with improved spacing
const PageWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing['2xl']} ${({ theme }) => theme.spacing.lg};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.base};
  }
`;

// Animated page header
const PageHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing['3xl']};
  max-width: 800px;
  animation: ${fadeInUp} 0.6s ${({ theme }) => theme.transitions.easeOut};
`;

// Enhanced title with Geist font
const Title = styled.h1`
  font-size: clamp(${({ theme }) => theme.fontSizes['4xl']}, 5vw, ${({ theme }) => theme.fontSizes['6xl']});
  font-weight: ${({ theme }) => theme.fontWeights.black};
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  letter-spacing: ${({ theme }) => theme.letterSpacing.tighter};
  line-height: 1.1;
  font-feature-settings: "kern" 1, "liga" 1, "ss01" 1;
  
  /* Subtle gradient text */
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary} 0%,
    ${({ theme }) => theme.colors.primary} 60%,
    ${({ theme }) => theme.colors.secondary} 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
  font-weight: ${({ theme }) => theme.fontWeights.normal};
  letter-spacing: ${({ theme }) => theme.letterSpacing.normal};
  animation: ${fadeInUp} 0.6s 0.1s both ${({ theme }) => theme.transitions.easeOut};
`;

// Grid with staggered animations
const CaseStudyGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
  margin-top: ${({ theme }) => theme.spacing['2xl']};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: ${({ theme }) => theme.spacing.lg};
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.base};
  }
  
  /* Staggered entrance animations */
  > * {
    opacity: 0;
    animation: ${fadeInUp} 0.5s ${({ theme }) => theme.transitions.easeOut} forwards;
    
    ${Array.from({ length: 12 }, (_, i) => css`
      &:nth-child(${i + 1}) {
        animation-delay: ${i * 0.05}s;
      }
    `).join('')}
  }
`;

// Loading skeleton
const SkeletonCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  position: relative;
  border: 1px solid ${({ theme }) => theme.colors.borderLight};
  
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      90deg,
      transparent 0%,
      ${({ theme }) => theme.colors.backgroundSecondary}40 50%,
      transparent 100%
    );
    animation: ${shimmer} 2s infinite;
  }
`;

const SkeletonImage = styled.div`
  width: 100%;
  height: 280px;
  background: ${({ theme }) => theme.colors.backgroundSecondary};
`;

const SkeletonContent = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
`;

const SkeletonTitle = styled.div`
  height: 28px;
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  width: 80%;
`;

const SkeletonText = styled.div`
  height: 20px;
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  
  &:last-child {
    width: 60%;
  }
`;

// Enhanced case study card with sophisticated interactions
const CaseStudyCard = styled(Link)`
  text-decoration: none;
  display: block;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  transition: all ${({ theme }) => theme.transitions.base};
  border: 1px solid ${({ theme }) => theme.colors.borderLight};
  position: relative;
  cursor: pointer;
  
  /* Multi-layer hover effect */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(
      90deg,
      ${({ theme }) => theme.colors.secondary} 0%,
      ${({ theme }) => theme.colors.accent} 100%
    );
    transform: scaleX(0);
    transform-origin: left;
    transition: transform ${({ theme }) => theme.transitions.base};
    z-index: 10;
  }
  
  /* Subtle glow effect */
  &::after {
    content: '';
    position: absolute;
    inset: -1px;
    border-radius: inherit;
    background: linear-gradient(
      135deg,
      transparent 40%,
      ${({ theme }) => theme.colors.secondary}10 50%,
      ${({ theme }) => theme.colors.accent}05 60%,
      transparent 70%
    );
    opacity: 0;
    transition: opacity ${({ theme }) => theme.transitions.slow};
    pointer-events: none;
    z-index: 1;
  }

  &:hover {
    transform: translateY(-2px) scale(1.005);
    box-shadow: 
      ${({ theme }) => theme.shadows.xl},
      0 0 30px ${({ theme }) => theme.colors.secondary}15;
    border-color: ${({ theme }) => theme.colors.borderLight};
    
    &::before {
      transform: scaleX(1);
    }
    
    &::after {
      opacity: 1;
      animation: ${glowPulse} 2s ease-in-out infinite;
    }
    
    img, video {
      transform: scale(1.05);
      filter: brightness(1.05) saturate(1.1);
    }
    
    h2 {
      background: linear-gradient(
        135deg,
        ${({ theme }) => theme.colors.primary} 0%,
        ${({ theme }) => theme.colors.secondary} 100%
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
  }
  
  &:active {
    transform: scale(0.99);
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    &:active {
      transform: scale(0.98);
    }
  }
`;

const MediaWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 280px;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.backgroundSecondary};
`;

const CaseStudyImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all ${({ theme }) => theme.transitions.slow};
  will-change: transform, filter;
`;

const CaseStudyVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all ${({ theme }) => theme.transitions.slow};
  will-change: transform, filter;
`;

// Content with refined spacing rhythm
const CaseStudyContent = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  position: relative;
  z-index: 2;
  
  /* Spacing rhythm between elements */
  > * + * {
    margin-top: ${({ theme }) => theme.spacing.xs};
  }
  
  h2 + p {
    margin-top: ${({ theme }) => theme.spacing.xs};
  }
  
  p + div {
    margin-top: ${({ theme }) => theme.spacing.base};
  }
`;

const CaseStudyTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.primary};
  letter-spacing: ${({ theme }) => theme.letterSpacing.tight};
  line-height: ${({ theme }) => theme.lineHeights.tight};
  transition: all ${({ theme }) => theme.transitions.base};
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary} 0%,
    ${({ theme }) => theme.colors.primary} 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const CaseStudyDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.base};
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
  letter-spacing: ${({ theme }) => theme.letterSpacing.normal};
`;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const TagBadge = styled.span`
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  color: ${({ theme }) => theme.colors.textSecondary};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  border: 1px solid ${({ theme }) => theme.colors.borderLight};
  transition: all ${({ theme }) => theme.transitions.fast};
  
  ${CaseStudyCard}:hover & {
    background: ${({ theme }) => theme.colors.backgroundTertiary};
    border-color: ${({ theme }) => theme.colors.border};
  }
`;

const NoResults = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing['4xl']};
  animation: ${fadeInUp} 0.5s ${({ theme }) => theme.transitions.easeOut};
  
  h3 {
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: ${({ theme }) => theme.spacing.base};
    font-size: ${({ theme }) => theme.fontSizes['2xl']};
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
  }
  
  p {
    font-size: ${({ theme }) => theme.fontSizes.lg};
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const getImage = (path) => {
  if (!path) return null;
  return imageMap[path] || null;
};

const CaseStudies = () => {
  const [filteredStudies, setFilteredStudies] = useState(caseStudiesData.caseStudies);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading state
  useEffect(() => {
    setTimeout(() => setIsLoading(false), 800);
  }, []);

  // Merge case study data with details
  const enrichedCaseStudies = caseStudiesData.caseStudies.map(study => {
    const details = caseStudyDetailsData.caseStudyDetails.find(d => d.id === study.id);
    return {
      ...study,
      ...details,
      tags: details?.tags || {}
    };
  });

  // Get preview tags for each study
  const getPreviewTags = (tags) => {
    const previewTags = [];
    
    if (tags.roles && tags.roles.length > 0) {
      previewTags.push(...tags.roles.slice(0, 1));
    }
    if (tags.skills && tags.skills.length > 0) {
      previewTags.push(...tags.skills.slice(0, 2));
    }
    
    return previewTags.slice(0, 3);
  };

  return (
    <PageWrapper>
      <PageHeader>
        <Title>Selected Work</Title>
        <Subtitle>
          AI product design and strategic innovation projects showcasing 
          human-centered design, technical execution, and business impact.
        </Subtitle>
      </PageHeader>

      <CaseStudyFilters 
        caseStudies={enrichedCaseStudies}
        onFilter={setFilteredStudies}
      />

      {isLoading ? (
        <CaseStudyGrid>
          {[...Array(6)].map((_, index) => (
            <SkeletonCard key={index}>
              <SkeletonImage />
              <SkeletonContent>
                <SkeletonTitle />
                <SkeletonText />
                <SkeletonText />
              </SkeletonContent>
            </SkeletonCard>
          ))}
        </CaseStudyGrid>
      ) : filteredStudies.length > 0 ? (
        <CaseStudyGrid>
          {filteredStudies.map((study) => {
            const enrichedStudy = enrichedCaseStudies.find(s => s.id === study.id);
            const previewTags = enrichedStudy ? getPreviewTags(enrichedStudy.tags) : [];
            
            return (
              <CaseStudyCard key={study.id} to={`/case-study/${study.id}`}>
                <MediaWrapper>
                  {study.thumbnail_type === 'video' ? (
                    <CaseStudyVideo 
                      muted
                      autoPlay
                      loop
                      playsInline
                    >
                      <source src={getImage(study.thumbnail)} />
                    </CaseStudyVideo>
                  ) : (
                    <CaseStudyImage 
                      src={getImage(study.thumbnail)} 
                      alt={study.title}
                      loading="lazy"
                      onError={(e) => {
                        console.warn(`Failed to load image: ${study.thumbnail}`);
                        e.target.style.display = 'none';
                      }}
                    />
                  )}
                </MediaWrapper>
                <CaseStudyContent>
                  <CaseStudyTitle>{study.title}</CaseStudyTitle>
                  <CaseStudyDescription>{study.description}</CaseStudyDescription>
                  {previewTags.length > 0 && (
                    <TagContainer>
                      {previewTags.map((tag, index) => (
                        <TagBadge key={index}>{tag}</TagBadge>
                      ))}
                    </TagContainer>
                  )}
                </CaseStudyContent>
              </CaseStudyCard>
            );
          })}
        </CaseStudyGrid>
      ) : (
        <NoResults>
          <h3>No case studies match your filters</h3>
          <p>Try adjusting your search criteria or clearing filters</p>
        </NoResults>
      )}
    </PageWrapper>
  );
};

export default CaseStudies;