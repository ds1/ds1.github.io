import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import RichText from '../components/RichText';
import caseStudyDetailsData from '../data/caseStudyDetails.json';
import { imageMap } from '../utils/imageImports';

// Helper function to safely get image from map
const getImage = (path) => {
  if (!path) return null;
  const image = imageMap[path];
  if (!image) {
    console.warn(`Image not found for path: ${path}`);
    return null;
  }
  return image;
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

  // Debug log for all case study details
  console.log('All Case Study Details:', caseStudyDetailsData);

  const caseStudy = caseStudyDetailsData.caseStudyDetails.find(
    study => study.id === parseInt(id)
  );

  // Debug log for found case study
  console.log('Selected Case Study:', caseStudy);

  if (!caseStudy) {
    console.log('No case study found for id:', id);
    return (
      <Wrapper>
        <BackButton onClick={() => navigate('/')}>← Back to Case Studies</BackButton>
        <Title>Case study not found</Title>
      </Wrapper>
    );
  }

  // Debug logs for image paths
  console.log('Thumbnail path:', caseStudy.thumbnail);
  console.log('Mapped thumbnail:', imageMap[caseStudy.thumbnail]);
  
  if (caseStudy.images?.length > 0) {
    console.log('Detail images:', caseStudy.images);
    caseStudy.images.forEach((image, index) => {
      console.log(`Image ${index + 1} path:`, image.src);
      console.log(`Image ${index + 1} mapped:`, imageMap[image.src]);
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
        {getImage(caseStudy.thumbnail) && (
          <Image 
            src={getImage(caseStudy.thumbnail)} 
            alt={caseStudy.title}
            onError={(e) => {
              console.warn(`Failed to load image: ${caseStudy.thumbnail}`);
              e.target.style.display = 'none'; // Hide broken image
              // Or set a placeholder: e.target.src = placeholderImage;
            }}
          />
        )}
      </Header>

      <RichText content={caseStudy.content} />
      
      {caseStudy.images?.length > 0 && (
        <ImageGrid>
          {caseStudy.images.map((image, index) => {
            const imageSrc = getImage(image.src);
            if (!imageSrc) return null; // Skip if image not found

            return (
              <Figure key={index}>
                <Image 
                  src={imageSrc} 
                  alt={image.alt}
                  onError={(e) => {
                    console.warn(`Failed to load image: ${image.src}`);
                    e.target.style.display = 'none'; // Hide broken image
                    // Or set a placeholder: e.target.src = placeholderImage;
                  }}
                />
                <Caption>{image.caption}</Caption>
              </Figure>
            );
          })}
        </ImageGrid>
      )}
    </Wrapper>
  );
};

export default CaseStudyDetail;