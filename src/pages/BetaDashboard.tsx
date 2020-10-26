import React from 'react';
import PageTitle from '../ui/PageTitle';
import BetaInfo from '../features/beta/BetaInfo';
import BetaResources from '../features/beta/BetaResources';
import BetaReleaseNotes from '../features/beta/BetaReleaseNotes';
import { MainGridWrapper, Masonry } from '../theme';
import { useRecoilValue } from 'recoil';
import { filteredCards } from 'src/state/application';
import { Card } from 'src/ui/Card';

const BetaDashboard = () => {
  const cards = useRecoilValue(filteredCards('Beta'));
  return (
    <MainGridWrapper data-testid="betadash-page">
      <PageTitle title="Beta" />
      <Masonry>
        <BetaInfo />
        <BetaReleaseNotes />
        <BetaResources />
        {cards.map((c) => (
          <Card key={c.id}>{c.title}</Card>
        ))}
      </Masonry>
    </MainGridWrapper>
  );
};

export default BetaDashboard;
