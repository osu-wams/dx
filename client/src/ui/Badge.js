import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { colors } from '../theme';

// TODO: Non-inline style needs refining. Test with other components.

const BadgeWrapper = styled.span`
  height: 22px;
  min-width: 22px;
  line-height: 22px;
  text-align: center;
  font-weight: 600;
  background-color: ${({ theme, bg }) => theme.colors[bg]};
  color: ${({ theme, fg }) => theme.colors[fg]};
  border-radius: 2rem;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 8px;

  ${({ inline, theme }) => {
    if (inline) {
      return `
        margin-right: ${theme.spacing.unit}px;
      `;
    }
    return `
      position: absolute;
      top: -11px;
      right: -11px;
    `;
  }};
`;

const Wrapper = styled.span`
  display: inline-flex;
  position: relative;
  vertical-align: middle;
  align-items: center;
`;

const Badge = ({ badgeContent, children, inline, ...props }) => (
  <Wrapper inline={inline}>
    <BadgeWrapper inline={inline} {...props}>
      {badgeContent}
    </BadgeWrapper>
    {children}
  </Wrapper>
);

Badge.propTypes = {
  fg: PropTypes.oneOf(Object.keys(colors)),
  bg: PropTypes.oneOf(Object.keys(colors)),
  inline: PropTypes.bool
};

Badge.defaultProps = {
  fg: 'white',
  bg: 'orange',
  inline: false
};

export default Badge;
