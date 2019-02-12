import React, { FC } from 'react';
import styled from 'styled-components';
import { faArrowRight, faCloudShowers } from '@fortawesome/pro-light-svg-icons';

import Icon from '../ui/Icon';
import { Color } from '../theme';

type LinkText = {
  text: string;
  href: string;
  target?: string;
};

const Link = styled.a`
  color: ${Color['orange-400']};
  text-decoration: none;
  display: inline-block;
  padding: 1rem;
  svg {
    margin-left: 1rem;
  }
`;

const MoreInfoLink: FC<LinkText> = ({ text, ...props }) => (
  <Link {...props}>
    {text}
    <Icon icon={faArrowRight} color={Color['orange-400']} />
  </Link>
);

export default MoreInfoLink;
