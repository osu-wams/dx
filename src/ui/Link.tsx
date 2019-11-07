import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { Link } from '@reach/router';
import { faLongArrowRight } from '@fortawesome/pro-light-svg-icons';
import Icon from './Icon';
import { theme } from '../theme';

const LinkStyles = styled.a<StyleProps>`
  :hover,
  :active,
  :focus {
    text-decoration: underline;
  }
  text-decoration: none;
  display: inline-block;
  padding: 0.4rem 0.8rem;
  border-radius: ${theme.borderRadius[8]};
  &.simple {
    padding: 0;
  }
  background-color: ${({ bg, theme }) => bg || theme.ui.link.background};
  color: ${({ fg, theme }) => fg || theme.ui.link.color};
  font-weight: ${props => (props.bg ? '300' : '500')};
  & > svg {
    margin-left: 1.2rem;
  }
`;

type StyleProps = {
  fg?: string;
  bg?: string;
};

const ExternalLink = ({ children, ...props }) => {
  const themeContext = useContext(ThemeContext);

  return (
    <LinkStyles {...props} target="_blank">
      {children}
      <Icon
        icon={faLongArrowRight}
        color={props.fg ? props.fg : themeContext.ui.link.icon.external.color}
      />
    </LinkStyles>
  );
};

const SimpleExternalLink = ({ children, ...props }) => (
  <LinkStyles {...props} target="_blank" className="simple">
    {children}
  </LinkStyles>
);

const InternalLink = ({ children, ...props }) => {
  const themeContext = useContext(ThemeContext);

  return (
    <LinkStyles as={Link} {...props}>
      {children}
      <Icon
        icon={faLongArrowRight}
        color={props.fg ? props.fg : themeContext.ui.link.icon.internal.color}
      />
    </LinkStyles>
  );
};

export { ExternalLink, InternalLink, SimpleExternalLink };
