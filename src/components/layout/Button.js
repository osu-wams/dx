import styled from 'styled-components';
import PropTypes from 'prop-types';

// Outputs the padding size in pixel for the component
function btnSize(size, theme) {
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

const Button = styled.button`
  background-color: ${({ outline, theme, variant }) =>
    outline ? 'transparent' : theme[variant].bg};
  color: ${({ outline, theme, variant }) => (outline ? theme[variant].bg : theme[variant].fg)};
  text-decoration: none;
  border-radius: 0.4rem;
  border: 1px solid ${({ theme, variant }) => theme[variant].bg};
  ${({ theme, size }) => btnSize(size, theme)};
  & + & {
    margin-left: ${props => props.theme.spacing.unit}px;
  }
`;

Button.propTypes = {
  variant: PropTypes.oneOf(['mist', 'primary', 'secondary', 'academic', 'finance']),
  size: PropTypes.oneOf(['small', 'normal', 'large'])
};

Button.defaultProps = {
  variant: 'mist',
  size: 'normal',
  outline: false
};

export default Button;
