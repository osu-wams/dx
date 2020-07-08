import styled from 'styled-components/macro';
import { spacing } from 'src/theme';

/**
 * As we create more columns we make this more flexible
 * Potentially 2-3-4 column, 4 column collpases to 2 columns on iPad mini
 */
const TwoCol = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: ${spacing.default};
`;

export { TwoCol };
