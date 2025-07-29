import React from 'react';
import styled from 'styled-components';
import RichText from '../components/RichText';
import resumeData from '../data/resume.json';

const ResumeWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 0;
  
  @media (max-width: 768px) {
    padding: 1rem 0;
  }
`;

const PageTitle = styled.h1`
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    font-size: 1.75rem;
    margin-bottom: 1rem;
  }
`;

const Introduction = styled.p`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 2rem;
  line-height: 1.5;
  
  @media (max-width: 768px) {
    font-size: 1.125rem;
    margin-bottom: 1.5rem;
    line-height: 1.6;
  }
  
  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const DownloadButton = styled.a`
  display: inline-block;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.background};
  padding: 0.75rem 1.5rem;
  text-decoration: none;
  border-radius: 4px;
  margin: 2rem 0;
  transition: background-color 0.2s ease, transform 0.2s ease;
  font-weight: 500;
  text-align: center;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
    transform: translateY(-2px);
  }
  
  @media (max-width: 768px) {
    display: block; // Full width on mobile
    width: 100%;
    padding: 1rem 1.5rem;
    margin: 1.5rem 0;
    font-size: 1rem;
    min-height: auto; // Override global link min-height
    line-height: 1.6;
    
    &:hover {
      transform: none; // Disable hover transform on mobile
    }
    
    &:active {
      transform: scale(0.98); // Touch feedback
      background-color: ${({ theme }) => theme.colors.secondary};
    }
  }
`;

const ContentSection = styled.div`
  margin-top: 2rem;
  
  @media (max-width: 768px) {
    margin-top: 1.5rem;
  }
`;

const ResumeContent = styled.div`
  h2 {
    margin-top: 2.5rem;
    margin-bottom: 1.25rem;
    
    @media (max-width: 768px) {
      margin-top: 2rem;
      margin-bottom: 1rem;
      font-size: 1.375rem;
    }
  }
  
  h3 {
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
    color: ${({ theme }) => theme.colors.primary};
    
    @media (max-width: 768px) {
      margin-top: 1.25rem;
      margin-bottom: 0.5rem;
      font-size: 1.125rem;
    }
  }
  
  ul {
    @media (max-width: 768px) {
      padding-left: 1.25rem;
    }
  }
  
  li {
    @media (max-width: 768px) {
      margin-bottom: 0.5rem;
      font-size: 0.95rem;
      line-height: 1.6;
    }
  }
`;

const Resume = () => {
  return (
    <ResumeWrapper>
      <PageTitle>{resumeData.title}</PageTitle>
      
      <Introduction>{resumeData.introduction}</Introduction>
      
      <DownloadButton 
        href={resumeData.downloadLink} 
        download
        aria-label="Download Resume PDF"
      >
        Download Resume (PDF)
      </DownloadButton>
      
      <ContentSection>
        <ResumeContent>
          <RichText content={resumeData.content} />
        </ResumeContent>
      </ContentSection>
    </ResumeWrapper>
  );
};

export default Resume;