import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import Icon from './Icon';
import { Color, shadows, theme } from '../theme';

const CardContext = React.createContext<any>(null);

const Card = ({ children, ...props }) => {
  const [collapsed, setCollapsed] = useState(true);
  const toggleCollapsed = () => setCollapsed(!collapsed);
  const value = { collapsed, toggleCollapsed };

  return (
    <CardBase style={{ padding: 0 }} {...props}>
      <CardContext.Provider value={value}>{children}</CardContext.Provider>
    </CardBase>
  );
};

const CardBase = styled.div`
  border-radius: ${theme.borderRadius};
  box-shadow: ${shadows[1]};
  background-color: ${Color.white};
  overflow: hidden;
`;

const CardHeader = ({ badge, title, ...props }) => {
  const { collapsed, toggleCollapsed } = useContext(CardContext);
  const handleKeyDown = e => {
    if (e.key === 'Enter' || e.key === ' ') {
      toggleCollapsed();
    }
  };
  return (
    <CardHeaderWrapper
      collapsed={collapsed}
      onClick={toggleCollapsed}
      onKeyDown={handleKeyDown}
      aria-role="button"
      tabIndex={0}
      {...props}
    >
      {badge}
      <span>{title}</span>
      <Icon icon={collapsed ? faChevronDown : faChevronUp} style={{ marginLeft: 'auto' }} />
    </CardHeaderWrapper>
  );
};

const CardHeaderWrapper = styled.div<{ collapsed: boolean }>`
  height: 64px;
  width: 100%;
  padding: ${theme.spacing.unit * 2}px;
  display: flex;
  align-items: center;
  cursor: pointer;
  border-bottom: ${props => (props.collapsed ? 'none' : `1px solid ${Color['neutral-200']}`)};
`;

const CardContent = ({ ...props }) => {
  const { collapsed } = useContext(CardContext);
  return <CardContentWrapper collapsed={collapsed} {...props} />;
};

const CardContentWrapper = styled.div<{ collapsed: boolean }>`
  height: ${props => (props.collapsed ? 0 : 'auto')};
  overflow: hidden;
  padding: ${props => (props.collapsed ? 0 : theme.spacing.unit * 2)}px;
`;

const CardFooter = ({ ...props }) => {
  const { collapsed } = useContext(CardContext);
  return <CardFooterWrapper collapsed={collapsed} {...props} />;
};

const CardFooterWrapper = styled.div<{ collapsed: boolean }>`
  height: ${props => (props.collapsed ? 0 : 'auto')};
  overflow: hidden;
  padding: ${props =>
    props.collapsed ? 0 : `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`};
  background-color: ${Color['neutral-100']};
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
