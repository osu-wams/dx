import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { faChevronDown, faChevronUp } from '@fortawesome/pro-light-svg-icons';
import Icon from './Icon';
import { Color, shadows, theme } from '../theme';
import useMediaQuery from '../util/useMediaQuery';

const CardContext = React.createContext<any>(null);

const Card = ({ children, ...props }) => {
  const [collapsed, setCollapsed] = useState(true);
  const toggleCollapsed = () => setCollapsed(!collapsed);
  const isMobile = !useMediaQuery('(min-width: 768px)');
  const collapsible = isMobile;
  const value = { collapsed, toggleCollapsed, collapsible };

  return (
    <CardBase style={{ padding: 0 }} {...props}>
      <CardContext.Provider value={value}>{children}</CardContext.Provider>
    </CardBase>
  );
};

const CardBase = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: ${theme.borderRadius};
  box-shadow: ${shadows[1]};
  background-color: ${Color.white};
  overflow: hidden;
  margin-bottom: ${theme.spacing.unit * 2}px;
`;

const CardHeader = ({ badge = '', title, ...props }) => {
  const { collapsed, toggleCollapsed, collapsible } = useContext(CardContext);
  const handleKeyDown = e => {
    if (e.key === 'Enter' || e.key === ' ') {
      toggleCollapsed();
    }
  };
  return (
    <CardHeaderWrapper
      collapsible={collapsible}
      collapsed={collapsed}
      onClick={collapsible ? toggleCollapsed : undefined}
      onKeyDown={collapsible ? handleKeyDown : undefined}
      role={collapsible ? 'button' : ''}
      aria-pressed={collapsible ? !collapsed : undefined}
      tabIndex={collapsible ? 0 : -1}
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

const CardHeaderWrapper = styled.div<{ collapsed: boolean, collapsible: boolean }>`
  height: 64px;
  width: 100%;
  padding: ${theme.spacing.unit * 2}px;
  display: flex;
  align-items: center;
  cursor: pointer;
  border-bottom: ${props => (props.collapsed && props.collapsible ? 'none' : `1px solid ${Color['neutral-200']}`)};
`;

const CardContent = ({ ...props }) => {
  const { collapsed, _, collapsible } = useContext(CardContext);
  return <CardContentWrapper collapsed={collapsed} collapsible={collapsible} {...props} />;
};

const CardContentWrapper = styled.div<{ collapsed: boolean, collapsible: boolean }>`
  flex: 1;
  padding: ${theme.spacing.unit * 2}px;
  ${props => props.collapsible && `
    height: ${props.collapsed ? 0 : 'auto'};
    padding: ${props.collapsed ? 0 : theme.spacing.unit * 2}px;
  `}
  overflow: hidden;
`;

const CardFooter = ({ ...props }) => {
  const { collapsed, _, collapsible } = useContext(CardContext);
  return <CardFooterWrapper collapsed={collapsed} collapsible={collapsible} {...props} />;
};

const CardFooterWrapper = styled.div<{ collapsed: boolean, collapsible: boolean }>`
  padding: ${`${theme.spacing.unit}px ${theme.spacing.unit * 2}px`};

  ${props => props.collapsible && `
    height: ${props.collapsed ? 0 : 'auto'};
    padding: ${props.collapsed ? 0 : `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`};
  `}
  overflow: hidden;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const Badge = styled.div<{ fg?: Color; bg?: Color }>`
  height: 32px;
  width: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: ${props => props.bg || Color['orange-400']};
  color: ${props => props.fg || Color.white};
  margin-right: 12px;
`;

export { Card, CardHeader, CardContent, CardFooter, Badge, CardBase };
