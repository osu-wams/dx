import React, { useState, useEffect } from 'react';
import getAccountBalance, { IAccountBalanceAttributes } from '../api/student/account-balance';
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

  useEffect(() => {
    getAccountBalance()
      .then(res => {
        setAccountBalance(res.attributes);
      })
      .catch(console.log);
  }, []);

  return (
    <Highlight>
      <HighlightTitle>OSU Account Balance</HighlightTitle>
      <HighlightEmphasis color={Color['pine-400']}>
        {accountBalance ? formatDollars(accountBalance.currentBalance) : '0'}
      </HighlightEmphasis>
      <HighlightDescription>Current account balance might be 24 hours behind</HighlightDescription>
      {console.log(accountBalance)}
    </Highlight>
  );
};

export default AccountBalance;
