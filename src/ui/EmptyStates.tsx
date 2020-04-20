import styled from 'styled-components/macro';
import { spacing } from 'src/theme';

const EmptyState = styled.div`
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  align-items: center;
  padding: ${spacing.xl} ${spacing.unit * 8}px 0px ${spacing.unit * 8}px;
`;

const EmptyStateImage = styled.img`
  height: 70px;
`;

const EmptyStateText = styled.p`
  color: ${({ theme }) => theme.features.academics.courses.plannerItems.emptyText.color};
  text-align: center;
`;

export { EmptyState, EmptyStateImage, EmptyStateText };
