import styled from 'styled-components';
import { theme, breakpoints, Color } from '../theme';
/* Page Grid
 * Single column for mobile. 2 column for Desktop
 * Provides row-span and col-span classes to modify width or height of children elements
 */

const MainGridWrapper = styled.div`
  border-top: 1px solid ${Color['neutral-300']};
  border-bottom: 1px solid ${Color['neutral-300']};
  background-color: ${Color['neutral-100']};
  padding: 1rem ${theme.spacing.mobile} 2rem;
  @media (min-width: ${breakpoints[768]}) {
    padding: ${theme.spacing.desktop};
  }
`;
const MainGrid = styled.div`
  width: 100%;
  margin: 0 auto;
  max-width: ${breakpoints[1024]};
  display: grid;
  grid-template-columns: 1fr;
  @media (min-width: ${breakpoints[768]}) {
    grid-template-columns: 1fr 1fr;
    grid-column-gap: ${theme.spacing.desktop};
  }
`;

const MainGridCol = styled.div`
  @media (min-width: ${breakpoints[768]}) {
    &.col-span-2 {
      grid-column: 1 / 3;
    }
  }
  /* We might need to do something for individual columns
   * right now just keeping the name so it's obvious
   */
`;

const SecondGridWrapper = styled.div`
  background-color: ${Color['neutral-200']};
  padding: 2rem ${theme.spacing.mobile};
  @media (min-width: ${breakpoints[768]}) {
    padding: 4rem ${theme.spacing.desktop};
  }
`;

export { MainGridWrapper, MainGrid, MainGridCol, SecondGridWrapper };
