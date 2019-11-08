import React from 'react';
import { format, isSameDay } from 'date-fns';
import styled from 'styled-components';
import VisuallyHidden from '@reach/visually-hidden';
import { theme, Color } from '../../theme';
import { Event } from '../../util/gaTracking';

const ScheduleCardDayMenu = ({ selectedDay, nextFiveDays, setSelectedDay, daysWithEvents }) => {
  return (
    <DayList>
      {nextFiveDays.map((day, index) => (
        <Day
          key={day.toUTCString()}
          onClick={() => {
            setSelectedDay(day);
            Event('schedule-card', 'week-navigation', `Link number ${index + 1}`);
          }}
          selected={isSameDay(day, selectedDay)}
        >
          <span aria-hidden>{daysWithEvents.includes(day) ? '\u2022' : ''}</span>
          <span>
            <span aria-hidden>{format(day, 'ddd')}</span>
            <VisuallyHidden>{format(day, 'dddd')}</VisuallyHidden>
          </span>
          <span>{format(day, 'D')}</span>
        </Day>
      ))}
    </DayList>
  );
};

export { ScheduleCardDayMenu };

// Styles
type selectedBtn = boolean;

const Day = styled.button<{ selected: selectedBtn }>`
  background: none;
  border: none;
  min-width: 2rem;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  align-self: flex-end;

  & > span:first-child {
    color: ${({ theme }) => theme.features.academics.courses.dayList.item.firstChild.color};
    font-weight: bold;
    font-size: ${theme.fontSize[20]};
    line-height: 18px;
  }

  & > span:nth-child(2) {
    color: ${({ theme, selected }) =>
      selected
        ? theme.features.academics.courses.dayList.item.evenChildrenSelected.color
        : theme.features.academics.courses.dayList.item.evenChildren.color};
    font-weight: bold;
    font-size: ${theme.fontSize[12]};
    text-transform: uppercase;
    margin-bottom: 0.2rem;
  }

  & > span:last-child {
    color: ${({ theme, selected }) =>
      selected
        ? theme.features.academics.courses.dayList.item.lastChildSelected.color
        : theme.features.academics.courses.dayList.item.lastChild.color};
    line-height: 0.4rem;
    font-size: ${theme.fontSize[24]};
    padding: 1.2rem 1.2rem 2rem;
    border-bottom: 3px solid
      ${({ theme, selected }) =>
        selected
          ? theme.features.academics.courses.dayList.item.lastChildSelected.color
          : theme.features.academics.courses.dayList.item.lastChild.color};
  }
  &:hover,
  &:focus,
  &:active {
    span:last-child {
      border-bottom: 3px solid
        ${({ theme, selected }) =>
          selected
            ? theme.features.academics.courses.dayList.item.childInFocusSelected.color
            : theme.features.academics.courses.dayList.item.childInFocus.color};
    }
  }
`;

const DayList = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: baseline;
  border-bottom: 1px solid ${({ theme }) => theme.features.academics.courses.dayList.borderBottom};
  margin: 0 -1.6rem 1.6rem;
`;
