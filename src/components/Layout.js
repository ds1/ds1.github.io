// src/components/Layout.js
import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import Navigation from './Navigation';

// Animations
const float = keyframes`
  0%, 100% { transform: translateY(0) rotate(0deg); }
  33% { transform: translateY(-10px) rotate(1deg); }
  66% { transform: translateY(5px) rotate(-1deg); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 0.1; }
  50% { opacity: 0.3; }
`;

// Layout wrapper with enhanced background
const LayoutWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow-x: hidden;
`;

// Main content area with decorative elements
const Main = styled.main`
  flex: 1;
  width: 100%;
  position: relative;
  
  /* Animated background orbs */
  &::before,
  &::after {
    content: '';
    position: fixed;
    border-radius: 50%;
    filter: blur(60px);
    pointer-events: none;
    z-index: -1;
  }
  
  &::before {
    width: 600px;
    height: 600px;
    background: radial-gradient(
      circle,
      ${({ theme }) => theme.colors.secondary}08 0%,
      transparent 70%
    );
    top: -200px;
    left: -200px;
    animation: ${float} 20s ease-in-out infinite;
  }
  
  &::after {
    width: 800px;
    height: 800px;
    background: radial-gradient(
      circle,
      ${({ theme }) => theme.colors.accent}05 0%,
      transparent 70%
    );
    bottom: -300px;
    right: -300px;
    animation: ${float} 25s ease-in-out infinite reverse;
  }
`;

// Enhanced footer with glass morphism
const Footer = styled.footer`
  margin-top: auto;
  padding: ${({ theme }) => theme.spacing['2xl']} 0;
  background: ${({ theme }) => theme.colors.glassSurface};
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-top: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  position: relative;
  
  /* Decorative gradient */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      90deg,
      ${({ theme }) => theme.colors.secondary}02 0%,
      transparent 50%,
      ${({ theme }) => theme.colors.accent}02 100%
    );
    pointer-events: none;
  }
  
  /* Animated dots pattern */
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background-image: radial-gradient(
      circle at 1px 1px,
      ${({ theme }) => theme.colors.secondary}10 1px,
      transparent 1px
    );
    background-size: 30px 30px;
    opacity: 0.5;
    animation: ${pulse} 4s ease-in-out infinite;
    pointer-events: none;
  }
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.lg};
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.lg};
  position: relative;
  z-index: 1;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    text-align: center;
  }
`;

const FooterText = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.normal};
  margin: 0;
  letter-spacing: ${({ theme }) => theme.letterSpacing.normal};
  
  .year {
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    color: ${({ theme }) => theme.colors.text};
  }
`;

const FooterLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xl};
  align-items: center;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    gap: ${({ theme }) => theme.spacing.lg};
  }
`;

const FooterLink = styled.a`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  text-decoration: none;
  transition: all ${({ theme }) => theme.transitions.fast};
  position: relative;
  padding: ${({ theme }) => theme.spacing.xs} 0;
  
  /* Hover indicator */
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 1px;
    background: ${({ theme }) => theme.colors.secondary};
    transition: width ${({ theme }) => theme.transitions.base};
  }
  
  &:hover {
    color: ${({ theme }) => theme.colors.secondary};
    transform: translateY(-1px);
    
    &::after {
      width: 100%;
    }
  }
  
  /* Icon enhancement */
  &[data-icon]::before {
    content: attr(data-icon);
    margin-right: ${({ theme }) => theme.spacing.xs};
    opacity: 0.7;
    transition: opacity ${({ theme }) => theme.transitions.fast};
  }
  
  &:hover[data-icon]::before {
    opacity: 1;
  }
`;

// Scroll to top button
const ScrollToTop = styled.button`
  position: fixed;
  bottom: ${({ theme }) => theme.spacing.xl};
  right: ${({ theme }) => theme.spacing.xl};
  width: 48px;
  height: 48px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.secondary},
    ${({ theme }) => theme.colors.accent}
  );
  color: ${({ theme }) => theme.colors.background};
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${({ theme }) => theme.shadows.lg};
  transition: all ${({ theme }) => theme.transitions.base};
  opacity: ${({ $visible }) => $visible ? 1 : 0};
  pointer-events: ${({ $visible }) => $visible ? 'auto' : 'none'};
  z-index: ${({ theme }) => theme.zIndex.sticky};
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.xl};
  }
  
  &:active {
    transform: translateY(-2px);
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    bottom: ${({ theme }) => theme.spacing.lg};
    right: ${({ theme }) => theme.spacing.lg};
    width: 44px;
    height: 44px;
  }
`;

const Layout = ({ children }) => {
  const currentYear = new Date().getFullYear();
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return (
    <LayoutWrapper>
      <Navigation />
      <Main>
        {children}
      </Main>
      <Footer>
        <FooterContent>
          <FooterText>
            © <span className="year">{currentYear}</span> Dan Schmitz. All rights reserved.
          </FooterText>
          <FooterLinks>
            <FooterLink 
              href="https://www.linkedin.com/in/schmitzdan" 
              target="_blank" 
              rel="noopener noreferrer"
              data-icon="🔗"
              aria-label="LinkedIn Profile"
            >
              LinkedIn
            </FooterLink>
            <FooterLink 
              href="https://github.com/ds1" 
              target="_blank" 
              rel="noopener noreferrer"
              data-icon="⚡"
              aria-label="GitHub Profile"
            >
              GitHub
            </FooterLink>
            <FooterLink 
              href="mailto:dan@schmitz.ai"
              data-icon="✉"
              aria-label="Send Email"
            >
              Email
            </FooterLink>
          </FooterLinks>
        </FooterContent>
      </Footer>
      
      <ScrollToTop 
        onClick={scrollToTop} 
        $visible={showScrollTop}
        aria-label="Scroll to top"
      >
        ↑
      </ScrollToTop>
    </LayoutWrapper>
  );
};

export default Layout;