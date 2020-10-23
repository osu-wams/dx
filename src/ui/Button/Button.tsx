import React from 'react';
import styled from 'styled-components/macro';
import { borderRadius, fontSize, spacing } from 'src/theme';

type IBtnSizes = 'small' | 'large';

type BtnProps = {
  bg?: string;
  fg?: string;
  btnSize?: IBtnSizes;
};

const Button = styled.button<BtnProps & React.HTMLProps<HTMLButtonElement>>(
  ({ theme, fg, bg }) => ({
    backgroundColor: bg ?? theme.ui.button.background,
    color: fg ?? theme.ui.button.color,
    border: 'none',
    borderRadius: borderRadius[4],
    cursor: 'pointer',
    '& + &': {
      marginLeft: spacing.medium,
    },
    '&:disabled': {
      cursor: 'not-allowed',
    },
  }),
  ({ btnSize = 'normal' }) => btnVariants[btnSize]
);

const btnVariants = {
  normal: {
    padding: '.6rem 1.4rem',
  },
  small: {
    padding: '.2rem .3rem',
    fontSize: fontSize[14],
  },
  large: {
    padding: '1rem 1.8rem',
    fontSize: fontSize[18],
  },
};

const ButtonLink = styled(Button).attrs({ as: 'a' })`
  text-decoration: none;
`;

export default Button;
export { ButtonLink };
