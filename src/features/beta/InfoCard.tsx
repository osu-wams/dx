import React, { FC } from 'react';
import { faFlaskPotion } from '@fortawesome/pro-light-svg-icons';
import { Card, CardHeader, CardContent, CardIcon, CardFooter } from '../../ui/Card';

const BetaInfo: FC = () => {
  return (
    <Card>
      <CardHeader title="Dashboard Beta" badge={<CardIcon icon={faFlaskPotion} />} />
      <CardContent>
        <DashboardBetaInfo />
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};

const DashboardBetaInfo = () => (
  <span>
    Welcome to the beta release of the new OSU student dashboard. This dashboard is a replacement
    for MyOSU. It is powered by React, an unknown number of AWS services, cheeseburgers and good
    intentions.
  </span>
);

export default BetaInfo;
