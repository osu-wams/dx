import React from 'react';
import { faStars } from '@fortawesome/pro-light-svg-icons';
import PageTitle from '../../ui/PageTitle';
import ScheduleCard from '../../features/ScheduleCard';
import EventCardContainer from '../../ui/EventCardContainer';
import { MainGridWrapper, Masonry } from '../../theme';
import ResourcesCard from '../../features/ResourcesCard';
import { FavoriteResources } from 'src/features/FavoriteResources';
import { TrendingResources } from 'src/features/TrendingResources';

const StudentDashboard = () => {
  return (
    <>
      <MainGridWrapper data-testid="student-dashboard-page">
        <PageTitle title="Overview" />
        <Masonry>
          <ScheduleCard />
          <ResourcesCard categ="featured" icon={faStars} />
          <FavoriteResources />
          <TrendingResources />
        </Masonry>
      </MainGridWrapper>
      <EventCardContainer page="dashboard" />
    </>
  );
};

export { StudentDashboard };
