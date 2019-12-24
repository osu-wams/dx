import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { themeSettings, styled } from '../theme';

type IconProps = {
  bg?: string;
  color?: string;
  fontSize?: string;
};

const IconWrapper = styled.div`
  position: relative;
`;

const IconCounter = styled.div`
  font-size: ${themeSettings.fontSize[12]};
  position: absolute;
  bottom: -${12 / 2 / 10}rem;
  right: -${12 / 2 / 10}rem;
  color: ${({ theme }) => theme.ui.icon.counter.color};
  background-color: ${({ theme }) => theme.ui.icon.counter.background};
  padding: 0 ${12 / 2 / 10}rem !important;
  border-radius: ${(12 * (3 / 4)) / 10}rem;
`;

const IconStyle = styled(FontAwesomeIcon)<IconProps>`
  color: ${props => props.color || props.theme.ui.icon.color};
  background-color: ${props => props.bg || props.theme.ui.icon.background};
  padding: ${props => (props.bg ? '.5rem' : '0')};
  border-radius: ${props => (props.bg ? '50%' : '0')};
  ${props => (props.fontSize ? `font-size: ${props.fontSize}` : '')}
`;

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
