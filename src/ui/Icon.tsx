import React from 'react';
import styled from 'styled-components/macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fontSize } from '../theme';

type IconProps = {
  bg?: string;
  color?: string;
  fontSize?: string;
};

const IconWrapper = styled.div`
  position: relative;
`;

const IconCounter = styled.div`
  font-size: ${fontSize[12]};
  position: absolute;
  bottom: -${12 / 2 / 10}rem;
  right: -${12 / 2 / 10}rem;
  color: ${({ theme }) => theme.ui.icon.counter.color};
  background-color: ${({ theme }) => theme.ui.icon.counter.background};
  padding: 0 ${12 / 2 / 10}rem !important;
  border-radius: ${(12 * (3 / 4)) / 10}rem;
`;

export const IconStyle = styled(FontAwesomeIcon)<IconProps>(
  ({ theme, color, bg }) => ({
    color: color || theme.ui.icon.color,
    backgroundColor: bg || theme.ui.icon.background,
  }),
  ({ bg }) =>
    bg && {
      padding: '.5rem',
      borderRadius: '50%',
    },
  ({ fontSize }) =>
    fontSize && {
      fontSize: fontSize,
    }
);

const Icon = (props: any) => {
  if (props.count !== undefined) {
    const { count, ...others } = props;
    return (
      <IconWrapper>
        <IconStyle {...others} />
        <IconCounter data-testid="icon-counter">{count}</IconCounter>
      </IconWrapper>
    );
  }
  return <IconStyle {...props} />;
};

export default Icon;
