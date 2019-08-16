import React from 'react';
import { faArrowRight } from '@fortawesome/pro-light-svg-icons';
import canvasLogo from '../../assets/canvas-logo.png';
import { ListItem, ListItemDescription, ListItemText, ListItemContentLink } from '../../ui/List';
import { Color } from '../../theme';
import Icon from '../../ui/Icon';

const AuthorizeCanvasCompact = () => {
  return (
    <ListItem>
      <ListItemContentLink href="/canvas/login">
        <img src={canvasLogo} alt="Canvas" />
        <ListItemText>
          <ListItemDescription>Authorize Canvas to see your assignments here.</ListItemDescription>
        </ListItemText>
        <Icon icon={faArrowRight} bg={Color['stratosphere-400']} color={Color.white} />
      </ListItemContentLink>
    </ListItem>
  );
};

export { AuthorizeCanvasCompact };
