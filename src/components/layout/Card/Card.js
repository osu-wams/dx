import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Paper from '../Paper';

const CardPaper = styled(Paper)`
  transition: box-shadow 0.1s linear;
`;

const Card = ({ raised, elevation, ...rest }) => {
  const cardElevation = raised ? 8 : elevation;
  return <CardPaper elevation={cardElevation} {...rest} />;
};

Card.propTypes = {
  raised: PropTypes.bool
};

Card.defaultProps = {
  raised: false
};

export default Card;
