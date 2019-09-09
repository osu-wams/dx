import React, { useState, useEffect, FC } from 'react';
import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';
import { faMoneyBillWave } from '@fortawesome/pro-light-svg-icons';
import { Card, CardHeader, CardContent, CardFooter, CardIcon } from '../ui/Card';
import { formatDate, formatDollars } from '../util/helpers';
import { Color, theme } from '../theme';
import { getAccountTransactions, IAccountTransactions, ITransaction } from '../api/student';
import { ExternalLink } from '../ui/Link';
import Url from '../util/externalUrls.data';
import { Table, TableBody, TableCell, TableRow, TableHeader, TableHeaderCell } from '../ui/Table';

type ITransactionAmount = {
  color: string;
};

const TransactionsTable = styled(Table)`
  width: 100%;
`;

const TransactionAmountHeader = styled(TableHeaderCell)`
  text-align: right;
`;

const TransactionsContainer = styled(CardContent)`
  padding-top: 0;
  padding-bottom: 0;
`;

const TransactionName = styled.div`
  font-size: ${theme.fontSize[14]};
  color: ${Color['neutral-700']};
`;

const TransactionDetail = styled.div`
  font-size: ${theme.fontSize[12]};
  color: ${Color['neutral-500']};
  text-transform: capitalize;
`;

const TransactionAmount = styled(TableCell)`
  text-align: right;
  padding: 0.8rem !important;
`;

const TransactionNumber = styled.div<ITransactionAmount>`
  font-size: ${theme.fontSize[14]};
  color: ${props => props.color};
`;

const TransactionDetails = styled(TableCell)`
  padding: 0.8rem !important;
`;

/**
 * Financial Transactions Card
 *
 * Displays past financial transactions for the current user
 */
const FinancialTransactions: FC = () => {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Populate resources and category ID
  useEffect(() => {
    let isMounted = true;
    getAccountTransactions()
      .then((data: IAccountTransactions) => {
        if (isMounted) {
          setTransactions(data.attributes.transactions);
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
    <Card>
      <CardHeader
        title="Recent Transactions"
        badge={<CardIcon icon={faMoneyBillWave} count={transactions.length} />}
      />
      <TransactionsContainer aria-live="polite">
        {loading && <Skeleton count={5} />}
        {transactions.length ? (
          <TransactionsTable variant="basic" data-testid="transaction-container">
            <TableHeader>
              <TableRow>
                <TransactionAmountHeader>Amount</TransactionAmountHeader>
                <TableHeaderCell>Details</TableHeaderCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction: ITransaction, index: number) => (
                <TableRow key={index}>
                  <TransactionAmount>
                    <TransactionNumber
                      color={
                        transaction.transactionType === 'charge'
                          ? Color['lava-400']
                          : Color['pine-400']
                      }
                    >
                      {formatDollars(transaction.amount)}
                    </TransactionNumber>
                    <TransactionDetail>{transaction.transactionType}</TransactionDetail>
                  </TransactionAmount>
                  <TransactionDetails>
                    <TransactionName>{transaction.description}</TransactionName>
                    <TransactionDetail>{formatDate(transaction.entryDate)}</TransactionDetail>
                  </TransactionDetails>
                </TableRow>
              ))}
            </TableBody>
          </TransactionsTable>
        ) : (
          !loading && <EmptyState />
        )}
      </TransactionsContainer>
      <CardFooter infoButtonId="recent-transactions">
        <ExternalLink href={Url.banner.financialTransactions}>See all transactions</ExternalLink>
      </CardFooter>
    </Card>
  );
};

// Todo: Replace with actual empty state when ready in mockups.
const EmptyState = () => <span>No recent transactions available.</span>;

export default FinancialTransactions;
