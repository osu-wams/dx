import React, { useContext } from 'react';
import styled from 'styled-components';
import { theme } from '../../theme';
import { ICollapse } from './ICollapse';
import { CardContext } from './Card';

const CardContent = ({ ...props }) => {
  const { collapsed, collapsible, uuid } = useContext(CardContext);
  return (
    <CardContentWrapper
      id={uuid}
      collapsed={collapsed}
      collapsible={collapsible}
      role={collapsible ? 'region' : undefined}
      aria-labelledby={collapsed ? undefined : `${uuid}header`}
      aria-live={collapsed ? 'polite' : undefined}
      aria-atomic={collapsed ? true : undefined}
      {...props}
    />
  );
};

const CardContentWrapper = styled.div<ICollapse>`
  padding: ${theme.spacing.unit * 2}px;
  ${props =>
    props.collapsible &&
    `
    flex: ${props.collapsed ? 'none' : 1};
    visibility: ${props.collapsed ? 'collapse' : 'visible'};
    height: ${props.collapsed ? 0 : 'auto'};
    padding: ${props.collapsed ? 0 : theme.spacing.unit * 2}px;
  `}
  overflow: hidden;
  /* Use this when you don't want margin or padding inside cards */
  &.flush {
    padding: 0;
  }
`;

export default CardContent;
