import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// Import the images
import appleThumbnail from '../images/apple-thumbnail.jpg';
import ironnetThumbnail from '../images/ironnet-thumbnail.gif';
import magicLeapThumbnail from '../images/magic-leap-thumbnail.gif';
import petalBrowClickThumbnail from '../images/petal-brow-click-thumbnail.gif';
import petalMetricsThumbnail from '../images/petal-metrics-thumbnail.gif';

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

const CaseStudyTitle = styled.h2`
  margin: 0.5rem 0;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text};
  padding: 1rem;
`;

const caseStudies = [
  { id: 1, title: "Apple: Product Design Lead", image: appleThumbnail },
  { id: 2, title: "IronNet: UX Design Manager", image: ironnetThumbnail },
  { id: 3, title: "Magic Leap: Interaction Design", image: magicLeapThumbnail },
  { id: 4, title: "Petal: Brow Click Interface", image: petalBrowClickThumbnail },
  { id: 5, title: "Petal: Metrics Dashboard", image: petalMetricsThumbnail },
];

const CaseStudies = () => {
  return (
    <>
      <h1>Case Studies</h1>
      <CaseStudyGrid>
        {caseStudies.map((study) => (
          <CaseStudyCard key={study.id} to={`/case-study/${study.id}`}>
            <CaseStudyImage src={study.image} alt={study.title} />
            <CaseStudyTitle>{study.title}</CaseStudyTitle>
          </CaseStudyCard>
        ))}
      </CaseStudyGrid>
    </>
  );
};

export default CaseStudies;