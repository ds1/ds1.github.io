import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import caseStudiesData from '../data/caseStudies.json';

// Import all images
import appleThumbnail from '../images/apple-thumbnail.jpg';
import ironnetThumbnail from '../images/ironnet-thumbnail.gif';
import magicLeapThumbnail from '../images/magic-leap-thumbnail.gif';
import petalBrowClickThumbnail from '../images/petal-brow-click-thumbnail.gif';
import petalMetricsThumbnail from '../images/petal-metrics-thumbnail.gif';

// Image mapping object
const imageMap = {
  '../src/images/apple-thumbnail.jpg': appleThumbnail,
  '../src/images/ironnet-thumbnail.gif': ironnetThumbnail,
  '../src/images/magic-leap-thumbnail.gif': magicLeapThumbnail,
  '../src/images/petal-brow-click-thumbnail.gif': petalBrowClickThumbnail,
  '../src/images/petal-metrics-thumbnail.gif': petalMetricsThumbnail
};

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
    console.log('Apple Thumbnail Path:', caseStudiesData.appleThumbnail); // Debug log
    console.log('Image Map:', imageMap); // Debug log
  return (
    <>
      <h1>Case Studies</h1>
      <p>This is an experimental website I am developing using AI. This is not my current UX portfolio website. To see the latest, visit <a href="https://danschmitz.work" target="_blank" rel="noopener noreferrer">danschmitz.work</a></p>
      <CaseStudyGrid>
        {caseStudiesData.caseStudies.map((study) => (
          <CaseStudyCard key={study.id} to={`/case-study/${study.id}`}>
            <CaseStudyImage src={study.thumbnail} alt={study.title} />
            <CardContent>
              <CaseStudyTitle>{study.title}</CaseStudyTitle>
              <CaseStudyDescription>{study.description}</CaseStudyDescription>
            </CardContent>
          </CaseStudyCard>
        ))}
      </CaseStudyGrid>
    </>
  );
};

export default CaseStudies;