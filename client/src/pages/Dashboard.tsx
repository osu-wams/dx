import React from 'react';
import PageTitle from '../ui/PageTitle';
import CourseScheduleCard from '../features/CourseScheduleCard';
import PlannerItems from '../features/PlannerItems';
import EventCardContainer from '../ui/EventCardContainer';
import PageGrid from '../ui/PageGrid';

const Dashboard = () => {
  return (
    <div data-testid="dashboard-page">
      <PageTitle title="My OSU Dashboard" />
      <PageGrid>
        <CourseScheduleCard />
        <PlannerItems />
        <EventCardContainer className="col-span-2" />
      </PageGrid>
    </div>
  );
};

export default Dashboard;
