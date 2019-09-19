import styled from 'styled-components';
import { theme } from '../theme';
/* Page Grid
 * Single column for mobile. 2 column for Desktop
 * Provides row-span and col-span classes to modify width or height of children elements
 */

const PageGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  grid-column-gap: ${theme.spacing.mobile};
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    grid-column-gap: ${theme.spacing.desktop};
    div {
      grid-row: span 3;
    }
    .row-span-1 {
      grid-row: span 1;
    }
    .row-span-2 {
      grid-row: span 2;
    }
    .row-span-4 {
      grid-row: span 4;
    }
    .row-span-5 {
      grid-row: span 5;
    }
    .col-span-2 {
      grid-column-start: 1;
      grid-column-end: 3;
    }
  }
`;

export default PageGrid;
