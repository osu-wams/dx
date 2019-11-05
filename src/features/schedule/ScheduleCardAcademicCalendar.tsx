import React from 'react';
import { CardSection, SectionHeader } from './ScheduleCardStyles';
import { List, ListItem, ListItemHeader, ListItemText, ListItemContentLink } from '../../ui/List';
import { Event } from '../../util/gaTracking';
import { Date, DateDay, DateMonth } from '../../ui/Date';
import { format } from 'date-fns';

const ScheduleCardAcademicCalendar = ({ calEvents }) => (
  <>
    {calEvents.length > 0 && (
      <CardSection>
        <SectionHeader>Academic Calendar</SectionHeader>
        <List>
          {calEvents.map(({ title, link, pubDate}) => (
            <ListItem key={title}>
              <ListItemContentLink
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => Event('schedule-card', 'academic-calendar-link', link)}
              >
                <Date>
                  <DateDay>{format(pubDate, 'D')}</DateDay>
                  <DateMonth>{format(pubDate, 'MMM')}</DateMonth>
                </Date>
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
