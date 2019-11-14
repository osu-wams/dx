import styled from 'styled-components';
import { themeSettings, breakpoints } from '../theme';
/* Page Grid
 * Single column for mobile. 2 column for Desktop
 * Provides row-span and col-span classes to modify width or height of children elements
 */

const MainGridWrapper = styled.div`
  border-top: 1px solid ${({ theme }) => theme.mainGrid.borderTop};
  border-bottom: 1px solid ${({ theme }) => theme.mainGrid.borderBottom};
  background-color: ${({ theme }) => theme.mainGrid.background};
  padding: 1rem ${themeSettings.spacing.mobile} 2rem;
  height: 100%;
  @media (min-width: ${breakpoints[768]}) {
    padding: ${themeSettings.spacing.desktop};
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
    grid-column-gap: ${themeSettings.spacing.desktop};
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
  background-color: ${({ theme }) => theme.secondGrid.background};
  padding: 2rem ${themeSettings.spacing.mobile};
  @media (min-width: ${breakpoints[768]}) {
    padding: 4rem ${themeSettings.spacing.desktop};
  }
`;

export { MainGridWrapper, MainGrid, MainGridCol, SecondGridWrapper };
