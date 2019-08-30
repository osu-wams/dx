import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import { getAccountBalance, IAccountBalanceAttributes } from '../api/student/account-balance';
import { Color } from '../theme';
import { formatDollars } from '../util/helpers';
import {
  Highlight,
  HighlightTitle,
  HighlightEmphasis,
  HighlightDescription
} from '../ui/Highlights';

const AccountBalance: React.FC = () => {
  const [accountBalance, setAccountBalance] = useState<IAccountBalanceAttributes | undefined>(
    undefined
  );
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getAccountBalance()
      .then(res => {
        setAccountBalance(res.attributes);
        setLoading(false);
      })
      .catch(console.log);
  }, []);

  return (
    <Highlight>
      <HighlightTitle>OSU Account Balance</HighlightTitle>
      <HighlightEmphasis color={Color['pine-400']}>
        {loading && <Skeleton />}
        {accountBalance ? formatDollars(accountBalance.currentBalance) : !loading && 'No data'}
      </HighlightEmphasis>
      <HighlightDescription>Current account balance might be 24 hours behind</HighlightDescription>
    </Highlight>
  );
};

export default AccountBalance;
