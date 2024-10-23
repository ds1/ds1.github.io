import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import caseStudiesData from '../data/caseStudies.json';
import { imageMap } from '../utils/imageImports';

const CaseStudyGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

const CaseStudyCard = styled(Link)`
  text-decoration: none;
  color: inherit;
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const CaseStudyImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const CardContent = styled.div`
  padding: 1.5rem;
`;

const CaseStudyTitle = styled.h2`
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.text};
`;

const CaseStudyDescription = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.875rem;
  line-height: 1.5;
`;

const CaseStudies = () => {
  // Verify data loaded
  if (!caseStudiesData || !caseStudiesData.caseStudies) {
    console.warn('Case studies data not found');
    return (
      <>
        <h1>Case Studies</h1>
        <p>Loading...</p>
      </>
    );
  }

  return (
    <>
      <h1>Case Studies</h1>
      <p>This is an experimental website I am developing using AI. This is not my current UX portfolio website. To see the latest, visit <a href="https://danschmitz.work" target="_blank" rel="noopener noreferrer">danschmitz.work</a></p>
      <CaseStudyGrid>
        {caseStudiesData.caseStudies.map((study) => {
          const imageSrc = imageMap[study.thumbnail];
          if (!imageSrc) {
            console.warn(`Image not found for case study: ${study.title}`, study.thumbnail);
          }

          return (
            <CaseStudyCard key={study.id} to={`/case-study/${study.id}`}>
              {imageSrc && (
                <CaseStudyImage 
                  src={imageSrc} 
                  alt={study.title}
                  onError={(e) => {
                    console.warn(`Failed to load image for case study: ${study.title}`);
                    e.target.style.display = 'none';
                  }}
                />
              )}
              <CardContent>
                <CaseStudyTitle>{study.title}</CaseStudyTitle>
                <CaseStudyDescription>{study.description}</CaseStudyDescription>
              </CardContent>
            </CaseStudyCard>
          );
        })}
      </CaseStudyGrid>
    </>
  );
};

export default CaseStudies;