import React, { FC } from 'react';
import { faClipboardListCheck } from '@fortawesome/pro-light-svg-icons';
import { Card, CardHeader, CardContent, CardIcon, CardFooter } from '../../ui/Card';
import { themeSettings, styled } from '../../theme';

const BetaReleaseNotes: FC = () => {
  return (
    <Card>
      <CardHeader title="Release Notes" badge={<CardIcon icon={faClipboardListCheck} />} />
      <CardContent>
        <ReleaseTitle>Beta Launch!</ReleaseTitle>
        <ReleaseSubtitle>Fall 2019</ReleaseSubtitle>
        <p>Check back here for spicy release notes as we update the dashboard!</p>
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

const ReleaseSubtitle = styled.p`
  margin: 0px;
  color: ${({ theme }) => theme.features.beta.releaseNotes.subTitle.color};
  font-size: ${themeSettings.fontSize['14']};
  font-weight: 600;
  line-height: 19px;
`;

export default BetaReleaseNotes;
