import React, { useEffect, useState } from 'react';
import { Loading } from 'src/ui/Loading';
import {
  Highlight,
  HighlightTitle,
  HighlightEmphasis,
  HighlightDescription,
} from 'src/ui/Highlights';
import { Types } from '@osu-wams/lib';
import { useRecoilValue } from 'recoil';
import { courseState } from 'src/state';

export const StudentEnrolledCredits: React.FC = () => {
  const [enrolledCredits, setEnrolledCredits] = useState(0);
  const courses = useRecoilValue(courseState);

  useEffect(() => {
    if (courses.data) {
      setEnrolledCredits(
        courses.data
          .map((c: Types.CourseSchedule) => c.attributes.creditHours)
          .reduce((a: number, v: number) => a + v, 0)
      );
    }
  }, [courses.data]);

  return (
    <Highlight textAlignLeft>
      {courses.isLoading && <Loading lines={5} />}
      {courses.isSuccess && (
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
