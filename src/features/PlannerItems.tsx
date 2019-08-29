import React, { useState, useEffect, useContext } from 'react';
import { format } from 'date-fns';
import { faFileEdit } from '@fortawesome/pro-light-svg-icons';
import { Card, CardHeader, CardContent, CardFooter, CardIcon } from '../ui/Card';
import Icon from '../ui/Icon';
import {
  List,
  ListItem,
  ListItemContentLink,
  ListItemDescription,
  ListItemHeader,
  ListItemText
} from '../ui/List';
import { getPlannerItems } from '../api/student/planner-items';
import { AuthorizeCanvas } from '../features/canvas/AuthorizeCanvas';
import { Color } from '../theme';
import Url from '../util/externalUrls.data';
import { ExternalLink } from '../ui/Link';
import { UserContext } from '../App';

/**
 * Upcoming Assignments Card
 *
 * Displays upcoming assignments from Canvas.
 */
const PlannerItems = () => {
  const [plannerItems, setPlannerItems] = useState([]);
  const user = useContext<any>(UserContext);

  // Populate assignment data for current user
  useEffect(() => {
    getPlannerItems()
      .then(setPlannerItems)
      .catch(console.log);
  }, []);

  return (
    <Card>
      <CardHeader
        title="Canvas"
        badge={<CardIcon icon={faFileEdit} count={plannerItems.length} />}
      />
      <CardContent>
        {/* Show upcoming assignments if any exist, otherwise show empty state. */}
        {!user.isCanvasOptIn && user.isCanvasOptIn !== undefined && <AuthorizeCanvas />}

        {plannerItems.length && user.isCanvasOptIn === true ? (
          <List>
            {plannerItems.map(
              ({ plannable_id, plannable_type, html_url, plannable: { title, due_at } }) => (
                <ListItem key={plannable_id}>
                  <ListItemContentLink href={Url.canvas.main + html_url} target="_blank">
                    <Icon icon={faFileEdit} color={Color['orange-200']} />
                    <ListItemText>
                      <ListItemHeader>{title}</ListItemHeader>
                      <ListItemDescription>
                        {plannable_type !== ('calendar_event' || 'announcement')
                          ? `Due ${format(due_at, 'MMM Do [at] h:mma')}`
                          : ''}
                      </ListItemDescription>
                    </ListItemText>
                  </ListItemContentLink>
                </ListItem>
              )
            )}
          </List>
        ) : (
          user.isCanvasOptIn === true && <EmptyState />
        )}
      </CardContent>
      <CardFooter infoButtonId="CHANGE-ME">
        {user.isCanvasOptIn === true && (
          <ExternalLink href={Url.canvas.main}>View all in Canvas</ExternalLink>
        )}
      </CardFooter>
    </Card>
  );
};

// <ListItemContent as="a" href={url} target="_blank">

// Todo: Replace with actual empty state when ready in mockups.
const EmptyState = () => <span>NO ASSIGNMENTS </span>;

export default PlannerItems;
