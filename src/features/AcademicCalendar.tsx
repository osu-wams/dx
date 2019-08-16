import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Card, CardHeader, CardContent, CardFooter, Badge } from '../ui/Card';
import { List, ListItem, ListItemHeader, ListItemText, ListItemContentLink } from '../ui/List';
import { getAcademicCalendarEvents, IEvents } from '../api/events';
import { Date, DateDay, DateMonth } from '../ui/Date';
import { ExternalLink } from '../ui/Link';
import Url from '../util/externalUrls.data';

/**
 * Academic Calendar Card
 * Displays upcoming events from Localist.
 */
const AcademicCalendar = () => {
  const [calEvents, setCalEvents] = useState<IEvents | []>([]);

  // Get Academic Calendar Events
  useEffect(() => {
    getAcademicCalendarEvents()
      .then(setCalEvents)
      .catch(console.log);
  }, []);

  return (
    <Card>
      <CardHeader
        title="Academic Calendar"
        badge={<Badge>{calEvents.length < 5 ? calEvents.length : 5}</Badge>}
      />
      <CardContent>
        {/* Show upcoming calendar events if any exist, otherwise show empty state. */}
        {calEvents.length ? (
          <List>
            {calEvents.slice(0, 5).map(({ title, link, pubDate }) => (
              <ListItem key={title}>
                <ListItemContentLink href={link}>
                  <Date>
                    <DateDay>{format(pubDate, 'D')}</DateDay>
                    <DateMonth>{format(pubDate, 'MMM')}</DateMonth>
                  </Date>
                  <ListItemText>
                    <ListItemHeader>{title}</ListItemHeader>
                  </ListItemText>
                </ListItemContentLink>
              </ListItem>
            ))}
          </List>
        ) : (
          <EmptyState />
        )}
      </CardContent>
      <CardFooter>
        <ExternalLink href={Url.events.academicCalendar}>View academic calendar</ExternalLink>
      </CardFooter>
    </Card>
  );
};

// Todo: Replace with actual empty state when ready in mockups.
const EmptyState = () => <span>No Calendar Events</span>;

export default AcademicCalendar;
