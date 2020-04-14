import React, { FC, InputHTMLAttributes } from 'react';
import styled from 'styled-components/macro';
import { themeSettings } from '../theme';

interface BtnProps {
  text: string;
  icon: any;
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
}) => (
  <StyledBtn id={id} onClick={clickHandler} className={selected ? 'selected' : ''}>
    <CustomLabel htmlFor={id} selected={selected}>
      <Icon src={icon} alt="" /> {text}
    </CustomLabel>
  </StyledBtn>
);

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
    fontSize: themeSettings.fontSize[12],
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

export default CustomBtn;
