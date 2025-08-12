import React from 'react';
import styled from 'styled-components';
import { imageMap } from '../utils/imageImports';

const VideoPlayer = styled.video`
  width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const MediaDisplay = ({ url, alt, type, caption }) => {
  if (!url) return null;
  
  // Get the mapped image path
  const mediaSrc = imageMap[url] || url;
  
  // Render based on media type
  if (type === 'video') {
    return (
      <>
        <VideoPlayer controls>
          <source src={mediaSrc} type="video/mp4" />
          <source src={mediaSrc} type="video/webm" />
          Your browser does not support the video tag.
        </VideoPlayer>
        {caption && <p>{caption}</p>}
      </>
    );
  }
  
  // Default to image (includes gif)
  return (
    <>
      <Image 
        src={mediaSrc} 
        alt={alt || caption}
        onError={(e) => {
          console.warn(`Failed to load media: ${url}`);
          e.target.style.display = 'none';
        }}
      />
      {caption && <p>{caption}</p>}
    </>
  );
};

export default MediaDisplay;