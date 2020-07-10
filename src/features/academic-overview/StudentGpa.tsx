import React, { useState, useEffect, useContext } from 'react';
import Skeleton from 'react-loading-skeleton';
import {
  Highlight,
  HighlightTitle,
  HighlightEmphasis,
  HighlightDescription,
} from 'src/ui/Highlights';
import { Types } from '@osu-wams/lib';
import { useGpa } from '@osu-wams/hooks';
import { StudentGpaMenu } from './StudentGpaMenu';
import { AppContext } from 'src/contexts/app-context';

export const StudentGpa: React.FC = () => {
  const { user } = useContext(AppContext);
  const [selectedGpa, setSelectedGpa] = useState<Types.GpaLevel>();
  const [filteredGpaLevels, setFilteredGpaLevels] = useState<Types.GpaLevel[]>([]);
  const { data, isLoading } = useGpa();

  useEffect(() => {
    if (data && data.length > 0 && user.data) {
      const {
        classification: { attributes: attributes },
      } = user.data;
      if (attributes?.levelCode) {
        setSelectedGpa(data.find((gpaLevel) => gpaLevel.levelCode === attributes.levelCode));
      } else {
        // User has no classification levelCode, so the default selected is by the priority having
        // been set and returned by the server.
        setSelectedGpa(data[0]);
      }
      setFilteredGpaLevels(
        // TODO: Follow up with stakeholders regarding any level of gpa filtering
        // data.filter((gpaLevel) => gpaLevel.gpaType === 'Institution' && gpaLevel.gpa > 0)
        data
      );
    }
  }, [data, user.data]);

  return (
    <Highlight textAlignLeft>
      <HighlightEmphasis>{selectedGpa?.gpa}</HighlightEmphasis>
      {selectedGpa ? (
        <StudentGpaMenu
          selectedGpa={selectedGpa}
          gpaLevels={filteredGpaLevels}
          setSelectedGpa={setSelectedGpa}
        />
      ) : (
        <HighlightTitle>Institutional GPA</HighlightTitle>
      )}
      {isLoading && <Skeleton count={3} />}
      {!isLoading && (
        <>
          <HighlightDescription>
            {selectedGpa !== undefined
              ? `${selectedGpa.level} GPA across all past terms.` // TODO: Follow up with stakeholders on terminology for description
              : 'You must first complete a term to have a GPA.'}
          </HighlightDescription>
        </>
      )}
    </Highlight>
  );
};

export default StudentGpa;
