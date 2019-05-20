import React from 'react';
import PageTitle from '../ui/PageTitle';
import AnnouncementContainer from '../ui/AnnouncementContainer';
import StudentJobs from '../features/StudentJobs';

const Finances = () => {
  return (
    <div data-testid="finances-page">
      <PageTitle title="Financial Information" />
      <StudentJobs />
      <AnnouncementContainer type="financial" />
    </div>
  );
};

export default Finances;
