import React, { useState, useContext, FC } from 'react';
import styled from 'styled-components';
import uuidv4 from 'uuid/v4';
import { faChevronDown, faChevronUp, IconDefinition } from '@fortawesome/pro-light-svg-icons';
import Icon from '../Icon';
import { InfoButton } from '../Button';
import { Color, shadows, theme } from '../../theme';
import useMediaQuery from '../../util/useMediaQuery';

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

interface ICollapse {
  collapsed: boolean;
  collapsible: boolean;
}

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

const CardContentWrapper = styled.div<ICollapse>`
  padding: ${theme.spacing.unit * 2}px;
  ${props =>
    props.collapsible &&
    `
    flex: ${props.collapsed ? 'none' : 1};
    visibility: ${props.collapsed ? 'collapse' : 'visible'};
    height: ${props.collapsed ? 0 : 'auto'};
    padding: ${props.collapsed ? 0 : theme.spacing.unit * 2}px;
  `}
  overflow: hidden;
`;

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

interface IBadge {
  fg?: Color;
  bg?: Color;
}

const Badge = styled.div<IBadge>`
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

const CardIconWrapper = styled.div`
  margin-right: 12px;
`;

const CardIconBase = styled(Icon)`
  font-size: ${theme.fontSize[24]};
`;

const CardIcon: FC<{ icon: IconDefinition; count?: number }> = ({ icon, count }) => {
  return (
    <CardIconWrapper>
      <CardIconBase icon={icon} color={Color['neutral-550']} count={count} />
    </CardIconWrapper>
  );
};

/**
 * UI component intended to become full-width with a single flex column to fill
 * a card in place of a CardContent component.
 */
const CardContentTable = styled.div`
  display: flex;
  flex-direction: column;
`;

interface ICardContentRow {
  borderless?: boolean;
}

/**
 * A row with an optional bottom border to establish a full width series of nested cells, intended to be
 * used inside of a CardContentTable UI.
 */
const CardContentRow = styled.div<ICardContentRow>`
  display: flex;
  flex-direction: row;
  background-color: ${Color.white};
  overflow: hidden;
  border-bottom: ${props => (props.borderless ? 'none' : `1px solid ${Color['neutral-200']}`)};
`;

/**
 * A cell intended to be used inside of a CardContentRow UI.
 */
const CardContentCell = styled.div`
  padding: ${theme.spacing.unit * 2}px;
  flex-grow: 1;
  flex-basis: 0;
  & + div {
    border-left: 1px solid ${Color['neutral-200']};
  }
`;

export {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  Badge,
  CardIcon,
  CardBase,
  CardContentTable,
  CardContentRow,
  CardContentCell
};
