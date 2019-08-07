import styled from 'styled-components';
import { theme, Color } from '../theme';

interface IInput
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  osuSize?: string;
}
// Outputs the padding size in pixel for the component
function inputSize(size?: string) {
  if (size === 'small') {
    return `
      padding: ${theme.spacing.unit / 4}px ${theme.spacing.unit / 2}px;
      font-size: ${theme.fontSize[14]};
      color: ${Color['stratosphere-400']}
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
  color: ${Color['neutral-700']};
  text-decoration: none;
  border-radius: ${theme.borderRadius};
  border: 1px solid ${Color['neutral-300']};
  ${({ osuSize }) => inputSize(osuSize)};
`;

export default Input;
