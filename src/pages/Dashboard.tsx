import React from 'react';
import PageTitle from '../ui/PageTitle';
import ScheduleCard from '../features/ScheduleCard';
import EventCardContainer from '../ui/EventCardContainer';
import PageGrid from '../ui/PageGrid';

const Dashboard = () => {
  return (
    <div data-testid="dashboard-page">
      <PageTitle title="My OSU Dashboard" />
      <PageGrid>
        <ScheduleCard />
        <EventCardContainer className="col-span-2" />
      </PageGrid>
    </div>
  );
};

export default Dashboard;
