import styled from 'styled-components/macro';
import { spacing, fontSize, borderRadius } from 'src/theme';

interface IInput
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  osuSize?: string;
}
// Outputs the padding size in pixel for the component
function inputSize(color: string, size?: string) {
  if (size === 'small') {
    return `
      padding: ${spacing.xs} ${spacing.small};
      font-size: ${fontSize[14]};
      color: ${color}
    `;
  }
  if (size === 'large') {
    return `
      padding: ${spacing.default} ${spacing.xl};
      font-size: ${fontSize[18]};
    `;
  }
  return `
      padding: ${spacing.medium} ${spacing.default};
      font-size: ${fontSize[16]};
    `;
}

const Input = styled.input<IInput>`
  color: ${({ theme }) => theme.ui.input.default.color};
  text-decoration: none;
  border-radius: ${borderRadius[8]};
  border: 1px solid ${({ theme }) => theme.ui.input.border};
  ${({ theme, osuSize }) => inputSize(theme.ui.input[osuSize || 'default'].color, osuSize)};
`;

export default Input;
