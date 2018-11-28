import styled from 'styled-components';

const TableHeaderCell = styled.th`
  font-weight: bold;
  border-bottom: 1px solid rgba(34, 36, 38, 0.15);
  :not(:first-child) {
    border-left: 1px solid rgba(34, 36, 38, 0.15);
  }
`;

export default TableHeaderCell;
