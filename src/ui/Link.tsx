import React from 'react';
import styled from 'styled-components';
import { Link } from '@reach/router';
import { faLongArrowRight } from '@fortawesome/pro-light-svg-icons';
import Icon from './Icon';
import { Color, theme } from '../theme';

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
  background-color: ${props => props.bg || 'transparent'};
  color: ${props => props.fg || Color['orange-400']};
  font-weight: ${props => (props.bg ? '300' : '500')};
  & > svg {
    margin-left: 1.2rem;
  }
`;

type StyleProps = {
  fg?: Color;
  bg?: Color;
};

const ExternalLink = ({ children, ...props }) => {
  return (
    <LinkStyles {...props} target="_blank">
      {children}
      <Icon icon={faLongArrowRight} color={props.fg ? props.fg : Color['orange-400']} />
    </LinkStyles>
  );
};

const SimpleExternalLink = ({ children, ...props }) => (
  <LinkStyles {...props} target="_blank" className="simple">
    {children}
  </LinkStyles>
);

const InternalLink = ({ children, ...props }) => {
  return (
    <LinkStyles as={Link} {...props}>
      {children}
      <Icon icon={faLongArrowRight} color={props.fg ? props.fg : Color['orange-400']} />
    </LinkStyles>
  );
};

export { ExternalLink, InternalLink, SimpleExternalLink };
