import React, { useContext } from 'react';
import { Link } from '@reach/router';
import styled, { ThemeContext } from 'styled-components/macro';
import { faLongArrowRight, faExternalLink } from '@fortawesome/pro-light-svg-icons';
import Icon from './Icon';
import { borderRadius, spacing, fontSize } from 'src/theme';

type StyleProps = {
  fg?: string;
  bg?: string;
};

const LinkStyles = styled.a<StyleProps>(
  ({ theme, fg }) => ({
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
    padding: spacing.small + ' ' + spacing.medium,
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

const ExternalLink = ({ children, ...props }) => {
  const themeContext = useContext(ThemeContext);

  return (
    <LinkStyles {...props} target="_blank">
      {children}
      <Icon icon={faLongArrowRight} color={props.fg ?? themeContext.ui.link.icon.external.color} />
    </LinkStyles>
  );
};

const HighlightExternalLink = ({ children, ...props }) => {
  const themeContext = useContext(ThemeContext);

  return (
    <HighlightExternalLinkStyles {...props} target="_blank">
      {children}
      <Icon icon={faExternalLink} color={props.fg ?? themeContext.ui.link.icon.external.color} />
    </HighlightExternalLinkStyles>
  );
};

const SimpleExternalLink = ({ children, ...props }) => {
  const css = { padding: 0, ...props.css };
  return (
    <LinkStyles {...props} target="_blank" css={css}>
      {children}
    </LinkStyles>
  );
};

const InternalLink = ({ children, ...props }) => {
  const themeContext = useContext(ThemeContext);

  return (
    <LinkStyles as={Link} to={props.to} {...props}>
      {children}
      <Icon icon={faLongArrowRight} color={props.fg ?? themeContext.ui.link.icon.internal.color} />
    </LinkStyles>
  );
};

const SimpleInternalLink = ({ children, ...props }) => {
  const themeContext = useContext(ThemeContext);
  const css = { padding: 0, ...props.css };
  return (
    <LinkStyles as={Link} to={props.to} {...props} css={css}>
      {children}
    </LinkStyles>
  );
};

export {
  ExternalLink,
  InternalLink,
  SimpleExternalLink,
  SimpleInternalLink,
  HighlightExternalLink,
};
