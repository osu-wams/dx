import React, { useContext } from 'react';
import styled from 'styled-components/macro';
import { spacing } from 'src/theme';
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

const CardContentWrapper = styled.div<ICollapse>(
  ({ flush }) => ({
    padding: flush ? 0 : `${spacing.default} ${spacing.default} 0 ${spacing.default}`,
    overflow: 'hidden',
  }),
  ({ collapsed, collapsible }) =>
    collapsible && {
      flex: collapsed ? 'none' : 1,
      height: collapsed ? 0 : 'auto',
      padding: collapsed ? 0 : spacing.default,
      visibility: collapsed ? 'collapse' : 'visible',
    }
);

export default CardContent;
