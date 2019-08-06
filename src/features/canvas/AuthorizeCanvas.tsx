import React from 'react';
import styled from 'styled-components';
import canvasLogo from '../../assets/canvas-logo.png';
import { ButtonLink } from '../../ui/Button';
import { Color } from '../../theme';

const AuthorizeCanvasStyle = styled.div`
  margin: 0 auto 1rem;
  text-align: center;
`;

const AuthorizeCanvas = () => {
  return (
    <AuthorizeCanvasStyle>
      <img src={canvasLogo} alt="Canvas" />
      <p>Authorize Canvas to see your assignments here.</p>
      <ButtonLink bg={Color['stratosphere-400']} as="a" href="/canvas/login">
        Authorize Canvas
      </ButtonLink>
    </AuthorizeCanvasStyle>
  );
};

export { AuthorizeCanvas };
