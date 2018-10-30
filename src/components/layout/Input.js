import styled from 'styled-components';
import PropTypes from 'prop-types';

// Outputs the padding size in pixel for the component
function inputSize(size, theme) {
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

const Input = styled.input`
  color: ${props => props.theme.colors.charcoal};
  text-decoration: none;
  border-radius: 0.4rem;
  border: 1px solid ${props => props.theme.colors.dusk};
  ${({ theme, size }) => inputSize(size, theme)};
`;

Input.propTypes = {
  size: PropTypes.oneOf(['small', 'normal', 'large'])
};

Input.defaultProps = {
  size: 'normal'
};

export default Input;
