import React, { FC } from 'react';
import { Card, CardContent, CardFooter } from 'src/ui/Card';
import { usePageContent } from '@osu-wams/hooks';
import { RichTextContent, RichTextTitle } from 'src/ui/RichText';

const Info: FC = () => {
  const pageContent = usePageContent('about');

  return (
    <Card collapsing={false}>
      <CardContent>
        <RichTextTitle>{pageContent.data[0]?.title}</RichTextTitle>
        <RichTextContent
          dangerouslySetInnerHTML={{ __html: pageContent.data[0]?.content }}
        ></RichTextContent>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};

export default Info;
