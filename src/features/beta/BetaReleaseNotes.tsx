import React, { FC } from 'react';
import { faClipboardListCheck } from '@fortawesome/pro-light-svg-icons';
import { Card, CardHeader, CardContent, CardIcon, CardFooter } from '../../ui/Card';
import { themeSettings, styled } from '../../theme';
import { useReleaseNotes } from '../../api/release-notes';

const BetaReleaseNotes: FC = () => {
  const releaseNotes = useReleaseNotes();

  return (
    <Card>
      <CardHeader title="Release Notes" badge={<CardIcon icon={faClipboardListCheck} />} />
      <CardContent>
        <ReleaseTitle>{releaseNotes.data[0]?.title}</ReleaseTitle>
        <ReleaseSubtitle>{releaseNotes.data[0]?.date}</ReleaseSubtitle>
        <div dangerouslySetInnerHTML={{ __html: releaseNotes.data[0]?.content }}></div>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};

const ReleaseTitle = styled.h3`
  color: ${({ theme }) => theme.features.beta.releaseNotes.title.color};
  font-size: ${themeSettings.fontSize['18']};
  font-weight: normal;
  margin: 0px;
`;

const ReleaseSubtitle = styled.h4`
  margin: 0px;
  color: ${({ theme }) => theme.features.beta.releaseNotes.subTitle.color};
  font-size: ${themeSettings.fontSize['14']};
  font-weight: 600;
  line-height: 19px;
`;

export default BetaReleaseNotes;
