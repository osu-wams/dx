import React, { FC } from 'react';
import VisuallyHidden from '@reach/visually-hidden';
import Helmet from 'react-helmet';

type Props = {
  title: string;
};

// Page title for all our pages
// Currently hidden and just for accessibility purposes
const PageTitle: FC<Props> = ({ title }) => (
  <>
    <VisuallyHidden>
      <h1>{title}</h1>
    </VisuallyHidden>
    <Helmet>
      <title>{title}</title>
    </Helmet>
  </>
);

export default PageTitle;
