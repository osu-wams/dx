import React, {useContext, FC} from 'react';
import { faChevronDown, faChevronUp } from '@fortawesome/pro-light-svg-icons';
import styled from 'styled-components';
import Icon from '../Icon';
import {ICollapse} from './ICollapse';
import {theme, Color} from '../../theme';
import {CardContext} from './index';

const CardHeader: FC<{ title: string; badge?: any }> = ({title, badge, ...props }) => {
  const { collapsed, toggleCollapsed, collapsible, uuid } = useContext(CardContext);
  const handleKeyDown = e => {
    if (e.key === 'Enter' || e.key === ' ') {
      toggleCollapsed();
    }
  };
  return (
    <CardHeaderWrapper
      id={`${uuid}header`}
      collapsible={collapsible}
      collapsed={collapsed}
      onClick={collapsible ? toggleCollapsed : undefined}
      onKeyDown={collapsible ? handleKeyDown : undefined}
      role={collapsible ? 'button' : undefined}
      aria-controls={collapsible ? uuid : undefined}
      aria-expanded={collapsible ? !collapsed : undefined}
      tabIndex={collapsible ? 0 : undefined}
      {...props}
    >
      {badge}
      <span>{title}</span>
      {collapsible && (
        <Icon icon={collapsed ? faChevronDown : faChevronUp} style={{ marginLeft: 'auto' }} />
      )}
    </CardHeaderWrapper>
  );
};

const CardHeaderWrapper = styled.div<ICollapse>`
  height: 64px;
  width: 100%;
  padding: ${theme.spacing.unit * 2}px;
  display: flex;
  align-items: center;
  cursor: ${props => (props.collapsible ? 'pointer' : 'default')};
  border: none;
  border-bottom: ${props =>
    props.collapsed && props.collapsible ? 'none' : `1px solid ${Color['neutral-200']}`};
`;

export default CardHeader;