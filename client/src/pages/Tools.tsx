import React, { FC, useState } from 'react';
import PageTitle from '../ui/PageTitle';

const Tools: FC<{ initial?: {} }> = ({ initial = null }) => {
  const [api, setApi] = useState(initial);

  return (
    <div data-testid="tools-page">
      <PageTitle title="Tools and Services" />
    </div>
  );
};

export default Tools;
