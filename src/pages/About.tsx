import React from 'react';
import { State } from '@osu-wams/hooks';
import PageTitle from '../ui/PageTitle';
import Info from '../features/about/Info';
import SupportResources from '../features/about/SupportResources';
import ReleaseNotes from '../features/about/ReleaseNotes';
import { MainGridWrapper, Masonry } from 'src/ui/grid';
import { useRecoilValue } from 'recoil';
import { DynamicCard } from 'src/ui/Card/variants/DynamicCard';

const About = () => {
  const cards = useRecoilValue(State.filteredCards('About'));

  return (
    <MainGridWrapper data-testid="about-page">
      <PageTitle title="About MyOregonState" />
      <Masonry>
        <Info />
        <ReleaseNotes />
        <>
          <SupportResources />
          {cards.map((d) => (
            <DynamicCard key={d.id} data={d} />
          ))}
        </>
      </Masonry>
    </MainGridWrapper>
  );
};

export default About;
