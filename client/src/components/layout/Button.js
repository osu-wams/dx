import styled from 'styled-components';
import PropTypes from 'prop-types';
import { colors } from '../../theme';

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
  background-color: ${({ outline, theme, bg }) => (outline ? 'transparent' : theme.colors[bg])};
  color: ${({ outline, theme, fg, bg }) =>
    // outline && !theme.colors[fg] ? theme.colors[bg] : theme.colors[fg]};
    {
      let color;
      if ((outline && fg !== 'white') || !outline) {
        color = theme.colors[fg];
      } else {
        color = theme.colors[bg];
      }
      return color;
    }};
  text-decoration: none;
  border-radius: 0.4rem;
  border: 1px solid ${({ theme, bg }) => theme.colors[bg]};
  ${({ theme, size }) => btnSize(size, theme)};
  & + & {
    margin-left: ${props => props.theme.spacing.unit}px;
  }
`;

Button.propTypes = {
  fg: PropTypes.oneOf(Object.keys(colors)),
  bg: PropTypes.oneOf(Object.keys(colors)),
  size: PropTypes.oneOf(['small', 'normal', 'large'])
};

Button.defaultProps = {
  fg: 'white',
  bg: 'orange',
  size: 'normal',
  outline: false
};

export default Button;
