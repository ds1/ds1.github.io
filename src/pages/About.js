import React from 'react';
import styled from 'styled-components';
import RichText from '../components/RichText';
import aboutData from '../data/about.json';
import { imageMap } from '../utils/imageImports';

const AboutWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 0;
`;

const ProfileImage = styled.img`
  width: 100%;
  max-width: 400px;
  height: auto;
  border-radius: 8px;
  margin-bottom: 2rem;
`;

const Introduction = styled.p`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 2rem;
  line-height: 1.5;
`;

const FactsList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-bottom: 2rem;
`;

const FactItem = styled.li`
  margin-bottom: 0.5rem;
  padding-left: 1.5rem;
  position: relative;

  &:before {
    content: "•";
    position: absolute;
    left: 0;
    color: ${({ theme }) => theme.colors.primary};
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
      <h1>{aboutData.headline}</h1>
      <Introduction>{aboutData.introduction}</Introduction>
      
      {profileImageSrc && (
        <ProfileImage 
          src={profileImageSrc}
          alt="Dan Schmitz Profile"
          onError={(e) => {
            console.warn(`Failed to load profile image: ${aboutData.profileImage}`);
            e.target.style.display = 'none';
          }}
        />
      )}

      <RichText content={aboutData.content} />
      
      {aboutData.facts && aboutData.facts.length > 0 && (
        <>
          <h2>Quick Facts</h2>
          <FactsList>
            {aboutData.facts.map((fact, index) => (
              <FactItem key={index}>{fact}</FactItem>
            ))}
          </FactsList>
        </>
      )}
    </AboutWrapper>
  );
};

export default About;