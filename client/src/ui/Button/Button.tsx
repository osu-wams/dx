/* eslint-disable */
import React from 'react';
import styled from 'styled-components';
import { theme, Color } from '../../theme';

const Button = styled.button<BtnProps & React.HTMLProps<HTMLButtonElement>>`
  background-color: ${props => props.bg || Color['orange-400']};
  color: ${props => props.fg || Color.white};
  & + & {
    margin-left: ${theme.spacing.unit}px;
  }
  border: none;
  border-radius: 0.4rem;
  cursor: pointer;
  ${({ btnSize }) => btnSizes(btnSize)};
`;

type IBtnSizes = 'small' | 'large';

type BtnProps = {
  bg?: Color;
  fg?: Color;
  btnSize?: IBtnSizes;
};

function btnSizes(value?: IBtnSizes) {
  let padding = '.6rem 1.4rem';
  let fontSize = '';
  if (value === 'small') {
    padding = '.2rem .3rem;';
    fontSize = theme.fontSize[14];
  }
  if (value === 'large') {
    padding = '1rem 1.8rem;';
    fontSize = theme.fontSize[18] + ';';
  }
  if (fontSize) {
    fontSize = 'font-size: ' + fontSize + ';';
  }
  padding = 'padding: ' + padding;
  return fontSize + padding;
}

const ButtonLink = styled(Button).attrs({ as: 'a' })`
  text-decoration: none;
`;

export default Button;
export { ButtonLink };