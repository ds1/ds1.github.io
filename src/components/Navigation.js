import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
`;

const Logo = styled(NavLink)`
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
  color: #000;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 20px;
`;

const NavLinkStyled = styled(NavLink)`
  text-decoration: none;
  color: #000;

  &.active {
    font-weight: bold;
  }

  &:hover {
    text-decoration: underline;
  }
`;

const Navigation = () => {
  return (
    <Nav>
      <Logo to="/">Dan Schmitz</Logo>
      <NavLinks>
        <NavLinkStyled to="/" end>Case Studies</NavLinkStyled>
        <NavLinkStyled to="/resume">Resume</NavLinkStyled>
        <NavLinkStyled to="/about">About</NavLinkStyled>
      </NavLinks>
    </Nav>
  );
};

export default Navigation;