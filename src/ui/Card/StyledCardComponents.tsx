import { themeSettings, breakpoints, styled } from '../../theme';

interface IBadge {
  fg?: string;
  bg?: string;
}

interface ICardContentRow {
  borderless?: boolean;
}

const CardBase = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: ${themeSettings.borderRadius[16]};
  box-shadow: ${({ theme }) => theme.ui.card.boxShadow};
  background-color: ${({ theme }) => theme.ui.card.background};
  overflow: hidden;
  margin-bottom: ${themeSettings.spacing.mobile};
  @media (min-width: ${breakpoints[768]}) {
    margin-bottom: ${themeSettings.spacing.desktop};
  }
`;

const Badge = styled.div<IBadge>`
  height: 32px;
  width: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: ${({ bg, theme }) => bg || theme.ui.card.badge.background};
  color: ${({ fg, theme }) => fg || theme.ui.card.badge.color};
  margin-right: 12px;
`;

/**
 * UI component intended to become full-width with a single flex column to fill
 * a card in place of a CardContent component.
 */
const CardContentTable = styled.div`
  display: flex;
  flex-direction: column;
`;

/**
 * A row with an optional bottom border to establish a full width series of nested cells, intended to be
 * used inside of a CardContentTable UI.
 */
const CardContentRow = styled.div<ICardContentRow>`
  display: flex;
  flex-direction: row;
  background-color: ${({ theme }) => theme.ui.card.contentRow.background};
  overflow: hidden;
  border-bottom: ${({ borderless, theme }) =>
    borderless ? 'none' : `1px solid ${theme.ui.card.contentRow.borderBottom}`};
`;

/**
 * A cell intended to be used inside of a CardContentRow UI.
 */
const CardContentCell = styled.div`
  padding: ${themeSettings.spacing.unit * 2}px;
  flex-grow: 1;
  flex-basis: 0;
  & + div {
    border-left: 1px solid ${({ theme }) => theme.ui.card.contentCell.borderLeft};
  }
`;
export { CardBase, Badge, CardContentCell, CardContentRow, CardContentTable };
