import React, { useState, useEffect } from 'react';
import PageTitle from '../ui/PageTitle';
import { Card, CardHeader, CardContent, CardFooter, Badge } from '../ui/Card';
import Button from '../ui/Button';
import { getServices, getFeaturedServices } from '../api/services';
import CourseScheduleCard from '../features/CourseScheduleCard';
import { faComments } from '@fortawesome/pro-regular-svg-icons';

// Sample list for testing purposes
import { faFileAlt } from '@fortawesome/pro-light-svg-icons';
import {
  List,
  ListItem,
  ListItemContent,
  ListItemDescription,
  ListItemHeader,
  ListItemText
} from '../ui/List';
import Icon from '../ui/Icon';
import { Color } from '../theme';

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
      <CourseScheduleCard />
      <Card>
        <CardHeader title="Canvas To Dos" badge={<Badge>{8}</Badge>} />
        <CardContent>
          <List>
            <ListItem>
              <ListItemContent>
                <ListItemText>
                  <ListItemHeader>What is this</ListItemHeader>
                  <ListItemDescription>Deiscription</ListItemDescription>
                </ListItemText>
                <Icon icon={faFileAlt} size="6x" color={Color['orange-200']} />
              </ListItemContent>
            </ListItem>
            <ListItem>
              <ListItemContent>
                <Icon icon={faComments} size="lg" />
                <ListItemText>
                  <ListItemHeader>Turn inj the assignment</ListItemHeader>
                  <ListItemDescription>
                    CAS171 - Due Feb 15 at 11:59pm
                    <br />
                    What is going on
                  </ListItemDescription>
                </ListItemText>
                <Icon icon={faFileAlt} size="2x" />
              </ListItemContent>
            </ListItem>
            <ListItem>
              <ListItemContent>
                <Icon icon={faFileAlt} />
                <ListItemText>
                  <ListItemHeader>What is this</ListItemHeader>
                  <ListItemDescription>Deiscription</ListItemDescription>
                </ListItemText>
              </ListItemContent>
            </ListItem>
          </List>
        </CardContent>
        <CardFooter>
          <Button>See more in Canvas</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Dashboard;
