import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import {
  Highlight,
  HighlightTitle,
  HighlightEmphasis,
  HighlightDescription,
} from 'src/ui/Highlights';
import { useCourseSchedule } from '@osu-wams/hooks';
import { CourseSchedule } from '@osu-wams/hooks/dist/api/student/courseSchedule';

export const StudentEnrolledCredits: React.FC = () => {
  const [enrolledCredits, setEnrolledCredits] = useState(0);
  const courseSchedule = useCourseSchedule();

  useEffect(() => {
    setEnrolledCredits(
      courseSchedule.data
        .map((c: CourseSchedule) => c.attributes.creditHours)
        .reduce((a: number, v: number) => a + v, 0)
    );
  }, [courseSchedule.data]);

  return (
    <Highlight textAlignLeft>
      {courseSchedule.loading && <Skeleton count={5} />}
      {!courseSchedule.loading && (
        <>
          <HighlightEmphasis>{enrolledCredits}</HighlightEmphasis>
          <HighlightTitle marginTop={0}>Credits</HighlightTitle>
          <HighlightDescription>Enrolled credits for current term.</HighlightDescription>
        </>
      )}
    </Highlight>
  );
};

export default StudentEnrolledCredits;
