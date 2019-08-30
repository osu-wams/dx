import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Color } from '../../theme';
import {
  Highlight,
  HighlightTitle,
  HighlightEmphasis,
  HighlightDescription
} from '../../ui/Highlights';
import { getAcademicStatus, AcademicStatus } from '../../api/student/academic-status';

export const StudentEnrolledCredits: React.FC = () => {
  const [enrolledCredits, setEnrolledCredits] = useState<number>(0);
  const [enrolledCreditsLoading, setEnrolledCreditsLoading] = useState<boolean>(true);

  useEffect(() => {
    getAcademicStatus()
      .then((res: AcademicStatus) => {
        if (res.creditHoursAttempted) {
          setEnrolledCredits(res.creditHoursAttempted);
        }
        setEnrolledCreditsLoading(false);
      })
      .catch(console.error);
  }, []);

  return (
    <Highlight textAlignLeft>
      {enrolledCreditsLoading && <Skeleton count={5} />}
      {!enrolledCreditsLoading && (
        <>
          <HighlightEmphasis color={Color['orange-400']}>{enrolledCredits}</HighlightEmphasis>
          <HighlightTitle marginTop={0}>Credits</HighlightTitle>
          <HighlightDescription>Enrolled credits for current term.</HighlightDescription>
        </>
      )}
    </Highlight>
  );
};

export default StudentEnrolledCredits;
