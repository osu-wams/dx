import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Color } from '../../theme';
import { Highlight, HighlightTitle, HighlightEmphasis, HighlightDescription } from '../../ui/Highlights';
import { getGpa } from '../../api/student';
import { GpaLevel } from '../../api/student/gpa';

export const StudentGpa: React.FC = () => {
  const [ overallGpa, setOverallGpa ] = useState({
    gpa: '',
    message: 'You must first complete a term to have an overall GPA.'
  });
  const [ overallGpaLoading, setOverallGpaLoading ] = useState<boolean>(true);

  useEffect(() => {
    getGpa()
      .then((res: GpaLevel) => {
        if (res && res.gpa) {
          setOverallGpa({ gpa: res.gpa, message: 'GPA across all past terms.' });
        }
        setOverallGpaLoading(false);
      })
      .catch(console.error);
  }, []);

  return (
    <Highlight textAlignLeft>
      <HighlightEmphasis color={Color['orange-400']}>{overallGpa.gpa}</HighlightEmphasis>
      <HighlightTitle marginTop={0}>Overall GPA</HighlightTitle>
      {overallGpaLoading && <Skeleton count={3} />}
      {!overallGpaLoading && (
        <>
          <HighlightDescription>{overallGpa.message}</HighlightDescription>
        </>
      )}
    </Highlight>
  );
};

export default StudentGpa;
