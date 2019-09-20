import React from 'react';
import { faAnalytics, faDollarSign, faUsdSquare } from '@fortawesome/pro-light-svg-icons';
import {
  Card,
  CardHeader,
  CardContentTable,
  CardContentRow,
  CardContentCell,
  CardFooter,
  CardIcon
} from '../../ui/Card';
import { AcademicStanding } from '../academic-overview/AcademicStanding';
import { StudentHolds } from '../academic-overview/StudentHolds';
import { StudentGpa } from '../academic-overview/StudentGpa';
import { StudentEnrolledCredits } from '../academic-overview/StudentEnrolledCredits';
import { Color } from '../../theme';
import Url from '../../util/externalUrls.data';
import { ExternalLink } from '../../ui/Link';
import { Event } from '../../util/gaTracking';
import AccountBalance from './AccountBalance';
import MealPlans from '../MealPlans';

export const AcademicOverview = () => {
  return (
    <Card collapsing={false}>
      <CardHeader title="Financial Overview" badge={<CardIcon icon={faUsdSquare} />} />
      <CardContentTable>
        <CardContentRow className="row-span-1">
          <CardContentCell>
            <AccountBalance />
            
          </CardContentCell>
        </CardContentRow>
        <CardContentRow borderless className="row-span-1">
          <CardContentCell>
            <MealPlans />
            {/* <ExternalLink
              href={Url.myDegrees.main}
              fg={Color['orange-400']}
              onClick={() => Event('academic-overview', 'See more in MyDegrees link')}
            >
              See more in MyDegrees
            </ExternalLink> */}
          </CardContentCell>
        </CardContentRow>
      </CardContentTable>
      <CardFooter infoButtonId="academic-overview">
        {/* 
          This ExternalLink is a bit of a hack to get it to appear in line with the info button. This code
          should probably live in MealPlans.tsx, but we've moved it here so that we can put it in line with
          the info button to match figma specs.
        */}
        <ExternalLink
          fg={Color['orange-400']}
          href="http://mycard.oregonstate.edu/"
          onClick={() => Event('meal-plans', 'Add money to card - mycard link')}
        >
          Add money
        </ExternalLink>
      </CardFooter>
    </Card>
  );
};

export default AcademicOverview;
