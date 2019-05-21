import React from 'react';
import PageTitle from '../ui/PageTitle';
import AnnouncementContainer from '../ui/AnnouncementContainer';
import StudentJobs from '../features/StudentJobs';
import { HighlightsCard } from '../ui/Highlights';
import AccountBalance from '../features/AccountBalance';
import PageGrid from '../ui/PageGrid';

const Finances = () => {
  return (
    <div data-testid="finances-page">
      <PageTitle title="Financial Information" />
      <PageGrid>
        <StudentJobs />
        <HighlightsCard className="row-span-1">
          <AccountBalance />
          <AccountBalance />
        </HighlightsCard>
        <AnnouncementContainer className="col-span-2" type="financial" />
      </PageGrid>
    </div>
  );
};

export default Finances;
