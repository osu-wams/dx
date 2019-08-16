import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { theme, Color } from '../theme';

type IconProps = {
  bg?: Color;
  color?: Color;
};

const IconWrapper = styled.div`
  position: relative;
`;

const IconCounter = styled.div`
  font-size: ${theme.fontSize[12]};
  position: absolute;
  bottom: -${12 / 2 / 10}rem;
  right: -${12 / 2 / 10}rem;
  color: ${Color.white};
  background-color: ${Color['orange-400']};
  padding: 0 ${12 / 2 / 10}rem !important;
  border-radius: ${(12 * (3 / 4)) / 10}rem;
`;

const IconStyle = styled(FontAwesomeIcon)<IconProps>`
  color: ${props => props.color || Color['neutral-400']};
  background-color: ${props => props.bg || 'transparent'};
  padding: ${props => (props.bg ? '.5rem' : '0')};
  border-radius: ${props => (props.bg ? '50%' : '0')};
`;

const Icon = (props: any) => {
  if (props.count !== undefined) {
    const { count, ...others } = props;
    return (
      <IconWrapper>
        <IconStyle {...others} />
        <IconCounter>{count}</IconCounter>
      </IconWrapper>
    );
  }
  return <IconStyle {...props} />;
};

export default Icon;
