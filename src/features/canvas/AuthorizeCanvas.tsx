import React, { useContext } from 'react';
import canvasLogo from '../../assets/logo-canvas.png';
import { faArrowRight } from '@fortawesome/pro-light-svg-icons';
import { ListItem, ListItemDescription, ListItemText, ListItemContentLink } from '../../ui/List';
import { ButtonLink } from '../../ui/Button';
import Icon from '../../ui/Icon';
import { Event } from '../../util/gaTracking';
import { styled, ThemeContext } from '../../theme';

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
