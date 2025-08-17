// src/components/Layout.js
import React from 'react';
import styled from 'styled-components';
import Navigation from './Navigation';

const LayoutWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  flex: 1;
  width: 100%;
  position: relative;
  
  /* Add subtle pattern background */
  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      radial-gradient(circle at 20% 80%, ${({ theme }) => theme.colors.secondary}05 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, ${({ theme }) => theme.colors.accent}05 0%, transparent 50%),
      radial-gradient(circle at 40% 40%, ${({ theme }) => theme.colors.secondary}03 0%, transparent 50%);
    pointer-events: none;
    z-index: -1;
  }
`;

const Footer = styled.footer`
  margin-top: ${({ theme }) => theme.spacing['4xl']};
  padding: ${({ theme }) => theme.spacing['2xl']} ${({ theme }) => theme.spacing.lg};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.backgroundSecondary};
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.lg};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    text-align: center;
  }
`;

const FooterText = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin: 0;
`;

const FooterLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xl};
  
  a {
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: ${({ theme }) => theme.fontSizes.sm};
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    text-decoration: none;
    transition: ${({ theme }) => theme.transitions.fast};
    
    &:hover {
      color: ${({ theme }) => theme.colors.secondary};
    }
  }
`;

const Layout = ({ children }) => {
  const currentYear = new Date().getFullYear();
  
  return (
    <LayoutWrapper>
      <Navigation />
      <Main>{children}</Main>
      <Footer>
        <FooterContent>
          <FooterText>© {currentYear} Dan Schmitz. All rights reserved.</FooterText>
          <FooterLinks>
            <a href="https://www.linkedin.com/in/schmitzdan" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a href="https://github.com/ds1" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a href="mailto:dan@schmitz.ai">
              Email
            </a>
          </FooterLinks>
        </FooterContent>
      </Footer>
    </LayoutWrapper>
  );
};

export default Layout;