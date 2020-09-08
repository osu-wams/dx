import React from 'react';
import styled from 'styled-components/macro';
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import { fontSize } from '../theme';

type IconProps = {
  bg?: string;
  color?: string;
  fontSize?: string;
};

type CounterProps = {
  count?: number;
  top?: boolean;
}

const IconWrapper = styled.div`
  position: relative;
`;

const IconCounter = styled.div<CounterProps>(
  ({theme}) => ({
    fontSize: fontSize[12],
    position: 'absolute',
    color: theme.ui.icon.counter.color,
    backgroundColor: theme.ui.icon.counter.background,
    padding: '0 .6rem !important',
    borderRadius: '1rem',
  }),
  ({top}) =>  !top ? {
    bottom: '-.5rem',
    right: '-.8rem',
  } : {
    top: '-.6rem',
    left: '50%',
  }
);

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

const Icon = (props: CounterProps & FontAwesomeIconProps & IconProps) => {
  if (props.count !== undefined) {
    const { count, top, ...others } = props;
    return (
      <IconWrapper>
        <IconStyle {...others} />
        <IconCounter data-testid="icon-counter" top={top}>{count}</IconCounter>
      </IconWrapper>
    );
  }
  return <IconStyle {...props} />;
};

export default Icon;
