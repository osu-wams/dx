import React from 'react';
import { render } from 'src/util/test-utils';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Student } from '@osu-wams/hooks';
import FinancialTransactions from '../FinancialTransactions';
import { mockGAEvent } from 'src/setupTests';

const mockAccountTransactions = Student.AccountTransactions.mockAccountTransactions;
const mockUseAccountTransactions = jest.fn();

jest.mock('@osu-wams/hooks', () => {
  return {
    ...jest.requireActual('@osu-wams/hooks'),
    useAccountTransactions: () => mockUseAccountTransactions(),
  };
});

describe('<FinancialTransactions />', () => {
  // Set mock function result before running any tests
  beforeEach(() => {
    mockUseAccountTransactions.mockReturnValue(mockAccountTransactions);
  });

  it('should have title: "Transactions this Term"', () => {
    render(<FinancialTransactions />);

    expect(screen.getByText(/transactions this term/i)).toBeInTheDocument();
  });

  it('should have a $3,417.97 charge from our mock data', () => {
    render(<FinancialTransactions />);

    expect(screen.getByText('$3,417.97')).toBeInTheDocument();
  });

  it('should find link to view all transactions and it triggers analytics', async () => {
    render(<FinancialTransactions />);
    const transactions = screen.getByText(/View more transactions/);
    userEvent.click(transactions);
    expect(mockGAEvent).toHaveBeenCalledTimes(1);
  });

  it('should show an empty state when there are no recent transactions', async () => {
    mockUseAccountTransactions.mockReturnValue({
      data: undefined,
      loading: false,
      error: false,
    });
    render(<FinancialTransactions />);
    const empty = screen.getByText(/There are no recent transactions for this term/);

    expect(empty).toBeInTheDocument();
  });
});
