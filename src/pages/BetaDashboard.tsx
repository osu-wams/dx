import React from 'react';
import PageTitle from '../ui/PageTitle';
import BetaInfo from '../features/beta/BetaInfo';
import BetaResources from '../features/beta/BetaResources';
import BetaReleaseNotes from '../features/beta/BetaReleaseNotes';
import { MainGridWrapper, Masonry } from '../theme';
import { useRecoilValue } from 'recoil';
import { filteredCards } from 'src/state/application';
import { DynamicCard } from 'src/ui/Card/variants/DynamicCard';

const BetaDashboard = () => {
  const cards = useRecoilValue(filteredCards('Beta'));

  return (
    <MainGridWrapper data-testid="betadash-page">
      <PageTitle title="Beta" />
      <Masonry>
        <BetaInfo />
        <BetaReleaseNotes />
        <>
          <BetaResources />
          {cards.map((d) => (
            <DynamicCard key={d.id} data={d} />
          ))}
        </>
      </Masonry>
    </MainGridWrapper>
  );
};

export default BetaDashboard;
