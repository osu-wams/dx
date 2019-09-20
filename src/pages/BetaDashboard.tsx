import React from 'react';
import PageTitle from '../ui/PageTitle';
import BetaInfoCard from '../features/beta/InfoCard';
import BetaResourcesCard from '../features/beta/ResourcesCard';
import BetaReleaseNotesCard from '../features/beta/ReleaseNotesCard';
import { MainGridWrapper, MainGrid, MainGridCol } from '../ui/PageGrid';

const BetaDashboard = () => {
  return (
    <div data-testid="betadash-page">
      <MainGridWrapper>
        <PageTitle title="Beta" />
        <MainGrid>
          <MainGridCol>
            <BetaInfoCard />
          </MainGridCol>
          <MainGridCol>
            <BetaResourcesCard />
            <BetaReleaseNotesCard />
          </MainGridCol>
        </MainGrid>
      </MainGridWrapper>
    </div>
  );
};

export default BetaDashboard;
