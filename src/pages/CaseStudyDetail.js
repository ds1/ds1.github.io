import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import RichText from '../components/RichText';
import caseStudyDetailsData from '../data/caseStudyDetails.json';

// Import all images
import appleThumbnail from '../images/apple-thumbnail.jpg';
import ironnetThumbnail from '../images/ironnet-thumbnail.gif';
import magicLeapThumbnail from '../images/magic-leap-thumbnail.gif';
import petalBrowClickThumbnail from '../images/petal-brow-click-thumbnail.gif';
import petalMetricsThumbnail from '../images/petal-metrics-thumbnail.gif';

// Image mapping object
const imageMap = {
  '../src/images/apple-thumbnail.jpg': appleThumbnail,
  '../src/images/ironnet-thumbnail.gif': ironnetThumbnail,
  '../src/images/magic-leap-thumbnail.gif': magicLeapThumbnail,
  '../src/images/petal-brow-click-thumbnail.gif': petalBrowClickThumbnail,
  '../src/images/petal-metrics-thumbnail.gif': petalMetricsThumbnail
};

const Wrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  margin-bottom: 2rem;
  padding: 0;

  &:hover {
    text-decoration: underline;
  }
`;

const Header = styled.header`
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.h2`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 1.25rem;
  font-weight: normal;
  margin-bottom: 1rem;
`;

const Metadata = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 2rem;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 1rem;
`;

const ImageGrid = styled.div`
  margin-top: 3rem;
`;

const Figure = styled.figure`
  margin-bottom: 2rem;
`;

const Caption = styled.figcaption`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.875rem;
  text-align: center;
  margin-top: 0.5rem;
`;

const CaseStudyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const caseStudy = caseStudyDetailsData.caseStudyDetails.find(
    study => study.id === parseInt(id)
  );

  if (!caseStudy) {
    return (
      <Wrapper>
        <BackButton onClick={() => navigate('/')}>← Back to Case Studies</BackButton>
        <Title>Case study not found</Title>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <BackButton onClick={() => navigate('/')}>← Back to Case Studies</BackButton>
      
      <Header>
        <Title>{caseStudy.title}</Title>
        <Subtitle>{caseStudy.subtitle}</Subtitle>
        <Metadata>
          {caseStudy.duration} • {caseStudy.role} • {caseStudy.company}
        </Metadata>
        <Image src={caseStudy.thumbnail} alt={caseStudy.title} />
      </Header>

      <RichText content={caseStudy.content} />
      
      {caseStudy.images?.length > 0 && (
        <ImageGrid>
          {caseStudy.images.map((image, index) => (
            <Figure key={index}>
              <Image src={image.src} alt={image.alt} />
              <Caption>{image.caption}</Caption>
            </Figure>
          ))}
        </ImageGrid>
      )}
    </Wrapper>
  );
};

export default CaseStudyDetail;