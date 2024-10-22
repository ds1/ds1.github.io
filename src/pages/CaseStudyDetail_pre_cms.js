import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

// Import the images
import appleThumbnail from '../images/apple-thumbnail.jpg';
import ironnetThumbnail from '../images/ironnet-thumbnail.gif';
import magicLeapThumbnail from '../images/magic-leap-thumbnail.gif';
import petalBrowClickThumbnail from '../images/petal-brow-click-thumbnail.gif';
import petalMetricsThumbnail from '../images/petal-metrics-thumbnail.gif';

const CaseStudyWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: 8px;
`;

const CaseStudyImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 2rem;
`;

const CaseStudyTitle = styled.h1`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1rem;
`;

const caseStudies = [
  { id: 1, title: "Apple: Product Design Lead", image: appleThumbnail, content: "Content for Apple case study..." },
  { id: 2, title: "IronNet: UX Design Manager", image: ironnetThumbnail, content: "Content for IronNet case study..." },
  { id: 3, title: "Magic Leap: Interaction Design", image: magicLeapThumbnail, content: "Content for Magic Leap case study..." },
  { id: 4, title: "Petal: Brow Click Interface", image: petalBrowClickThumbnail, content: "Content for Petal Brow Click case study..." },
  { id: 5, title: "Petal: Metrics Dashboard", image: petalMetricsThumbnail, content: "Content for Petal Metrics case study..." },
];

const CaseStudyDetail = () => {
  const { id } = useParams();
  const caseStudy = caseStudies.find(study => study.id === parseInt(id));

  if (!caseStudy) {
    return <div>Case study not found</div>;
  }

  return (
    <CaseStudyWrapper>
      <CaseStudyTitle>{caseStudy.title}</CaseStudyTitle>
      <CaseStudyImage src={caseStudy.image} alt={caseStudy.title} />
      <div>{caseStudy.content}</div>
    </CaseStudyWrapper>
  );
};

export default CaseStudyDetail;