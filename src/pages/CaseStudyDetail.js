import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import caseStudyDetailsData from '../data/caseStudyDetails.json';
import { imageMap } from '../utils/imageImports';
import RichText from '../components/RichText';
import { tagCategoryColors, tagCategoryNames, getTagColor } from '../utils/tagConfig';
import MediaDisplay from '../components/MediaDisplay';

// Clean styled-components without shared CSS
const CaseStudyWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1rem;
  
  @media (min-width: 768px) {
    padding: 2rem 0;
  }
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  font-size: 1rem;
  margin-bottom: 2rem;
  padding: 0;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: color 0.2s ease;

  &:hover {
    text-decoration: underline;
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

const Header = styled.header`
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.text};
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.h2`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 1rem;
  font-weight: normal;
  
  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

const MetaInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.9rem;
  
  @media (max-width: 768px) {
    font-size: 0.85rem;
    gap: 0.75rem;
  }
`;

const MetaItem = styled.span`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: '';
    width: 4px;
    height: 4px;
    background-color: ${({ theme }) => theme.colors.primary};
    border-radius: 50%;
  }

  &:first-child::before {
    display: none;
  }
`;

const HeroImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 3rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
`;

const Content = styled.div`
  margin-bottom: 3rem;

  h1 {
    font-size: 2rem;
    margin: 2rem 0 1rem 0;
    color: ${({ theme }) => theme.colors.text};
  }

  h2 {
    font-size: 1.5rem;
    margin: 1.75rem 0 1rem 0;
    color: ${({ theme }) => theme.colors.primary};
  }

  h3 {
    font-size: 1.25rem;
    margin: 1.5rem 0 0.75rem 0;
    color: ${({ theme }) => theme.colors.text};
  }

  p {
    margin-bottom: 1rem;
    line-height: 1.6;
    color: ${({ theme }) => theme.colors.text};
  }

  ul, ol {
    margin-bottom: 1rem;
    padding-left: 1.5rem;
  }

  li {
    margin-bottom: 0.5rem;
    line-height: 1.6;
    color: ${({ theme }) => theme.colors.text};
  }

  blockquote {
    border-left: 4px solid ${({ theme }) => theme.colors.primary};
    padding-left: 1rem;
    margin: 1.5rem 0;
    color: ${({ theme }) => theme.colors.textSecondary};
    font-style: italic;
  }

  cite {
    display: block;
    margin-top: 0.5rem;
    font-size: 0.9rem;
  }

  pre {
    background: ${({ theme }) => theme.colors.surface};
    padding: 1rem;
    border-radius: 4px;
    overflow-x: auto;
    margin: 1.5rem 0;
  }

  code {
    font-family: 'Courier New', monospace;
    background: ${({ theme }) => theme.colors.surface};
    padding: 0.125rem 0.25rem;
    border-radius: 2px;
    color: ${({ theme }) => theme.colors.primary};
  }

  pre code {
    background: transparent;
    padding: 0;
  }
`;

const TagSection = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  padding: 1.5rem;
  border-radius: 8px;
  margin-top: 3rem;

  h3 {
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.colors.text};
  }
`;

const TagCategory = styled.div`
  margin-bottom: 1rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const TagCategoryTitle = styled.span`
  font-weight: bold;
  color: ${({ $category, theme }) => tagCategoryColors[$category] || theme.colors.textSecondary};
  margin-right: 0.75rem;
  text-transform: capitalize;
`;

const TagList = styled.div`
  display: inline-flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const TagItem = styled.span`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  background-color: ${({ $category }) => getTagColor($category, 0.1)};
  color: ${({ $category }) => tagCategoryColors[$category]};
  border: 1px solid ${({ $category }) => getTagColor($category, 0.3)};
  border-radius: 12px;
  font-size: 0.85rem;
`;

const ImageSection = styled.section`
  margin: 3rem 0;
`;

const StudyImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const ImageCaption = styled.figcaption`
  text-align: center;
  color: ${({ theme }) => theme.colors.textSecondary};
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
    return <CaseStudyWrapper>Case study not found</CaseStudyWrapper>;
  }

  const heroImage = getImage(study.thumbnail);

  return (
    <CaseStudyWrapper>
      <BackButton onClick={() => navigate('/')}>
        ← Back to Case Studies
      </BackButton>

      <Header>
        <Title>{study.title}</Title>
        {study.subtitle && <Subtitle>{study.subtitle}</Subtitle>}
        <MetaInfo>
          {study.duration && <MetaItem>{study.duration}</MetaItem>}
          {study.role && <MetaItem>{study.role}</MetaItem>}
          {study.project_type && <MetaItem>{study.project_type}</MetaItem>}
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

      {/* Media section */}
      {study.media && study.media.length > 0 ? (
        <ImageSection>
          {study.media.map((media, index) => {
            if (!media.url) return null;
            
            return (
              <figure key={index} style={{ marginBottom: '2rem' }}>
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
              <figure key={index} style={{ marginBottom: '2rem' }}>
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