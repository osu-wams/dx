import styled, { css } from 'styled-components/macro';
import { spacing, fontSize } from 'src/theme';
import { CardBase } from 'src/ui/Card';

const HighlightsCard = styled(CardBase)`
  padding: ${spacing.default};
  flex-direction: row;
  padding: 0;
  > div {
    flex-grow: 1;
    flex-basis: 0;
    & + div {
      border-left: 1px solid ${({ theme }) => theme.ui.highlights.card.border};
    }
  }
`;

interface IHighlight {
  textAlignLeft?: boolean;
}

const Highlight = styled.div<IHighlight>`
  text-align: ${(props) => (props.textAlignLeft ? 'left' : 'center')};
  & + div {
    margin-top: ${spacing.xm};
  }
`;

const HighlightTitle = styled.h2<{ marginTop?: number }>`
  font-size: ${fontSize[14]};
  color: ${({ theme }) => theme.ui.highlights.title.color};
  font-weight: 600;
  margin-bottom: 0;
  padding: 0 ${spacing.default};
  ${(props) =>
    props.marginTop !== undefined &&
    css`
      margin-top: ${props.marginTop as number};
    `}
`;

const HighlightEmphasisInline = styled.em<{ color?: string }>`
  color: ${(props) => props.color || props.theme.ui.highlights.emphasisInline.color};
  font-style: normal;
  font-weight: bold;
`;

const HighlightEmphasis = styled.div<{ color?: string }>`
  color: ${(props) => props.color || props.theme.ui.highlights.emphasis.color};
  font-size: ${fontSize[24]};
  padding: 0 ${spacing.default};
`;

const HighlightDescription = styled.div`
  font-size: ${fontSize[12]};
  color: ${({ theme }) => theme.ui.highlights.description.color};
  padding: 0 ${spacing.default};
`;

export {
  HighlightsCard,
  Highlight,
  HighlightTitle,
  HighlightEmphasis,
  HighlightEmphasisInline,
  HighlightDescription,
};
