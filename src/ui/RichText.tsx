import styled from 'styled-components/macro';
import { fontSize, spacing } from 'src/theme';

/**
 * Content currently from Drupal used in ReleaseNotes and BetaInfo
 */
export const RichTextContent = styled.div`
  ul,
  ol {
    margin: ${spacing.default} 0 0 0;
    padding: 0 0 0 2.8rem;
    font-size: ${fontSize[16]};
  }
  li {
    margin-bottom: ${spacing.medium};
  }
  a {
    color: ${({ theme }) => theme.ui.richText.link.color};
    &:active,
    &:focus,
    &:hover {
      text-decoration: none;
    }
  }
`;

export const RichTextTitle = styled.h3`
  color: ${({ theme }) => theme.ui.richText.title.color};
  font-size: ${fontSize['18']};
  font-weight: normal;
  margin: 0px;
`;
