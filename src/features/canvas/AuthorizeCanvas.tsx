import React from 'react';
import styled from 'styled-components';
import canvasLogo from '../../assets/logo-canvas.png';
import { ButtonLink } from '../../ui/Button';
import { Color } from '../../theme';
import { Event } from '../../util/gaTracking';

const AuthorizeCanvasStyle = styled.div`
  margin: 0 auto 1rem;
  text-align: center;
`;

const AuthorizeCanvas = () => {
  return (
    <AuthorizeCanvasStyle onClick={() => Event('canvas-auth', 'Clicked Authorize Canvas')}>
      <img src={canvasLogo} alt="Canvas" />
      <p>Authorize Canvas to see your assignments here.</p>
      <ButtonLink bg={Color['stratosphere-400']} as="a" href="/canvas/login">
        Authorize Canvas
      </ButtonLink>
    </AuthorizeCanvasStyle>
  );
};

export { AuthorizeCanvas };
