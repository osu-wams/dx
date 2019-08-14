import React, { useState, useEffect, useRef, FC } from 'react';
import styled from 'styled-components';
import { Card, CardHeader, CardContent, CardFooter } from '../ui/Card';
import { formatDate, formatDollars } from '../util/helpers';
import { List, ListItem, ListItemContent } from '../ui/List';
import { Color, theme } from '../theme';
import { getAccountTransactions, IAccountTransactions, ITransaction } from '../api/student';
import { ExternalLink } from '../ui/Link';
import Url from '../util/externalUrls.data';

type ITransactionAmount = {
  color: string;
};

const TransactionsContainer = styled(CardContent)`
  padding-top: 0;
  padding-bottom: 0;
`;

const TransactionName = styled.div`
  font-size: ${theme.fontSize[14]};
  color: ${Color['neutral-700']};
`;

const TransactionDate = styled.div`
  font-size: ${theme.fontSize[12]};
  color: ${Color['neutral-500']};
`;

const TransactionAmount = styled.div<ITransactionAmount>`
  font-size: ${theme.fontSize[16]};
  color: ${props => props.color};
`;

const TransactionDetails = styled.div`
  padding-left: ${theme.spacing.unit * 2}px;
`;

const TransactionContent = styled(ListItemContent)`
  padding: ${theme.spacing.unit * 1.5}px ${theme.spacing.unit * 2}px;
`;

/**
 * Financial Transactions Card
 *
 * Displays past financial transactions for the current user
 */
const FinancialTransactions: FC = () => {
  const [transactions, setTransactions] = useState<[ITransaction] | []>([]);
  const isMounted = useRef(true);

  // Populate resources and category ID
  useEffect(() => {
    isMounted.current = true;
    getAccountTransactions()
      .then((data: IAccountTransactions) => {
        console.log(data);
        if (isMounted.current) {
          setTransactions(data.attributes.transactions);
        }
      })
      .catch(console.log);
    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <Card>
      <CardHeader title="Transactions" />
      <TransactionsContainer>
        {transactions.length ? (
          <List data-testid="transaction-container">
            {transactions.map((transaction: ITransaction, index: number) => (
              <ListItem spaced key={index}>
                <TransactionContent spaced>
                  <TransactionAmount
                    color={transaction.amount < 0 ? Color['lava-400'] : Color['pine-400']}
                  >
                    {formatDollars(transaction.amount)}
                  </TransactionAmount>
                  <TransactionDetails>
                    <TransactionName>{transaction.description}</TransactionName>
                    <TransactionDate>{formatDate(transaction.entryDate)}</TransactionDate>
                  </TransactionDetails>
                </TransactionContent>
              </ListItem>
            ))}
          </List>
        ) : (
          <EmptyState />
        )}
      </TransactionsContainer>
      <CardFooter>
        <ExternalLink href={Url.banner.financialTransactions}>See all transactions</ExternalLink>
      </CardFooter>
    </Card>
  );
};

// Todo: Replace with actual empty state when ready in mockups.
const EmptyState = () => <span>No transactions available.</span>;

export default FinancialTransactions;
