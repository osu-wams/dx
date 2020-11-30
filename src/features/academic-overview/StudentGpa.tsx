import React, { useEffect, useState } from 'react';
import { Loading } from 'src/ui/Loading';
import {
  Highlight,
  HighlightTitle,
  HighlightEmphasis,
  HighlightDescription,
} from 'src/ui/Highlights';
import { useGpa } from '@osu-wams/hooks';
import { Types } from '@osu-wams/lib';
import { useRecoilValue } from 'recoil';
import { userState } from 'src/state';

export const StudentGpa: React.FC = () => {
  const user = useRecoilValue(userState);
  const { data, isLoading, isSuccess } = useGpa();
  const [selectedGpa, setSelectedGpa] = useState<Types.GpaLevel>({
    gpa: '',
    level: '',
    levelCode: '',
    gpaType: '',
  });

  useEffect(() => {
    if (data && data.length > 0 && user.data) {
      const levelCode = user.data.classification.attributes?.levelCode;
      // We expect the first item in the array to be the primary one this is sorted in the server
      setSelectedGpa(data.find((g) => g.levelCode === levelCode) ?? data[0]);
    }
  }, [data, user.data]);

  return (
    <Highlight textAlignLeft>
      <HighlightEmphasis>{selectedGpa.gpa}</HighlightEmphasis>
      <HighlightTitle marginTop={0}>Institutional GPA</HighlightTitle>
      {isLoading && <Loading lines={3} />}
      {isSuccess && (
        <>
          <HighlightDescription>
            {selectedGpa.gpa !== ''
              ? `${selectedGpa.level} GPA across all past terms.`
              : 'You must first complete a term to have a GPA.'}
          </HighlightDescription>
        </>
      )}
    </Highlight>
  );
};

export default StudentGpa;
