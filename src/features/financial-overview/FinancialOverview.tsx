import React, { useState } from 'react';
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
import Url from '../../util/externalUrls.data';
import AccountBalance, { AccountBalanceExternalLink } from './AccountBalance';
import MealPlans from './MealPlans';

export const FinancialOverview = () => {
  const [footerLink, setFooterLink] = useState(AccountBalanceExternalLink);
  const [hasMealPlan, setHasMealPlan] = useState<boolean>(true);

  return (
    <Card collapsing={false}>
      <CardHeader title="Financial Overview" badge={<CardIcon icon={faUsdSquare} />} />
      <CardContentTable>
        <CardContentRow className="row-span-1">
          <CardContentCell>
            <AccountBalance renderLink={footerLink.props.href !== Url.bill.main} />
          </CardContentCell>
        </CardContentRow>
        {hasMealPlan && (
          <>
            <CardContentRow borderless className="row-span-1">
              <CardContentCell>
                <MealPlans setFooterLink={setFooterLink} setHasMealPlan={setHasMealPlan} />
              </CardContentCell>
            </CardContentRow>
          </>
        )}
      </CardContentTable>
      <CardFooter infoButtonId="financial-overview">{footerLink}</CardFooter>
    </Card>
  );
};

export default FinancialOverview;
