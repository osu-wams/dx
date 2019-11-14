/* eslint-disable */
import React from 'react';
import { themeSettings, styled } from '../../theme';

const Button = styled.button<BtnProps & React.HTMLProps<HTMLButtonElement>>`
  background-color: ${({ bg, theme }) => bg || theme.ui.button.background};
  color: ${({ fg, theme }) => fg || theme.ui.button.color};
  & + & {
    margin-left: ${themeSettings.spacing.unit}px;
  }
  border: none;
  border-radius: 0.4rem;
  cursor: pointer;
  ${({ btnSize }) => btnSizes(btnSize)};
`;

type IBtnSizes = 'small' | 'large';

type BtnProps = {
  bg?: string;
  fg?: string;
  btnSize?: IBtnSizes;
};

function btnSizes(value?: IBtnSizes) {
  let padding = '.6rem 1.4rem';
  let fontSize = '';
  if (value === 'small') {
    padding = '.2rem .3rem;';
    fontSize = themeSettings.fontSize[14];
  }
  if (value === 'large') {
    padding = '1rem 1.8rem;';
    fontSize = themeSettings.fontSize[18] + ';';
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
