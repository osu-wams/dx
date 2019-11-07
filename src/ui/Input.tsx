import styled from 'styled-components';
import { theme } from '../theme';

interface IInput
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  osuSize?: string;
}
// Outputs the padding size in pixel for the component
function inputSize(color: string, size?: string) {
  if (size === 'small') {
    return `
      padding: ${theme.spacing.unit / 4}px ${theme.spacing.unit / 2}px;
      font-size: ${theme.fontSize[14]};
      color: ${color}
    `;
  }
  if (size === 'large') {
    return `
      padding: ${theme.spacing.unit * 2}px ${theme.spacing.unit * 4}px;
      font-size: ${theme.fontSize[18]};
    `;
  }
  return `
      padding: ${theme.spacing.unit}px ${theme.spacing.unit * 2}px;
      font-size: ${theme.fontSize[16]};
    `;
}

const Input = styled.input<IInput>`
  color: ${({ theme }) => theme.ui.input.default.color};
  text-decoration: none;
  border-radius: ${theme.borderRadius[8]};
  border: 1px solid ${({ theme }) => theme.ui.input.border};
  ${({ theme, osuSize }) => inputSize(theme.ui.input[osuSize || 'default'].color, osuSize)};
`;

export default Input;
