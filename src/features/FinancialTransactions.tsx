import React, { FC } from 'react';
import { Loading } from 'src/ui/Loading';
import styled from 'styled-components/macro';
import { faMoneyBillWave } from '@fortawesome/pro-light-svg-icons';
import { Card, CardHeader, CardContent, CardFooter, CardIcon } from 'src/ui/Card';
import { fontSize } from '@osu-wams/theme';
import { useAccountTransactions } from '@osu-wams/hooks';
import { ExternalLink } from 'src/ui/Link';
import { Url, Helpers } from '@osu-wams/utils';
import { Table, TableBody, TableCell, TableRow, TableHeader, TableHeaderCell } from '../ui/Table';
import transaction from 'src/assets/transaction.svg';
import { Event } from 'src/util/gaTracking';
import { EmptyState, EmptyStateImage, EmptyStateText } from 'src/ui/EmptyStates';

type ITransactionAmount = {
  transactionType: string;
};

const TransactionsTable = styled(Table)`
  width: 100%;
`;

const TransactionAmountHeader = styled(TableHeaderCell)`
  text-align: right;
`;

const TransactionName = styled.div`
  font-size: ${fontSize[14]};
  color: ${({ theme }) => theme.features.finances.transactions.name.color};
`;

const TransactionDetail = styled.div`
  font-size: ${fontSize[12]};
  color: ${({ theme }) => theme.features.finances.transactions.detail.color};
  text-transform: capitalize;
`;

const TransactionAmount = styled(TableCell)`
  text-align: right;
  padding: 0.8rem !important;
`;

const TransactionNumber = styled.div<ITransactionAmount>`
  font-size: ${fontSize[14]};
  color: ${({ theme, transactionType }) =>
    transactionType === 'charge'
      ? theme.features.finances.transactions.amountCharge.color
      : theme.features.finances.transactions.amount.color};
`;

const TransactionDetails = styled(TableCell)`
  padding: 0.8rem !important;
`;

const NoTransactions = () => (
  <EmptyState>
    <EmptyStateImage src={transaction} alt="" />
    <EmptyStateText>There are no recent transactions for this term.</EmptyStateText>
  </EmptyState>
);

/**
 * Financial Transactions Card
 *
 * Displays past financial transactions for the current user
 */
const FinancialTransactions: FC = () => {
  const { data, loading } = useAccountTransactions();

  return (
    <Card>
      <CardHeader
        title="Transactions this Term"
        badge={
          <CardIcon icon={faMoneyBillWave} count={data?.attributes?.transactions?.length ?? 0} />
        }
      />
      <CardContent flush>
        {loading && <Loading lines={5} />}
        {data?.attributes.transactions?.length ?? 0 ? (
          <TransactionsTable variant="basic" data-testid="transaction-container">
            <TableHeader>
              <TableRow>
                <TransactionAmountHeader>Amount</TransactionAmountHeader>
                <TableHeaderCell>Details</TableHeaderCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.attributes.transactions.map((transaction, index: number) => (
                <TableRow key={index}>
                  <TransactionAmount>
                    <TransactionNumber transactionType={transaction.transactionType}>
                      {Helpers.formatDollars(transaction.amount)}
                    </TransactionNumber>
                    <TransactionDetail>{transaction.transactionType}</TransactionDetail>
                  </TransactionAmount>
                  <TransactionDetails>
                    <TransactionName>{transaction.description}</TransactionName>
                    <TransactionDetail>{Helpers.format(transaction.entryDate)}</TransactionDetail>
                  </TransactionDetails>
                </TableRow>
              ))}
            </TableBody>
          </TransactionsTable>
        ) : (
          !loading && <NoTransactions />
        )}
      </CardContent>
      <CardFooter infoButtonId="recent-transactions">
        <ExternalLink
          href={Url.banner.financialTransactions}
          onClick={() => Event('financial-transactions', 'View more transactions')}
        >
          View more transactions
        </ExternalLink>
      </CardFooter>
    </Card>
  );
};

export default FinancialTransactions;
