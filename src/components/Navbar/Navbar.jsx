import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #282c34;
  color: white;
`;

const NavLogo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

const NavLinks = styled.ul`
  list-style: none;
  display: flex;
  gap: 1.5rem;

  li {
    cursor: pointer;
    transition: color 0.3s ease;

    &:hover {
      color: #61dafb;
    }
  }
  `;

  const StyledLink = styled(Link) `
    color: white;
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: #61dafb;
    }
    `;

const Navbar = () => {
  return (
    <NavbarContainer>
      <NavLogo>Logo</NavLogo>
      <NavLinks>
        <li>
          <StyledLink to= "/">Home</StyledLink>
        </li>
        <li>
          <StyledLink to= "/Livros">Livros</StyledLink>
        </li>
        <li>
          <StyledLink to= "/">Suporte</StyledLink>
        </li>
        
      </NavLinks>
    </NavbarContainer>
  );
};

export default Navbar;
