import React from 'react';
import styled from 'styled-components';
import Navigation from './Navigation';

const LayoutWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  font-family: 'Arial', sans-serif;
  min-height: 100vh;
  
  @media (max-width: 768px) {
    padding: 0 16px; // Smaller padding on mobile
  }
  
  @media (max-width: 480px) {
    padding: 0 12px; // Even smaller for very small screens
  }
`;

const Main = styled.main`
  padding-bottom: 60px; // Add some bottom padding
  
  @media (max-width: 768px) {
    padding-bottom: 40px;
  }
`;

const Layout = ({ children }) => {
  return (
    <LayoutWrapper>
      <Navigation />
      <Main>{children}</Main>
    </LayoutWrapper>
  );
};

export default Layout;