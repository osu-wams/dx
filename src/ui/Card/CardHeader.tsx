import React, { useContext, FC } from 'react';
import { faChevronDown, faChevronUp } from '@fortawesome/pro-light-svg-icons';
import Icon from '../Icon';
import { ICollapse } from './ICollapse';
import { themeSettings, styled } from '../../theme';
import { CardContext } from './Card';

const CardHeader: FC<{ title: string; badge?: any }> = ({ title, badge, ...props }) => {
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

const CardHeaderWrapper = styled.h2<ICollapse>`
  margin: unset;
  font-weight: normal;
  font-size: ${themeSettings.fontSize[16]};
  height: 64px;
  width: 100%;
  padding: ${themeSettings.spacing.unit * 2}px;
  display: flex;
  align-items: center;
  cursor: ${props => (props.collapsible ? 'pointer' : 'default')};
  border: none;
  border-bottom: ${({ collapsed, collapsible, theme }) =>
    collapsed && collapsible ? 'none' : `1px solid ${theme.ui.card.header.borderBottom}`};
`;

export default CardHeader;
