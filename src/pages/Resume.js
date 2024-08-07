import React from 'react';
import styled from 'styled-components';

const ResumeWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 0;
`;

const ResumeSection = styled.section`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  border-bottom: 2px solid ${({ theme }) => theme.colors.primary};
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
`;

const JobTitle = styled.h3`
  margin-bottom: 0.5rem;
`;

const Company = styled.h4`
  margin-bottom: 0.5rem;
  font-weight: normal;
`;

const DateRange = styled.p`
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const List = styled.ul`
  padding-left: 1.5rem;
`;

const DownloadButton = styled.a`
  display: inline-block;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.background};
  padding: 0.5rem 1rem;
  text-decoration: none;
  border-radius: 4px;
  margin-top: 1rem;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;

const Resume = () => {
  return (
    <ResumeWrapper>
      <h1>Dan Schmitz</h1>
      <p>Email: dan@schmitz.ai | Website: https://danschmitz.work | Location: Boulder, Colorado</p>

      <DownloadButton href="/DanSchmitzResume.pdf" download>Download Full Resume (PDF)</DownloadButton>
    </ResumeWrapper>
  );
};

export default Resume;