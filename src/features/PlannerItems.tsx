import React from 'react';
import Skeleton from 'react-loading-skeleton';
import { faFileEdit } from '@fortawesome/pro-light-svg-icons';
import { Card, CardHeader, CardContent, CardFooter, CardIcon } from '../ui/Card';
import { List } from '../ui/List';
import { useCourseSchedule, usePlannerItems } from '@osu-wams/hooks';
import { AuthorizeCanvas } from '../features/canvas/AuthorizeCanvas';
import Url from '../util/externalUrls.data';
import { ExternalLink } from '../ui/Link';
import { Event } from '../util/gaTracking';
import assignment from '../assets/assignment.svg';
import { EmptyState, EmptyStateImage, EmptyStateText } from '../ui/EmptyStates';
import { CanvasPlannerItems } from 'src/features/canvas/CanvasPlannerItems';
import { userState } from 'src/state/application';
import { useRecoilState } from 'recoil';

/**
 * Upcoming Assignments Card
 *
 * Displays upcoming assignments from Canvas.
 */
const PlannerItems = () => {
  const [user, setUser] = useRecoilState(userState);
  const { data, isLoading } = usePlannerItems({
    enabled: user.isCanvasOptIn,
    retry: false,
    // If the user had previously approved Canvas, but planner-items fails on the server side due to invalid oauth,
    // a 403 is returned to the frontend, the user isCanvasOptIn should be changed to false and the hook disabled, causing the
    // component to render the "Authorize Canvas" button giving the user the ability to opt-in again.
    // @ts-error never read
    onError: (err) => {
      const {
        response: { status },
      } = err as any;
      if (status === 403 && user.isCanvasOptIn) {
        setUser((prevUser) => ({
          ...prevUser,
          isCanvasOptIn: false,
          data: { ...prevUser.data, isCanvasOptIn: false },
        }));
      }
    },
  });
  const courses = useCourseSchedule();

  const listOrEmpty = () => {
    if (isLoading) {
      return <Skeleton count={5} />;
    }

    if (!courses.loading && data && data.length && user.isCanvasOptIn === true) {
      return (
        <List>
          <CanvasPlannerItems data={data} courses={courses.data} />
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
        badge={<CardIcon icon={faFileEdit} count={user.isCanvasOptIn ? data?.length : undefined} />}
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
