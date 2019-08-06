import React, { FC, InputHTMLAttributes } from 'react';
import styled from 'styled-components';
import { theme, Color } from '../theme';

interface RadioProps {
  text: string;
  icon: any;
  id: string;
}
const CustomRadioBtn: FC<RadioProps & InputHTMLAttributes<HTMLInputElement>> = ({
  text,
  id,
  icon,
  ...props
}) => (
  <Category>
    <HiddenRadioInput type="radio" id={id} {...props} />
    <CategoryLabel htmlFor={id}>
      <CategoryIcon src={icon} /> {text}
    </CategoryLabel>
  </Category>
);

const Category = styled.div`
  display: inline-block;
  margin-left: 0.8rem;
  margin-top: 0.8rem;
`;

const HiddenRadioInput = styled.input`
  border: 0;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

const CategoryIcon = styled.img`
  height: 12px;
  margin-right: 6px;
`;

const CategoryLabel = styled.label`
  background: #fff;
  border: 1px solid ${Color['neutral-300']};
  border-radius: 2rem;
  display: flex;
  align-items: center;
  font-size: ${theme.fontSize[12]};
  padding: 0.4rem 0.8rem;
  cursor: pointer;
  ${HiddenRadioInput}:checked + & {
    background: ${Color['neutral-500']};
    color: #fff;
  }
`;

export default CustomRadioBtn;
