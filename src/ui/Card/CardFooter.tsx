import React, { useContext } from 'react';
import styled from 'styled-components';
import { InfoButton } from '../Button';
import {theme} from '../../theme';
import {ICollapse} from './ICollapse';
import {CardContext} from './index';

const CardFooter = ({ ...props }) => {
  const { collapsed, collapsible } = useContext(CardContext);
  return (
    <CardFooterWrapper collapsed={collapsed} collapsible={collapsible} {...props}>
      <InfoButton infoButtonId={props.infoButtonId} />
      {props.children}
    </CardFooterWrapper>
  );
};

const CardFooterWrapper = styled.div<ICollapse>`
  padding: ${`${theme.spacing.unit}px ${theme.spacing.unit * 2}px`};
  ${props =>
    props.collapsible &&
    `
    display: ${props.collapsed ? 'collapse' : 'visible'}
    height: ${props.collapsed ? 0 : 'auto'};
    padding: ${props.collapsed ? 0 : `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`};
  `}
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  /* If we only have 1 link, align it right */
  a:only-child {
    margin-left: auto;
  }
`;

export default CardFooter;