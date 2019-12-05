import React from 'react';
import Skeleton from 'react-loading-skeleton';
import {
  Highlight,
  HighlightTitle,
  HighlightEmphasisInline,
  HighlightDescription
} from '../../ui/Highlights';
import { useAcademicStatus } from '../../api/student/academic-status';
import Url from '../../util/externalUrls.data';
import { SimpleExternalLink } from '../../ui/Link';
import { Event } from '../../util/gaTracking';

export const AcademicStanding: React.FC = () => {
  const academicStatus = useAcademicStatus();

  return (
    <Highlight textAlignLeft>
      <HighlightTitle marginTop={0}>Academic Standing</HighlightTitle>
      {academicStatus.loading && <Skeleton />}
      {!academicStatus.loading && (
        <HighlightDescription>
          {academicStatus.data.academicStanding?.length > 0 ? (
            <>
              Your academic standing is{' '}
              <HighlightEmphasisInline>
                {academicStatus.data.academicStanding}
              </HighlightEmphasisInline>
              .<br />
              <SimpleExternalLink
                href={Url.registrar.academicStanding}
                onClick={() =>
                  Event(
                    'academic-overview',
                    'Learn more about academic standings',
                    Url.registrar.academicStanding
                  )
                }
              >
                Learn more about academic standings
              </SimpleExternalLink>
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
