import React, { FC } from 'react';
import styled from 'styled-components';
import { faClipboardListCheck } from '@fortawesome/pro-light-svg-icons';
import { Card, CardHeader, CardContent, CardIcon, CardFooter} from '../../ui/Card';
import { Color, theme } from '../../theme';

/*
  TODO: I'm not sure how to make it so that the cards aren't all the same height.
  Dashboard Beta shouldn't be the same height as Beta Resources.
*/

const BetaReleaseNotes: FC = () => {
  return (
    <Card>
      <CardHeader title="Release Notes" badge={<CardIcon icon={faClipboardListCheck} />} />
      <CardContent>
        <ReleaseTitle>Beta Launch!</ReleaseTitle>
        <ReleaseSubtitle>September 1, 2019</ReleaseSubtitle>
        <ReleaseContent>
          The palatable sensation we lovingly refer to as The Cheeseburger has a distinguished and
          illustrious history.
        </ReleaseContent>
        <ReleaseUnorderedList>
          <li>A great feature.</li>
          <li>Incredible capabilities.</li>
          <li>You&apos;re just gonna love it.</li>
        </ReleaseUnorderedList>
        <ReleaseContent>
          It was born from humble roots, only to rise to well-seasoned greatness...
        </ReleaseContent>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};

const ReleaseTitle = styled.h3`
  color: ${Color['orange-400']};
  font-size: ${theme.fontSize['18']};
  font-weight: normal;
  margin: 0px;
`;

const ReleaseSubtitle = styled.p`
  margin: 0px;
  color: ${Color['neutral-550']};
  font-size: ${theme.fontSize['14']};
  font-weight: 600;
  line-height: 19px;
`;

const ReleaseContent = styled.p`
  font-size: ${theme.fontSize['16']};
  margin: ${theme.spacing.unit}px 0 0 0;
`;

const ReleaseUnorderedList = styled.ul`
  margin: ${theme.spacing.unit}px 0 0 0;
`;

export default BetaReleaseNotes;
