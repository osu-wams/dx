import React, { FC, InputHTMLAttributes, useContext } from 'react';
import styled from 'styled-components/macro';
import { fontSize, Color } from '../theme';
import { IconLookup } from 'src/features/resources/resources-utils';
import { ThemeContext } from 'styled-components/macro';

interface BtnProps {
  text: string;
  icon?: any;
  id: string;
  selected: boolean;
  clickHandler: () => void;
}
const CustomBtn: FC<BtnProps & InputHTMLAttributes<HTMLButtonElement>> = ({
  text,
  id,
  icon,
  clickHandler,
  selected,
}) => {
  const themeContext = useContext(ThemeContext);

  const parseIconUrl = (iconUrl:string) => {
    if (!iconUrl) return '';
    return 'fal.' + iconUrl
      .substring(icon.lastIndexOf('/')+1)
      .split('.')[0]
  }

  return (
    <StyledBtn id={id} onClick={clickHandler} className={selected ? 'selected' : ''}>
      <CustomLabel htmlFor={id} selected={selected}>
        {IconLookup(
          parseIconUrl(icon),
          selected
            ? themeContext.ui.button.custom.selectedColor
            : themeContext.ui.button.custom.color
        )}
        <LabelText>{text}</LabelText>
      </CustomLabel>
    </StyledBtn>
  );
};

const StyledBtn = styled.button`
  border: 0;
  background: none;
  /* iOS adds large paddings around buttons, we are reducing it */
  padding: 0 0.4rem 0.4rem;
`;

const Icon = styled.img`
  height: 12px;
  margin-right: 6px;
`;

const CustomLabel = styled.label<{ selected: boolean }>(
  ({ theme }) => ({
    border: `1px solid ${theme.ui.button.custom.border}`,
    borderRadius: '2rem',
    display: 'flex',
    alignItems: 'center',
    fontSize: fontSize[12],
    padding: '0.4rem 0.8rem',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    marginBottom: '0.6rem',
    background: theme.ui.button.custom.background,
    color: theme.ui.button.custom.color,
  }),
  ({ theme, selected }) =>
    selected && {
      background: theme.ui.button.custom.selectedBackground,
      color: theme.ui.button.custom.selectedColor,
    }
);

const LabelText = styled.p`
  margin: 0px;
  padding: 0px;
  margin-left: 6px;
`

export default CustomBtn;
