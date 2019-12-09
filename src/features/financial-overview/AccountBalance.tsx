import React, { useContext } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useAccountBalance } from '../../api/student/account-balance';
import { formatDollars } from '../../util/helpers';
import {
  Highlight,
  HighlightTitle,
  HighlightEmphasis,
  HighlightDescription
} from '../../ui/Highlights';
import { ExternalLink } from '../../ui/Link';
import Url from '../../util/externalUrls.data';
import { Event } from '../../util/gaTracking';
import { ThemeContext } from '../../theme';

/**
 * Sub card for the Financial Overview card.
 */
const AccountBalance = () => {
  const themeContext = useContext(ThemeContext);
  const { data, loading } = useAccountBalance();

  return (
    <Highlight textAlignLeft>
      <HighlightEmphasis color={themeContext.features.finances.accountBalance.emphasis.color}>
        {loading && <Skeleton />}
        {formatDollars(data?.attributes?.currentBalance) ?? (!loading && 'No data')}
      </HighlightEmphasis>
      <HighlightTitle marginTop={0}>Student Account Balance</HighlightTitle>
      <HighlightDescription>
        Your OSU student account balance. It may take up to 24 hours for transactions to be
        reflected.
      </HighlightDescription>
      <ExternalLink
        style={{ float: 'right' }}
        href={Url.bill.main}
        onClick={() => Event('account-balance', 'make a payment - my bill link')}
      >
        Make a payment
      </ExternalLink>
    </Highlight>
  );
};

export default AccountBalance;
