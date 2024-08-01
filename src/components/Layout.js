import React from 'react';
import styled from 'styled-components';
import Navigation from './Navigation';

const LayoutWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  font-family: 'Arial', sans-serif;
`;

const Layout = ({ children }) => {
  return (
    <LayoutWrapper>
      <Navigation />
      <main>{children}</main>
    </LayoutWrapper>
  );
};

export default Layout;