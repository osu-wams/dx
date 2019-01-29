import styled from 'styled-components';
import { theme, colors } from '../theme';

export enum Size {
  small,
  large
}

type Props = {
  size?: Size;
};

// Outputs the padding size in pixel for the component
function liSize(size?: Size) {
  if (size === Size.small) {
    return `
      padding: ${theme.spacing.unit / 4}px ${theme.spacing.unit / 2}px;
      font-size: ${theme.fontSize.small};
    `;
  }
  if (size === Size.large) {
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

const List = styled.ul<Props>`
  color: ${colors.charcoal};
  text-decoration: none;
  padding: 0;
  li {
    list-style-type: none;
    border-top: 1px solid ${colors.fog};
    &:last-child {
      border-bottom: 1px solid ${colors.fog};
    }
    button {
      width: 100%;
      background: transparent;
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      align-items: center;
      cursor: pointer;
      ${({ size }) => liSize(size)};
      border: none;
      div {
        color: ${colors.nimbus};
        flex: 2;
        text-align: left;
      }
      svg {
        margin-left: auto;
        align-self: center;
        color: ${colors.fog};
      }
    }
  }
`;

export default List;
