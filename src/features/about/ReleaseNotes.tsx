import React, { FC } from 'react';
import { faClipboardListCheck } from '@fortawesome/pro-light-svg-icons';
import { Card, CardHeader, CardContent, CardIcon, CardFooter } from 'src/ui/Card';
import { useReleaseNotes } from '@osu-wams/hooks';
import { RichTextContent, RichTextTitle } from 'src/ui/RichText';
import { Loading } from 'src/ui/Loading';

const ReleaseNotes: FC = () => {
  const { data, isLoading, isSuccess } = useReleaseNotes();

  return (
    <>
      {isLoading && <Loading lines={5} />}

      {isSuccess &&
        data &&
        data.length &&
        data.slice(0, 3).map((releaseNote, i) => (
          <Card key={`release-notes-${i}`}>
            <CardHeader
              title={`Release : ${releaseNote?.date}`}
              badge={<CardIcon icon={faClipboardListCheck} />}
            />
            <CardContent>
              <RichTextTitle>{releaseNote?.title}</RichTextTitle>
              <RichTextContent
                dangerouslySetInnerHTML={{ __html: releaseNote?.content }}
              ></RichTextContent>
            </CardContent>
            <CardFooter></CardFooter>
          </Card>
        ))}
    </>
  );
};

export default ReleaseNotes;
