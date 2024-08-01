import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const CaseStudyGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
`;

const CaseStudyCard = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const CaseStudyImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
`;

const CaseStudyTitle = styled.h2`
  margin: 0.5rem 0;
  font-size: 1rem;
`;

const caseStudies = [
  { id: 1, title: "Magic Leap", image: "/images/magic-leap-thumbnail.jpg" },
  { id: 2, title: "Meta", image: "/images/meta-thumbnail.jpg" },
  { id: 3, title: "Another Meta Project", image: "/images/another-meta-thumbnail.jpg" },
  { id: 4, title: "Intel", image: "/images/intel-thumbnail.jpg" },
];

const CaseStudies = () => {
  return (
    <CaseStudyGrid>
      {caseStudies.map((study) => (
        <CaseStudyCard key={study.id} to={`/case-study/${study.id}`}>
          <CaseStudyImage src={study.image} alt={study.title} />
          <CaseStudyTitle>{study.title}</CaseStudyTitle>
        </CaseStudyCard>
      ))}
    </CaseStudyGrid>
  );
};

export default CaseStudies;