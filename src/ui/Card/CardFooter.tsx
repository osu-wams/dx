import React, { useContext } from 'react';
import styled from 'styled-components/macro';
import { InfoButton } from 'src/ui/Button';
import { spacing } from 'src/theme';
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

const CardFooterWrapper = styled.div<ICollapse>(
  {
    padding: spacing.default,
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
    /* If we only have 1 link, align it right */
    'a:only-child': {
      marginLeft: 'auto',
    },
  },
  ({ collapsible, collapsed }) =>
    collapsible && {
      height: collapsed ? 0 : 'auto',
      padding: collapsed ? 0 : `${spacing.medium} ${spacing.default}`,
      visibility: collapsed ? 'collapse' : 'visible',
    }
);

export default CardFooter;
