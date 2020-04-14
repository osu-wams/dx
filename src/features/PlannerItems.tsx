import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components/macro';
import Skeleton from 'react-loading-skeleton';
import { faFileEdit } from '@fortawesome/pro-light-svg-icons';
import { Card, CardHeader, CardContent, CardFooter, CardIcon } from '../ui/Card';
import Icon from '../ui/Icon';
import {
  List,
  ListItem,
  ListItemContentLink,
  ListItemContent,
  ListItemDescription,
  ListItemHeader,
  ListItemText,
} from '../ui/List';
import { useCourseSchedule, usePlannerItems } from '@osu-wams/hooks';
import { AuthorizeCanvas } from '../features/canvas/AuthorizeCanvas';
import Url from '../util/externalUrls.data';
import { ExternalLink } from '../ui/Link';
import { Event } from '../util/gaTracking';
import assignment from '../assets/assignment.svg';
import { courseCodeOrIcon } from './Courses';
import { format } from '../util/helpers';
import { EmptyState, EmptyStateImage, EmptyStateText } from '../ui/EmptyStates';
import { AppContext } from 'src/contexts/app-context';

/**
 * Some Canvas link include the full path including https://instructure...
 *
 * Check to see if that data is included, and if so don't prepend it.
 * If that's not there we add that ourselves. (Most links don't have it)
 *
 */
const canvasUrl = (url) => {
  if (!url) {
    return Url.canvas.main;
  }
  if (url.startsWith(Url.canvas.main) || url.startsWith(Url.canvas.test)) {
    return url;
  } else {
    return Url.canvas.main + url;
  }
};

/**
 * Upcoming Assignments Card
 *
 * Displays upcoming assignments from Canvas.
 */
const PlannerItems = () => {
  const themeContext = useContext(ThemeContext);
  const { user } = useContext(AppContext);
  const { data, loading } = usePlannerItems(() => {
    user.setUser({ ...user, data: { ...user.data, isCanvasOptIn: false } });
  });
  const courses = useCourseSchedule();

  const listOrEmpty = () => {
    if (loading) {
      return <Skeleton count={5} />;
    }

    if (!courses.loading && data.length && user.isCanvasOptIn === true) {
      return (
        <List>
          {data.map(
            ({ context_name, plannable_id, plannable_date, html_url, plannable: { title } }) => (
              <ListItem key={plannable_id}>
                {/* Some canvas items have no url assigned to them */}
                {html_url ? (
                  <ListItemContentLink
                    href={canvasUrl(html_url)}
                    target="_blank"
                    onClick={() =>
                      Event('planner-items', 'Canvas planner item click', canvasUrl(html_url))
                    }
                  >
                    {courseCodeOrIcon(
                      context_name,
                      courses.data,
                      <Icon
                        icon={faFileEdit}
                        color={themeContext.features.academics.courses.plannerItems.list.icon.color}
                      />
                    )}
                    <ListItemText>
                      <ListItemHeader>{title}</ListItemHeader>
                      <ListItemDescription>
                        {plannable_date && plannable_date !== '' && format(plannable_date, 'dueAt')}
                      </ListItemDescription>
                    </ListItemText>
                  </ListItemContentLink>
                ) : (
                  <ListItemContent>
                    {courseCodeOrIcon(
                      context_name,
                      courses.data,
                      <Icon
                        icon={faFileEdit}
                        color={themeContext.features.academics.courses.plannerItems.list.icon.color}
                      />
                    )}
                    <ListItemText>
                      <ListItemHeader>{title}</ListItemHeader>
                      <ListItemDescription>
                        {plannable_date && plannable_date !== '' && format(plannable_date, 'dueAt')}
                      </ListItemDescription>
                    </ListItemText>
                  </ListItemContent>
                )}
              </ListItem>
            )
          )}
        </List>
      );
    } else if (user.isCanvasOptIn === true) {
      return (
        <EmptyState>
          <EmptyStateImage src={assignment} alt="" />
          <EmptyStateText>You have no upcoming Canvas assignments</EmptyStateText>
        </EmptyState>
      );
    }
  };

  return (
    <Card>
      <CardHeader
        title="Canvas"
        badge={<CardIcon icon={faFileEdit} count={user.isCanvasOptIn ? data.length : undefined} />}
      />
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
            View more in Canvas
          </ExternalLink>
        )}
      </CardFooter>
    </Card>
  );
};

export default PlannerItems;
