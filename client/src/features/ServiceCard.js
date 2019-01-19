import React from 'react';
import styled from 'styled-components';
import { faThList, faLink } from '@fortawesome/free-solid-svg-icons';
import { Card, CardHeader, CardHeaderTitle, CardContent } from '../ui/Card';
import List from '../ui/List';
import Icon from '../ui/Icon';

const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ServiceCard = ({ title }) => (
  <Card color="stratosphere">
    <CardHeader>
      <CardHeaderTitle>{title}</CardHeaderTitle>
      <Icon icon={faThList} color="stratosphere" size="2x" />
    </CardHeader>
    <CardContent>
      <List style={{ margin: 0 }}>
        <ListItem>
          <div>
            <a href="/test">Add/Drop a Class</a>
            <br />
            <span>A description... I guess?</span>
          </div>
          <Icon icon={faLink} style={{ fontSize: '24px' }} color="fog" />
        </ListItem>
        <ListItem>
          <div>
            <a href="/test">MyDegrees</a>
            <br />
            <span>Another description</span>
          </div>
          <Icon icon={faLink} style={{ fontSize: '24px' }} color="fog" />
        </ListItem>
        <ListItem>
          <div>
            <a href="/test">Course Catalog</a>
            <br />
            <span>Wow this is fun</span>
          </div>
          <Icon icon={faLink} style={{ fontSize: '24px' }} color="fog" />
        </ListItem>
      </List>
    </CardContent>
  </Card>
);

export default ServiceCard;
