import React, { useState, useEffect } from 'react';
import {
  Highlight,
  HighlightTitle,
  HighlightEmphasisInline,
  HighlightDescription
} from '../../ui/Highlights';
import { getAcademicStatus, AcademicStatus } from '../../api/student/academic-status';

export const AcademicStanding: React.FC = () => {
  const [academicStanding, setAcademicStanding] = useState('');

  useEffect(() => {
    getAcademicStatus()
      .then((res: AcademicStatus) => {
        if (res.academicStanding) {
          setAcademicStanding(res.academicStanding);
        }
      })
      .catch(console.error);
  }, []);

  return (
    <Highlight textAlignLeft>
      <HighlightTitle marginTop={0}>Academic Standing</HighlightTitle>
      <HighlightDescription>
        {academicStanding && academicStanding ? (
          <>
            You are in <HighlightEmphasisInline>{academicStanding}</HighlightEmphasisInline>.
          </>
        ) : (
          <>You have no current academic standing.</>
        )}
      </HighlightDescription>
    </Highlight>
  );
};

export default AcademicStanding;
