import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import caseStudiesData from '../data/caseStudies.json';
import { imageMap } from '../utils/imageImports';

console.log('Working image paths:', caseStudiesData.caseStudies.map(study => study.thumbnail));
console.log('imageMap contents:', imageMap);

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

  console.log('Available image mappings:', Object.keys(imageMap));

  const getImageSrc = (path) => {
    // Convert /images/ path to /src/images/
    const srcPath = path.replace('/images/', '/src/images/');
    const imageSrc = imageMap[srcPath];
    if (!imageSrc) {
      console.warn(`Image not found in imageMap. Looking for: ${srcPath}`);
      console.log('Available paths:', Object.keys(imageMap));
    }
    return imageSrc;
  };

  return (
    <>
      <h1>Case Studies</h1>
      <p>This is an experimental website I am developing using AI...</p>
      <CaseStudyGrid>
        {caseStudiesData.caseStudies.map((study) => {
          const imageSrc = getImageSrc(study.thumbnail);
          
          return (
            <CaseStudyCard key={study.id} to={`/case-study/${study.id}`}>
              {imageSrc && (
                <CaseStudyImage 
                  src={imageSrc} 
                  alt={study.title}
                  onError={(e) => {
                    console.warn(`Failed to load image for case study: ${study.title}`, study.thumbnail);
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