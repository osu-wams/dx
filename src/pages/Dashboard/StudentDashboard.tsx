import React from 'react';
import { faStars } from '@fortawesome/pro-light-svg-icons';
import PageTitle from 'src/ui/PageTitle';
import ScheduleCard from 'src/features/ScheduleCard';
import EventCardContainer from 'src/ui/EventCardContainer';
import { MainGridWrapper, Masonry } from 'src/theme';
import ResourcesCard from 'src/features/ResourcesCard';
import { FavoriteResources } from 'src/features/FavoriteResources';
import { TrendingResources } from 'src/features/TrendingResources';
import { filteredCards } from 'src/state/application';
import { useRecoilValue } from 'recoil';
import { DynamicCard } from 'src/ui/Card/variants/DynamicCard';

const StudentDashboard = () => {
  const cards = useRecoilValue(filteredCards('Dashboard'));

  return (
    <>
      <MainGridWrapper data-testid="student-dashboard-page">
        <PageTitle title="Overview" />
        <Masonry>
          <ScheduleCard />
          <FavoriteResources />
          <TrendingResources />
          <ResourcesCard categ="featured" icon={faStars} />
          {cards.map((c) => (
            <DynamicCard key={c.id} data={c} />
          ))}
        </Masonry>
      </MainGridWrapper>
      <EventCardContainer page="dashboard" />
    </>
  );
};

export { StudentDashboard };
