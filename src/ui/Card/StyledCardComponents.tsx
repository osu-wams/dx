import styled from 'styled-components';
import { Color, shadows, theme } from '../../theme';

interface IBadge {
  fg?: Color;
  bg?: Color;
}

interface ICardContentRow {
  borderless?: boolean;
}

const CardBase = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: ${theme.borderRadius};
  box-shadow: ${shadows[1]};
  background-color: ${Color.white};
  overflow: hidden;
  margin-bottom: ${theme.spacing.unit * 2}px;
`;

const Badge = styled.div<IBadge>`
  height: 32px;
  width: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: ${props => props.bg || Color['orange-400']};
  color: ${props => props.fg || Color.white};
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
  background-color: ${Color.white};
  overflow: hidden;
  border-bottom: ${props => (props.borderless ? 'none' : `1px solid ${Color['neutral-200']}`)};
`;

/**
 * A cell intended to be used inside of a CardContentRow UI.
 */
const CardContentCell = styled.div`
  padding: ${theme.spacing.unit * 2}px;
  flex-grow: 1;
  flex-basis: 0;
  & + div {
    border-left: 1px solid ${Color['neutral-200']};
  }
`;
export { CardBase, Badge, CardContentCell, CardContentRow, CardContentTable };
