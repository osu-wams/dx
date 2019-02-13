import React from 'react';
import PageTitle from '../ui/PageTitle';
import CourseScheduleCard from '../features/CourseScheduleCard';
import UpcomingAssignments from '../features/UpcomingAssignments';
import FluffCard from '../ui/FluffCard';

const Dashboard = () => {
  return (
    <div data-testid="dashboard-page">
      <PageTitle title="My OSU Dashboard" />
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
    </div>
  );
};

export default Dashboard;
