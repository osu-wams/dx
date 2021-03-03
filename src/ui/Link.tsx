import React, { useContext } from 'react';
import { Link } from '@reach/router';
import styled, { ThemeContext } from 'styled-components/macro';
import { faLongArrowRight, faExternalLink } from '@fortawesome/pro-light-svg-icons';
import Icon from './Icon';
import { borderRadius, spacing, fontSize, Color } from 'src/theme';
interface LinkProps {
  children: any;
  to?: string;
  fg?: string;
  hideIcon?: boolean;
  [x: string]: any;
}

type StyleProps = {
  fg?: string;
  bg?: string;
  padding?: string;
};

export const LinkDivider = styled.span`
  :before {
    content: '|';
    color: ${Color['neutral-300']};
  }
`;

const LinkStyles = styled.a<StyleProps>(
  ({ theme, fg, padding }) => ({
    ':hover, :active, :focus': {
      textDecoration: 'underline',
    },
    textDecoration: 'none',
    color: fg ?? theme.ui.link.color,
    backgroundColor: theme.ui.link.background,
    '> svg': {
      marginLeft: '1.2rem',
    },
    display: 'inline-block',
    padding: padding ?? `${spacing.small} ${spacing.medium}`,
  }),
  ({ bg }) =>
    bg && {
      backgroundColor: bg,
      fontWeight: 500,
      borderRadius: borderRadius[8],
    }
);

const HighlightExternalLinkStyles = styled(LinkStyles)<StyleProps>(() => ({
  padding: 0,
  fontWeight: 600,
  fontSize: fontSize[24],
}));

const ExternalLink = (props: LinkProps) => {
  const themeContext = useContext(ThemeContext);
  const { children, fg, hideIcon } = props;
  return (
    <LinkStyles {...props} target="_blank">
      {children}
      {!hideIcon && (
        <Icon icon={faLongArrowRight} color={fg ?? themeContext.ui.link.icon.external.color} />
      )}
    </LinkStyles>
  );
};

const HighlightExternalLink = (props: LinkProps) => {
  const themeContext = useContext(ThemeContext);
  const { children, fg, hideIcon, ...rest } = props;
  return (
    <HighlightExternalLinkStyles {...rest} target="_blank">
      {children}
      {!hideIcon && (
        <Icon icon={faExternalLink} color={props.fg ?? themeContext.ui.link.icon.external.color} />
      )}
    </HighlightExternalLinkStyles>
  );
};

const SimpleExternalLink = (props: LinkProps) => {
  const { children, ...rest } = props;
  return (
    <LinkStyles {...rest} target="_blank" padding={'0'}>
      {children}
    </LinkStyles>
  );
};

const InternalLink = (props: LinkProps) => {
  const { children, to, fg, hideIcon, ...rest } = props;
  const themeContext = useContext(ThemeContext);
  return (
    <LinkStyles as={Link} to={to!} {...rest}>
      {children}
      {!hideIcon && (
        <Icon icon={faLongArrowRight} color={fg ?? themeContext.ui.link.icon.internal.color} />
      )}
    </LinkStyles>
  );
};

const SimpleInternalLink = (props: LinkProps) => {
  useContext(ThemeContext);
  const { children, to, ...rest } = props;
  return (
    <LinkStyles as={Link} {...rest} to={to!} padding={'0'}>
      {children}
    </LinkStyles>
  );
};

const SimpleModalLink = (props: LinkProps) => {
  useContext(ThemeContext);
  const { children, ...rest } = props;
  return (
    <LinkStyles {...rest} padding={'0'}>
      {children}
    </LinkStyles>
  );
};

export {
  ExternalLink,
  InternalLink,
  SimpleExternalLink,
  SimpleInternalLink,
  SimpleModalLink,
  HighlightExternalLink,
};
