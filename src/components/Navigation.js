import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  position: relative;
  
  @media (max-width: 768px) {
    padding: 16px 0;
  }
`;

const Logo = styled(NavLink)`
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.text};
  z-index: 1001; // Keep logo above mobile menu
  
  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

// Desktop navigation links
const NavLinks = styled.div`
  display: flex;
  gap: 20px;
  
  @media (max-width: 768px) {
    display: none; // Hide on mobile
  }
`;

// Mobile menu button
const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0;
  z-index: 1001;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

// Mobile menu overlay
const MobileMenuOverlay = styled.div`
  display: none;
  
  @media (max-width: 768px) {
    display: ${({ isOpen }) => isOpen ? 'block' : 'none'};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
  }
`;

// Mobile menu container
const MobileMenu = styled.div`
  display: none;
  
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0;
    right: ${({ isOpen }) => isOpen ? '0' : '-100%'};
    width: 250px;
    height: 100vh;
    background-color: ${({ theme }) => theme.colors.surface};
    padding: 80px 30px 30px;
    transition: right 0.3s ease-in-out;
    z-index: 1000;
    box-shadow: -2px 0 10px rgba(0, 0, 0, 0.3);
  }
`;

// Mobile navigation links
const MobileNavLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const NavLinkStyled = styled(NavLink)`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.textSecondary};
  transition: color 0.2s ease;

  &.active {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: bold;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
  
  @media (max-width: 768px) {
    font-size: 1.125rem;
    padding: 8px 0;
    
    &:hover {
      color: ${({ theme }) => theme.colors.secondary};
    }
  }
`;

// Hamburger icon component
const HamburgerIcon = ({ isOpen }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {isOpen ? (
      // X icon when open
      <>
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </>
    ) : (
      // Hamburger icon when closed
      <>
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="18" x2="21" y2="18" />
      </>
    )}
  </svg>
);

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <Nav>
        <Logo to="/" onClick={closeMobileMenu}>SCHMITZ.AI</Logo>
        
        {/* Desktop Navigation */}
        <NavLinks>
          <NavLinkStyled to="/" end>Case Studies</NavLinkStyled>
          <NavLinkStyled to="/resume">Resume</NavLinkStyled>
          <NavLinkStyled to="/about">About</NavLinkStyled>
          <NavLinkStyled to="/contact">Contact</NavLinkStyled>
        </NavLinks>
        
        {/* Mobile Menu Button */}
        <MobileMenuButton onClick={toggleMobileMenu} aria-label="Toggle menu">
          <HamburgerIcon isOpen={mobileMenuOpen} />
        </MobileMenuButton>
      </Nav>
      
      {/* Mobile Menu Overlay */}
      <MobileMenuOverlay isOpen={mobileMenuOpen} onClick={closeMobileMenu} />
      
      {/* Mobile Menu */}
      <MobileMenu isOpen={mobileMenuOpen}>
        <MobileNavLinks>
          <NavLinkStyled to="/" end onClick={closeMobileMenu}>
            Case Studies
          </NavLinkStyled>
          <NavLinkStyled to="/resume" onClick={closeMobileMenu}>
            Resume
          </NavLinkStyled>
          <NavLinkStyled to="/about" onClick={closeMobileMenu}>
            About
          </NavLinkStyled>
          <NavLinkStyled to="/contact" onClick={closeMobileMenu}>
            Contact
          </NavLinkStyled>
        </MobileNavLinks>
      </MobileMenu>
    </>
  );
};

export default Navigation;