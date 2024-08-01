import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  background-color: ${({ theme }) => theme.colors.surface};
`;

const Logo = styled(NavLink)`
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.text};
`;

const NavLinks = styled.div`
  display: flex;
  gap: 20px;
`;

const NavLinkStyled = styled(NavLink)`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.textSecondary};

  &.active {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: bold;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Navigation = () => {
  return (
    <Nav>
      <Logo to="/">SCHMITZ.AI</Logo>
      <NavLinks>
        <NavLinkStyled to="/" end>Case Studies</NavLinkStyled>
        <NavLinkStyled to="/resume">Resume</NavLinkStyled>
        <NavLinkStyled to="/about">About</NavLinkStyled>
        <NavLinkStyled to="/contact">Contact</NavLinkStyled>
      </NavLinks>
    </Nav>
  );
};

export default Navigation;