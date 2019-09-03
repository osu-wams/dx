import React from 'react';
import { faAnalytics, faInfoCircle } from '@fortawesome/pro-light-svg-icons';
import {
  Card,
  CardHeader,
  CardContentTable,
  CardContentRow,
  CardContentCell,
  CardFooter,
  CardIcon
} from '../ui/Card';
import Icon from '../ui/Icon';
import { AcademicStanding } from './academic-overview/AcademicStanding';
import { StudentHolds } from './academic-overview/StudentHolds';
import { StudentGpa } from './academic-overview/StudentGpa';
import { StudentEnrolledCredits } from './academic-overview/StudentEnrolledCredits';
import { Color } from '../theme';
import Url from '../util/externalUrls.data';
import { ExternalLink } from '../ui/Link';

export const AcademicOverview = () => {
  return (
    <Card>
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
      <CardFooter>
        <Icon icon={faInfoCircle} />
        <ExternalLink href={Url.myDegrees.main} fg={Color['orange-400']}>
          See more in MyDegrees
        </ExternalLink>
      </CardFooter>
    </Card>
  );
};

export default AcademicOverview;
