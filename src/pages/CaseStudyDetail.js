import React, { useState } from 'react';
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

const Figure = styled.figure`
 margin-bottom: 2rem;
`;

const Caption = styled.figcaption`
 color: ${({ theme }) => theme.colors.textSecondary};
 font-size: 0.875rem;
 text-align: center;
 margin-top: 0.5rem;
`;

const Heading1 = styled.h1`
 font-size: 2.5rem;
 margin-bottom: 1.5rem;
 color: ${({ theme }) => theme.colors.text};
`;

const Heading2 = styled.h2`
 font-size: 2rem;
 margin-bottom: 1.25rem;
 color: ${({ theme }) => theme.colors.text};
 margin-top: 2rem;
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
`;

const StyledImage = styled.img`
 width: 100%;
 height: auto;
 border-radius: 8px;
 display: block;
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
`;

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

// Helper function to get image from imageMap
const getImage = (path) => {
 if (!path) return null;
 const image = imageMap[path];
 if (!image) {
   console.warn(`Image not found in imageMap: ${path}`);
   return null;
 }
 return image;
};

// Helper to identify and structure content based on field patterns
const structureContent = (caseStudy) => {
  console.log('Starting structureContent with:', caseStudy);
 const content = [];
 const images = [];
 
 Object.entries(caseStudy).forEach(([key, value]) => {
   // Skip id and base metadata fields
   if (['id', 'title', 'subtitle', 'duration', 'role'].includes(key)) {
     return;
   }

   // Handle image fields
   if (key.includes('_image_url') || key.includes('_image_alt') || key.includes('_image_caption')) {
     const baseName = key.split('_image_')[0];
     const type = key.split('_image_')[1];
     
     let imageEntry = images.find(img => img.baseName === baseName);
     if (!imageEntry) {
       imageEntry = { baseName };
       images.push(imageEntry);
     }
     
     imageEntry[type] = value;
     return;
   }

   // Handle content fields based on suffix
   if (key.endsWith('_h1')) {
     content.push({
       type: 'h1',
       content: value,
       key: key.replace('_h1', ''),
       order: Object.keys(caseStudy).indexOf(key)
     });
   } else if (key.endsWith('_h2')) {
     content.push({
       type: 'h2',
       content: value,
       key: key.replace('_h2', ''),
       order: Object.keys(caseStudy).indexOf(key)
     });
   } else if (key.endsWith('_list')) {
     content.push({
       type: 'list',
       content: value.split(';').map(item => item.trim()),
       key: key.replace('_list', ''),
       order: Object.keys(caseStudy).indexOf(key)
     });
   } else if (key.endsWith('_body')) {
     content.push({
       type: 'body',
       content: value,
       key: key.replace('_body', ''),
       order: Object.keys(caseStudy).indexOf(key)
     });
   }
 });

  console.log('Final structured content:', {content, images});
 // Sort content by original order in CSV
 return {
   content: content.sort((a, b) => a.order - b.order),
   images: images.filter(img => img.url) // Only include images with URLs
 };
};

const CaseStudyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  
  
  const caseStudy = caseStudyDetailsData.caseStudyDetails.find(
    study => study.id === parseInt(id)
  );

  // Add debug logging
  console.log('Image paths in imageMap:', Object.keys(imageMap));
  console.log('Looking for thumbnail:', caseStudy?.thumbnail);
  console.log('Full case study:', caseStudy);
  console.log('Case Study Details Data:', caseStudyDetailsData); // Debug log

  if (!caseStudy) {
    return (
      <Wrapper>
        <BackButton onClick={() => navigate('/')}>← Back to Case Studies</BackButton>
        <Title>Case study not found</Title>
      </Wrapper>
    );
  }

  console.log('Selected Case Study:', caseStudy); // Debug log
  
  const { content, images } = structureContent(caseStudy);
  
  console.log('Structured Content:', content); // Debug log
  console.log('Structured Images:', images); // Debug log

  return (
    <Wrapper>
      <BackButton onClick={() => navigate('/')}>← Back to Case Studies</BackButton>
      
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

      {/* Debug render */}
      <pre style={{color: 'white'}}>
        {JSON.stringify(content, null, 2)}
      </pre>

      {/* Modified content rendering */}
      {content && content.map((block, index) => {
        console.log('Rendering block:', block); // Debug log
        
        switch(block.type) {
          case 'h1':
            return <Heading1 key={index}>{block.content}</Heading1>;
          case 'h2':
            return <Heading2 key={index}>{block.content}</Heading2>;
          case 'list':
            return (
              <ul key={index}>
                {block.content.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            );
          case 'body':
            return <p key={index}>{block.content}</p>;
          default:
            console.log('Unknown block type:', block.type);
            return null;
        }
      })}
      
      {/* Render images */}
      {images && images.length > 0 && (
        <div>
          {images.map((image, index) => (
            <Figure key={index}>
              <ImageWithFallback 
                src={getImage(image.url)}
                alt={image.alt || ''}
              />
              {image.caption && <Caption>{image.caption}</Caption>}
            </Figure>
          ))}
        </div>
      )}
    </Wrapper>
  );
};

export default CaseStudyDetail;