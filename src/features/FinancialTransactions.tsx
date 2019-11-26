import React, { FC } from 'react';
import Skeleton from 'react-loading-skeleton';
import { faMoneyBillWave } from '@fortawesome/pro-light-svg-icons';
import { Card, CardHeader, CardContent, CardFooter, CardIcon } from '../ui/Card';
import { format, formatDollars } from '../util/helpers';
import { themeSettings, styled } from '../theme';
import { useAccountTransactions } from '../api/student/account-transactions';
import { ExternalLink } from '../ui/Link';
import Url from '../util/externalUrls.data';
import { Table, TableBody, TableCell, TableRow, TableHeader, TableHeaderCell } from '../ui/Table';
import transaction from '../assets/transaction.svg';
import { Event } from '../util/gaTracking';

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
  font-size: ${themeSettings.fontSize[14]};
  color: ${({ theme }) => theme.features.finances.transactions.name.color};
`;

const TransactionDetail = styled.div`
  font-size: ${themeSettings.fontSize[12]};
  color: ${({ theme }) => theme.features.finances.transactions.detail.color};
  text-transform: capitalize;
`;

const TransactionAmount = styled(TableCell)`
  text-align: right;
  padding: 0.8rem !important;
`;

const TransactionNumber = styled.div<ITransactionAmount>`
  font-size: ${themeSettings.fontSize[14]};
  color: ${({ theme, transactionType }) =>
    transactionType === 'charge'
      ? theme.features.finances.transactions.amountCharge.color
      : theme.features.finances.transactions.amount.color};
`;

const TransactionDetails = styled(TableCell)`
  padding: 0.8rem !important;
`;

const NoItems = styled.div`
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  align-items: center;
  padding: ${themeSettings.spacing.unit * 4}px ${themeSettings.spacing.unit * 8}px 0px
    ${themeSettings.spacing.unit * 8}px;
`;

const NoItemsImage = styled.img`
  height: 60px;
`;

const NoItemsText = styled.p`
  color: ${({ theme }) => theme.features.finances.transactions.emptyText.color};
  text-align: center;
`;

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
        title="Recent Transactions"
        badge={
          <CardIcon
            icon={faMoneyBillWave}
            count={
              data.attributes && data.attributes.transactions
                ? data.attributes.transactions.length
                : 0
            }
          />
        }
      />
      <CardContent className="flush">
        {loading && <Skeleton count={5} />}
        {data.attributes && data.attributes.transactions && data.attributes.transactions.length ? (
          <TransactionsTable variant="basic" data-testid="transaction-container">
            <TableHeader>
              <TableRow>
                <TransactionAmountHeader>Amount</TransactionAmountHeader>
                <TableHeaderCell>Details</TableHeaderCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.attributes.transactions.map((transaction, index: number) => (
                <TableRow key={index}>
                  <TransactionAmount>
                    <TransactionNumber transactionType={transaction.transactionType}>
                      {formatDollars(transaction.amount)}
                    </TransactionNumber>
                    <TransactionDetail>{transaction.transactionType}</TransactionDetail>
                  </TransactionAmount>
                  <TransactionDetails>
                    <TransactionName>{transaction.description}</TransactionName>
                    <TransactionDetail>{format(transaction.entryDate)}</TransactionDetail>
                  </TransactionDetails>
                </TableRow>
              ))}
            </TableBody>
          </TransactionsTable>
        ) : (
          !loading && (
            <NoItems>
              <NoItemsImage src={transaction} alt="" />
              <NoItemsText>There are no recent transactions for this term</NoItemsText>
            </NoItems>
          )
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
