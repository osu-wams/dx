import styled from 'styled-components';
import styledMap from 'styled-map';
import { theme, Color } from '../../theme';

interface ITable {
  striped?: boolean;
  stretch?: boolean;
  variant: 'basic' | 'compact' | 'default' | 'spacious';
}

const Table = styled.table<ITable>`
  border: ${styledMap('variant', {
    basic: 'none',
    compact: 'none',
    spacious: 'none',
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
      default: '0.4rem 0.8rem',
      spacious: '1rem 2rem'
    })};
    font-size: ${styledMap('variant', {
      spacious: `${theme.fontSize[16]}`
    })};
  }
  th {
    color: ${Color['neutral-550']};
    font-weight: 600;
    font-size: ${theme.fontSize['14']};
    border-bottom: 1px solid rgba(34, 36, 38, 0.15);
    text-align: left;
    padding: ${styledMap('variant', {
      default: '0.4rem 0.8rem',
      spacious: '.8rem 1.6rem'
    })};
  }
  td:not(:first-child),
  th:not(:first-child) {
    border-left: ${styledMap('variant', {
      basic: '1px solid rgba(34, 36, 38, 0.15)',
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
