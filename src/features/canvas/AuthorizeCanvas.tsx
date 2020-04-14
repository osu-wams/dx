import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components/macro';
import { faArrowRight } from '@fortawesome/pro-light-svg-icons';
import canvasLogo from 'src/assets/logo-canvas.png';
import { ListItem, ListItemDescription, ListItemText, ListItemContentLink } from 'src/ui/List';
import { ButtonLink } from 'src/ui/Button';
import Icon from 'src/ui/Icon';
import { Event } from 'src/util/gaTracking';

const AuthorizeCanvasStyle = styled.div`
  margin: 0 auto 1rem;
  text-align: center;
`;

export const AuthorizeCanvas = () => {
  const themeContext = useContext(ThemeContext);
  return (
    <AuthorizeCanvasStyle onClick={() => Event('canvas-auth', 'Clicked Authorize Canvas')}>
      <img src={canvasLogo} alt="Canvas" />
      <p>Authorize Canvas to see your assignments here.</p>
      <ButtonLink
        bg={themeContext.features.canvas.authorizeButton.background}
        as="a"
        href="/canvas/login"
      >
        Authorize Canvas
      </ButtonLink>
    </AuthorizeCanvasStyle>
  );
};

export const AuthorizeCanvasCompact = () => {
  const themeContext = useContext(ThemeContext);
  return (
    <ListItem>
      <ListItemContentLink href="/canvas/login">
        <img src={canvasLogo} alt="Canvas" />
        <ListItemText>
          <ListItemDescription>Authorize Canvas to see your assignments here.</ListItemDescription>
        </ListItemText>
        <Icon
          icon={faArrowRight}
          bg={themeContext.features.canvas.authorizeButton.background}
          color={themeContext.features.canvas.authorizeButton.color}
        />
      </ListItemContentLink>
    </ListItem>
  );
};
