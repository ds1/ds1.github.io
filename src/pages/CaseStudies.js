import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import caseStudiesData from '../data/caseStudies.json';
import { imageMap } from '../utils/imageImports';

console.log('Working image paths:', caseStudiesData.caseStudies.map(study => study.thumbnail));
console.log('imageMap contents:', imageMap);

const PageTitle = styled.h1`
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 1.75rem; // Smaller on mobile
    margin-bottom: 0.75rem;
  }
`;

const IntroText = styled.p`
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  
  @media (max-width: 768px) {
    font-size: 0.95rem;
    margin-bottom: 1.5rem;
  }
`;

const CaseStudyGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr; // Single column on mobile
    gap: 1.5rem;
  }
  
  @media (max-width: 480px) {
    gap: 1.25rem;
  }
`;

const CaseStudyCard = styled(Link)`
  text-decoration: none;
  color: inherit;
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  // Add touch feedback for mobile
  -webkit-tap-highlight-color: transparent;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
  
  @media (max-width: 768px) {
    &:hover {
      transform: none; // Disable hover transform on mobile
    }
    
    &:active {
      transform: scale(0.98); // Touch feedback
      box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
    }
  }
`;

const CaseStudyImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  
  @media (max-width: 768px) {
    height: 180px; // Slightly shorter on mobile
  }
  
  @media (max-width: 480px) {
    height: 160px; // Even shorter on very small screens
  }
`;

const CardContent = styled.div`
  padding: 1.5rem;
  
  @media (max-width: 768px) {
    padding: 1.25rem;
  }
  
  @media (max-width: 480px) {
    padding: 1rem;
  }
`;

const CaseStudyTitle = styled.h2`
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.text};
  
  @media (max-width: 768px) {
    font-size: 1.125rem; // Slightly smaller on mobile
  }
`;

const CaseStudyDescription = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.875rem;
  line-height: 1.5;
  
  @media (max-width: 768px) {
    font-size: 0.875rem; // Keep same size but could adjust if needed
    line-height: 1.6; // Slightly more line height for readability
  }
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
      <PageTitle>Case Studies</PageTitle>
      <IntroText>This is an experimental website I am developing using AI...</IntroText>
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