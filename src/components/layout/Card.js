import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MediaQuery from 'react-responsive';
import { shadows } from '../../theme';
import Badge from './Badge';

const CardWrapper = styled.div`
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: ${({ elevation }) => shadows[elevation]},
    0px -8px 0px 0px ${({ theme, variant }) => theme[variant].bg};
  overflow: hidden;
  transition: box-shadow 0.1s linear;
  margin-top: 8px;
  margin-bottom: ${({ theme }) => `${theme.spacing.unit * 3}px`};

  @media screen and (min-width: 768px) {
    & {
      margin-top: 8px;
      margin-bottom: 0;
    }
  }

  ${Badge} {
    background-color: ${({ variant, theme }) => theme[variant].bg};
    color: ${({ variant, theme }) => theme[variant].fg};
  }

  svg {
    color: ${({ variant, theme }) => theme[variant].bg};
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${({ theme }) => `0 ${theme.spacing.unit * 2}px`};
  min-height: 68px;
  line-height: 68px;
  :hover {
    cursor: ${props => (props.clickable ? 'pointer' : 'initial')};
  }

  svg {
    margin-right: ${({ theme }) => `${theme.spacing.unit * 2}px`};
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

const CardContent = styled.div`
  overflow: hidden;
  max-height: ${props => (props.collapsed ? '0' : '100%')};
  padding: ${({ theme, collapsed }) => (collapsed ? 0 : `${theme.spacing.unit * 2}px`)};
  padding-top: 0;
`;

class Card extends Component {
  state = {
    isCollapsed: true
  };

  collapseContent = isCollapsible => {
    if (isCollapsible) {
      this.setState(state => ({ isCollapsed: !state.isCollapsed }));
    }
  };

  render() {
    const { title, subtitle, headerIcon, variant, children, ...props } = this.props;
    const { isCollapsed } = this.state;

    return (
      <MediaQuery minWidth={768}>
        {isDesktop => (
          <CardWrapper variant={variant} {...props}>
            <CardHeader variant={variant} onClick={this.collapseContent} clickable={!isDesktop}>
              <CardHeaderTitle>
                {headerIcon && <FontAwesomeIcon icon={headerIcon} />}
                {title}
              </CardHeaderTitle>
              <CardHeaderSubtitle>{subtitle}</CardHeaderSubtitle>
            </CardHeader>
            <CardContent collapsed={isCollapsed && !isDesktop}>{children}</CardContent>
          </CardWrapper>
        )}
      </MediaQuery>
    );
  }
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.node,
  variant: PropTypes.oneOf(['primary', 'secondary', 'academic']),
  elevation: PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8])
};

Card.defaultProps = {
  subtitle: '',
  variant: 'primary',
  elevation: 1
};

export default Card;
