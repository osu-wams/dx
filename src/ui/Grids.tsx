import styled from 'styled-components/macro';
import { breakpoints, spacing } from 'src/theme';

/**
 * As we create more columns we make this more flexible
 * Potentially 2-3-4 column, 4 column collpases to 2 columns on iPad mini
 */
const TwoCol = styled.div`
  display: grid;
  /* minmax to prevent opposite columns from shrinking too much with urls or long words */
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  grid-gap: ${spacing.default};
  word-break: break-word;
`;

const ThreeCol = styled.div`
  display: grid;
  grid-gap: ${spacing.large};
  word-break: break-word;
  @media (min-width: ${breakpoints.small}) {
    margin: 0 auto;
    max-width: ${breakpoints.xl};
    grid-template-columns: 250px 1fr 250px;
    /**
     * Based on 8 rows so that the third column can come up almost to the top when
     * no search results are present, but there are people and/or places
     */
    .col-1 {
      grid-column: 1/2;
      grid-row: 1/8;
    }
    .col-2 {
      grid-column: 2/4;
      grid-row: 1/2;
    }
    .col-3 {
      grid-column: 2/4;
      grid-row: 2/8;
    }
  }
  @media (min-width: ${breakpoints.medium}) {
    .col-2 {
      grid-column: 2/3;
    }
    .col-3 {
      grid-column: 3/4;
      grid-row: 1/3;
    }
  }
`;

const TwoColWide = styled.div`
  display: grid;
  grid-gap: ${spacing.default};
  word-break: break-word;
  grid-template-columns: 250px 1fr;
  max-width: ${breakpoints.large};
`;

export { TwoCol, TwoColWide, ThreeCol };
