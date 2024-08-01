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
      <h1>Dan Schmitz - Interaction Designer</h1>
      <p>Email: dan@schmitz.ai | Website: https://danschmitz.work | Location: Boulder, Colorado</p>
      
      <ResumeSection>
        <SectionTitle>Summary</SectionTitle>
        <p>Interaction Designer with 11 years of experience in UX/UI design and technology commercialization. Seeking an Interaction Designer role to leverage expertise in user-centered design, AI integration, and team leadership.</p>
      </ResumeSection>

      <ResumeSection>
        <SectionTitle>Experience</SectionTitle>
        
        <JobTitle>Product Design Lead</JobTitle>
        <Company>Apple</Company>
        <DateRange>06/2022 - 08/2024 | Remote (Boulder, Colorado)</DateRange>
        <List>
          <li>Executed product design functions on a tactical and strategic level for a business-critical admin web application used globally</li>
          <li>Measurably improved usability and utility through research-driven user experience design</li>
          <li>Streamlined design operations and established sustainable governance systems</li>
        </List>

        {/* Add more job experiences here */}
      </ResumeSection>

      <ResumeSection>
        <SectionTitle>Education</SectionTitle>
        <JobTitle>Master of Science in Technology Commercialization</JobTitle>
        <Company>McCombs School of Business at University of Texas, Austin, Texas</Company>
        <DateRange>06/2021 - 06/2022</DateRange>
        <List>
          <li>4.0 GPA and Valedictorian</li>
          <li>Gained practical experience in new venture development, product management, technology transfer and commercialization</li>
        </List>
      </ResumeSection>

      <ResumeSection>
        <SectionTitle>Skills</SectionTitle>
        <p><strong>Hard skills:</strong> Design artifact production, Mockups, Specifications, Wireframing, Interaction design, Visual design, Flow mapping, User journeys, User research, Prototype development</p>
        <p><strong>Soft skills:</strong> Written and oral communication, Strategic thinking, Problem-solving, Active listening, Empathy, Adaptability, Creative thinking, Teamwork, Leadership</p>
        <p><strong>Tools:</strong> Figma, Sketch, Adobe Creative Suite, JIRA, Python, Unity, Git, React</p>
      </ResumeSection>

      <DownloadButton href="/DanSchmitzResume.pdf" download>Download Full Resume (PDF)</DownloadButton>
    </ResumeWrapper>
  );
};

export default Resume;