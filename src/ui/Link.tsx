import React, { useContext } from 'react';
import { Link } from '@reach/router';
import { faLongArrowRight } from '@fortawesome/pro-light-svg-icons';
import Icon from './Icon';
import { themeSettings, styled, ThemeContext } from '../theme';

const LinkStyles = styled.a<StyleProps>`
  :hover,
  :active,
  :focus {
    text-decoration: underline;
  }
  text-decoration: none;
  display: inline-block;
  padding: 0.4rem 0.8rem;
  border-radius: ${themeSettings.borderRadius[8]};
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

/**
 * !TODO: When StyledComponent gets updated
 * chek this again to remove duplication since a={Link} currently throws error
 */
const LinkStyles2 = styled(Link)<StyleProps>`
  :hover,
  :active,
  :focus {
    text-decoration: underline;
  }
  text-decoration: none;
  display: inline-block;
  padding: 0.4rem 0.8rem;
  border-radius: ${themeSettings.borderRadius[8]};
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
    <LinkStyles2 to={props.to} {...props}>
      {children}
      <Icon
        icon={faLongArrowRight}
        color={props.fg ? props.fg : themeContext.ui.link.icon.internal.color}
      />
    </LinkStyles2>
  );
};

export { ExternalLink, InternalLink, SimpleExternalLink };
