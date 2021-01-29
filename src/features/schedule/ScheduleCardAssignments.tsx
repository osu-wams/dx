import React from 'react';
import {
  CardSection,
  SectionHeader,
  NoItems,
  NoItemsImage,
  NoItemsText,
} from './ScheduleCardStyles';
import assignment from 'src/assets/assignment.svg';
import { List } from 'src/ui/List';
import { AuthorizeCanvasCompact } from '../canvas/AuthorizeCanvas';
import { CanvasPlannerItems } from 'src/features/canvas/CanvasPlannerItems';
import { Types } from '@osu-wams/lib';
import { userState } from 'src/state';
import { useRecoilValue } from 'recoil';

const ScheduleCardAssignments = ({
  selectedPlannerItems,
  courseList,
}: {
  selectedPlannerItems: Types.PlannerItem[];
  courseList: Types.CourseSchedule[];
}) => {
  const user = useRecoilValue(userState);

  const noAssignmentsDue = () => (
    <NoItems as="li">
      <NoItemsImage src={assignment} alt="" />
      <NoItemsText>No Canvas assignments due</NoItemsText>
    </NoItems>
  );

  return (
    <CardSection>
      <SectionHeader>Assignments</SectionHeader>
      <List>
        {!user.isCanvasOptIn && <AuthorizeCanvasCompact />}
        {user.isCanvasOptIn && selectedPlannerItems.length === 0 && noAssignmentsDue()}
        {user.isCanvasOptIn && selectedPlannerItems.length > 0 && (
          <CanvasPlannerItems data={selectedPlannerItems} courses={courseList} />
        )}
      </List>
    </CardSection>
  );
};

export { ScheduleCardAssignments };
