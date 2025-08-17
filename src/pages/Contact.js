// src/pages/Contact.js
import React from 'react';
import styled, { keyframes } from 'styled-components';
import RichText from '../components/RichText';
import contactData from '../data/contact.json';

// Animations
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const glow = keyframes`
  0%, 100% {
    box-shadow: 0 0 20px rgba(22, 163, 74, 0.1);
  }
  50% {
    box-shadow: 0 0 30px rgba(22, 163, 74, 0.2);
  }
`;

// Main wrapper with refined spacing
const ContactWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing['2xl']} ${({ theme }) => theme.spacing.lg};
  position: relative;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing['3xl']} 0;
  }
`;

// Enhanced page title with Geist font
const PageTitle = styled.h1`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.text};
  font-size: clamp(${({ theme }) => theme.fontSizes['3xl']}, 4vw, ${({ theme }) => theme.fontSizes['5xl']});
  font-weight: ${({ theme }) => theme.fontWeights.black};
  letter-spacing: ${({ theme }) => theme.letterSpacing.tighter};
  line-height: 1.1;
  font-feature-settings: "kern" 1, "liga" 1, "ss01" 1;
  animation: ${fadeInUp} 0.6s ${({ theme }) => theme.transitions.easeOut};
  
  /* Gradient text effect */
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary} 0%,
    ${({ theme }) => theme.colors.primary} 60%,
    ${({ theme }) => theme.colors.secondary} 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.fontSizes['3xl']};
    margin-bottom: ${({ theme }) => theme.spacing.base};
  }
`;

// Enhanced introduction with better typography
const Introduction = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
  font-weight: ${({ theme }) => theme.fontWeights.normal};
  letter-spacing: ${({ theme }) => theme.letterSpacing.normal};
  animation: ${fadeInUp} 0.6s 0.1s both ${({ theme }) => theme.transitions.easeOut};
  
  /* Highlight important text */
  strong {
    color: ${({ theme }) => theme.colors.secondary};
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.fontSizes.lg};
    margin-bottom: ${({ theme }) => theme.spacing.xl};
    line-height: ${({ theme }) => theme.lineHeights.relaxed};
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: ${({ theme }) => theme.fontSizes.base};
  }
`;

// Glass morphism contact card
const ContactInfo = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  background: ${({ theme }) => theme.colors.glassSurface};
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  position: relative;
  overflow: hidden;
  animation: ${fadeInUp} 0.6s 0.2s both ${({ theme }) => theme.transitions.easeOut};
  transition: all ${({ theme }) => theme.transitions.base};
  
  /* Subtle gradient overlay */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      135deg,
      ${({ theme }) => theme.colors.secondary}05 0%,
      transparent 100%
    );
    pointer-events: none;
  }
  
  /* Animated glow on hover */
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.xl};
    animation: ${glow} 2s ease-in-out infinite;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-bottom: ${({ theme }) => theme.spacing.xl};
    padding: ${({ theme }) => theme.spacing.lg};
  }
`;

// Enhanced contact method with stagger animation
const ContactMethod = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  position: relative;
  animation: ${slideInLeft} 0.5s ${({ index }) => 0.3 + index * 0.1}s both ${({ theme }) => theme.transitions.easeOut};
  
  &:last-child {
    margin-bottom: 0;
  }
  
  /* Decorative line */
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    width: 3px;
    height: 0;
    background: linear-gradient(
      180deg,
      ${({ theme }) => theme.colors.secondary},
      ${({ theme }) => theme.colors.accent}
    );
    border-radius: ${({ theme }) => theme.borderRadius.full};
    transition: height ${({ theme }) => theme.transitions.base};
  }
  
  &:hover::before {
    height: 100%;
    top: 0;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-bottom: ${({ theme }) => theme.spacing.lg};
    padding-left: ${({ theme }) => theme.spacing.base};
  }
`;

// Enhanced label with proper font weight
const ContactLabel = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.text};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  letter-spacing: ${({ theme }) => theme.letterSpacing.tight};
  position: relative;
  padding-left: ${({ theme }) => theme.spacing.base};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.fontSizes.base};
    margin-bottom: ${({ theme }) => theme.spacing.xs};
  }
`;

// Enhanced link with animations
const ContactLink = styled.a`
  color: ${({ theme }) => theme.colors.secondary};
  text-decoration: none;
  transition: all ${({ theme }) => theme.transitions.fast};
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  word-break: break-word;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  padding-left: ${({ theme }) => theme.spacing.base};
  position: relative;
  
  /* Underline animation */
  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: ${({ theme }) => theme.spacing.base};
    right: 0;
    height: 2px;
    background: linear-gradient(
      90deg,
      ${({ theme }) => theme.colors.secondary},
      ${({ theme }) => theme.colors.accent}
    );
    transform: scaleX(0);
    transform-origin: left;
    transition: transform ${({ theme }) => theme.transitions.base};
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    transform: translateX(4px);
    
    &::after {
      transform: scaleX(1);
    }
  }
  
  /* Icon animation if present */
  svg {
    transition: transform ${({ theme }) => theme.transitions.fast};
  }
  
  &:hover svg {
    transform: translateX(4px);
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.fontSizes.base};
    padding: ${({ theme }) => theme.spacing.xs} 0;
    line-height: ${({ theme }) => theme.lineHeights.relaxed};
  }
`;

// Enhanced content section
const ContentSection = styled.div`
  margin-top: ${({ theme }) => theme.spacing['3xl']};
  animation: ${fadeInUp} 0.6s 0.5s both ${({ theme }) => theme.transitions.easeOut};
  
  /* Enhanced typography for rich text content */
  h2 {
    font-size: ${({ theme }) => theme.fontSizes['2xl']};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    color: ${({ theme }) => theme.colors.secondary};
    margin-top: ${({ theme }) => theme.spacing['2xl']};
    margin-bottom: ${({ theme }) => theme.spacing.base};
    letter-spacing: ${({ theme }) => theme.letterSpacing.tight};
    position: relative;
    
    /* Decorative accent */
    &::after {
      content: '';
      position: absolute;
      bottom: -${({ theme }) => theme.spacing.xs};
      left: 0;
      width: 40px;
      height: 3px;
      background: linear-gradient(
        90deg,
        ${({ theme }) => theme.colors.secondary},
        ${({ theme }) => theme.colors.accent}
      );
      border-radius: ${({ theme }) => theme.borderRadius.full};
    }
  }
  
  h3 {
    font-size: ${({ theme }) => theme.fontSizes.xl};
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
    color: ${({ theme }) => theme.colors.text};
    margin-top: ${({ theme }) => theme.spacing.xl};
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }
  
  p {
    color: ${({ theme }) => theme.colors.textSecondary};
    line-height: ${({ theme }) => theme.lineHeights.relaxed};
    margin-bottom: ${({ theme }) => theme.spacing.base};
    font-weight: ${({ theme }) => theme.fontWeights.normal};
  }
  
  ul, ol {
    margin-bottom: ${({ theme }) => theme.spacing.base};
    padding-left: ${({ theme }) => theme.spacing.xl};
    
    li {
      color: ${({ theme }) => theme.colors.textSecondary};
      line-height: ${({ theme }) => theme.lineHeights.relaxed};
      margin-bottom: ${({ theme }) => theme.spacing.sm};
      position: relative;
      
      /* Custom bullet points */
      &::marker {
        color: ${({ theme }) => theme.colors.secondary};
      }
    }
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-top: ${({ theme }) => theme.spacing['2xl']};
  }
`;

const Contact = () => {
  return (
    <ContactWrapper>
      <PageTitle>{contactData.title}</PageTitle>
      
      <Introduction>{contactData.introduction}</Introduction>
      
      <ContactInfo>
        <ContactMethod index={0}>
          <ContactLabel>Email:</ContactLabel>
          <ContactLink 
            href={`mailto:${contactData.email}`}
            aria-label="Send email to Dan"
          >
            {contactData.email}
          </ContactLink>
        </ContactMethod>
        
        <ContactMethod index={1}>
          <ContactLabel>LinkedIn:</ContactLabel>
          <ContactLink 
            href={contactData.linkedin}
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="Visit LinkedIn profile"
          >
            LinkedIn Profile
          </ContactLink>
        </ContactMethod>

        <ContactMethod index={2}>
          <ContactLabel>GitHub:</ContactLabel>
          <ContactLink 
            href={contactData.github}
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="Visit GitHub profile"
          >
            GitHub Profile
          </ContactLink>
        </ContactMethod>
      </ContactInfo>

      <ContentSection>
        <RichText content={contactData.content} />
      </ContentSection>
    </ContactWrapper>
  );
};

export default Contact;