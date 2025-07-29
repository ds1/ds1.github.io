import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import caseStudiesData from '../data/caseStudies.json';
import caseStudyDetailsData from '../data/caseStudyDetails.json';
import { imageMap } from '../utils/imageImports';
import CaseStudyFilters from '../components/CaseStudyFilters';
import { tagCategoryColors, getTagColor } from '../utils/tagConfig';

const PageHeader = styled.div`
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.6;
`;

const ExternalLink = styled.a`
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const CaseStudyGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

const CaseStudyCard = styled(Link)`
  text-decoration: none;
  color: inherit;
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  }
`;

const CaseStudyImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const CaseStudyContent = styled.div`
  padding: 1.5rem;
`;

const CaseStudyTitle = styled.h2`
  margin: 0 0 0.5rem 0;
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.text};
`;

const CaseStudyDescription = styled.p`
  margin: 0 0 1rem 0;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.5;
`;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
  margin-top: 0.75rem;
`;

const TagBadge = styled.span`
  padding: 0.25rem 0.5rem;
  background-color: ${({ $category }) => getTagColor($category, 0.15)};
  color: ${({ $category }) => tagCategoryColors[$category]};
  border: 1px solid ${({ $category }) => getTagColor($category, 0.3)};
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
`;

const NoResults = styled.div`
  text-align: center;
  padding: 3rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const getImage = (path) => {
  if (!path) return null;
  return imageMap[path] || null;
};

const CaseStudies = () => {
  const [filteredStudies, setFilteredStudies] = useState(caseStudiesData.caseStudies);

  // Merge case study data with details (including tags)
  const enrichedCaseStudies = caseStudiesData.caseStudies.map(study => {
    const details = caseStudyDetailsData.caseStudyDetails.find(d => d.id === study.id);
    return {
      ...study,
      tags: details?.tags || {}
    };
  });

  // Get preview tags for each study (limit to 3-4 most important)
  const getPreviewTags = (tags) => {
    const previewTags = [];
    
    // Priority order: roles, skills, design tools
    if (tags.roles && tags.roles.length > 0) {
      previewTags.push(...tags.roles.slice(0, 1).map(tag => ({ tag, category: 'roles' })));
    }
    if (tags.skills && tags.skills.length > 0) {
      previewTags.push(...tags.skills.slice(0, 2).map(tag => ({ tag, category: 'skills' })));
    }
    if (tags.designTools && tags.designTools.length > 0) {
      previewTags.push(...tags.designTools.slice(0, 1).map(tag => ({ tag, category: 'designTools' })));
    }
    
    return previewTags.slice(0, 4);
  };

  return (
    <>
      <PageHeader>
        <Title>Case Studies</Title>
        <Subtitle>
          This is an experimental website I am developing using AI. This is not my current UX portfolio website. 
          To see the latest, visit <ExternalLink href="https://danschmitz.work" target="_blank" rel="noopener noreferrer">https://danschmitz.work</ExternalLink>
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
                <CaseStudyImage 
                  src={getImage(study.thumbnail)} 
                  alt={study.title}
                  onError={(e) => {
                    console.warn(`Failed to load image: ${study.thumbnail}`);
                    e.target.style.display = 'none';
                  }}
                />
                <CaseStudyContent>
                  <CaseStudyTitle>{study.title}</CaseStudyTitle>
                  <CaseStudyDescription>{study.description}</CaseStudyDescription>
                  {previewTags.length > 0 && (
                    <TagContainer>
                      {previewTags.map((tagInfo, index) => (
                        <TagBadge key={index} $category={tagInfo.category}>
                          {tagInfo.tag}
                        </TagBadge>
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
    </>
  );
};

export default CaseStudies;