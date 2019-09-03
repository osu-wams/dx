import React from 'react';
import { faStars } from '@fortawesome/pro-light-svg-icons';
import PageTitle from '../ui/PageTitle';
import ScheduleCard from '../features/ScheduleCard';
import EventCardContainer from '../ui/EventCardContainer';
import PageGrid from '../ui/PageGrid';
import ResourcesCard from '../features/ResourcesCard';

const Dashboard = () => {
  return (
    <div data-testid="dashboard-page">
      <PageTitle title="My OSU Dashboard" />
      <PageGrid>
        <ScheduleCard />
        <ResourcesCard categ="featured" icon={faStars} />
        <EventCardContainer className="col-span-2" />
      </PageGrid>
    </div>
  );
};

export default Dashboard;
