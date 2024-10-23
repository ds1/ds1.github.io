import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import RichText from '../components/RichText';
import caseStudyDetailsData from '../data/caseStudyDetails.json';
import { imageMap } from '../utils/imageImports';

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

// Debug what paths are available in imageMap
console.log('imageMap contents:', imageMap);

const getImage = (path) => {
  if (!path) return null;
  
  // Convert /images/ path to /src/images/
  const srcPath = path.replace('/images/', '/src/images/');
  const image = imageMap[srcPath];
  
  if (!image) {
    console.warn(`Image not found in imageMap. Looking for: ${srcPath}`);
    console.log('Available paths:', Object.keys(imageMap));
  }
  return image;
};

const CaseStudyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  console.log('All Case Study Details:', caseStudyDetailsData);
  
  const caseStudy = caseStudyDetailsData.caseStudyDetails.find(
    study => study.id === parseInt(id)
  );

  console.log('Selected Case Study:', caseStudy);

  if (!caseStudy) {
    return (
      <Wrapper>
        <BackButton onClick={() => navigate('/')}>← Back to Case Studies</BackButton>
        <Title>Case study not found</Title>
      </Wrapper>
    );
  }

  console.log('Thumbnail path:', caseStudy.thumbnail);
  console.log('Mapped thumbnail:', getImage(caseStudy.thumbnail));

  if (caseStudy.images?.length) {
    console.log('Detail images:', caseStudy.images);
    caseStudy.images.forEach((image, index) => {
      console.log(`Image ${index + 1} path:`, image.src);
      console.log(`Image ${index + 1} mapped:`, getImage(image.src));
    });
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
        <Image 
          src={getImage(caseStudy.thumbnail)} 
          alt={caseStudy.title}
          onError={(e) => {
            console.warn(`Failed to load thumbnail: ${caseStudy.thumbnail}`);
            e.target.style.display = 'none';
          }}
        />
      </Header>

      <RichText content={caseStudy.content} />
      
      {caseStudy.images?.length > 0 && (
        <ImageGrid>
          {caseStudy.images.map((image, index) => (
            <Figure key={index}>
              <Image 
                src={getImage(image.src)} 
                alt={image.alt}
                onError={(e) => {
                  console.warn(`Failed to load detail image: ${image.src}`);
                  e.target.style.display = 'none';
                }}
              />
              <Caption>{image.caption}</Caption>
            </Figure>
          ))}
        </ImageGrid>
      )}
    </Wrapper>
  );
};

export default CaseStudyDetail;