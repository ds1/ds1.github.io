import React from 'react';
import styled from 'styled-components';
import RichText from '../components/RichText';
import aboutData from '../data/about.json';

// Direct image import
import danEldorado from '../images/dan-eldorado.jpg';

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
  return (
    <AboutWrapper>
      <h1>{aboutData.headline}</h1>
      <Introduction>{aboutData.introduction}</Introduction>
      <ProfileImage 
        src={danEldorado}  // Use imported image directly
        alt="Dan Schmitz"
      />
      
      <RichText content={aboutData.content} />
      
      <h2>Quick Facts</h2>
      <FactsList>
        {aboutData.facts.map((fact, index) => (
          <FactItem key={index}>{fact}</FactItem>
        ))}
      </FactsList>
    </AboutWrapper>
  );
};

export default About;