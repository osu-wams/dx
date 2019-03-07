import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import {
  faFileEdit,
  faArrowRight,
  faCalendar,
  faCalendarAlt
} from '@fortawesome/pro-light-svg-icons';
import { Card, CardHeader, CardContent, CardFooter, Badge } from '../ui/Card';
import Icon from '../ui/Icon';
import {
  List,
  ListItem,
  ListItemContent,
  ListItemContentButton,
  ListItemDescription,
  ListItemHeader,
  ListItemText
} from '../ui/List';
import Button from '../ui/Button';
import { Color } from '../theme';
import { getAcademicCalendarEvents } from '../api/events';

/**
 * Upcoming Assignments Card
 *
 * Displays upcoming assignments from Canvas.
 */
const AcademicCalendar = () => {
  const [calEvents, setCalEvents] = useState([]);

  // Populate assignment data for current user
  useEffect(() => {
    getAcademicCalendarEvents()
      .then(setCalEvents)
      .catch(console.log);
  }, []);

  return (
    <Card>
      <CardHeader title="Academic Calendar" badge={<Badge>{calEvents.length}</Badge>} />
      <CardContent>
        {/* Show upcoming calendar events if any exist, otherwise show empty state. */}
        {calEvents.length ? (
          <List>
            {calEvents.map(({ title, link, pubDate }) => (
              <ListItem key={title}>
                <ListItemContentButton>
                  <Icon icon={faCalendarAlt} color={Color['orange-200']} />
                  <ListItemText>
                    <ListItemHeader>{title}</ListItemHeader>
                    <ListItemDescription>{format(pubDate, 'MMMM D, YYYY')}</ListItemDescription>
                  </ListItemText>
                </ListItemContentButton>
              </ListItem>
            ))}
          </List>
        ) : (
          <EmptyState />
        )}
      </CardContent>
      <CardFooter>
        <Button bg={Color.transparent} fg={Color['orange-400']}>
          View more in Localist
          <Icon icon={faArrowRight} color={Color['orange-400']} style={{ marginLeft: '8px' }} />
        </Button>
      </CardFooter>
    </Card>
  );
};

// Todo: Replace with actual empty state when ready in mockups.
const EmptyState = () => <span>NO ASSIGNMENTS</span>;

export default AcademicCalendar;
