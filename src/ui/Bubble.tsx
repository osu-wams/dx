import styled from 'styled-components/macro';
import { fontSize, spacing } from '@osu-wams/theme';

export const Bubble = styled.span`
  background: ${({ theme }) => theme.ui.bubble.background};
  border-radius: 4px;
  color: ${({ theme }) => theme.ui.bubble.color};
  font-size: ${fontSize[12]};
  padding: 2px 4px;
  align-self: flex-start;
  margin-top: 4px;
  text-align: center;
  white-space: nowrap;
`;

export const BubbleInternalLink = styled(Bubble)`
  background: ${({ theme }) => theme.ui.bubble.internalLink.background};
  color: ${({ theme }) => theme.ui.bubble.internalLink.color};
  font-size: ${fontSize[12]};
  font-weight: bold;
`;

export const BubbleExternalLink = styled(Bubble)`
  background: ${({ theme }) => theme.ui.bubble.externalLink.background};
  color: ${({ theme }) => theme.ui.bubble.externalLink.color};
  font-size: ${fontSize[12]};
  font-weight: bold;
  > svg {
    margin-left: ${spacing.small};
    font-size: ${fontSize[10]};
    color: ${({ theme }) => theme.ui.bubble.externalLink.color};
  }
`;
