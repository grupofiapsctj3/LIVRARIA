import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #282c34;
  color: white;
  position: absolute;
  width: 100%;
  bottom: 0;
  box-sizing: border-box;
`;

const FooterText = styled.p`
  font-size: 0.9rem;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;

  a {
    color: white;
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: #61dafb;
    }
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterText>&copy; 2024 Meu Projeto. Todos os direitos reservados.</FooterText>
      <SocialLinks>
        <a href="#!">Facebook</a>
        <a href="#!">Twitter</a>
        <a href="#!">LinkedIn</a>
      </SocialLinks>
    </FooterContainer>
  );
};

export default Footer;
