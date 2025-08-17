// src/components/MediaDisplay.js
import React, { useState, useRef, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { imageMap } from '../utils/imageImports';

// Animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

const pulse = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
`;

const zoomIn = keyframes`
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.05);
  }
`;

// Wrapper for the entire media component
const MediaWrapper = styled.div`
  position: relative;
  width: 100%;
  margin: ${({ theme }) => theme.spacing['2xl']} 0;
  animation: ${fadeIn} 0.6s ${({ theme }) => theme.transitions.easeOut};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin: ${({ theme }) => theme.spacing.xl} 0;
  }
`;

// Container with glassmorphism effect
const MediaContainer = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  backdrop-filter: blur(10px) saturate(180%);
  -webkit-backdrop-filter: blur(10px) saturate(180%);
  background: ${({ theme }) => theme.colors.glassSurface};
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  transition: all ${({ theme }) => theme.transitions.base};
  
  /* Subtle gradient overlay */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      135deg,
      ${({ theme }) => theme.colors.secondary}03 0%,
      transparent 100%
    );
    pointer-events: none;
    z-index: 1;
  }
  
  /* Hover effect */
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows['2xl']};
    
    img, video {
      transform: scale(1.02);
    }
  }
`;

// Loading skeleton
const LoadingSkeleton = styled.div`
  width: 100%;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.backgroundSecondary} 0%,
    ${({ theme }) => theme.colors.surface} 50%,
    ${({ theme }) => theme.colors.backgroundSecondary} 100%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s ease-in-out infinite;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
`;

// Error state
const ErrorState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing['3xl']} ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 2px dashed ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textTertiary};
  min-height: 200px;
  
  svg {
    width: 48px;
    height: 48px;
    margin-bottom: ${({ theme }) => theme.spacing.base};
    opacity: 0.5;
  }
  
  p {
    font-size: ${({ theme }) => theme.fontSizes.sm};
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    text-align: center;
    margin: 0;
  }
`;

// Enhanced video player
const VideoPlayer = styled.video`
  width: 100%;
  height: auto;
  display: block;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.colors.surface};
  position: relative;
  z-index: 2;
  transition: transform ${({ theme }) => theme.transitions.base};
  
  /* Custom controls styling */
  &::-webkit-media-controls-panel {
    background: linear-gradient(
      to bottom,
      transparent,
      rgba(26, 47, 42, 0.7)
    );
  }
  
  &::-webkit-media-controls-play-button {
    background-color: ${({ theme }) => theme.colors.secondary};
    border-radius: 50%;
  }
  
  &:focus {
    outline: 3px solid ${({ theme }) => theme.colors.focusRing};
    outline-offset: 2px;
  }
`;

// Play button overlay for video
const PlayOverlay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(26, 47, 42, 0.4);
  backdrop-filter: blur(4px);
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  z-index: 3;
  
  &:hover {
    background: rgba(26, 47, 42, 0.2);
    
    svg {
      transform: scale(1.1);
    }
  }
  
  svg {
    width: 64px;
    height: 64px;
    color: ${({ theme }) => theme.colors.background};
    filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1));
    transition: transform ${({ theme }) => theme.transitions.fast};
  }
`;

// Enhanced image with loading states
const StyledImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  position: relative;
  z-index: 2;
  transition: all ${({ theme }) => theme.transitions.base};
  opacity: ${({ $loaded }) => $loaded ? 1 : 0};
  animation: ${({ $loaded }) => $loaded ? fadeIn : 'none'} 0.6s ${({ theme }) => theme.transitions.easeOut};
  
  &:hover {
    cursor: ${({ $zoomable }) => $zoomable ? 'zoom-in' : 'default'};
  }
`;

// Enhanced caption with better typography
const Caption = styled.figcaption`
  margin-top: ${({ theme }) => theme.spacing.base};
  padding: ${({ theme }) => theme.spacing.sm} 0;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.normal};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
  text-align: center;
  font-style: italic;
  letter-spacing: ${({ theme }) => theme.letterSpacing.normal};
  animation: ${fadeIn} 0.6s 0.2s both ${({ theme }) => theme.transitions.easeOut};
  
  /* Decorative elements */
  &::before,
  &::after {
    content: '—';
    margin: 0 ${({ theme }) => theme.spacing.sm};
    color: ${({ theme }) => theme.colors.border};
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.fontSizes.xs};
    padding: ${({ theme }) => theme.spacing.xs} 0;
  }
`;

// Lightbox/Modal for full-screen view
const Lightbox = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(26, 47, 42, 0.95);
  backdrop-filter: blur(20px);
  z-index: ${({ theme }) => theme.zIndex.modal};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xl};
  cursor: zoom-out;
  animation: ${fadeIn} 0.3s ${({ theme }) => theme.transitions.easeOut};
  
  img {
    max-width: 90vw;
    max-height: 90vh;
    object-fit: contain;
    border-radius: ${({ theme }) => theme.borderRadius.lg};
    box-shadow: ${({ theme }) => theme.shadows['3xl']};
    animation: ${zoomIn} 0.3s ${({ theme }) => theme.transitions.easeOut};
  }
  
  /* Close button */
  button {
    position: absolute;
    top: ${({ theme }) => theme.spacing.xl};
    right: ${({ theme }) => theme.spacing.xl};
    background: ${({ theme }) => theme.colors.surface};
    border: none;
    width: 48px;
    height: 48px;
    border-radius: ${({ theme }) => theme.borderRadius.full};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all ${({ theme }) => theme.transitions.fast};
    box-shadow: ${({ theme }) => theme.shadows.lg};
    
    &:hover {
      transform: scale(1.1);
      background: ${({ theme }) => theme.colors.background};
    }
    
    svg {
      width: 24px;
      height: 24px;
      color: ${({ theme }) => theme.colors.text};
    }
  }
`;

const MediaDisplay = ({ url, alt, type, caption, zoomable = true }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [showPlayOverlay, setShowPlayOverlay] = useState(true);
  const videoRef = useRef(null);
  
  if (!url) return null;
  
  // Get the mapped media path
  const mediaSrc = imageMap[url] || url;
  
  // Handle image load
  const handleImageLoad = () => {
    setIsLoading(false);
  };
  
  // Handle errors
  const handleError = (e) => {
    console.warn(`Failed to load media: ${url}`);
    setHasError(true);
    setIsLoading(false);
  };
  
  // Handle lightbox
  const handleImageClick = () => {
    if (zoomable && type !== 'video') {
      setIsLightboxOpen(true);
    }
  };
  
  const closeLightbox = (e) => {
    e.stopPropagation();
    setIsLightboxOpen(false);
  };
  
  // Handle video play
  const handleVideoPlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setShowPlayOverlay(false);
    }
  };
  
  // Reset play overlay when video ends
  const handleVideoEnded = () => {
    setShowPlayOverlay(true);
  };
  
  // Error state
  if (hasError) {
    return (
      <MediaWrapper>
        <ErrorState>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
            />
          </svg>
          <p>Unable to load media</p>
        </ErrorState>
      </MediaWrapper>
    );
  }
  
  // Render based on media type
  if (type === 'video') {
    return (
      <MediaWrapper>
        <MediaContainer>
          {isLoading && <LoadingSkeleton />}
          <VideoPlayer 
            ref={videoRef}
            controls
            onLoadedData={() => setIsLoading(false)}
            onError={handleError}
            onEnded={handleVideoEnded}
            poster={mediaSrc.replace('.mp4', '-poster.jpg')}
            preload="metadata"
          >
            <source src={mediaSrc} type="video/mp4" />
            <source src={mediaSrc.replace('.mp4', '.webm')} type="video/webm" />
            Your browser does not support the video tag.
          </VideoPlayer>
          {showPlayOverlay && !isLoading && (
            <PlayOverlay onClick={handleVideoPlay}>
              <svg fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </PlayOverlay>
          )}
        </MediaContainer>
        {caption && <Caption>{caption}</Caption>}
      </MediaWrapper>
    );
  }
  
  // Default to image (includes gif)
  return (
    <MediaWrapper>
      <MediaContainer onClick={handleImageClick}>
        {isLoading && <LoadingSkeleton />}
        <StyledImage 
          src={mediaSrc} 
          alt={alt || caption}
          onLoad={handleImageLoad}
          onError={handleError}
          $loaded={!isLoading}
          $zoomable={zoomable}
          loading="lazy"
        />
      </MediaContainer>
      {caption && <Caption>{caption}</Caption>}
      
      {/* Lightbox for full-screen view */}
      {isLightboxOpen && (
        <Lightbox onClick={closeLightbox}>
          <img src={mediaSrc} alt={alt || caption} />
          <button onClick={closeLightbox} aria-label="Close lightbox">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M6 18L18 6M6 6l12 12" 
              />
            </svg>
          </button>
        </Lightbox>
      )}
    </MediaWrapper>
  );
};

export default MediaDisplay;