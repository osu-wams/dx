import styled from 'styled-components';
import { theme, Color } from '../theme';

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
      font-size: ${theme.fontSize[14]};
    `;
  }
  if (size === Size.large) {
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

const List = styled.ul<Props>`
  color: ${Color["neutral-700"]};
  text-decoration: none;
  padding: 0;
  li {
    list-style-type: none;
    border-top: 1px solid ${Color["neutral-200"]};
    &:last-child {
      border-bottom: 1px solid ${Color["neutral-200"]};
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
        color: ${Color["neutral-100"]};
        flex: 2;
        text-align: left;
      }
      svg {
        margin-left: auto;
        align-self: center;
        color: ${Color["neutral-200"]};
      }
    }
  }
`;

export default List;
