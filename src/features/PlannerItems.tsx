import React, { useContext } from 'react';
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
  ListItemText
} from '../ui/List';
import { usePlannerItems } from '../api/student/planner-items';
import { useCourseSchedule } from '../api/student';
import { AuthorizeCanvas } from '../features/canvas/AuthorizeCanvas';
import { themeSettings } from '../theme';
import Url from '../util/externalUrls.data';
import { ExternalLink } from '../ui/Link';
import { UserContext } from '../App';
import { Event } from '../util/gaTracking';
import assignment from '../assets/assignment.svg';
import { courseCodeOrIcon } from './Courses';
import { styled, ThemeContext } from '../theme';
import { format } from '../util/helpers';

const NoItems = styled.div`
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  align-items: center;
  padding: ${themeSettings.spacing.unit * 4}px ${themeSettings.spacing.unit * 8}px 0px
    ${themeSettings.spacing.unit * 8}px;
`;

const NoItemsImage = styled.img`
  height: 60px;
`;

const NoItemsText = styled.p`
  color: ${({ theme }) => theme.features.academics.courses.plannerItems.emptyText.color};
  text-align: center;
`;

/**
 * Some Canvas link include the full path including https://instructure...
 *
 * Check to see if that data is included, and if so don't prepend it.
 * If that's not there we add that ourselves. (Most links don't have it)
 *
 */

const canvasUrl = url => {
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
  const user = useContext<any>(UserContext);
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
        <NoItems>
          <NoItemsImage src={assignment} alt="" />
          <NoItemsText>You have no upcoming Canvas assignments</NoItemsText>
        </NoItems>
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
