import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import RichText from '../components/RichText';
import caseStudyDetailsData from '../data/caseStudyDetails.json';
import { imageMap } from '../utils/imageImports';

// Styled Components
const Wrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  
  @media (max-width: 768px) {
    padding: 1rem 0; // Remove horizontal padding on mobile (handled by Layout)
  }
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  margin-bottom: 2rem;
  padding: 0;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: color 0.2s ease;

  &:hover {
    text-decoration: underline;
    color: ${({ theme }) => theme.colors.secondary};
  }
  
  @media (max-width: 768px) {
    margin-bottom: 1.5rem;
    font-size: 0.95rem;
  }
`;

const Header = styled.header`
  margin-bottom: 3rem;
  
  @media (max-width: 768px) {
    margin-bottom: 2rem;
  }
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 0.5rem;
  
  @media (max-width: 768px) {
    font-size: 1.75rem; // Smaller on mobile
    line-height: 1.2;
  }
  
  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const Subtitle = styled.h2`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 1.25rem;
  font-weight: normal;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 1.125rem;
    line-height: 1.3;
  }
  
  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const Metadata = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 2rem;
  font-size: 0.875rem;
  
  @media (max-width: 768px) {
    margin-bottom: 1.5rem;
    font-size: 0.825rem;
  }
`;

const Figure = styled.figure`
  margin-bottom: 2rem;
  margin-left: 0;
  margin-right: 0;
  
  @media (max-width: 768px) {
    margin-bottom: 1.5rem;
  }
`;

const Caption = styled.figcaption`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.875rem;
  text-align: center;
  margin-top: 0.5rem;
  
  @media (max-width: 768px) {
    font-size: 0.825rem;
    padding: 0 0.5rem;
  }
`;

const Heading1 = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.colors.text};
  
  @media (max-width: 768px) {
    font-size: 1.875rem; // Smaller on mobile
    margin-bottom: 1.25rem;
    line-height: 1.2;
  }
  
  @media (max-width: 480px) {
    font-size: 1.625rem;
  }
`;

const Heading2 = styled.h2`
  font-size: 2rem;
  margin-bottom: 1.25rem;
  color: ${({ theme }) => theme.colors.text};
  margin-top: 2rem;
  
  @media (max-width: 768px) {
    font-size: 1.5rem; // Smaller on mobile
    margin-bottom: 1rem;
    margin-top: 1.75rem;
    line-height: 1.3;
  }
  
  @media (max-width: 480px) {
    font-size: 1.375rem;
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  border-radius: 8px;
  margin-bottom: 1rem;
  background: ${({ theme }) => theme.colors.surface};
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  @media (max-width: 768px) {
    border-radius: 4px;
    min-height: 150px;
  }
`;

const StyledImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
  display: block;
  
  @media (max-width: 768px) {
    border-radius: 4px;
  }
`;

const PlaceholderBox = styled.div`
  width: 100%;
  height: 200px;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  
  @media (max-width: 768px) {
    height: 150px;
    border-radius: 4px;
    font-size: 0.875rem;
  }
`;

// Arrow icon for back button
const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M6.293 11.293l-3.586-3.586a1 1 0 0 1 0-1.414l3.586-3.586a1 1 0 0 1 1.414 1.414L5.828 6H12a1 1 0 0 1 0 2H5.828l1.879 1.879a1 1 0 1 1-1.414 1.414z"/>
  </svg>
);

// Image Component
const ImageWithFallback = ({ src, alt, ...props }) => {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <PlaceholderBox {...props}>
        <span>Image not available</span>
      </PlaceholderBox>
    );
  }

  return (
    <ImageContainer>
      <StyledImage
        src={src}
        alt={alt}
        onError={() => setHasError(true)}
        {...props}
      />
    </ImageContainer>
  );
};

// Helper Functions
const getImage = (path) => {
  if (!path) {
    console.log('No image path provided');
    return null;
  }
  const image = imageMap[path];
  console.log('Getting image:', {
    path: path,
    found: !!image,
    availablePaths: Object.keys(imageMap)
  });
  if (!image) {
    console.warn(`Image not found in imageMap: ${path}`);
  }
  return image;
};

const structureContent = (caseStudy) => {
  console.log('1. Starting structureContent with:', caseStudy);
  const content = [];
  let images = [];
  
  // First handle the pre-structured content array
  if (Array.isArray(caseStudy.content)) {
    console.log('1b. Content is an array with length:', caseStudy.content.length);
    
    caseStudy.content.forEach((item, index) => {
      console.log(`1c. Processing content item ${index}:`, item);
      
      if (item.type === 'list' && Array.isArray(item.content)) {
        content.push({
          type: 'list',
          content: item.content,
          key: item.key || `content-${index}`,
          order: index
        });
      } else {
        content.push({
          type: item.type || 'p',
          content: item.content,
          key: item.key || `content-${index}`,
          order: index
        });
      }
    });
  }
  
  // Then handle images array if it exists
  if (Array.isArray(caseStudy.images)) {
    console.log('2a. Processing images array:', caseStudy.images);
    images = caseStudy.images.map(img => ({
      url: img.url,
      alt: img.alt || '',
      caption: img.caption || ''
    }));
  }

  console.log('5a. Images array before filtering:', images);
  console.log('5b. Final content array:', content);

  const sortedContent = content.sort((a, b) => a.order - b.order);
  console.log('6. Sorted content:', sortedContent);

  return {
    content: sortedContent,
    images: images
  };
};

const CaseStudyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  console.log('Case Study Details Data:', caseStudyDetailsData);
  
  const caseStudy = caseStudyDetailsData.caseStudyDetails.find(
    study => study.id === parseInt(id)
  );

  console.log('Found case study:', caseStudy);

  if (!caseStudy) {
    return (
      <Wrapper>
        <BackButton onClick={() => navigate('/')}>
          <ArrowIcon /> Back to Case Studies
        </BackButton>
        <Title>Case study not found</Title>
      </Wrapper>
    );
  }

  const { content, images } = structureContent(caseStudy);
  
  console.log('Content to render:', content);

  return (
    <Wrapper>
      <BackButton onClick={() => navigate('/')}>
        <ArrowIcon /> Back to Case Studies
      </BackButton>
      
      <Header>
        <Title>{caseStudy.title}</Title>
        <Subtitle>{caseStudy.subtitle}</Subtitle>
        <Metadata>
          {caseStudy.duration} • {caseStudy.role}
        </Metadata>
        <ImageWithFallback 
          src={getImage(caseStudy.thumbnail)}
          alt={caseStudy.title}
        />
      </Header>

      {content.map((block, index) => {
        console.log('7. Rendering block:', block);
        switch(block.type) {
          case 'h1':
            console.log('8a. Rendering h1');
            return <Heading1 key={index}>{block.content}</Heading1>;
          case 'h2':
            console.log('8b. Rendering h2');
            return <Heading2 key={index}>{block.content}</Heading2>;
          case 'list':
            console.log('8c. Rendering list');
            return <RichText key={index} content={block.content} isListContent />;
          case 'body':
          case 'p':
            console.log('8d. Rendering body/paragraph');
            return <RichText key={index} content={block.content.replace(/\\n/g, '\n')} />;
          default:
            console.log('8e. Unknown block type:', block.type);
            return null;
        }
      })}
      
      {images.length > 0 && (
        <div>
          {images.map((image, index) => {
            console.log('Rendering image:', image);
            return (
              <Figure key={index}>
                <ImageWithFallback 
                  src={getImage(image.url)}
                  alt={image.alt}
                />
                {image.caption && <Caption>{image.caption}</Caption>}
              </Figure>
            );
          })}
        </div>
      )}
    </Wrapper>
  );
};

export default CaseStudyDetail;