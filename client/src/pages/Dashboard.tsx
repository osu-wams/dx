import React from 'react';
import styled from 'styled-components';
import PageTitle from '../ui/PageTitle';
import CourseScheduleCard from '../features/CourseScheduleCard';
import UpcomingAssignments from '../features/UpcomingAssignments';
import FluffCard from '../ui/FluffCard';

// Todo: Refactor out to new component
const PageContent = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 16px;
    .two-col {
      grid-column-start: 1;
      grid-column-end: 3;
    }
  }
`;

const Dashboard = () => {
  return (
    <div data-testid="dashboard-page">
      <PageTitle title="My OSU Dashboard" />
      <PageContent>
        <CourseScheduleCard />
        <UpcomingAssignments />
        <div className="two-col">
          <FluffCard />
        </div>
      </PageContent>
    </div>
  );
};

export default Dashboard;
