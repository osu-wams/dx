import React, { FC } from 'react';
import { faClipboardListCheck } from '@fortawesome/pro-light-svg-icons';
import styled from 'styled-components/macro';
import { Card, CardHeader, CardContent, CardIcon, CardFooter } from 'src/ui/Card';
import { fontSize } from 'src/theme';
import { useReleaseNotes } from '@osu-wams/hooks';

const BetaReleaseNotes: FC = () => {
  const releaseNotes = useReleaseNotes();

  return (
    <>
      {releaseNotes.data.length &&
        releaseNotes.data.map((releaseNote, i) => (
          <Card key={`release-notes-${i}`}>
            <CardHeader
              title={`Release : ${releaseNote?.date}`}
              badge={<CardIcon icon={faClipboardListCheck} />}
            />
            <CardContent>
              <ReleaseTitle>{releaseNote?.title}</ReleaseTitle>
              <div dangerouslySetInnerHTML={{ __html: releaseNote?.content }}></div>
            </CardContent>
            <CardFooter></CardFooter>
          </Card>
        ))}
    </>
  );
};

const ReleaseTitle = styled.h3`
  color: ${({ theme }) => theme.features.beta.releaseNotes.title.color};
  font-size: ${fontSize['18']};
  font-weight: normal;
  margin: 0px;
`;

export default BetaReleaseNotes;
