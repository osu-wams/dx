import React from 'react';
import Skeleton from 'react-loading-skeleton';
import { Color } from '../../theme';
import {
  Highlight,
  HighlightTitle,
  HighlightEmphasis,
  HighlightDescription
} from '../../ui/Highlights';
import { useGpa } from '../../api/student';

export const StudentGpa: React.FC = () => {
  const { data, loading } = useGpa();

  return (
    <Highlight textAlignLeft>
      <HighlightEmphasis color={Color['orange-400']}>{data.gpa}</HighlightEmphasis>
      <HighlightTitle marginTop={0}>GPA</HighlightTitle>
      {loading && <Skeleton count={3} />}
      {!loading && (
        <>
          <HighlightDescription>
            {data.gpa !== ''
              ? 'GPA across all past terms.'
              : 'You must first complete a term to have a GPA.'}
          </HighlightDescription>
        </>
      )}
    </Highlight>
  );
};

export default StudentGpa;
