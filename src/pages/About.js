import React from 'react';
import styled from 'styled-components';
import danEldoradoImage from '../images/dan-eldorado.jpg';

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

const Heading = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.primary};
`;

const Bio = styled.p`
  margin-bottom: 2rem;
  line-height: 1.6;
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

const HobbySection = styled.div`
  margin-top: 2rem;
`;

const About = () => {
  return (
    <AboutWrapper>
      <ProfileImage src={danEldoradoImage} alt="Dan Schmitz at Eldorado Canyon State Park" />
      <Heading>Hi, I'm Dan Schmitz</Heading>
      <Bio>
        I'm a foresight professional with 11 years of experience in experience design, strategy, and technology commercialization. Seeking a professional strategic foresight role to leverage expertise in innovation design, strategy, and team leadership. Aiming to drive organizational innovation with a blend of strategic thinking and technical skills, backed by a Master's in Technology Commercialization (valedictorian) and a proven track record of transforming concepts into successful, market-validated products. Committed to applying academic excellence and industry experience to bring diverse, future-relevant inputs, forecasts, and possible alternative futures to strategy discussions, decision-making and planning.
      </Bio>
      <h2>The Facts</h2>
      <FactsList>
        <FactItem>I co-created this portfolio site with an ai agent</FactItem>
        <FactItem>11 years of professional product design and prototyping experience</FactItem>
        <FactItem>Master of Science in Technology Commercialization from the McCombs Business School at the University of Texas (Valedictorian)</FactItem>
        <FactItem>AI-Neurotechnology startup founder</FactItem>
        <FactItem>Amateur paleontologist</FactItem>
        <FactItem>Grandmaster of RISK: Global Domination</FactItem>
      </FactsList>
    </AboutWrapper>
  );
};

export default About;