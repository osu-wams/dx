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
import Url from 'src/util/externalUrls.data';
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
            <div>Online time and attendance system.</div>
          </CardContentCell>
          <CardContentCell>
            <HighlightExternalLink
              href={Url.evals.main}
              onClick={() => Event('employee-tools', 'Evals link')}
            >
              Evals
            </HighlightExternalLink>
            <div>Electronic performance evaluation system.</div>
          </CardContentCell>
        </CardContentRow>
      </CardContentTable>
    </Card>
  );
};

export { EmployeeTools };
