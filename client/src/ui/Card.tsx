import React, { useState, useContext, FC } from 'react';
import styled from 'styled-components';
import uuidv4 from 'uuid/v4';
import { faChevronDown, faChevronUp } from '@fortawesome/pro-light-svg-icons';
import Icon from './Icon';
import { Color, shadows, theme } from '../theme';
import useMediaQuery from '../util/useMediaQuery';

const CardContext = React.createContext<any>(null);

const Card = ({ children, ...props }) => {
  // Generate a UUID for linking header to controlled content
  const uuid = uuidv4();
  const [collapsed, setCollapsed] = useState(true);
  const toggleCollapsed = () => setCollapsed(!collapsed);
  const isMobile = !useMediaQuery('(min-width: 768px)');
  const collapsible = isMobile;
  const value = { collapsed, toggleCollapsed, collapsible, uuid };

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

const CardHeaderWrapper = styled.div<{ collapsed: boolean; collapsible: boolean }>`
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

const CardContent = ({ ...props }) => {
  const { collapsed, collapsible, uuid } = useContext(CardContext);
  return (
    <CardContentWrapper
      id={uuid}
      collapsed={collapsed}
      collapsible={collapsible}
      role={collapsible ? 'region' : undefined}
      aria-labelledby={`${uuid}header`}
      {...props}
    />
  );
};

const CardContentWrapper = styled.div<{ collapsed: boolean; collapsible: boolean }>`
  flex: 1;
  padding: ${theme.spacing.unit * 2}px;
  ${props =>
    props.collapsible &&
    `
    visibility: ${props.collapsed ? 'collapse' : 'visible'};
    height: ${props.collapsed ? 0 : 'auto'};
    padding: ${props.collapsed ? 0 : theme.spacing.unit * 2}px;
  `}
  overflow: hidden;
`;

const CardFooter = ({ ...props }) => {
  const { collapsed, _, collapsible } = useContext(CardContext);
  return <CardFooterWrapper collapsed={collapsed} collapsible={collapsible} {...props} />;
};

const CardFooterWrapper = styled.div<{ collapsed: boolean; collapsible: boolean }>`
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
