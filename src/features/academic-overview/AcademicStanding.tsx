import React from 'react';
import { Loading } from 'src/ui/Loading';
import {
  Highlight,
  HighlightTitle,
  HighlightEmphasisInline,
  HighlightDescription,
} from 'src/ui/Highlights';
import { useAcademicStatus } from '@osu-wams/hooks';
import { Url } from '@osu-wams/utils';
import { SimpleExternalLink } from 'src/ui/Link';
import { Event } from 'src/util/gaTracking';

export const AcademicStanding: React.FC = () => {
  const academicStatus = useAcademicStatus();

  return (
    <Highlight textAlignLeft>
      <HighlightTitle marginTop={0}>Academic Standing</HighlightTitle>
      {academicStatus.loading && <Loading />}
      {!academicStatus.loading && (
        <HighlightDescription>
          {academicStatus.data.academicStanding?.length ?? 0 ? (
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
