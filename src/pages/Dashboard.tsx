import React from 'react';
import { faStars } from '@fortawesome/pro-light-svg-icons';
import PageTitle from '../ui/PageTitle';
import ScheduleCard from '../features/ScheduleCard';
import EventCardContainer from '../ui/EventCardContainer';
import { MainGridWrapper, MainGrid, MainGridCol, SecondGridWrapper } from '../ui/PageGrid';
import ResourcesCard from '../features/ResourcesCard';

const Dashboard = () => {
  return (
    <div data-testid="dashboard-page">
      <MainGridWrapper>
        <PageTitle title="Student Dashboard" />
        <MainGrid>
          <MainGridCol>
            <ScheduleCard />
          </MainGridCol>
          <MainGridCol>
            <ResourcesCard categ="featured" icon={faStars} />
          </MainGridCol>
        </MainGrid>
      </MainGridWrapper>
      <SecondGridWrapper>
        <EventCardContainer />
      </SecondGridWrapper>
    </div>
  );
};

export default Dashboard;
