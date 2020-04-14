import React, { useContext } from 'react';
import styled from 'styled-components/macro';
import { InfoButton } from 'src/ui/Button';
import { themeSettings } from 'src/theme';
import { ICollapse } from './ICollapse';
import { CardContext } from './Card';

const CardFooter = ({ ...props }) => {
  const { collapsed, collapsible } = useContext(CardContext);

  return props.children || props.infoButtonId ? (
    <CardFooterWrapper
      collapsed={collapsed}
      collapsible={collapsible}
      // Want to move this back to the CardFooterWrapper at some point, but tests were failing
      style={{ visibility: collapsible && collapsed ? 'collapse' : 'visible' }}
      {...props}
    >
      <InfoButton infoButtonId={props.infoButtonId} />
      {props.children}
    </CardFooterWrapper>
  ) : (
    <></>
  );
};

const CardFooterWrapper = styled.div<ICollapse>`
  padding: ${themeSettings.spacing.unit * 2}px;
  ${(props) =>
    props.collapsible &&
    `
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
