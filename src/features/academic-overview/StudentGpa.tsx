import React from 'react';
import Skeleton from 'react-loading-skeleton';
import {
  Highlight,
  HighlightTitle,
  HighlightEmphasis,
  HighlightDescription,
} from 'src/ui/Highlights';
import { useGpa } from '@osu-wams/hooks';

export const StudentGpa: React.FC = () => {
  const { data, isLoading, isSuccess } = useGpa();

  // We expect the first item in the array to be the primary one this is sorted in the server
  const primaryGpa = () => {
    if (data?.length) {
      return data[0];
    } else {
      return { gpa: '', level: '', levelCode: '', gpaType: '' };
    }
  };
  return (
    <Highlight textAlignLeft>
      <HighlightEmphasis>{primaryGpa().gpa}</HighlightEmphasis>
      <HighlightTitle marginTop={0}>Institutional GPA</HighlightTitle>
      {isLoading && <Skeleton count={3} />}
      {isSuccess && (
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
