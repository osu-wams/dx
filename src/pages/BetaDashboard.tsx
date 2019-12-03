import React from 'react';
import PageTitle from '../ui/PageTitle';
import BetaInfoCard from '../features/beta/InfoCard';
import BetaResourcesCard from '../features/beta/ResourcesCard';
import BetaReleaseNotesCard from '../features/beta/ReleaseNotesCard';
import { MainGridWrapper, Masonry } from '../theme';

const BetaDashboard = () => {
  return (
    <MainGridWrapper data-testid="betadash-page">
      <PageTitle title="Beta" />
      <Masonry>
        <BetaInfoCard />
        <BetaResourcesCard />
        <BetaReleaseNotesCard />
      </Masonry>
    </MainGridWrapper>
  );
};

export default BetaDashboard;
