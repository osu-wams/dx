import React from 'react';
import PageTitle from '../ui/PageTitle';
import CourseScheduleCard from '../features/CourseScheduleCard';
import UpcomingAssignments from '../features/UpcomingAssignments';

const Dashboard = () => {
  return (
    <div data-testid="dashboard-page">
      <PageTitle title="My OSU Dashboard" />
      <CourseScheduleCard />
      <UpcomingAssignments />
    </div>
  );
};

export default Dashboard;
