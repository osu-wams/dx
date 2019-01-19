import styled from 'styled-components';
import PropTypes from 'prop-types';
import styledMap from 'styled-map';

const Table = styled.table`
  border: ${styledMap('variant', {
    basic: 'none',
    compact: 'none',
    default: '1px solid rgba(34, 36, 38, 0.15)'
  })};
  border-radius: 0.28571429rem;
  border-collapse: separate;
  border-spacing: 0;
  font-size: ${styledMap('variant', {
    compact: '1.4rem',
    default: 'inherit'
  })};
  overflow-x: scroll;
  td {
    padding: ${styledMap('variant', {
      compact: '.2rem .4rem',
      default: '0.4rem 0.8rem'
    })};
  }
  td:not(:first-child) {
    border-left: 1px solid rgba(34, 36, 38, 0.15);
  }
  tr:not(:first-child) td {
    border-top: 1px solid rgba(34, 36, 38, 0.15);
  }

  ${({ striped }) =>
    striped &&
    `
    tr:nth-child(even) {
      background: #f9fafb;
    }
  `};
`;

Table.propTypes = {
  variant: PropTypes.oneOf(['default', 'compact', 'basic']),
  striped: PropTypes.bool
};

Table.defaultProps = {
  variant: 'default',
  striped: false
};

export default Table;
