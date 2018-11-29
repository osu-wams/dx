import styled from 'styled-components';
import PropTypes from 'prop-types';

const Table = styled.table`
  border: 1px solid rgba(34, 36, 38, 0.15);
  border-radius: 0.28571429rem;
  border-collapse: separate;
  border-spacing: 0;
  td {
    padding: 0.4em 0.8em;
  }
  td:not(:first-child) {
    border-left: 1px solid rgba(34, 36, 38, 0.15);
  }
  tr:not(:first-child) td {
    border-top: 1px solid rgba(34, 36, 38, 0.15);
  }

  ${({ variant }) => {
    switch (variant) {
      case 'basic':
        return `
          border: none;
        `;

      default:
        return null;
    }
  }};

  ${({ striped }) =>
    striped &&
    `
    tr:nth-child(even) {
      background: #f9fafb;
    }
  `};
`;

Table.propTypes = {
  variant: PropTypes.oneOf(['default', 'basic']),
  striped: PropTypes.bool
};

Table.defaultProps = {
  variant: 'default',
  striped: false
};

export default Table;
