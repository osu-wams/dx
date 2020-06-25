import React, { FC } from 'react';
import { faFlaskPotion } from '@fortawesome/pro-light-svg-icons';
import { Card, CardHeader, CardContent, CardIcon, CardFooter } from 'src/ui/Card';
import { usePageContent } from '@osu-wams/hooks';
import { RichTextContent, RichTextTitle } from 'src/ui/RichText';

const BetaInfo: FC = () => {
  const pageContent = usePageContent('beta');

  return (
    <Card collapsing={false}>
      <CardHeader title="Dashboard Beta" badge={<CardIcon icon={faFlaskPotion} />} />
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

export default BetaInfo;
