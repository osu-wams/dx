import React from 'react';
import Skeleton from 'react-loading-skeleton';
import { useAccountBalance } from '../../api/student/account-balance';
import { Color } from '../../theme';
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
import { isNullOrUndefined } from 'util';

export const AccountBalanceExternalLink = () => (
  <ExternalLink
    style={{ float: 'right' }}
    href={Url.bill.main}
    fg={Color['orange-400']}
    onClick={() => Event('academic-overview', 'See more in MyDegrees link')}
  >
    Make a payment
  </ExternalLink>
);

const AccountBalance = (props: { renderLink: boolean }) => {
  const { data, loading } = useAccountBalance();

  return (
    <Highlight textAlignLeft>
      <HighlightEmphasis color={Color['neutral-550']}>
        {loading && <Skeleton />}
        {data && data.attributes && !isNullOrUndefined(data.attributes.currentBalance)
          ? formatDollars(data.attributes.currentBalance)
          : !loading && 'No data'}
      </HighlightEmphasis>
      <HighlightTitle marginTop={0}>Student Account Balance</HighlightTitle>
      <HighlightDescription>
        Your OSU student account balance. It may take up to 24 hours for transactions to be
        reflected.
      </HighlightDescription>
      {props.renderLink && AccountBalanceExternalLink()}
    </Highlight>
  );
};

export default AccountBalance;
