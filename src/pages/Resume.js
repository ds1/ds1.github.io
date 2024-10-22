import React from 'react';
import styled from 'styled-components';
import RichText from '../components/RichText';
import resumeData from '../data/resume.json';

const ResumeWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 0;
`;

const Introduction = styled.p`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 2rem;
  line-height: 1.5;
`;

const DownloadButton = styled.a`
  display: inline-block;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.background};
  padding: 0.5rem 1rem;
  text-decoration: none;
  border-radius: 4px;
  margin: 2rem 0;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;

const Resume = () => {
  return (
    <ResumeWrapper>
      <h1>{resumeData.title}</h1>
      
      <Introduction>{resumeData.introduction}</Introduction>
      
      <DownloadButton 
        href={resumeData.downloadLink} 
        download
        aria-label="Download Resume PDF"
      >
        Download Resume (PDF)
      </DownloadButton>
      
      <RichText content={resumeData.content} />

      <DownloadButton 
        href={resumeData.downloadLink} 
        download
        aria-label="Download Resume PDF"
      >
        Download Resume (PDF)
      </DownloadButton>
    </ResumeWrapper>
  );
};

export default Resume;