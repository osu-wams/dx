import React from 'react';
import PageTitle from '../ui/PageTitle';
import {
  Overview,
  OverviewContent,
  OverviewSection,
  OverviewItem,
  OverviewItemLabel
} from '../ui/Overview';
import { Table, TableBody, TableCell, TableHeader, TableRow, TableHeaderCell } from '../ui/Table';
import { formatDollars, formatDate } from '../util/helpers';

//Temporary mock data
import accountBalance from '../api/__mocks__/accountBalance.data';
import accountTransactions from '../api/__mocks__/accountTransactions.data';
import Button from '../ui/Button';

const AcademicOverview = () => {
  const balance = accountBalance[0].attributes.currentBalance;
  const transactions = accountTransactions[0].attributes.transactions;
  return (
    <Overview>
      <OverviewContent>
        <OverviewSection>
          <OverviewItem>
            <OverviewItemLabel color="pineStand">Account Balance</OverviewItemLabel>
            <span className="l">{formatDollars(balance)}</span>
          </OverviewItem>
        </OverviewSection>
        <OverviewSection>
          <OverviewItem>
            <OverviewItemLabel color="pineStand">Last 3 account transactions</OverviewItemLabel>
            <Table variant="basic" striped>
              <TableHeader>
                <TableRow>
                  <TableHeaderCell>Amount</TableHeaderCell>
                  <TableHeaderCell>Date</TableHeaderCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.slice(0, 3).map(({ amount, entryDate }) => (
                  <TableRow key={amount + entryDate}>
                    <TableCell>{formatDollars(amount)}</TableCell>
                    <TableCell>{formatDate(entryDate, 'compact')}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {/* @TODO: Create another component with full the full list of details */}
            <Button bg="pineStand" size="small" outline>
              Detailed transactions
            </Button>
          </OverviewItem>
        </OverviewSection>
      </OverviewContent>
    </Overview>
  );
};

const Finances = () => {
  return (
    <div data-testid="finances-page">
      <PageTitle title="Financial Information" />
      <AcademicOverview />
    </div>
  );
};

export default Finances;
