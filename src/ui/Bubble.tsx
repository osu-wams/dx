import styled from 'styled-components/macro';
import { fontSize } from 'src/theme';

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
