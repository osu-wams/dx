import styled from 'styled-components/macro';
import { spacing, fontSize } from 'src/theme';

const Description = styled.div`
  font-size: ${fontSize[14]};
  margin: ${spacing.small} 0 ${spacing.default};
  line-height: 1.6rem;
`;

// Can be use as a header with <LeadText as="h1/h2/h3">
const LeadText = styled.div<{ secondary?: boolean }>`
  line-height: ${fontSize[14]};
  padding: 0 ${spacing.default} 0 0;
  color: ${({ secondary, theme }) =>
    secondary ? theme.ui.text.lead.color.secondary : theme.ui.text.lead.color.primary};
`;

export { Description, LeadText };
