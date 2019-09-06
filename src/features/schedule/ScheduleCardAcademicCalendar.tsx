import React from 'react';
import { faCalendarCheck } from '@fortawesome/pro-light-svg-icons';
import { CardSection, SectionHeader } from './ScheduleCardStyles';
import Icon from '../../ui/Icon';
import { Color } from '../../theme';
import { List, ListItem, ListItemHeader, ListItemText, ListItemContentLink } from '../../ui/List';
import { Event } from '../../util/gaTracking';

const ScheduleCardAcademicCalendar = ({ calEvents }) => (
  <>
    {calEvents.length > 0 && (
      <CardSection>
        <SectionHeader>Academic Calendar</SectionHeader>
        <List>
          {calEvents.map(({ title, link }) => (
            <ListItem key={title}>
              <ListItemContentLink
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => Event('schedule-card', 'academic-calendar-link', link)}
              >
                <Icon icon={faCalendarCheck} color={Color['orange-200']} />
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
