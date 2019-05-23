import styled from 'styled-components';
import React from 'react';
import { faLongArrowRight } from '@fortawesome/pro-light-svg-icons';
import Icon from './Icon';
import { Color } from '../theme';

const ExternaLinkStyles = styled.a<StyleProps>`
  :hover,
  :active,
  :focus {
    text-decoration: underline;
  }
  text-decoration: none;
  display: inline-block;
  padding: 0.4rem 0.8rem;
  background-color: ${props => props.bg || 'transparent'};
  color: ${props => props.fg || Color['neutral-550']};
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
    <ExternaLinkStyles {...props} target="_blank">
      {children}
      <Icon icon={faLongArrowRight} color={Color['neutral-550']} />
    </ExternaLinkStyles>
  );
};

export default ExternalLink;
