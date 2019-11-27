import React from 'react';
import { isSameDay } from 'date-fns';
import VisuallyHidden from '@reach/visually-hidden';
import { themeSettings, styled } from '../../theme';
import { Event } from '../../util/gaTracking';
import { format } from '../../util/helpers';

const ScheduleCardDayMenu = ({ selectedDay, nextFiveDays, setSelectedDay, daysWithEvents }) => {
  return (
    <DayList>
      {nextFiveDays.map((day, index) => {
        const selected = isSameDay(day, selectedDay);

        return (
          <DaySelector
            key={day.toUTCString()}
            onClick={() => {
              setSelectedDay(day);
              Event('schedule-card', 'week-navigation', `Link number ${index + 1}`);
            }}
            selected={selected}
          >
            <DayIndicator aria-hidden>{daysWithEvents.includes(day) ? '\u2022' : ''}</DayIndicator>
            <DayOfWeek aria-hidden selected={selected}>
              {format(day, 'EEE')}
            </DayOfWeek>
            <VisuallyHidden>{format(day, 'EEEE')}</VisuallyHidden>
            <DayOfMonth selected={selected}>{format(day, 'd')}</DayOfMonth>
          </DaySelector>
        );
      })}
    </DayList>
  );
};

export { ScheduleCardDayMenu };

// Styles
type selectedBtn = boolean;

const DaySelector = styled.button<{ selected: selectedBtn }>`
  background: none;
  border: none;
  min-width: 2rem;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  align-self: flex-end;
  &:hover,
  &:focus,
  &:active {
    /* Border on the DayOfMonth component */
    span:last-child {
      border-bottom: 3px solid
        ${({ theme, selected }) =>
          selected
            ? theme.features.academics.courses.dayList.daySelected.borderBottom
            : theme.features.academics.courses.dayList.dayInFocus.borderBottom};
    }
  }
`;

const DayIndicator = styled.span`
  color: ${({ theme }) => theme.features.academics.courses.dayList.dayIndicator.color};
  font-weight: bold;
  font-size: ${themeSettings.fontSize[20]};
  line-height: 18px;
`;

const DayOfWeek = styled.span<{ selected: selectedBtn }>`
  color: ${({ theme, selected }) =>
    selected
      ? theme.features.academics.courses.dayList.dayOfWeekSelected.color
      : theme.features.academics.courses.dayList.dayOfWeek.color};
  font-weight: bold;
  font-size: ${themeSettings.fontSize[12]};
  text-transform: uppercase;
  margin-bottom: 0.2rem;
`;

const DayOfMonth = styled.span<{ selected: selectedBtn }>`
  color: ${({ theme, selected }) =>
    selected
      ? theme.features.academics.courses.dayList.dayOfMonthSelected.color
      : theme.features.academics.courses.dayList.dayOfMonth.color};
  line-height: 0.4rem;
  font-size: ${themeSettings.fontSize[24]};
  padding: 1.2rem 1.2rem 2rem;
  border-bottom: 3px solid
    ${({ theme, selected }) =>
      selected
        ? theme.features.academics.courses.dayList.dayOfMonthSelected.borderBottom
        : theme.features.academics.courses.dayList.dayOfMonth.borderBottom};
`;

const DayList = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: baseline;
  border-bottom: 1px solid ${({ theme }) => theme.features.academics.courses.dayList.borderBottom};
  margin: 0 -1.6rem 1.6rem;
`;
