import React from 'react';
import PageTitle from '../ui/PageTitle';
import AnnouncementContainer from '../ui/AnnouncementContainer';

const Finances = () => {
  return (
    <div data-testid="finances-page">
      <PageTitle title="Financial Information" />
      <AnnouncementContainer type="financial" />
    </div>
  );
};

export default Finances;
