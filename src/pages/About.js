import React from 'react';
import styled from 'styled-components';
import RichText from '../components/RichText';
import aboutData from '../data/about.json';
import { imageMap } from '../utils/imageImports';

const AboutWrapper = styled.div`
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

const ProfileImageContainer = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    margin-bottom: 1.5rem;
  }
`;

const ProfileImage = styled.img`
  width: 100%;
  max-width: 400px;
  height: auto;
  border-radius: 8px;
  display: inline-block;
  
  @media (max-width: 768px) {
    max-width: 100%;
    border-radius: 4px;
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

const FactsSection = styled.section`
  margin-top: 2rem;
  
  @media (max-width: 768px) {
    margin-top: 1.5rem;
  }
`;

const FactsTitle = styled.h2`
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 1.375rem;
    margin-bottom: 0.75rem;
  }
`;

const FactsList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    margin-bottom: 1.5rem;
  }
`;

const FactItem = styled.li`
  margin-bottom: 0.5rem;
  padding-left: 1.5rem;
  position: relative;
  line-height: 1.6;

  &:before {
    content: "•";
    position: absolute;
    left: 0;
    color: ${({ theme }) => theme.colors.primary};
  }
  
  @media (max-width: 768px) {
    margin-bottom: 0.625rem;
    padding-left: 1.25rem;
    font-size: 0.95rem;
  }
`;

const ContentSection = styled.div`
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    margin-bottom: 1.5rem;
  }
`;

const About = () => {
  // Verify data loaded
  if (!aboutData) {
    console.warn('About data not found');
    return <AboutWrapper>Loading...</AboutWrapper>;
  }

  // Check for required image
  const profileImageSrc = imageMap[aboutData.profileImage];
  if (!profileImageSrc) {
    console.warn(`Profile image not found: ${aboutData.profileImage}`);
  }

  return (
    <AboutWrapper>
      <PageTitle>{aboutData.headline}</PageTitle>
      <Introduction>{aboutData.introduction}</Introduction>
      
      {profileImageSrc && (
        <ProfileImageContainer>
          <ProfileImage 
            src={profileImageSrc}
            alt="Dan Schmitz Profile"
            onError={(e) => {
              console.warn(`Failed to load profile image: ${aboutData.profileImage}`);
              e.target.style.display = 'none';
            }}
          />
        </ProfileImageContainer>
      )}

      <ContentSection>
        <RichText content={aboutData.content} />
      </ContentSection>
      
      {aboutData.facts && aboutData.facts.length > 0 && (
        <FactsSection>
          <FactsTitle>Quick Facts</FactsTitle>
          <FactsList>
            {aboutData.facts.map((fact, index) => (
              <FactItem key={index}>{fact}</FactItem>
            ))}
          </FactsList>
        </FactsSection>
      )}
    </AboutWrapper>
  );
};

export default About;