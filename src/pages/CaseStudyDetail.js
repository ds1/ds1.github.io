import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import caseStudyDetailsData from '../data/caseStudyDetails.json';
import { imageMap } from '../utils/imageImports';
import RichText from '../components/RichText';
import { tagCategoryColors, tagCategoryNames, getTagColor } from '../utils/tagConfig';

const CaseStudyWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 0;
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

  &:hover {
    text-decoration: underline;
  }
`;

const Header = styled.header`
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.text};
`;

const Subtitle = styled.h2`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 1rem;
  font-weight: normal;
`;

const MetaInfo = styled.div`
  display: flex;
  gap: 2rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.9rem;
  margin-top: 1rem;
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
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const Content = styled.div`
  margin-bottom: 3rem;

  h1 {
    font-size: 2rem;
    margin: 3rem 0 1.5rem 0;
    color: ${({ theme }) => theme.colors.text};
  }

  h2 {
    font-size: 1.5rem;
    margin: 2.5rem 0 1rem 0;
    color: ${({ theme }) => theme.colors.primary};
  }

  h3 {
    font-size: 1.2rem;
    margin: 2rem 0 0.75rem 0;
    color: ${({ theme }) => theme.colors.text};
  }

  p {
    margin-bottom: 1rem;
    line-height: 1.8;
  }

  ul {
    margin-bottom: 1rem;
    padding-left: 1.5rem;
  }

  li {
    margin-bottom: 0.5rem;
    line-height: 1.6;
  }
`;

const TagSection = styled.div`
  margin: 2rem 0;
  padding: 1.5rem;
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: 8px;
`;

const TagCategory = styled.div`
  margin-bottom: 1rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const TagCategoryTitle = styled.span`
  font-weight: bold;
  color: ${({ theme, $category }) => tagCategoryColors[$category] || theme.colors.textSecondary};
  margin-right: 0.75rem;
  text-transform: capitalize;
`;

const TagList = styled.span`
  color: ${({ theme }) => theme.colors.text};
`;

const TagItem = styled.span`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  margin: 0 0.25rem;
  background-color: ${({ $category }) => getTagColor($category, 0.1)};
  color: ${({ $category }) => tagCategoryColors[$category]};
  border: 1px solid ${({ $category }) => getTagColor($category, 0.3)};
  border-radius: 12px;
  font-size: 0.875rem;

  &:first-child {
    margin-left: 0;
  }
`;

const ImageSection = styled.section`
  margin: 3rem 0;
`;

const ImageContainer = styled.div`
  margin-bottom: 2rem;
`;

const StudyImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const ImageCaption = styled.p`
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
          const { type, content, key } = section;
          
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

      {study.images && study.images.length > 0 && (
        <ImageSection>
          {study.images.map((image, index) => {
            const imageSrc = getImage(image.url);
            if (!imageSrc) return null;
            
            return (
              <ImageContainer key={index}>
                <StudyImage
                  src={imageSrc}
                  alt={image.alt || `${study.title} image ${index + 1}`}
                  onError={(e) => {
                    console.warn(`Failed to load image: ${image.url}`);
                    e.target.style.display = 'none';
                  }}
                />
                {image.caption && <ImageCaption>{image.caption}</ImageCaption>}
              </ImageContainer>
            );
          })}
        </ImageSection>
      )}
    </CaseStudyWrapper>
  );
};

export default CaseStudyDetail;