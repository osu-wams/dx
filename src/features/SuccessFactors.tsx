import React from 'react';
import { faChartLineUp } from '@fortawesome/pro-light-svg-icons';
import { Card, CardHeader, CardContent, CardFooter, CardIcon, CardContentTable, CardContentRow, CardContentCell } from '../ui/Card';
import { State, User } from '@osu-wams/hooks';
import { useRecoilValue } from 'recoil';
import { ExternalLink, HighlightExternalLink } from 'src/ui/Link';
import { Url } from '@osu-wams/utils';

export const SuccessFactors = () => {
  const user = useRecoilValue(State.userState);
  const group = User.GROUPS.successFactors;

  return user?.data?.groups?.includes(group) ? (
    <Card>
      <CardHeader title="Performance Management Pilot" badge={<CardIcon icon={faChartLineUp} />} />
      <CardContentTable>
        <CardContentRow className="row-span-1">
          <CardContentCell>
            <HighlightExternalLink href={Url.successFactors.main}>
              About
            </HighlightExternalLink>
            <div>Information about the performance management pilot</div>
          </CardContentCell>
          <CardContentCell>
            <HighlightExternalLink href={Url.successFactors.login}>
              Login
            </HighlightExternalLink>
            <div>Login to SuccessFactors</div>
          </CardContentCell>
        </CardContentRow>
      </CardContentTable>
    </Card>
  ) : null;
}
