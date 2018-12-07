import React from 'react';
import { faBookReader } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { Card, CardHeader, CardHeaderTitle, CardHeaderSubtitle, CardContent } from './layout/Card';
import Badge from './layout/Badge';
import Icon from './layout/Icon';
import List from './layout/List';

const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const UpcomingAssignments = () => {
  return (
    <Card color="stratosphere">
      <CardHeader>
        <div>
          <CardHeaderTitle>Upcoming Assignments</CardHeaderTitle>
          <CardHeaderSubtitle>
            <Badge inline badgeContent={3} bg="stratosphere">
              Due Soon
            </Badge>
          </CardHeaderSubtitle>
        </div>
        <Icon icon={faBookReader} color="stratosphere" size="2x" />
      </CardHeader>
      <CardContent>
        <List style={{ margin: 0 }}>
          <ListItem>
            <div>
              <span>Assignment #3</span>
              <br />
              <span style={{ fontWeight: 300 }}>CS274</span>
            </div>
            <div style={{ fontWeight: 300 }}>Jan. 6th - 11:59pm</div>
          </ListItem>
          <ListItem>
            <div>
              <span>Quiz #6</span>
              <br />
              <span style={{ fontWeight: 300 }}>CS360</span>
            </div>
            <div style={{ fontWeight: 300 }}>Jan. 11th - 2:00pm</div>
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
};

export default UpcomingAssignments;
