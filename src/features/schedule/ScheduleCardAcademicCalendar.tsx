import React from 'react';
import { faCalendarCheck } from '@fortawesome/pro-light-svg-icons';
import { CardSection, SectionHeader } from './ScheduleCardStyles';
import Icon from '../../ui/Icon';
import { Color } from '../../theme';
import { List, ListItem, ListItemHeader, ListItemText, ListItemContentLink } from '../../ui/List';

const ScheduleCardAcademicCalendar = ({ calEvents }) => (
  <>
    {calEvents.length > 0 && (
      <CardSection>
        <SectionHeader>Academic Calendar</SectionHeader>
        <List>
          {calEvents.map(({ title, link }) => (
            <ListItem key={title}>
              <ListItemContentLink href={link}>
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
