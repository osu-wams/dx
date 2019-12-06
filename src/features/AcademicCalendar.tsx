import React from 'react';
import Skeleton from 'react-loading-skeleton';
import { faCalendar } from '@fortawesome/pro-light-svg-icons';
import { Card, CardHeader, CardContent, CardFooter, CardIcon } from '../ui/Card';
import { List, ListItem, ListItemHeader, ListItemText, ListItemContentLinkSVG } from '../ui/List';
import { useAcademicCalendarEvents } from '../api/events';
import { Date, DateDay, DateMonth } from '../ui/Date';
import { ExternalLink } from '../ui/Link';
import Url from '../util/externalUrls.data';
import { Event } from '../util/gaTracking';
import { format } from '../util/helpers';

/**
 * Academic Calendar Card
 * Displays upcoming events from Localist.
 */
const AcademicCalendar = () => {
  const calEvents = useAcademicCalendarEvents();

  return (
    <Card>
      <CardHeader
        title="Academic Calendar"
        badge={
          <CardIcon
            icon={faCalendar}
            count={calEvents.data.length < 5 ? calEvents.data.length : 5}
          />
        }
      />
      <CardContent>
        {/* Show upcoming calendar events if any exist, otherwise show empty state. */}
        {calEvents.loading && <Skeleton count={5} />}
        {calEvents.data.length > 0 ? (
          <List>
            {calEvents.data.slice(0, 5).map(({ title, link, pubDate }) => (
              <ListItem key={title + pubDate}>
                <ListItemContentLinkSVG
                  href={link ?? Url.events.academicCalendar}
                  onClick={() => Event('academic-calendar', title, link)}
                  target="_blank"
                >
                  <Date>
                    <DateDay>{format(pubDate, 'd')}</DateDay>
                    <DateMonth>{format(pubDate, 'MMM')}</DateMonth>
                  </Date>
                  <ListItemText>
                    <ListItemHeader>{title}</ListItemHeader>
                  </ListItemText>
                </ListItemContentLinkSVG>
              </ListItem>
            ))}
          </List>
        ) : (
          !calEvents.loading && <EmptyState />
        )}
      </CardContent>
      <CardFooter infoButtonId="academic-calendar">
        <ExternalLink
          href={Url.events.academicCalendar}
          onClick={() => Event('academic-calendar', 'View all link')}
        >
          View more in the academic calendar
        </ExternalLink>
      </CardFooter>
    </Card>
  );
};

// Todo: Replace with actual empty state when ready in mockups.
const EmptyState = () => <span>No Calendar Events</span>;

export default AcademicCalendar;
