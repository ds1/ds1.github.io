// src/components/Navigation.js
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const NavWrapper = styled.header`
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(255, 253, 247, 0.95); /* Ivory with transparency */
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  transition: ${({ theme }) => theme.transitions.base};
  
  ${({ scrolled }) => scrolled && `
    box-shadow: 0 1px 3px 0 rgba(26, 47, 42, 0.08);
  `}
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.lg} 0;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.md} 0;
  }
`;

const Logo = styled(NavLink)`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  letter-spacing: -0.02em;
  position: relative;
  z-index: 1001;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background: ${({ theme }) => theme.colors.accent};
    transition: ${({ theme }) => theme.transitions.base};
  }
  
  &:hover::after {
    width: 100%;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.fontSizes.lg};
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

// Mobile menu button
const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.sm};
  z-index: 1001;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

// Mobile menu overlay
const MobileMenuOverlay = styled.div`
  display: none;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: ${({ isOpen }) => isOpen ? 'block' : 'none'};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.2);
    z-index: 999;
  }
`;

// Mobile menu container
const MobileMenu = styled.div`
  display: none;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0;
    right: ${({ isOpen }) => isOpen ? '0' : '-100%'};
    width: 280px;
    height: 100vh;
    background: ${({ theme }) => theme.colors.surface};
    padding: ${({ theme }) => theme.spacing['4xl']} ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.xl};
    transition: right 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 1000;
    box-shadow: -2px 0 20px rgba(0, 0, 0, 0.1);
  }
`;

// Mobile navigation links
const MobileNavLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const NavLinkStyled = styled(NavLink)`
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.textSecondary};
  text-decoration: none;
  position: relative;
  transition: ${({ theme }) => theme.transitions.fast};
  
  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0;
    height: 2px;
    background: ${({ theme }) => theme.colors.secondary};
    transition: ${({ theme }) => theme.transitions.base};
  }

  &.active {
    color: ${({ theme }) => theme.colors.primary};
    
    &::after {
      width: 100%;
    }
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.fontSizes.lg};
    padding: ${({ theme }) => theme.spacing.sm} 0;
    
    &::after {
      display: none;
    }
    
    &.active {
      color: ${({ theme }) => theme.colors.secondary};
    }
  }
`;

// Hamburger icon component
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
    transition: ${({ theme }) => theme.transitions.base};
    
    &:nth-child(1) {
      top: ${({ isOpen }) => isOpen ? '11px' : '6px'};
      transform: ${({ isOpen }) => isOpen ? 'rotate(45deg)' : 'rotate(0)'};
    }
    
    &:nth-child(2) {
      top: 11px;
      opacity: ${({ isOpen }) => isOpen ? '0' : '1'};
    }
    
    &:nth-child(3) {
      top: ${({ isOpen }) => isOpen ? '11px' : '16px'};
      transform: ${({ isOpen }) => isOpen ? 'rotate(-45deg)' : 'rotate(0)'};
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
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <NavWrapper scrolled={scrolled}>
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
          <HamburgerIcon isOpen={mobileMenuOpen}>
            <span />
            <span />
            <span />
          </HamburgerIcon>
        </MobileMenuButton>
      </Nav>
      
      {/* Mobile Menu Overlay */}
      <MobileMenuOverlay isOpen={mobileMenuOpen} onClick={closeMobileMenu} />
      
      {/* Mobile Menu */}
      <MobileMenu isOpen={mobileMenuOpen}>
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