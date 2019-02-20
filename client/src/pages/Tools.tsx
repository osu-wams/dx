import React, { FC, useState } from 'react';
import PageTitle from '../ui/PageTitle';
import ServicesCategories from '../features/services/ServiceCategories';

const Tools: FC<{ initial?: {} }> = ({ initial = null }) => {
  const [api, setApi] = useState(initial);

  return (
    <div data-testid="tools-page">
      <PageTitle title="Tools and Services" />
      <ServicesCategories />
    </div>
  );
};

export default Tools;
