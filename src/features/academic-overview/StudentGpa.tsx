import React from 'react';
import Skeleton from 'react-loading-skeleton';
import {
  Highlight,
  HighlightTitle,
  HighlightEmphasis,
  HighlightDescription
} from '../../ui/Highlights';
import { useGpa } from '../../api/student';

export const StudentGpa: React.FC = () => {
  const { data, loading } = useGpa();

  // We expect the first item in the array to be the primary one this is sorted in the server
  const primaryGpa = () => {
    if (data?.length) {
      return data[0];
    } else {
      return { gpa: '', level: '', gpaType: '' };
    }
  };
  return (
    <Highlight textAlignLeft>
      <HighlightEmphasis>{primaryGpa().gpa}</HighlightEmphasis>
      <HighlightTitle marginTop={0}>Institutional GPA</HighlightTitle>
      {loading && <Skeleton count={3} />}
      {!loading && (
        <>
          <HighlightDescription>
            {primaryGpa().gpa !== ''
              ? `${primaryGpa().level} GPA across all past terms.`
              : 'You must first complete a term to have a GPA.'}
          </HighlightDescription>
        </>
      )}
    </Highlight>
  );
};

export default StudentGpa;
