import styled from 'styled-components';
import { theme, Color } from '../../theme';

export enum Sizes {
  small,
  large
}

function btnSize(value?: Sizes) {
  let padding = '.6rem .8rem';
  let fontSize = '';
  if (value === Sizes.small) {
    padding = '.2rem .3rem;';
    fontSize = theme.fontSize[14];
  }
  if (value === Sizes.large) {
    padding = '1rem 1.8rem;';
    fontSize = theme.fontSize[18];
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

const Button = styled('button')<Props & React.HTMLProps<HTMLButtonElement>>`
  background-color: ${props => props.bg || Color['orange-400']};
  color: ${props => props.fg || Color.white};
  & + & {
    margin-left: ${theme.spacing.unit}px;
  }
  border: none;
  border-radius: 0.4rem;
  cursor: pointer;
  ${({ size }) => btnSize(size)};
`;

export default Button;
