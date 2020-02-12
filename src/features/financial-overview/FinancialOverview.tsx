import React from 'react';
import { faUsdSquare } from '@fortawesome/pro-light-svg-icons';
import {
  Card,
  CardHeader,
  CardContentTable,
  CardContentRow,
  CardContentCell,
  CardFooter,
  CardIcon
} from '../../ui/Card';
import AccountBalance from './AccountBalance';
import MealPlans from './MealPlans';

export const FinancialOverview = () => {
  return (
    <Card collapsing={false}>
      <CardHeader title="Financial Overview" badge={<CardIcon icon={faUsdSquare} />} />
      <CardContentTable>
        <CardContentRow className="row-span-1">
          <CardContentCell>
            <AccountBalance />
          </CardContentCell>
        </CardContentRow>
        <CardContentRow className="row-span-1">
          <CardContentCell>
            <MealPlans />
          </CardContentCell>
        </CardContentRow>
      </CardContentTable>
      <CardFooter infoButtonId="financial-overview"></CardFooter>
    </Card>
  );
};

export default FinancialOverview;
