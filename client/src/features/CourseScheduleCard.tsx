import React, { useState } from 'react';
import styled from 'styled-components';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { CardBase } from '../ui/Card';
import Icon from '../ui/Icon';
import { theme, Color } from '../theme';

const testCourses = [
  {
    courseCode: 'CS 171',
    sectionType: 'Recitation',
    location: '112 Cordley Hall',
    time: '3:00pm - 5:00pm'
  },
  {
    courseCode: 'CS 171',
    sectionType: 'Recitation',
    location: '112 Cordley Hall',
    time: '3:00pm - 5:00pm'
  }
];

// Todo:
//  - Connect to data source
//  - Generate days programmatically from data
//  - Filter courses based on selected day
//  - Replace List/ListItem with implementations from ../ui when they're finished
//  - Add link to course location on campus map to location pin icon

const CourseScheduleCard = () => {
  const [courses, setCourses] = useState(testCourses);

  if (!courses) {
    return null;
  }

  return (
    <Card>
      <Header>This Week</Header>
      <DayList>
        <Day>
          <span>mon</span>
          <span>8</span>
        </Day>
        <Day>
          <span>tue</span>
          <span>9</span>
        </Day>
        <Day>
          <span>wed</span>
          <span>10</span>
        </Day>
        <Day>
          <span>thu</span>
          <span>11</span>
        </Day>
        <Day>
          <span>fri</span>
          <span>12</span>
        </Day>
      </DayList>
      <List>
        {courses.map(course => (
          <ListItem>
            <div style={{ lineHeight: '1.8rem' }}>
              <div style={{ fontWeight: 'bold', color: Color['neutral-700'] }}>
                {course.courseCode}
              </div>
              <div style={{ color: Color['neutral-500'], fontSize: theme.fontSize[14] }}>
                {course.sectionType} &bull; {course.location}
              </div>
              <div style={{ color: Color['neutral-500'], fontSize: theme.fontSize[14] }}>
                {course.time}
              </div>
            </div>
            <Icon icon={faMapMarkerAlt} />
          </ListItem>
        ))}
      </List>
    </Card>
  );
};

const Card = styled(CardBase)`
  padding: ${theme.spacing.unit * 2}px;
`;

const Header = styled.div`
  color: ${Color['neutral-600']};
  font-size: ${theme.fontSize[18]};
  font-weight: 600;
  margin-bottom: ${theme.spacing.unit}px;
`;

const Day = styled.button`
  background: none;
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  & > span:first-child {
    color: ${Color['neutral-500']};
    font-weight: bold;
    font-size: ${theme.fontSize[12]};
    text-transform: uppercase;
  }
  & > span:last-child {
    color: ${Color['neutral-700']};
    line-height: 20px;
    font-size: ${theme.fontSize[24]};
  }
  &:first-child > span {
    color: ${Color['orange-400']} !important;
  }
`;

const DayList = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: ${theme.spacing.unit * 3}px;
`;

const List = styled.ul`
  margin-block-start: 0;
  list-style-type: none;
  margin-left: 0;
  padding-left: 0;
`;

const ListItem = styled.li`
  & > svg {
    font-size: 24px;
    float: right;
  }
  display: flex;
  justify-content: space-between;
  align-items: center;
  &:not(:last-child) {
    margin-bottom: ${theme.spacing.unit * 3}px;
  }
`;

export default CourseScheduleCard;
