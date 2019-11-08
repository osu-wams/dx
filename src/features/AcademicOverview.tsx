import React from 'react';
import { faAnalytics } from '@fortawesome/pro-light-svg-icons';
import {
  Card,
  CardHeader,
  CardContentTable,
  CardContentRow,
  CardContentCell,
  CardFooter,
  CardIcon
} from '../ui/Card';
import { AcademicStanding } from './academic-overview/AcademicStanding';
import { StudentHolds } from './academic-overview/StudentHolds';
import { StudentGpa } from './academic-overview/StudentGpa';
import { StudentEnrolledCredits } from './academic-overview/StudentEnrolledCredits';
import Url from '../util/externalUrls.data';
import { ExternalLink } from '../ui/Link';
import { Event } from '../util/gaTracking';

export const AcademicOverview = () => {
  return (
    <Card collapsing={false}>
      <CardHeader title="Academic Overview" badge={<CardIcon icon={faAnalytics} />} />
      <CardContentTable>
        <CardContentRow className="row-span-1">
          <CardContentCell>
            <StudentGpa />
          </CardContentCell>
          <CardContentCell>
            <StudentEnrolledCredits />
          </CardContentCell>
        </CardContentRow>
        <CardContentRow borderless className="row-span-1">
          <CardContentCell>
            <AcademicStanding />
            <StudentHolds />
          </CardContentCell>
        </CardContentRow>
      </CardContentTable>
      <CardFooter infoButtonId="academic-overview">
        <ExternalLink
          href={Url.myDegrees.main}
          onClick={() => Event('academic-overview', 'See more in MyDegrees link')}
        >
          View more in MyDegrees
        </ExternalLink>
      </CardFooter>
    </Card>
  );
};

export default AcademicOverview;
