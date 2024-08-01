import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const CaseStudyWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const CaseStudyTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 2rem;
`;

const CaseStudyImage = styled.img`
  width: 100%;
  height: auto;
  margin-bottom: 2rem;
`;

const CaseStudySection = styled.section`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const caseStudyData = {
  1: {
    title: "Magic Leap",
    images: [
      "/images/magic-leap-detail1.jpg",
      "/images/magic-leap-detail2.jpg",
      "/images/magic-leap-detail3.jpg",
    ],
    overview: "",
    designObjectives: ["Objective 1", "Objective 2"],
    // other details...
  },
  2: {
    title: "Meta",
    images: [
      "/images/magic-leap-detail1.jpg",
      "/images/magic-leap-detail2.jpg",
      "/images/magic-leap-detail3.jpg",
    ],
    overview: "",
    designObjectives: ["Objective 1", "Objective 2"],
    // other details...
  },
  // more case studies...
};

const CaseStudyDetail = () => {
  const { id } = useParams();
  const caseStudy = caseStudyData[id];
  // Fetch case study data based on id
  // This is a placeholder, replace with actual data fetching logic
  return (
    <CaseStudyWrapper>
      <CaseStudyTitle>{caseStudy.title}</CaseStudyTitle>
       {caseStudy.images.map((image, index) => (
        <CaseStudyImage key={index} src={image} alt={`${caseStudy.title} - Image ${index + 1}`} />
      ))}
      
      <CaseStudySection>
        <SectionTitle>Overview</SectionTitle>
        <p>{caseStudy.overview}</p>
      </CaseStudySection>

      <CaseStudySection>
        <SectionTitle>Design Objectives</SectionTitle>
        <ul>
          {caseStudy.designObjectives.map((objective, index) => (
            <li key={index}>{objective}</li>
          ))}
        </ul>
      </CaseStudySection>

      {/* Add more sections as needed */}
    </CaseStudyWrapper>
  );
};

export default CaseStudyDetail;
