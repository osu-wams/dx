import React, { FC } from 'react';
import VisuallyHidden from '@reach/visually-hidden';

type Props = {
  title: string;
};

// Page title for all our pages
// Currently hidden and just for accessibility purposes
const PageTitle: FC<Props> = ({ title }) => (
  <VisuallyHidden>
    <h2>{title}</h2>
  </VisuallyHidden>
);

export default PageTitle;
