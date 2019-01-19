import React, { FC, useState } from 'react';
import PageTitle from '../ui/PageTitle';
import ServiceCategories from '../features/ServiceCategories';

type api = {};

const Services: FC<{ initial?: {} }> = ({ initial = null }) => {
  const [api, setApi] = useState(initial);

  return (
    <div data-testid="services-page">
      <PageTitle title="Tools and Services" />
      <ServiceCategories />
      <p>Services {api} </p>
    </div>
  );
};

export default Services;
