import React from 'react';
import { faAnalytics } from '@fortawesome/pro-light-svg-icons';
import {
  Card,
  CardHeader,
  CardContentTable,
  CardContentRow,
  CardContentCell,
  CardIcon,
} from 'src/ui/Card';
import { Url } from '@osu-wams/utils';
import { HighlightExternalLink } from 'src/ui/Link';
import { Event } from 'src/util/gaTracking';

const EmployeeTools = () => {
  return (
    <Card collapsing={false}>
      <CardHeader title="Employee Tools" badge={<CardIcon icon={faAnalytics} />} />
      <CardContentTable>
        <CardContentRow className="row-span-1">
          <CardContentCell>
            <HighlightExternalLink
              href={Url.empcenter.main}
              onClick={() => Event('employee-tools', 'Empcenter link')}
            >
              Empcenter
            </HighlightExternalLink>
            <div>Time sheets and time off</div>
          </CardContentCell>
          <CardContentCell>
            <HighlightExternalLink
              href={Url.evals.main}
              onClick={() => Event('employee-tools', 'Evals link')}
            >
              Evals
            </HighlightExternalLink>
            <div>Electronic performance evaluation system (requires VPN)</div>
          </CardContentCell>
        </CardContentRow>
      </CardContentTable>
    </Card>
  );
};

export { EmployeeTools };
