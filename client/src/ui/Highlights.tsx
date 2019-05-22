import styled from 'styled-components';
import { Color, theme } from '../theme';
import { CardBase } from '../ui/Card';

const HighlightsCard = styled(CardBase)`
  padding: ${theme.spacing.unit * 2}px;
  flex-direction: row;
  padding: 0;
  > div {
    flex-grow: 1;
    flex-basis: 0;
    & + div {
      border-left: 1px solid ${Color['neutral-200']};
    }
  }
`;

const Highlight = styled.div`
  text-align: center;
`;

const HighlightTitle = styled.h2`
  font-size: ${theme.fontSize[14]};
  color: ${Color['neutral-550']};
  font-weight: 600;
  margin-bottom: 0;
  padding: 0 1.6rem;
`;

const HighlightEmphasis = styled.div<{ color: Color }>`
  color: ${props => props.color || Color['orange-400']};
  font-size: ${theme.fontSize[24]};
  padding: 0 1.6rem;
`;

const HighlightDescription = styled.div`
  font-size: ${theme.fontSize[12]};
  color: ${Color['neutral-550']};
  padding: 0 1.6rem 1.6rem;
`;

export { HighlightsCard, Highlight, HighlightTitle, HighlightEmphasis, HighlightDescription };
