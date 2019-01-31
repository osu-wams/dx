import React, { useState, useEffect } from 'react';
import PageTitle from '../ui/PageTitle';
import { Card, CardHeader, CardContent, CardFooter, Badge } from '../ui/Card';
import Button from '../ui/Button';
import { getServices, getFeaturedServices } from '../api/services';

const Dashboard = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    getFeaturedServices()
      .then(items => {
        const dashboardServices = items.filter(e =>
          e.fields.categories.find(e => e.fields.title === 'featured-home')
        );
        setServices(dashboardServices);
      })
      .catch(console.log);
  }, []);

  return (
    <div data-testid="dashboard-page">
      <PageTitle title="My OSU Dashboard" />
      <Card>
        <CardHeader title="Canvas To Dos" badge={<Badge>{8}</Badge>} />
        <CardContent>Test</CardContent>
        <CardFooter>
          <Button>See more in Canvas</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Dashboard;
