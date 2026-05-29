import React from 'react';
import { faAnalytics } from '@fortawesome/pro-light-svg-icons';
import {
  Card,
  CardHeader,
  CardContentCell,
  CardIcon,
} from 'src/ui/Card';
import { HighlightExternalLink } from 'src/ui/Link';

const Workday = () => {
  return (
    <Card collapsing={false}>
      <CardHeader title="Employee Tools" badge={<CardIcon icon={faAnalytics} />} />
          <CardContentCell>
            <HighlightExternalLink
              href='https://technology.oregonstate.edu/services/workday'
            >
              Workday
            </HighlightExternalLink>
            <div>Workday is Oregon State University&apos;s cloud-based Enterprise Resource Planning (ERP) system, which replaces Banner for Finance and HR.</div>
          </CardContentCell>
    </Card>
  );
};

export { Workday };
