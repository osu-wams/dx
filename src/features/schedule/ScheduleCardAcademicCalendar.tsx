import React from 'react';
import { CardSection, SectionHeader } from './ScheduleCardStyles';
import { List, ListItem, ListItemHeader, ListItemText, ListItemContentLink } from 'src/ui/List';
import { Event } from 'src/util/gaTracking';
import { Date as D, DateDay, DateMonth } from 'src/ui/Date';
import { format } from 'src/util/helpers';

const ScheduleCardAcademicCalendar = ({ calEvents }) => (
  <>
    {calEvents.length > 0 && (
      <CardSection>
        <SectionHeader>Academic Calendar</SectionHeader>
        <List>
          {calEvents.map(({ title, link, pubDate }) => (
            <ListItem key={title}>
              <ListItemContentLink
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => Event('schedule-card', 'academic-calendar-link', link)}
              >
                <D>
                  <DateDay>{format(pubDate, 'd')}</DateDay>
                  <DateMonth>{format(Date.parse(pubDate), 'MMM')}</DateMonth>
                </D>
                <ListItemText>
                  <ListItemHeader>{title} </ListItemHeader>
                </ListItemText>
              </ListItemContentLink>
            </ListItem>
          ))}
        </List>
      </CardSection>
    )}
  </>
);

export { ScheduleCardAcademicCalendar };
