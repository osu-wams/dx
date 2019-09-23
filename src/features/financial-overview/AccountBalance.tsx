import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import { getAccountBalance, IAccountBalanceAttributes } from '../../api/student/account-balance';
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

export const AccountBalanceExternalLink = () => (
  <ExternalLink
    style={{ float: 'right' }}
    href={Url.myDegrees.main}
    fg={Color['orange-400']}
    onClick={() => Event('academic-overview', 'See more in MyDegrees link')}
  >
    Make a payment
  </ExternalLink>
);

const AccountBalance = (props:{renderLink:boolean}) => {
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
    <Highlight textAlignLeft> 
      {accountBalance && typeof accountBalance.currentBalance === "number" ? (
        <>
          <HighlightEmphasis color={Color['neutral-550']}>
            {loading && <Skeleton />}
            {accountBalance ? formatDollars(accountBalance.currentBalance) : !loading && 'No data'}
          </HighlightEmphasis>
          <HighlightTitle marginTop={0}>Student Account Balance</HighlightTitle>
          <HighlightDescription>Your OSU student account balance. It may take up to 24 hours for transactions to be reflected.</HighlightDescription>
          {props.renderLink && AccountBalanceExternalLink()}
        </>
      ) : (<HighlightTitle>Error Loading Account Balance</HighlightTitle>)}
      
    </Highlight>
  );
};

export default AccountBalance;
