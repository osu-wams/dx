import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import {
  Highlight,
  HighlightTitle,
  HighlightEmphasisInline,
  HighlightDescription
} from '../../ui/Highlights';
import { getAcademicStatus, AcademicStatus } from '../../api/student/academic-status';

export const AcademicStanding: React.FC = () => {
  const [academicStanding, setAcademicStanding] = useState('');
  const [academicStandingLoading, setAcademicStandingLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    getAcademicStatus()
      .then((res: AcademicStatus) => {
        if (isMounted) {
          if (res.academicStanding) {
            setAcademicStanding(res.academicStanding);
          }
          setAcademicStandingLoading(false);
        }
      })
      .catch(console.error);

    return () => {
      // prevents setting data on a component that has been unmounted before promise resolves
      isMounted = false;
    };
  }, []);

  return (
    <Highlight textAlignLeft>
      <HighlightTitle marginTop={0}>Academic Standing</HighlightTitle>
      {academicStandingLoading && <Skeleton />}
      {!academicStandingLoading && (
        <HighlightDescription>
          {academicStanding.length > 0 ? (
            <>
              You are in <HighlightEmphasisInline>{academicStanding}</HighlightEmphasisInline>.
            </>
          ) : (
            <>You have no current academic standing.</>
          )}
        </HighlightDescription>
      )}
    </Highlight>
  );
};

export default AcademicStanding;
