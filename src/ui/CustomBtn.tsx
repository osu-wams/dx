import React, { FC, InputHTMLAttributes } from 'react';
import { themeSettings, styled } from '../theme';

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
  selected
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

const CustomLabel = styled('label')<{ selected: boolean }>`
  background: ${({ theme, selected }) =>
    selected ? theme.ui.button.custom.selectedBackground : theme.ui.button.custom.background};
  color: ${({ theme, selected }) =>
    selected ? theme.ui.button.custom.selectedColor : theme.ui.button.custom.color};
  border: 1px solid ${({ theme }) => theme.ui.button.custom.border};
  border-radius: 2rem;
  display: flex;
  align-items: center;
  font-size: ${themeSettings.fontSize[12]};
  padding: 0.4rem 0.8rem;
  cursor: pointer;
  white-space: nowrap;
  margin-bottom: 0.6rem;
`;

export default CustomBtn;
