import styled from 'styled-components';
import PropTypes from 'prop-types';

// Outputs the padding size in pixel for the component
function liSize(size, theme) {
  if (size === 'small') {
    return `
      padding: ${theme.spacing.unit / 4}px ${theme.spacing.unit / 2}px;
      font-size: ${theme.fontSize.small};
    `;
  }
  if (size === 'large') {
    return `
      padding: ${theme.spacing.unit * 2}px ${theme.spacing.unit * 4}px;
      font-size: ${theme.fontSize.large};
    `;
  }
  return `
      padding: ${theme.spacing.unit}px ${theme.spacing.unit * 2}px;
      font-size: ${theme.fontSize.normal};
    `;
}

const List = styled.ul`
  color: ${props => props.theme.colors.charcoal};
  text-decoration: none;
  padding: 0;
  li {
    list-style-type: none;
    border-top: 1px solid ${props => props.theme.colors.fog};
    &:last-child {
      border-bottom: 1px solid ${props => props.theme.colors.fog};
    }
    button {
      width: 100%;
      background: transparent;
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      align-items: center;
      ${({ theme, size }) => liSize(size, theme)};
      border: none;
      div {
        color: ${props => props.theme.colors.nimbus};
        flex: 2;
        text-align: left;
      }
      svg {
        margin-left: auto;
        align-self: center;
        color: ${props => props.theme.colors.fog};
      }
    }
  }
`;

List.propTypes = {
  size: PropTypes.oneOf(['small', 'normal', 'large'])
};

List.defaultProps = {
  size: 'normal'
};

export default List;
