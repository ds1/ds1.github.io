import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import caseStudyDetailsData from '../data/caseStudyDetails.json';
import { imageMap } from '../utils/imageImports';
import RichText from '../components/RichText';
import { tagCategoryColors, tagCategoryNames, getTagColor } from '../utils/tagConfig';
import MediaDisplay from '../components/MediaDisplay';

// Updated to use shared CSS class
const CaseStudyWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 0;
  
  /* Override some shared styles if needed */
  &.case-study-content {
    padding: 2rem 1rem;
    background-color: transparent; /* Since global has background */
    
    @media (min-width: 768px) {
      padding: 2rem 0;
    }
  }
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: var(--color-primary, ${({ theme }) => theme.colors.primary});
  cursor: pointer;
  font-size: 1rem;
  margin-bottom: 2rem;
  padding: 0;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    text-decoration: underline;
    color: var(--color-secondary, ${({ theme }) => theme.colors.secondary});
  }
`;

const Header = styled.header`
  margin-bottom: 3rem;
`;

// Updated to use CSS variables
const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  color: var(--color-text, ${({ theme }) => theme.colors.text});
`;

const Subtitle = styled.h2`
  font-size: 1.5rem;
  color: var(--color-text-secondary, ${({ theme }) => theme.colors.textSecondary});
  margin-bottom: 1rem;
  font-weight: normal;
`;

// Updated to use shared class
const MetaInfo = styled.div.attrs({
  className: 'case-study-meta'
})`
  /* Styled-components styles will merge with CSS class styles */
`;

const MetaItem = styled.span`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: '';
    width: 4px;
    height: 4px;
    background-color: var(--color-primary, ${({ theme }) => theme.colors.primary});
    border-radius: 50%;
  }

  &:first-child::before {
    display: none;
  }
`;

const HeroImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: var(--radius-md, 8px);
  margin-bottom: 3rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
`;

// Let shared CSS handle most styling
const Content = styled.div`
  margin-bottom: 3rem;

  /* These will use shared CSS automatically */
  h1, h2, h3, p, ul, li {
    /* Styles come from shared-theme.css */
  }
`;

// Updated to use shared class and CSS variables
const TagSection = styled.div.attrs({
  className: 'case-study-tags'
})`
  /* Additional styled-components styles if needed */
`;

const TagCategory = styled.div.attrs({
  className: 'tag-category'
})`
  margin-bottom: 1rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const TagCategoryTitle = styled.span`
  font-weight: bold;
  color: ${({ $category }) => tagCategoryColors[$category] || 'var(--color-text-secondary)'};
  margin-right: 0.75rem;
  text-transform: capitalize;
`;

const TagList = styled.span`
  color: var(--color-text, ${({ theme }) => theme.colors.text});
`;

const TagItem = styled.span.attrs({
  className: 'tag-item'
})`
  /* Merge with shared CSS */
  background-color: ${({ $category }) => getTagColor($category, 0.1)};
  color: ${({ $category }) => tagCategoryColors[$category]};
  border: 1px solid ${({ $category }) => getTagColor($category, 0.3)};
`;

const ImageSection = styled.section`
  margin: 3rem 0;
`;

// REMOVED: ImageContainer was defined but never used

const StudyImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: var(--radius-md, 8px);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const ImageCaption = styled.figcaption`
  text-align: center;
  color: var(--color-text-secondary, ${({ theme }) => theme.colors.textSecondary});
  font-size: 0.9rem;
  margin-top: 0.5rem;
  font-style: italic;
`;

const getImage = (path) => {
  if (!path) return null;
  return imageMap[path] || null;
};

const CaseStudyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const study = caseStudyDetailsData.caseStudyDetails.find(s => s.id === parseInt(id));

  if (!study) {
    return <CaseStudyWrapper className="case-study-content">Case study not found</CaseStudyWrapper>;
  }

  const heroImage = getImage(study.thumbnail);

  return (
    <CaseStudyWrapper className="case-study-content">
      <BackButton onClick={() => navigate('/')}>
        ← Back to Case Studies
      </BackButton>

      <Header>
        <Title>{study.title}</Title>
        <Subtitle>{study.subtitle}</Subtitle>
        <MetaInfo>
          {study.duration && <MetaItem>{study.duration}</MetaItem>}
          {study.role && <MetaItem>{study.role}</MetaItem>}
        </MetaInfo>
      </Header>

      {heroImage && (
        <HeroImage 
          src={heroImage} 
          alt={study.title}
          onError={(e) => {
            console.warn(`Failed to load hero image: ${study.thumbnail}`);
            e.target.style.display = 'none';
          }}
        />
      )}

      <Content>
        {study.content && study.content.map((section, index) => {
          // FIXED: Removed 'key' from destructuring since it's not used
          const { type, content } = section;
          
          switch(type) {
            case 'h1':
              return <h1 key={index}>{content}</h1>;
            case 'h2':
              return <h2 key={index}>{content}</h2>;
            case 'h3':
              return <h3 key={index}>{content}</h3>;
            case 'p':
              return <p key={index}>{content}</p>;
            case 'body':
              return <RichText key={index} content={content} />;
            case 'list':
              return <RichText key={index} content={content} isListContent={true} />;
            case 'code':
              return (
                <pre key={index}>
                  <code className={section.language ? `language-${section.language}` : ''}>
                    {content}
                  </code>
                </pre>
              );
            case 'quote':
              return (
                <blockquote key={index}>
                  {content}
                  {section.author && <cite>— {section.author}</cite>}
                </blockquote>
              );
            default:
              return null;
          }
        })}
      </Content>

      {study.tags && Object.entries(study.tags).some(([_, tags]) => tags.length > 0) && (
        <TagSection>
          <h3>Project Details</h3>
          {Object.entries(study.tags).map(([category, tags]) => 
            tags.length > 0 && (
              <TagCategory key={category}>
                <TagCategoryTitle $category={category}>
                  {tagCategoryNames[category] || category.replace(/([A-Z])/g, ' $1').trim()}:
                </TagCategoryTitle>
                <TagList>
                  {tags.map((tag, index) => (
                    <TagItem key={index} $category={category}>
                      {tag}
                    </TagItem>
                  ))}
                </TagList>
              </TagCategory>
            )
          )}
        </TagSection>
      )}

      {/* Media section with shared CSS support */}
      {study.media && study.media.length > 0 ? (
        <ImageSection>
          {study.media.map((media, index) => {
            if (!media.url) return null;
            
            return (
              <figure key={index}>
                <MediaDisplay 
                  url={media.url}
                  alt={media.alt}
                  type={media.type}
                  caption={media.caption}
                />
              </figure>
            );
          })}
        </ImageSection>
      ) : study.images && study.images.length > 0 && (
        // Fallback for old image format
        <ImageSection>
          {study.images.map((image, index) => {
            const imageSrc = getImage(image.url);
            if (!imageSrc) return null;
            
            return (
              <figure key={index}>
                <StudyImage
                  src={imageSrc}
                  alt={image.alt || `${study.title} image ${index + 1}`}
                  onError={(e) => {
                    console.warn(`Failed to load image: ${image.url}`);
                    e.target.style.display = 'none';
                  }}
                />
                {image.caption && <ImageCaption>{image.caption}</ImageCaption>}
              </figure>
            );
          })}
        </ImageSection>
      )}
    </CaseStudyWrapper>
  );
};

export default CaseStudyDetail;