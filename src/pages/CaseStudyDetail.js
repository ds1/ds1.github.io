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
      
      if (item.type && item.content) {
        content.push({
          type: item.type,
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
  
  // Process remaining fields
  Object.entries(caseStudy).forEach(([key, value]) => {
    console.log('2. Processing key:', key, 'with value:', 
      typeof value === 'string' 
        ? value.substring(0, 100) + '...'
        : Array.isArray(value)
          ? '[Array]: ' + value.length + ' items'
          : typeof value
    );
    
    // Skip id and base metadata fields
    if (['id', 'title', 'subtitle', 'duration', 'role', 'content'].includes(key)) {
      console.log('3. Skipping metadata field:', key);
      return;
    }

    // Skip image-related fields as they're handled separately
    if (key === 'images' || key.includes('_image_url') || key.includes('_image_alt') || key.includes('_image_caption')) {
      return;
    }

    // Handle content fields based on suffix pattern
    const suffixMatch = key.match(/(.+)_(h[12]|list|body)$/);
    if (suffixMatch) {
      console.log('4. Processing content field:', key, 'with suffix:', suffixMatch[2]);
      const [, baseName, type] = suffixMatch;
      
      const contentItem = {
        type: type,
        content: type === 'list' ? value.split(';').map(item => item.trim()) : value,
        key: baseName,
        order: Object.keys(caseStudy).indexOf(key)
      };
      console.log('4a. Created content item:', contentItem);
      content.push(contentItem);
    }
  });

  console.log('5a. Images array before filtering:', images);
  console.log('5b. Final content array:', content);

  const sortedContent = content.sort((a, b) => a.order - b.order);
  console.log('6. Sorted content:', sortedContent);

  return {
    content: sortedContent,
    images: images
  };
};

// Main Component
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
       <BackButton onClick={() => navigate('/')}>← Back to Case Studies</BackButton>
       <Title>Case study not found</Title>
     </Wrapper>
   );
 }

 const { content, images } = structureContent(caseStudy);
 
 console.log('Content to render:', content);

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
           return <RichText key={index} content={[block]} />;
         case 'body':
           console.log('8d. Rendering body');
           return <RichText key={index} content={block.content} />;
         case 'p':
           console.log('8f. Rendering paragraph');
           return <RichText key={index} content={block.content} />;
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