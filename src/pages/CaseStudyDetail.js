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

const CaseStudyDetail = () => {
  const { id } = useParams();

  // Fetch case study data based on id
  // This is a placeholder, replace with actual data fetching logic
  const caseStudy = {
    title: "Magic Leap",
    image: "/path-to-magic-leap-image.jpg",
    overview: "Overview content...",
    designObjectives: ["Objective 1", "Objective 2"],
    // Add more sections as needed
  };

  return (
    <CaseStudyWrapper>
      <CaseStudyTitle>{caseStudy.title}</CaseStudyTitle>
      <CaseStudyImage src={caseStudy.image} alt={caseStudy.title} />
      
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