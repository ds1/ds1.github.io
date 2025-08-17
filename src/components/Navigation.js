// src/components/Navigation.js
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import styled, { keyframes, css } from 'styled-components'; // Added css import

// Animations
const slideIn = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -100% 0;
  }
  100% {
    background-position: 100% 0;
  }
`;

// Glass morphism navigation wrapper
const NavWrapper = styled.header`
  position: sticky;
  top: 0;
  z-index: ${({ theme }) => theme.zIndex.sticky};
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  background: ${({ theme }) => theme.colors.glassSurface};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  transition: all ${({ theme }) => theme.transitions.base};
  
  /* Subtle gradient overlay */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      90deg,
      transparent 0%,
      ${({ theme }) => theme.colors.secondary}03 50%,
      transparent 100%
    );
    pointer-events: none;
  }
  
  /* Enhanced shadow on scroll - using css helper */
  ${({ $scrolled }) => $scrolled && css`
    box-shadow: 
      0 1px 3px 0 rgba(26, 47, 42, 0.08),
      0 0 20px 0 rgba(22, 163, 74, 0.03);
    border-bottom-color: rgba(226, 232, 228, 0.8);
  `}
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.lg};
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.base} ${({ theme }) => theme.spacing.base};
  }
`;

// Enhanced logo with animation
const Logo = styled(NavLink)`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  letter-spacing: ${({ theme }) => theme.letterSpacing.tight};
  position: relative;
  z-index: ${({ theme }) => theme.zIndex.sticky + 1};
  transition: all ${({ theme }) => theme.transitions.base};
  font-family: ${({ theme }) => theme.fonts.heading};
  
  /* Gradient text on hover */
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary} 0%,
    ${({ theme }) => theme.colors.primary} 50%,
    ${({ theme }) => theme.colors.secondary} 100%
  );
  background-size: 200% 100%;
  background-position: 0% 0%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
  &:hover {
    background-position: 100% 0%;
    animation: ${shimmer} 2s ease-in-out infinite;
  }
  
  /* Underline animation */
  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(
      90deg,
      ${({ theme }) => theme.colors.secondary},
      ${({ theme }) => theme.colors.accent}
    );
    transition: width ${({ theme }) => theme.transitions.base};
    border-radius: ${({ theme }) => theme.borderRadius.full};
  }
  
  &:hover::after {
    width: 100%;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.fontSizes.xl};
  }
`;

// Desktop navigation links
const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

// Mobile menu button with animation
const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.sm};
  z-index: ${({ theme }) => theme.zIndex.sticky + 1};
  position: relative;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

// Mobile menu overlay with animation
const MobileMenuOverlay = styled.div`
  display: none;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: ${({ $isOpen }) => $isOpen ? 'block' : 'none'};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(26, 47, 42, 0.2);
    backdrop-filter: blur(4px);
    z-index: ${({ theme }) => theme.zIndex.overlay};
    animation: ${fadeIn} 0.3s ease-out;
  }
`;

// Enhanced mobile menu with glass morphism - FIXED with css helper
const MobileMenu = styled.div`
  display: none;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0;
    right: ${({ $isOpen }) => $isOpen ? '0' : '-100%'};
    width: 280px;
    height: 100vh;
    background: ${({ theme }) => theme.colors.glassSurface};
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    padding: ${({ theme }) => theme.spacing['4xl']} ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.xl};
    transition: right 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: ${({ theme }) => theme.zIndex.overlay + 1};
    box-shadow: -2px 0 20px rgba(26, 47, 42, 0.1);
    border-left: 1px solid ${({ theme }) => theme.colors.borderSubtle};
    
    ${({ $isOpen }) => $isOpen && css`
      animation: ${slideIn} 0.3s ease-out;
    `}
  }
`;

// Mobile navigation links
const MobileNavLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

// Enhanced nav link with better hover states
const NavLinkStyled = styled(NavLink)`
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.textSecondary};
  text-decoration: none;
  position: relative;
  transition: all ${({ theme }) => theme.transitions.fast};
  padding: ${({ theme }) => theme.spacing.xs} 0;
  font-family: ${({ theme }) => theme.fonts.body};
  
  /* Animated underline */
  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(
      90deg,
      ${({ theme }) => theme.colors.secondary},
      ${({ theme }) => theme.colors.accent}
    );
    transition: width ${({ theme }) => theme.transitions.base};
    border-radius: ${({ theme }) => theme.borderRadius.full};
  }

  &.active {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
    
    &::after {
      width: 100%;
    }
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-1px);
    
    &::after {
      width: 100%;
    }
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.fontSizes.lg};
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.base};
    border-radius: ${({ theme }) => theme.borderRadius.sm};
    
    &::after {
      display: none;
    }
    
    &.active {
      color: ${({ theme }) => theme.colors.secondary};
      background: ${({ theme }) => theme.colors.backgroundSecondary};
    }
    
    &:hover {
      background: ${({ theme }) => theme.colors.backgroundSecondary};
      transform: translateX(4px);
    }
  }
`;

// Enhanced hamburger icon
const HamburgerIcon = styled.div`
  width: 24px;
  height: 24px;
  position: relative;
  
  span {
    display: block;
    position: absolute;
    height: 2px;
    width: 100%;
    background: ${({ theme }) => theme.colors.primary};
    border-radius: ${({ theme }) => theme.borderRadius.full};
    transition: all ${({ theme }) => theme.transitions.base};
    
    &:nth-child(1) {
      top: ${({ $isOpen }) => $isOpen ? '11px' : '6px'};
      transform: ${({ $isOpen }) => $isOpen ? 'rotate(45deg)' : 'rotate(0)'};
      width: ${({ $isOpen }) => $isOpen ? '100%' : '100%'};
    }
    
    &:nth-child(2) {
      top: 11px;
      opacity: ${({ $isOpen }) => $isOpen ? '0' : '1'};
      transform: ${({ $isOpen }) => $isOpen ? 'translateX(20px)' : 'translateX(0)'};
    }
    
    &:nth-child(3) {
      top: ${({ $isOpen }) => $isOpen ? '11px' : '16px'};
      transform: ${({ $isOpen }) => $isOpen ? 'rotate(-45deg)' : 'rotate(0)'};
      width: ${({ $isOpen }) => $isOpen ? '100%' : '100%'};
    }
  }
`;

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    // Prevent body scroll when menu is open
    document.body.style.overflow = !mobileMenuOpen ? 'hidden' : 'unset';
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    document.body.style.overflow = 'unset';
  };

  return (
    <NavWrapper $scrolled={scrolled}>
      <Nav>
        <Logo to="/" onClick={closeMobileMenu}>Dan Schmitz</Logo>
        
        {/* Desktop Navigation */}
        <NavLinks>
          <NavLinkStyled to="/" end>Work</NavLinkStyled>
          <NavLinkStyled to="/about">About</NavLinkStyled>
          <NavLinkStyled to="/resume">Resume</NavLinkStyled>
          <NavLinkStyled to="/contact">Contact</NavLinkStyled>
        </NavLinks>
        
        {/* Mobile Menu Button */}
        <MobileMenuButton onClick={toggleMobileMenu} aria-label="Toggle menu">
          <HamburgerIcon $isOpen={mobileMenuOpen}>
            <span />
            <span />
            <span />
          </HamburgerIcon>
        </MobileMenuButton>
      </Nav>
      
      {/* Mobile Menu Overlay */}
      <MobileMenuOverlay $isOpen={mobileMenuOpen} onClick={closeMobileMenu} />
      
      {/* Mobile Menu */}
      <MobileMenu $isOpen={mobileMenuOpen}>
        <MobileNavLinks>
          <NavLinkStyled to="/" end onClick={closeMobileMenu}>
            Work
          </NavLinkStyled>
          <NavLinkStyled to="/about" onClick={closeMobileMenu}>
            About
          </NavLinkStyled>
          <NavLinkStyled to="/resume" onClick={closeMobileMenu}>
            Resume
          </NavLinkStyled>
          <NavLinkStyled to="/contact" onClick={closeMobileMenu}>
            Contact
          </NavLinkStyled>
        </MobileNavLinks>
      </MobileMenu>
    </NavWrapper>
  );
};

export default Navigation;