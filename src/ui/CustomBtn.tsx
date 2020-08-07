import React, { FC, InputHTMLAttributes, useContext } from 'react';
import styled from 'styled-components/macro';
import { fontSize } from '../theme';
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

  const parseIconUrl = () => {
    if (!icon) return '';

    // Return a icon name stripped from the icon URL
    return 'fal.' + icon.substring(icon.lastIndexOf('/') + 1).split('_' || '.')[0];
  };

  return (
    <StyledBtn id={id} onClick={clickHandler} className={selected ? 'selected' : ''}>
      <CustomLabel htmlFor={id} selected={selected}>
        {icon &&
          IconLookup(
            parseIconUrl(),
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

const LabelText = styled.span`
  padding-left: 6px;
`;

export default CustomBtn;
