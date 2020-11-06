import React, { FC } from 'react';
import { Card, CardContent, CardFooter } from 'src/ui/Card';
import { usePageContent } from '@osu-wams/hooks';
import { RichTextContent, RichTextTitle } from 'src/ui/RichText';
import { Loading } from 'src/ui/Loading';

const Info: FC = () => {
  const { isSuccess, isLoading, data } = usePageContent('about');

  return (
    <Card collapsing={false}>
      {isLoading && <Loading lines={4} />}
      {isSuccess && data && (
        <CardContent>
          <RichTextTitle>{data[0]?.title}</RichTextTitle>
          <RichTextContent dangerouslySetInnerHTML={{ __html: data[0]?.content }}></RichTextContent>
        </CardContent>
      )}
      <CardFooter></CardFooter>
    </Card>
  );
};

export default Info;
