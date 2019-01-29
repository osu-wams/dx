import styled from 'styled-components';
import { theme, colors } from '../../theme';
import { Color } from 'csstype';

export enum Sizes {
  small,
  large
}

function btnSize(value?: Sizes) {
  let padding = '.6rem .8rem';
  let fontSize = '';
  if (value == Sizes.small) {
    padding = '.2rem .3rem;';
    fontSize = theme.fontSize.small;
  }
  if (value == Sizes.large) {
    padding = '1rem 1.8rem;';
    fontSize = theme.fontSize.large;
  }
  if (fontSize) {
    fontSize = 'font-size: ' + fontSize;
  }
  padding = 'padding: ' + padding;
  return fontSize + padding;
}

type Props = {
  bg?: Color;
  fg?: Color;
  size?: Sizes;
};

const Button = styled.button<Props>`
  background-color: ${props => props.bg || colors['orange-400']};
  color: ${props => props.fg || colors['white']};
  & + & {
    margin-left: ${theme.spacing.unit}px;
  }
  border: none;
  border-radius: 0.4rem;
  cursor: pointer;
  ${({ size }) => btnSize(size)};
`;

export default Button;
