// src/pages/CaseStudies.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import caseStudiesData from '../data/caseStudies.json';
import caseStudyDetailsData from '../data/caseStudyDetails.json';
import { imageMap } from '../utils/imageImports';
import CaseStudyFilters from '../components/CaseStudyFilters';

const PageWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing['2xl']} ${({ theme }) => theme.spacing.lg};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.md};
  }
`;

const PageHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing['3xl']};
  max-width: 800px;
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes['6xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  letter-spacing: -0.03em;
  line-height: 1.1;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.fontSizes['4xl']};
  }
`;

const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
  font-weight: ${({ theme }) => theme.fontWeights.normal};
`;

const CaseStudyGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
  margin-top: ${({ theme }) => theme.spacing['2xl']};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.lg};
  }
`;

const CaseStudyCard = styled(Link)`
  text-decoration: none;
  display: block;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  transition: ${({ theme }) => theme.transitions.base};
  border: 1px solid ${({ theme }) => theme.colors.border};
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, 
      ${({ theme }) => theme.colors.secondary} 0%, 
      ${({ theme }) => theme.colors.accent} 100%
    );
    transform: scaleX(0);
    transform-origin: left;
    transition: transform ${({ theme }) => theme.transitions.base};
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.xl};
    border-color: transparent;
    
    &::before {
      transform: scaleX(1);
    }
    
    img, video {
      transform: scale(1.05);
    }
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
  transition: transform ${({ theme }) => theme.transitions.slow};
`;

const CaseStudyVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform ${({ theme }) => theme.transitions.slow};
`;

const CaseStudyContent = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
`;

const CaseStudyTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  letter-spacing: -0.01em;
  line-height: ${({ theme }) => theme.lineHeights.tight};
`;

const CaseStudyDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.base};
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.md};
`;

const TagBadge = styled.span`
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  color: ${({ theme }) => theme.colors.textSecondary};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const NoResults = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing['4xl']};
  
  h3 {
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: ${({ theme }) => theme.spacing.md};
    font-size: ${({ theme }) => theme.fontSizes['2xl']};
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

      {filteredStudies.length > 0 ? (
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