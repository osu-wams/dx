import styled from 'styled-components/macro';
import styledMap from 'styled-map';
import { fontSize } from 'src/theme';

interface ITable {
  striped?: boolean;
  stretch?: boolean;
  variant: 'basic' | 'compact' | 'default' | 'spacious';
}

const Table = styled.table<ITable>`
  border: ${({ theme }) =>
    styledMap('variant', {
      basic: 'none',
      compact: 'none',
      spacious: 'none',
      default: `1px solid ${theme.ui.table.border}`,
    })};
  border-collapse: separate;
  border-spacing: 0;
  color: ${({ theme }) => theme.ui.table.color};
  font-size: ${styledMap('variant', {
    compact: '1.4rem',
    default: 'inherit',
  })};
  overflow-x: scroll;
  td {
    padding: ${styledMap('variant', {
      compact: '.2rem .4rem',
      default: '0.4rem 0.8rem',
      spacious: '1rem 2rem',
    })};
    font-size: ${styledMap('variant', {
      spacious: `${fontSize[16]}`,
    })};
  }
  th {
    color: ${({ theme }) => theme.ui.table.cell.color};
    font-weight: 600;
    font-size: ${fontSize['14']};
    border-bottom: 1px solid ${({ theme }) => theme.ui.table.cell.borderBottom};
    text-align: left;
    padding: ${styledMap('variant', {
      default: '0.4rem 0.8rem',
      spacious: '.8rem 1.6rem',
    })};
  }
  td:not(:first-child),
  th:not(:first-child) {
    border-left: ${({ theme }) =>
      styledMap('variant', {
        basic: `1px solid ${theme.ui.table.cell.notFirstChild.borderLeft}`,
        compact: 'none',
        default: `1px solid ${theme.ui.table.cell.notFirstChild.borderLeft}`,
      })};
  }
  tr:not(:first-child) td {
    border-top: 1px solid ${({ theme }) => theme.ui.table.row.borderTop};
  }
  ${({ stretch }) =>
    stretch &&
    `width: 100%;
  `};
  ${({ striped, theme }) =>
    striped &&
    `
    tr:nth-child(even) {
      background: ${theme.ui.table.row.stripedEvenChildren.background};
    }
  `};
`;

export default Table;
