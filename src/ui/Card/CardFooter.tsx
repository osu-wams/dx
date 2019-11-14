import React, { useContext } from 'react';
import { InfoButton } from '../Button';
import { themeSettings, styled } from '../../theme';
import { ICollapse } from './ICollapse';
import { CardContext } from './Card';

const CardFooter = ({ ...props }) => {
  const { collapsed, collapsible } = useContext(CardContext);

  return props.children || props.infoButtonId ? (
    <CardFooterWrapper collapsed={collapsed} collapsible={collapsible} {...props}>
      <InfoButton infoButtonId={props.infoButtonId} />
      {props.children}
    </CardFooterWrapper>
  ) : (
    <></>
  );
};

const CardFooterWrapper = styled.div<ICollapse>`
  padding: ${themeSettings.spacing.unit * 2}px;
  ${props =>
    props.collapsible &&
    `
    display: ${props.collapsed ? 'collapse' : 'visible'}
    height: ${props.collapsed ? 0 : 'auto'};
    padding: ${
      props.collapsed ? 0 : `${themeSettings.spacing.unit}px ${themeSettings.spacing.unit * 2}px`
    };
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
