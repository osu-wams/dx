import React from 'react';
import { faPlane } from '@fortawesome/pro-light-svg-icons';
import { Card, CardHeader, CardContent, CardFooter, CardIcon, CardContentTable, CardContentRow, CardContentCell } from '../ui/Card';
import { State, User } from '@osu-wams/hooks';
import { useRecoilValue } from 'recoil';
import { HighlightExternalLink } from 'src/ui/Link';
import { Url } from '@osu-wams/utils';

export const ConcurCard = () => {
  const user = useRecoilValue(State.userState);
  return (
    <Card>
      <CardHeader title="Travel and Expense" badge={<CardIcon icon={faPlane} />} />
      <CardContentTable>
        <CardContentRow className="row-span-1">
          <CardContentCell>
            <HighlightExternalLink href={Url.concur.main}>
              Concur
            </HighlightExternalLink>
            <div>OSU&apos;s travel and expense reporting program.</div>
          </CardContentCell>
          <CardContentCell>
            <HighlightExternalLink href={Url.concur.accountsPayable}>
              Accounts Payable
            </HighlightExternalLink>
            <div>OSU&apos;s travel & expense program including travel, reimbursements, cash advances, expense reports, and credit card program.</div>
          </CardContentCell>
        </CardContentRow>
      </CardContentTable>
    </Card>
  );
}
