import React from 'react';
import PageTitle from '../ui/PageTitle';
import BetaInfo from '../features/about/BetaInfo';
import BetaResources from '../features/about/BetaResources';
import BetaReleaseNotes from '../features/about/BetaReleaseNotes';
import { MainGridWrapper, Masonry } from '../theme';
import { useRecoilValue } from 'recoil';
import { filteredCards } from 'src/state/application';
import { DynamicCard } from 'src/ui/Card/variants/DynamicCard';

const About = () => {
  const cards = useRecoilValue(filteredCards('About'));

  return (
    <MainGridWrapper data-testid="about-page">
      <PageTitle title="About MyOregonState" />
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

export default About;
