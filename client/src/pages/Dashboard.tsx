import React from 'react';
import PageTitle from '../ui/PageTitle';
import CourseScheduleCard from '../features/CourseScheduleCard';
import UpcomingAssignments from '../features/UpcomingAssignments';
import EventCardContainer from '../ui/EventCardContainer';
import PageGrid from '../ui/PageGrid';

const Dashboard = () => {
  return (
    <div data-testid="dashboard-page">
      <PageTitle title="My OSU Dashboard" />
      <PageGrid>
        <CourseScheduleCard />
        <UpcomingAssignments />
        <EventCardContainer className="col-span-2" />
      </PageGrid>
    </div>
  );
};

export default Dashboard;
