import React, { useEffect, useState } from 'react';
import { Loading } from 'src/ui/Loading';
import {
  Highlight,
  HighlightTitle,
  HighlightEmphasis,
  HighlightDescription,
} from 'src/ui/Highlights';
import { useCourseSchedule } from '@osu-wams/hooks';
import { Types } from '@osu-wams/lib';

export const StudentEnrolledCredits: React.FC = () => {
  const [enrolledCredits, setEnrolledCredits] = useState(0);
  const courseSchedule = useCourseSchedule();

  useEffect(() => {
    if (courseSchedule.data) {
      setEnrolledCredits(
        courseSchedule.data
          .map((c: Types.CourseSchedule) => c.attributes.creditHours)
          .reduce((a: number, v: number) => a + v, 0)
      );
    }
  }, [courseSchedule.data]);

  return (
    <Highlight textAlignLeft>
      {courseSchedule.isLoading && <Loading lines={5} />}
      {courseSchedule.isSuccess && (
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
