import React from 'react';
import { Loading } from 'src/ui/Loading';
import { faCalendar } from '@fortawesome/pro-light-svg-icons';
import { Card, CardHeader, CardContent, CardFooter, CardIcon } from '../ui/Card';
import { List, ListItem, ListItemHeader, ListItemText, ListItemContentLinkSVG } from '../ui/List';
import { useAcademicCalendarEvents } from '@osu-wams/hooks';
import { Date, DateDay, DateMonth } from '../ui/Date';
import { ExternalLink } from '../ui/Link';
import { Helpers, Url } from '@osu-wams/utils';
import { Event } from '../util/gaTracking';

/**
 * Academic Calendar Card
 * Displays upcoming events from Localist.
 */
const AcademicCalendar = () => {
  const calEvents = useAcademicCalendarEvents();
  const maxEvents = 5;

  return (
    <Card>
      <CardHeader
        title="Academic Calendar"
        badge={
          <CardIcon
            icon={faCalendar}
            count={
              calEvents.data && calEvents.data.length < maxEvents
                ? calEvents.data.length
                : maxEvents
            }
          />
        }
      />
      <CardContent>
        {/* Show upcoming calendar events if any exist, otherwise show empty state. */}
        {calEvents.isLoading && <Loading lines={5} />}
        {(calEvents.data ?? []).length > 0 ? (
          <List>
            {(calEvents.data ?? []).slice(0, maxEvents).map(({ title, link, pubDate }) => (
              <ListItem key={title + pubDate}>
                <ListItemContentLinkSVG
                  href={link ?? Url.events.academicCalendar}
                  onClick={() => Event('academic-calendar', title, link)}
                  target="_blank"
                >
                  <Date>
                    <DateDay>{Helpers.format(pubDate, 'd')}</DateDay>
                    <DateMonth>{Helpers.format(pubDate, 'MMM')}</DateMonth>
                  </Date>
                  <ListItemText>
                    <ListItemHeader>{title}</ListItemHeader>
                  </ListItemText>
                </ListItemContentLinkSVG>
              </ListItem>
            ))}
          </List>
        ) : (
          !calEvents.isLoading && <EmptyState />
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
