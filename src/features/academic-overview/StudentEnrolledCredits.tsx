import React from 'react';
import Skeleton from 'react-loading-skeleton';
import {
  Highlight,
  HighlightTitle,
  HighlightEmphasis,
  HighlightDescription
} from '../../ui/Highlights';
import { ICourseSchedule, useCourseSchedule } from '../../api/student/course-schedule';

export const StudentEnrolledCredits: React.FC = () => {
  const enrolledCredits = useCourseSchedule({
    callback: data => {
      if (data.length) {
        return data
          .map((c: ICourseSchedule) => c.attributes.creditHours)
          .reduce((a: number, v: number) => a + v);
      }
    }
  });

  return (
    <Highlight textAlignLeft>
      {enrolledCredits.loading && <Skeleton count={5} />}
      {!enrolledCredits.loading && (
        <>
          <HighlightEmphasis>{enrolledCredits.data}</HighlightEmphasis>
          <HighlightTitle marginTop={0}>Credits</HighlightTitle>
          <HighlightDescription>Enrolled credits for current term.</HighlightDescription>
        </>
      )}
    </Highlight>
  );
};

export default StudentEnrolledCredits;
