import React from 'react';
import Skeleton from 'react-loading-skeleton';
import { useAccountBalance } from '../api/student/account-balance';
import { Color } from '../theme';
import { formatDollars } from '../util/helpers';
import {
  Highlight,
  HighlightTitle,
  HighlightEmphasis,
  HighlightDescription
} from '../ui/Highlights';

const AccountBalance: React.FC = () => {
  const { data, loading } = useAccountBalance();

  return (
    <Highlight>
      <HighlightTitle>OSU Account Balance</HighlightTitle>
      <HighlightEmphasis color={Color['pine-400']}>
        {loading && <Skeleton />}
        {data.attributes && data.attributes.currentBalance
          ? formatDollars(data.attributes.currentBalance)
          : !loading && 'No data'}
      </HighlightEmphasis>
      <HighlightDescription>Current account balance might be 24 hours behind</HighlightDescription>
    </Highlight>
  );
};

export default AccountBalance;
