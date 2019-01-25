import React, { FC, useState } from 'react';
import PageTitle from '../ui/PageTitle';

const Services: FC<{ initial?: {} }> = ({ initial = null }) => {
  const [api, setApi] = useState(initial);

  return (
    <div data-testid="services-page">
      <PageTitle title="Tools and Services" />
    </div>
  );
};

export default Services;
