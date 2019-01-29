import styled from 'styled-components';
import { theme, colors } from '../theme';
// Outputs the padding size in pixel for the component
function inputSize(size) {
  if (size === 'small') {
    return `
      padding: ${theme.spacing.unit / 4}px ${theme.spacing.unit / 2}px;
      font-size: ${theme.fontSize.small};
    `;
  }
  if (size === 'large') {
    return `
      padding: ${theme.spacing.unit * 2}px ${theme.spacing.unit * 4}px;
      font-size: ${theme.fontSize.large};
    `;
  }
  return `
      padding: ${theme.spacing.unit}px ${theme.spacing.unit * 2}px;
      font-size: ${theme.fontSize.normal};
    `;
}

const Input = styled.input`
  color: ${colors.charcoal};
  text-decoration: none;
  border-radius: 0.4rem;
  border: 1px solid ${colors.dusk};
  ${({ size }) => inputSize(size)};
`;

export default Input;
