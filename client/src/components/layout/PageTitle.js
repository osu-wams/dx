import React from 'react';
import PropTypes from 'prop-types';
import VisuallyHidden from '@reach/visually-hidden';

// Page title for all our pages
// Currently hidden and just for accessibility purposes
const PageTitle = ({ title }) => (
  <VisuallyHidden>
    <h2>{title}</h2>
  </VisuallyHidden>
);

export default PageTitle;

PageTitle.propTypes = {
  title: PropTypes.string.isRequired
};
