import styled from 'styled-components';
import { Color, theme } from '../../theme';

const TableHeaderCell = styled.th`
  font-weight: bold;
  font-size: ${theme.fontSize['12']};
  color: ${Color['neutral-550']};
  border-bottom: 1px solid rgba(34, 36, 38, 0.15);
  text-align: left;
  padding: 0.4rem 0.8rem;
`;

export default TableHeaderCell;
