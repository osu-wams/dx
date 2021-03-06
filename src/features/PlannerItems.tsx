import React from 'react';
import { Loading } from 'src/ui/Loading';
import { faFileEdit } from '@fortawesome/pro-light-svg-icons';
import { Card, CardHeader, CardContent, CardFooter, CardIcon } from '../ui/Card';
import { List } from '../ui/List';
import { AuthorizeCanvas } from '../features/canvas/AuthorizeCanvas';
import { State } from '@osu-wams/hooks';
import { Url } from '@osu-wams/utils';
import { ExternalLink } from '../ui/Link';
import { Event } from '../util/gaTracking';
import assignment from '../assets/assignment.svg';
import { EmptyState, EmptyStateImage, EmptyStateText } from '../ui/EmptyStates';
import { CanvasPlannerItems } from 'src/features/canvas/CanvasPlannerItems';
import { useRecoilValue } from 'recoil';

const { courseState, userState, plannerItemState } = State;

/**
 * Upcoming Assignments Card
 *
 * Displays upcoming assignments from Canvas.
 */
const PlannerItems = () => {
  const user = useRecoilValue(userState);
  const { data, isLoading } = useRecoilValue(plannerItemState);
  const courses = useRecoilValue(courseState);

  const listOrEmpty = () => {
    if (isLoading) {
      return <Loading lines={5} />;
    }

    if (courses.isSuccess && courses.data && data && data.length && user.isCanvasOptIn === true) {
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
