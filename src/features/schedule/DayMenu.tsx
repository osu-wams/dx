import React from 'react';
import { format, isSameDay } from 'date-fns';
import styled from 'styled-components';
import { theme, Color } from '../../theme';

const DayMenu = ({selectedDay, nextFiveDays, setSelectedDay, daysWithEvents}) => {
        
  return (
    <DayList>
      {nextFiveDays.map(day => (
        <Day
          key={day.toUTCString()}
          onClick={() => setSelectedDay(day)}
          selected={isSameDay(day, selectedDay)}
        >
          <span>{daysWithEvents.includes(day) ? '\u2022' : ''}</span>
          <span>{format(day, 'ddd')}</span>
          <span>{format(day, 'D')}</span>
        </Day>
      ))}
    </DayList>
  )
}

export { DayMenu };

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
    color: ${Color['orange-500']};
    font-weight: bold;
    font-size: ${theme.fontSize[20]};
    line-height: 18px;
  }

  & > span:nth-child(2) {
    color: ${Color['neutral-550']};
    font-weight: bold;
    font-size: ${theme.fontSize[12]};
    text-transform: uppercase;
    margin-bottom: .2rem;
  }

  & > span:last-child {
    color: ${Color['neutral-700']};
    line-height: .4rem;
    font-size: ${theme.fontSize[24]};
    padding: 1.2rem 1.2rem 2rem;
    border-bottom: 3px solid transparent;
  }
  &:hover, &:active, &:focus {
    & > span:last-child {
      border-bottom-color: ${Color["neutral-300"]};
    }
  }

  ${props => props.selected &&
    `
    & > span {
      color: ${Color['orange-400']} !important;
      &:last-child {
        border-bottom-color: ${Color['orange-400']};
      }
    }
  `}
`;

const DayList = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: baseline;
  border-bottom: 1px solid ${Color["neutral-200"]};
  margin: 0 -1.6rem 1.6rem;
  min-height: 100%;
`;