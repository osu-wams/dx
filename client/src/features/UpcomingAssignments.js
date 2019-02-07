import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { faFileEdit } from '@fortawesome/pro-light-svg-icons';
import { Card, CardHeader, CardContent, CardFooter, Badge } from '../ui/Card';
import Icon from '../ui/Icon';
import {
  List,
  ListItem,
  ListItemContent,
  ListItemDescription,
  ListItemHeader,
  ListItemText
} from '../ui/List';
import { getUpcomingAssignments } from '../api/student';
import Button from '../ui/Button';
import { Color } from '../theme';

/**
 * Upcoming Assignments Card
 *
 * Displays upcoming assignments from Canvas.
 */
const UpcomingAssignments = () => {
  const [assignments, setAssignments] = useState([]);

  // Populate assignment data for current user
  useEffect(() => {
    getUpcomingAssignments()
      .then(setAssignments)
      .catch(console.log);
  }, []);

  return (
    <Card>
      <CardHeader title="Canvas To Dos" badge={<Badge>{assignments.length}</Badge>} />
      <CardContent>
        {/* Show upcoming assignments if any exist, otherwise show empty state. */}
        {assignments.length ? (
          <List>
            {assignments.map(({ id, assignment: { name, html_url: url, due_at: dueDate } }) => (
              <ListItem key={id}>
                <ListItemContent as="a" href={url} target="_blank">
                  <Icon icon={faFileEdit} color={Color['orange-200']} />
                  <ListItemText>
                    <ListItemHeader>{name}</ListItemHeader>
                    <ListItemDescription>
                      Due {format(dueDate, 'MMM Do [at] h:mma')}
                    </ListItemDescription>
                  </ListItemText>
                </ListItemContent>
              </ListItem>
            ))}
          </List>
        ) : (
          <EmptyState />
        )}
      </CardContent>
      <CardFooter>
        <Button>See more in Canvas</Button>
      </CardFooter>
    </Card>
  );
};

// Todo: Replace with actual empty state when ready in mockups.
const EmptyState = () => <span>NO ASSIGNMENTS</span>;

export default UpcomingAssignments;
