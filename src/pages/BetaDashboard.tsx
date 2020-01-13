import React from 'react';
import PageTitle from '../ui/PageTitle';
import BetaInfo from '../features/beta/BetaInfo';
import BetaResourcesCard from '../features/beta/ResourcesCard';
import BetaReleaseNotes from '../features/beta/BetaReleaseNotes';
import { MainGridWrapper, Masonry } from '../theme';

const BetaDashboard = () => {
  return (
    <MainGridWrapper data-testid="betadash-page">
      <PageTitle title="Beta" />
      <Masonry>
        <BetaInfo />
        <BetaResourcesCard />
        <BetaReleaseNotes />
      </Masonry>
    </MainGridWrapper>
  );
};

export default BetaDashboard;
