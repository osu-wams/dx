/* eslint-disable no-unexpected-multiline */
import styled from 'styled-components';
import styledMap from 'styled-map';
import { Color } from '../../theme';

const Table = styled.table<{
  striped?: boolean;
  stretch?: boolean;
  variant: 'basic' | 'compact' | 'default';
}>`
  border: ${styledMap('variant', {
    basic: 'none',
    compact: 'none',
    default: '1px solid rgba(34, 36, 38, 0.15)'
  })};
  border-collapse: separate;
  border-spacing: 0;
  color: ${Color['neutral-600']};
  font-size: ${styledMap('variant', {
    compact: '1.4rem',
    default: 'inherit'
  })};
  overflow-x: scroll;
  td {
    padding: ${styledMap('variant', {
      compact: '.2rem .4rem',
      default: '0.4rem 0.8rem'
    })};
  }
  td:not(:first-child),
  th:not(:first-child) {
    border-left: ${styledMap('variant', {
      basic: 'none',
      compact: 'none',
      default: '1px solid rgba(34, 36, 38, 0.15)'
    })};
  }
  tr:not(:first-child) td {
    border-top: 1px solid rgba(34, 36, 38, 0.15);
  }
  ${({ stretch }) =>
    stretch &&
    `width: 100%;
  `};
  ${({ striped }) =>
    striped &&
    `
    tr:nth-child(even) {
      background: #f9fafb;
    }
  `};
`;

export default Table;
