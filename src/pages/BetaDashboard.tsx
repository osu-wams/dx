import React from 'react';
import PageTitle from '../ui/PageTitle';
import BetaInfoCard from '../features/beta/InfoCard';
import BetaResourcesCard from '../features/beta/ResourcesCard';
import BetaReleaseNotesCard from '../features/beta/ReleaseNotesCard';
import PageGrid from '../ui/PageGrid';

const BetaDashboard = () => {
  return (
    <div data-testid="betadash-page">
      <PageTitle title="DX Beta" />
      <PageGrid>
        <BetaInfoCard />
        <BetaResourcesCard />
        <BetaReleaseNotesCard />
      </PageGrid>
    </div>
  );
};

export default BetaDashboard;
