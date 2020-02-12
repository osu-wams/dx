import { themeSettings, breakpoints, styled } from '../../theme';

/* Page Grid
 * Single column for mobile. 2 column for Desktop
 * Grid specific code is now mostly in the Masonry file
 * SecondGrid wrapper used for Announcements and Events
 */
const MainGridWrapper = styled.div`
  border-top: 1px solid ${({ theme }) => theme.mainGrid.borderTop};
  background-color: ${({ theme }) => theme.mainGrid.background};
  padding: 1rem ${themeSettings.spacing.mobile} 2rem;
  @media (min-width: ${breakpoints[768]}) {
    padding: ${themeSettings.spacing.desktop};
  }
`;
const MainGrid = styled.div`
  width: 100%;
  margin: 0 auto;
  max-width: ${breakpoints[1024]};
`;

const SecondGridWrapper = styled.div`
  background-color: ${({ theme }) => theme.secondGrid.background};
  border-top: 1px solid ${({ theme }) => theme.secondGrid.borderTop};
  padding: 2rem ${themeSettings.spacing.mobile};
  flex: 1; /* Fill all available vertical space */
  @media (min-width: ${breakpoints[768]}) {
    padding: 4rem ${themeSettings.spacing.desktop};
  }
`;

export { MainGridWrapper, MainGrid, SecondGridWrapper };
