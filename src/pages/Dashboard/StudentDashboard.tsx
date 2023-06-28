import React from 'react';
import { faStars } from '@fortawesome/pro-light-svg-icons';
import { State } from '@osu-wams/hooks';
import PageTitle from 'src/ui/PageTitle';
import ScheduleCard from 'src/features/ScheduleCard';
import EventCardContainer from 'src/ui/EventCardContainer';
import { MainGridWrapper, Masonry } from 'src/ui/grid';
import ResourcesCard from 'src/features/ResourcesCard';
import { FavoriteResources } from 'src/features/FavoriteResources';
import { TrendingResources } from 'src/features/TrendingResources';
import { useRecoilValue } from 'recoil';
import { DynamicCard } from 'src/ui/Card/variants/DynamicCard';
import { ITSystemStatus } from 'src/features/it-systems-status/ITSystemStatus';
import CovidCompliance from 'src/features/CovidCompliance';
import BeaverhubAlert from 'src/features/BeaverhubAlert';

const { ANNOUNCEMENT_PAGES, filteredCards } = State;

const StudentDashboard = () => {
  const cards = useRecoilValue(filteredCards('Dashboard'));

  return (
    <>
      <MainGridWrapper data-testid="student-dashboard-page">
        <BeaverhubAlert />
        <PageTitle title="Overview" />
        <Masonry>
          <>
            <ScheduleCard />
            <CovidCompliance />
            <ITSystemStatus />
          </>
          <FavoriteResources />
          <TrendingResources />
          <ResourcesCard categ="featured" icon={faStars} />
          {cards.map((c) => (
            <DynamicCard key={c.id} data={c} />
          ))}
        </Masonry>
      </MainGridWrapper>
      <EventCardContainer page={ANNOUNCEMENT_PAGES.dashboard} />
    </>
  );
};

export { StudentDashboard };
