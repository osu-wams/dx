import React from 'react';
import { faStars } from '@fortawesome/pro-light-svg-icons';
import PageTitle from '../../ui/PageTitle';
import ScheduleCard from '../../features/ScheduleCard';
import EventCardContainer from '../../ui/EventCardContainer';
import { MainGridWrapper, Masonry } from '../../theme';
import ResourcesCard from '../../features/ResourcesCard';

const StudentDashboard = () => {
  return (
    <>
      <MainGridWrapper data-testid="student-dashboard-page">
        <PageTitle
          title="Student Dashboard"
          badge={{
            title: 'Beta',
            href: '/beta',
            eventCategory: 'beta',
            eventAction: 'Student Dashboard Beta link clicked'
          }}
        />
        <Masonry>
          <ScheduleCard />
          <ResourcesCard categ="featured" icon={faStars} />
        </Masonry>
      </MainGridWrapper>
      <EventCardContainer page="dashboard" />
    </>
  );
};

export { StudentDashboard };
