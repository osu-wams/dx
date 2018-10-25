import styled from 'styled-components';
import PropTypes from 'prop-types';

const CardHeader = styled.div`
  background-color: ${({ theme, variant }) => theme[variant].bg};
  color: ${({ theme, variant }) => theme[variant].fg};
  padding: ${({ theme }) => `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`};
  font-size: 18px;
  font-family: 'Stratum2Web', sans-serif;
`;

CardHeader.propTypes = {
  variant: PropTypes.oneOf(['default', 'primary', 'secondary', 'academic', 'finance'])
};

CardHeader.defaultProps = {
  variant: 'default'
};

export default CardHeader;
