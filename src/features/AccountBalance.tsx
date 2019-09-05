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
    let isMounted = true;
    getAccountBalance()
      .then(res => {
        if (isMounted) {
          setAccountBalance(res.attributes);
          setLoading(false);
        }
      })
      .catch(console.log);

    return () => {
      // prevents setting data on a component that has been unmounted before promise resolves
      isMounted = false;
    };
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
