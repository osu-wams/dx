import React, { useContext } from 'react';
import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';
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
import { usePlannerItems } from '../api/student/planner-items';
import { AuthorizeCanvas } from '../features/canvas/AuthorizeCanvas';
import { theme, Color } from '../theme';
import Url from '../util/externalUrls.data';
import { ExternalLink } from '../ui/Link';
import { UserContext } from '../App';
import { Event } from '../util/gaTracking';
import assignment from '../assets/assignment.svg';

const NoItems = styled.div`
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  align-items: center;
  padding: ${theme.spacing.unit * 4}px ${theme.spacing.unit * 8}px 0px ${theme.spacing.unit * 8}px;
`;

const NoItemsImage = styled.img`
  height: 60px;
`;

const NoItemsText = styled.p`
  color: ${Color['neutral-550']};
  text-align: center;
`;

/**
 * Upcoming Assignments Card
 *
 * Displays upcoming assignments from Canvas.
 */
const PlannerItems = () => {
  const user = useContext<any>(UserContext);
  const { data, loading } = usePlannerItems(() => {
    user.setUser({ ...user, data: { isCanvasOptIn: false } });
  });

  const listOrEmpty = () => {
    if (loading) {
      return <Skeleton count={5} />;
    }

    if (data.length && user.isCanvasOptIn === true) {
      return (
        <List>
          {data.map(({ plannable_id, plannable_type, html_url, plannable: { title, due_at } }) => (
            <ListItem key={plannable_id}>
              <ListItemContentLink
                href={Url.canvas.main + html_url}
                target="_blank"
                onClick={() =>
                  Event('planner-items', 'Canvas planner item click', Url.canvas.main + html_url)
                }
              >
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
          ))}
        </List>
      );
    } else if (user.isCanvasOptIn === true) {
      return (
        <NoItems>
          <NoItemsImage src={assignment} alt="" />
          <NoItemsText>You have no upcoming Canvas assignments</NoItemsText>
        </NoItems>
      );
    }
  };

  return (
    <Card>
      <CardHeader title="Canvas" badge={<CardIcon icon={faFileEdit} count={data.length} />} />
      <CardContent>
        {/* If not authorized to canvas, we display the link to have them authorize */}
        {!user.isCanvasOptIn && user.isCanvasOptIn !== undefined && <AuthorizeCanvas />}
        {listOrEmpty()}
      </CardContent>
      <CardFooter infoButtonId="canvas">
        {user.isCanvasOptIn === true && (
          <ExternalLink
            href={Url.canvas.main}
            onClick={() => Event('planner-items', 'View all link clicked')}
          >
            View all in Canvas
          </ExternalLink>
        )}
      </CardFooter>
    </Card>
  );
};

export default PlannerItems;
