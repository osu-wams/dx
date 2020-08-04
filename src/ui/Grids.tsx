import styled from 'styled-components/macro';
import { spacing } from 'src/theme';

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

export { TwoCol };
