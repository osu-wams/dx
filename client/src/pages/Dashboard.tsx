import React from 'react';
import PageTitle from '../ui/PageTitle';
import CourseScheduleCard from '../features/CourseScheduleCard';
import UpcomingAssignments from '../features/UpcomingAssignments';
import FluffCard from '../ui/FluffCard';
import styled from 'styled-components';

// Todo: Refactor out to new component
const PageContent = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 16px;
  }
`;

const Dashboard = () => {
  return (
    <div data-testid="dashboard-page">
      <PageTitle title="My OSU Dashboard" />
      <PageContent>
        <CourseScheduleCard />
        <UpcomingAssignments />
        <FluffCard
          items={[
            {
              title: 'Fluff Title 1',
              text:
                'Let us wax poetic about the beauty of the cheeseburger. The flavour gracefully dances across your palate like a majestic figure skater on ice.'
            },
            {
              title: 'Fluff Title 2',
              text: 'This is a shorter description.'
            }
          ]}
        />
      </PageContent>
    </div>
  );
};

export default Dashboard;
