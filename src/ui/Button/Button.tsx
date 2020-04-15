import React from 'react';
import styled from 'styled-components/macro';
import { themeSettings } from 'src/theme';

const Button = styled.button<BtnProps & React.HTMLProps<HTMLButtonElement>>(
  ({ theme, fg, bg }) => ({
    backgroundColor: bg ?? theme.ui.button.background,
    color: fg ?? theme.ui.button.color,
    border: 'none',
    borderRadius: themeSettings.borderRadius[4],
    cursor: 'pointer',
    '& + &': {
      marginLeft: themeSettings.spacing.unit + 'px',
    },
  }),
  ({ btnSize = 'normal' }) => btnVariants[btnSize]
);

type IBtnSizes = 'small' | 'large';

type BtnProps = {
  bg?: string;
  fg?: string;
  btnSize?: IBtnSizes;
};

const btnVariants = {
  normal: {
    padding: '.6rem 1.4rem',
  },
  small: {
    padding: '.2rem .3rem',
    fontSize: themeSettings.fontSize[14],
  },
  large: {
    padding: '1rem 1.8rem',
    fontSize: themeSettings.fontSize[18],
  },
};

const ButtonLink = styled(Button).attrs({ as: 'a' })`
  text-decoration: none;
`;

export default Button;
export { ButtonLink };
