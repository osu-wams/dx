import React, { FC, InputHTMLAttributes } from 'react';
import styled from 'styled-components';
import { theme, Color } from '../theme';

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
`;

const Icon = styled.img`
  height: 12px;
  margin-right: 6px;
`;

const CustomLabel = styled('label')<{ selected: boolean }>`
  background: ${props => (props.selected ? Color['neutral-550'] : '#fff')};
  color: ${props => (props.selected ? '#fff' : '#000')};
  border: 1px solid ${Color['neutral-300']};
  border-radius: 2rem;
  display: flex;
  align-items: center;
  font-size: ${theme.fontSize[12]};
  padding: 0.4rem 0.8rem;
  cursor: pointer;
  white-space: nowrap;
`;

export default CustomBtn;
