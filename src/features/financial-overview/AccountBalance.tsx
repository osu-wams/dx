import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components/macro';
import { Loading } from 'src/ui/Loading';
import { useAccountBalance } from '@osu-wams/hooks';
import {
  Highlight,
  HighlightTitle,
  HighlightEmphasis,
  HighlightDescription,
} from 'src/ui/Highlights';
import { ExternalLink } from 'src/ui/Link';
import { Url, Helpers } from '@osu-wams/utils';
import { Event } from 'src/util/gaTracking';

/**
 * Sub card for the Financial Overview card.
 */
const AccountBalance = () => {
  const themeContext = useContext(ThemeContext);
  const { data, isLoading } = useAccountBalance();

  return (
    <Highlight textAlignLeft>
      <HighlightEmphasis color={themeContext.features.finances.accountBalance.emphasis.color}>
        {isLoading && <Loading />}
        {Helpers.formatDollars(data?.attributes?.currentBalance) ?? (!isLoading && 'No data')}
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
