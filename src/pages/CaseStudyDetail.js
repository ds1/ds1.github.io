// src/pages/CaseStudyDetail.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import caseStudyDetailsData from '../data/caseStudyDetails.json';
import { imageMap } from '../utils/imageImports';
import RichText from '../components/RichText';
import { tagCategoryColors, tagCategoryNames, getTagColor } from '../utils/tagConfig';
import MediaDisplay from '../components/MediaDisplay';

// Animations
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const shimmer = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`;

const parallax = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
`;

// Loading skeleton
const SkeletonContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing['2xl']} ${({ theme }) => theme.spacing.lg};
`;

const SkeletonElement = styled.div`
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  position: relative;
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      90deg,
      transparent 0%,
      ${({ theme }) => theme.colors.surface}40 50%,
      transparent 100%
    );
    animation: ${shimmer} 2s infinite;
  }
`;

const SkeletonTitle = styled(SkeletonElement)`
  height: 48px;
  width: 70%;
  margin-bottom: ${({ theme }) => theme.spacing.base};
`;

const SkeletonSubtitle = styled(SkeletonElement)`
  height: 32px;
  width: 90%;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const SkeletonImage = styled(SkeletonElement)`
  width: 100%;
  height: 400px;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
`;

const SkeletonParagraph = styled(SkeletonElement)`
  height: 20px;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  width: ${({ width }) => width || '100%'};
`;

// Main wrapper with animations
const CaseStudyWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing['2xl']} ${({ theme }) => theme.spacing.lg};
  animation: ${fadeInUp} 0.6s ${({ theme }) => theme.transitions.easeOut};
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing['3xl']} 0;
  }
`;

// Enhanced back button
const BackButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.base};
  margin-left: -${({ theme }) => theme.spacing.base};
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  transition: all ${({ theme }) => theme.transitions.fast};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  position: relative;
  overflow: hidden;
  animation: ${slideInLeft} 0.5s ${({ theme }) => theme.transitions.easeOut};
  
  /* Hover background */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: ${({ theme }) => theme.colors.backgroundSecondary};
    transform: translateX(-100%);
    transition: transform ${({ theme }) => theme.transitions.base};
  }
  
  &:hover {
    color: ${({ theme }) => theme.colors.secondary};
    transform: translateX(-4px);
    
    &::before {
      transform: translateX(0);
    }
    
    .arrow {
      animation: ${slideInLeft} 0.3s ease-out;
    }
  }
  
  .arrow {
    transition: all ${({ theme }) => theme.transitions.fast};
  }
  
  span {
    position: relative;
  }
`;

// Enhanced header
const Header = styled.header`
  margin-bottom: ${({ theme }) => theme.spacing['3xl']};
  animation: ${fadeInUp} 0.6s 0.1s both ${({ theme }) => theme.transitions.easeOut};
`;

const Title = styled.h1`
  font-size: clamp(${({ theme }) => theme.fontSizes['3xl']}, 4vw, ${({ theme }) => theme.fontSizes['5xl']});
  font-weight: ${({ theme }) => theme.fontWeights.black};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.text};
  letter-spacing: ${({ theme }) => theme.letterSpacing.tighter};
  line-height: 1.1;
  
  /* Gradient text effect */
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.text} 0%,
    ${({ theme }) => theme.colors.text} 60%,
    ${({ theme }) => theme.colors.secondary} 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Subtitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: ${({ theme }) => theme.fontWeights.normal};
  letter-spacing: ${({ theme }) => theme.letterSpacing.normal};
  line-height: ${({ theme }) => theme.lineHeights.snug};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const MetaInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.base};
  color: ${({ theme }) => theme.colors.textTertiary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  padding: ${({ theme }) => theme.spacing.base} 0;
  border-top: 1px solid ${({ theme }) => theme.colors.borderLight};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};
  animation: ${fadeInUp} 0.6s 0.2s both ${({ theme }) => theme.transitions.easeOut};
`;

const MetaItem = styled.span`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  position: relative;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  
  &::before {
    content: '';
    width: 4px;
    height: 4px;
    background: ${({ theme }) => theme.colors.secondary};
    border-radius: ${({ theme }) => theme.borderRadius.full};
    opacity: 0.6;
  }

  &:first-child::before {
    display: none;
  }
`;

// Enhanced hero image
const HeroImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  margin-bottom: ${({ theme }) => theme.spacing['3xl']};
  box-shadow: ${({ theme }) => theme.shadows['2xl']};
  animation: ${fadeInUp} 0.8s 0.3s both ${({ theme }) => theme.transitions.easeOut};
  transition: all ${({ theme }) => theme.transitions.slow};
  
  &:hover {
    transform: scale(1.02);
    box-shadow: ${({ theme }) => theme.shadows['3xl']};
  }
`;

// Enhanced content section
const Content = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing['3xl']};
  animation: ${fadeInUp} 0.6s 0.4s both ${({ theme }) => theme.transitions.easeOut};

  /* Typography with Geist optimization */
  h1 {
    font-size: ${({ theme }) => theme.fontSizes['4xl']};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    margin: ${({ theme }) => theme.spacing['2xl']} 0 ${({ theme }) => theme.spacing.lg} 0;
    color: ${({ theme }) => theme.colors.text};
    letter-spacing: ${({ theme }) => theme.letterSpacing.tight};
    position: relative;
    
    /* Decorative line */
    &::after {
      content: '';
      position: absolute;
      bottom: -${({ theme }) => theme.spacing.sm};
      left: 0;
      width: 60px;
      height: 3px;
      background: linear-gradient(
        90deg,
        ${({ theme }) => theme.colors.secondary},
        ${({ theme }) => theme.colors.accent}
      );
      border-radius: ${({ theme }) => theme.borderRadius.full};
    }
  }

  h2 {
    font-size: ${({ theme }) => theme.fontSizes['3xl']};
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
    margin: ${({ theme }) => theme.spacing.xl} 0 ${({ theme }) => theme.spacing.base} 0;
    color: ${({ theme }) => theme.colors.secondary};
    letter-spacing: ${({ theme }) => theme.letterSpacing.tight};
  }

  h3 {
    font-size: ${({ theme }) => theme.fontSizes['2xl']};
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
    margin: ${({ theme }) => theme.spacing.lg} 0 ${({ theme }) => theme.spacing.sm} 0;
    color: ${({ theme }) => theme.colors.text};
  }

  p {
    margin-bottom: ${({ theme }) => theme.spacing.base};
    line-height: ${({ theme }) => theme.lineHeights.relaxed};
    color: ${({ theme }) => theme.colors.textSecondary};
    font-weight: ${({ theme }) => theme.fontWeights.normal};
  }

  ul, ol {
    margin-bottom: ${({ theme }) => theme.spacing.base};
    padding-left: ${({ theme }) => theme.spacing.lg};
    
    li {
      margin-bottom: ${({ theme }) => theme.spacing.sm};
      line-height: ${({ theme }) => theme.lineHeights.relaxed};
      color: ${({ theme }) => theme.colors.textSecondary};
      
      &::marker {
        color: ${({ theme }) => theme.colors.secondary};
      }
    }
  }

  blockquote {
    border-left: 4px solid ${({ theme }) => theme.colors.secondary};
    padding: ${({ theme }) => theme.spacing.lg};
    margin: ${({ theme }) => theme.spacing.xl} 0;
    background: ${({ theme }) => theme.colors.backgroundSecondary};
    border-radius: ${({ theme }) => theme.borderRadius.md};
    font-style: italic;
    position: relative;
    
    &::before {
      content: '"';
      position: absolute;
      top: -${({ theme }) => theme.spacing.sm};
      left: ${({ theme }) => theme.spacing.lg};
      font-size: ${({ theme }) => theme.fontSizes['6xl']};
      color: ${({ theme }) => theme.colors.secondary};
      opacity: 0.1;
      font-family: ${({ theme }) => theme.fonts.display};
    }
  }

  pre {
    background: ${({ theme }) => theme.colors.codeBackground};
    padding: ${({ theme }) => theme.spacing.lg};
    border-radius: ${({ theme }) => theme.borderRadius.md};
    overflow-x: auto;
    margin: ${({ theme }) => theme.spacing.xl} 0;
    border: 1px solid ${({ theme }) => theme.colors.border};
    box-shadow: ${({ theme }) => theme.shadows.inner};
    
    code {
      font-family: ${({ theme }) => theme.fonts.mono};
      font-size: ${({ theme }) => theme.fontSizes.sm};
      background: transparent;
      padding: 0;
      border: none;
      color: ${({ theme }) => theme.colors.text};
    }
  }

  code {
    font-family: ${({ theme }) => theme.fonts.mono};
    background: ${({ theme }) => theme.colors.codeBackground};
    padding: ${({ theme }) => theme.spacing['2xs']} ${({ theme }) => theme.spacing.xs};
    border-radius: ${({ theme }) => theme.borderRadius.xs};
    color: ${({ theme }) => theme.colors.secondary};
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    border: 1px solid ${({ theme }) => theme.colors.borderLight};
  }
`;

// Enhanced tag section
const TagSection = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  backdrop-filter: blur(10px);
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  margin-top: ${({ theme }) => theme.spacing['3xl']};
  border: 1px solid ${({ theme }) => theme.colors.borderLight};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  animation: ${fadeInUp} 0.6s 0.5s both ${({ theme }) => theme.transitions.easeOut};
  position: relative;
  
  /* Subtle gradient overlay */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: linear-gradient(
      135deg,
      ${({ theme }) => theme.colors.secondary}03 0%,
      transparent 50%,
      ${({ theme }) => theme.colors.accent}02 100%
    );
    pointer-events: none;
  }
  
  > * {
    position: relative;
  }

  h3 {
    margin-bottom: ${({ theme }) => theme.spacing.lg};
    color: ${({ theme }) => theme.colors.text};
    font-size: ${({ theme }) => theme.fontSizes.xl};
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
    letter-spacing: ${({ theme }) => theme.letterSpacing.tight};
  }
`;

const TagCategory = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.base};
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const TagCategoryTitle = styled.span`
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ $category, theme }) => tagCategoryColors[$category] || theme.colors.textSecondary};
  margin-right: ${({ theme }) => theme.spacing.sm};
  text-transform: uppercase;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  letter-spacing: ${({ theme }) => theme.letterSpacing.wider};
`;

const TagList = styled.div`
  display: inline-flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const TagItem = styled.span`
  display: inline-block;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.base};
  background: ${({ $category }) => getTagColor($category, 0.08)};
  color: ${({ $category }) => tagCategoryColors[$category]};
  border: 1px solid ${({ $category }) => getTagColor($category, 0.2)};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  transition: all ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: ${({ theme }) => theme.shadows.sm};
    background: ${({ $category }) => getTagColor($category, 0.15)};
    border-color: ${({ $category }) => tagCategoryColors[$category]};
  }
`;

// Enhanced image section
const ImageSection = styled.section`
  margin: ${({ theme }) => theme.spacing['3xl']} 0;
  animation: ${fadeInUp} 0.6s 0.6s both ${({ theme }) => theme.transitions.easeOut};
`;

const Figure = styled.figure`
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
  position: relative;
  
  &:hover img {
    transform: scale(1.02);
    filter: brightness(1.05);
  }
`;

const StudyImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  transition: all ${({ theme }) => theme.transitions.slow};
  display: block;
`;

const ImageCaption = styled.figcaption`
  text-align: center;
  color: ${({ theme }) => theme.colors.textTertiary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin-top: ${({ theme }) => theme.spacing.sm};
  font-style: italic;
  letter-spacing: ${({ theme }) => theme.letterSpacing.normal};
`;

// Floating decoration
const FloatingDecoration = styled.div`
  position: fixed;
  width: 400px;
  height: 400px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: radial-gradient(
    circle,
    ${({ theme }) => theme.colors.secondary}10 0%,
    transparent 70%
  );
  filter: blur(60px);
  pointer-events: none;
  z-index: -1;
  top: 20%;
  right: -200px;
  animation: ${parallax} 20s ease-in-out infinite;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

const getImage = (path) => {
  if (!path) return null;
  return imageMap[path] || null;
};

const CaseStudyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const study = caseStudyDetailsData.caseStudyDetails.find(s => s.id === parseInt(id));

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setIsLoading(false), 600);
    // Scroll to top on mount
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) {
    return (
      <SkeletonContainer>
        <SkeletonTitle />
        <SkeletonSubtitle />
        <SkeletonImage />
        <SkeletonParagraph />
        <SkeletonParagraph width="90%" />
        <SkeletonParagraph width="80%" />
        <SkeletonParagraph width="95%" />
      </SkeletonContainer>
    );
  }

  if (!study) {
    return (
      <CaseStudyWrapper>
        <BackButton onClick={() => navigate('/')}>
          <span className="arrow">←</span> <span>Back to Projects</span>
        </BackButton>
        <Title>Case study not found</Title>
      </CaseStudyWrapper>
    );
  }

  const heroImage = getImage(study.thumbnail);

  return (
    <>
      <FloatingDecoration />
      <CaseStudyWrapper>
        <BackButton onClick={() => navigate('/')}>
          <span className="arrow">←</span> <span>Back to Projects</span>
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
            loading="eager"
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
                <Figure key={index}>
                  <MediaDisplay 
                    url={media.url}
                    alt={media.alt}
                    type={media.type}
                    caption={media.caption}
                  />
                </Figure>
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
                <Figure key={index}>
                  <StudyImage
                    src={imageSrc}
                    alt={image.alt || `${study.title} image ${index + 1}`}
                    loading="lazy"
                    onError={(e) => {
                      console.warn(`Failed to load image: ${image.url}`);
                      e.target.style.display = 'none';
                    }}
                  />
                  {image.caption && <ImageCaption>{image.caption}</ImageCaption>}
                </Figure>
              );
            })}
          </ImageSection>
        )}
      </CaseStudyWrapper>
    </>
  );
};

export default CaseStudyDetail;