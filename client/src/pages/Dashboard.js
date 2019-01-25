import React from 'react';
import Card from '../ui/Card';
import PageTitle from '../ui/PageTitle';
import Services from '../features/Services';

const Dashboard = () => (
  <div data-testid="dashboard-page">
    <PageTitle title="My OSU Dashboard" />
    <Card>Test</Card>
    <Services />
  </div>
);

export default Dashboard;
