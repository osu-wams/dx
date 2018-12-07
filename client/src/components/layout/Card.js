import React, { useState, useContext, useRef, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { shadows, colors } from '../../theme';
import useMediaQuery from '../../util/useMediaQuery';

const CardContext = React.createContext();

/*===========================================
                    CARD
===========================================*/
const Card = ({ children, color, ...props }) => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <CardContext.Provider
      value={{
        collapsed,
        toggleCollapsed: () => setCollapsed(!collapsed)
      }}
    >
      <CardWrapper color={color} {...props}>
        {children}
      </CardWrapper>
    </CardContext.Provider>
  );
};

Card.propTypes = {
  color: PropTypes.oneOf(Object.keys(colors)),
  elevation: PropTypes.number
};

Card.defaultProps = {
  color: 'orange',
  elevation: 1
};

const CardWrapper = styled.div`
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: ${({ elevation, theme, color }) =>
    `${shadows[elevation]}, 0px -8px 0px 0px ${theme.colors[color]}`};
  overflow: hidden;
  transition: box-shadow 0.1s linear;
  margin-top: 8px;
  margin-bottom: ${({ theme }) => `${theme.spacing.unit * 3}px`};

  @media screen and (min-width: 768px) {
    & {
      margin-top: 8px;
    }
  }
`;

/*===========================================
                 CARD HEADER
===========================================*/
const CardHeader = props => {
  const isMobile = !useMediaQuery('(min-width: 768px)');
  const { toggleCollapsed, collapsed } = useContext(CardContext);
  const cardHeaderEl = useRef(null);

  // Auto-expand cards when switching to desktop
  useEffect(() => {
    if (!isMobile && collapsed) {
      toggleCollapsed();
    }
  });

  const handleClick = e => {
    // Remove focus ring on mouse click
    if (e.detail > 0) {
      cardHeaderEl.current.blur();
    }
    toggleCollapsed();
  };

  return isMobile ? (
    <CardHeaderWrapper
      as="button"
      ref={cardHeaderEl}
      className="cardheader-clickable"
      onClick={handleClick}
      {...props}
    />
  ) : (
    <CardHeaderWrapper {...props} />
  );
};

const CardHeaderWrapper = styled.div`
  border: 0;
  background: transparent;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => `0 ${theme.spacing.unit * 2}px`};
  min-height: 68px;
  :hover {
    cursor: ${props => (props.clickable ? 'pointer' : 'initial')};
  }

  &.cardheader-clickable {
    cursor: pointer;
  }
`;

const CardHeaderTitle = styled.div`
  font-size: 24px;
  font-family: 'Stratum2', sans-serif;
  font-weight: bold;
`;

const CardHeaderSubtitle = styled.div`
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
  font-weight: 300;
  display: flex;
  align-items: center;
`;

/*===========================================
                 CARD CONTENT
===========================================*/
const CardContentWrapper = styled.div`
  overflow: hidden;
  max-height: ${props => (props.collapsed ? '0' : '100%')};
  padding: ${({ theme, collapsed }) => (collapsed ? 0 : `${theme.spacing.unit * 2}px`)};
  padding-top: ${({ theme, collapsed }) => (collapsed ? 0 : `${theme.spacing.unit}px`)};
`;

const CardContent = props => {
  const { collapsed } = useContext(CardContext);
  return <CardContentWrapper {...props} collapsed={collapsed} aria-expanded={!collapsed} />;
};

export { Card, CardHeader, CardHeaderTitle, CardHeaderSubtitle, CardContent };
