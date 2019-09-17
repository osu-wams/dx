import React from 'react';
import { waitForElement, fireEvent } from '@testing-library/react';
import { render } from '../../util/test-utils';
import mockFinancialTransactions from '../../api/student/__mocks__/accountTransactions.data';
import FinancialTransactions from '../FinancialTransactions';
import { mockGAEvent } from '../../setupTests';

const mockGetFinancialTransactions = jest.fn();

jest.mock('../../api/student/account-transactions', () => ({
  getAccountTransactions: () => mockGetFinancialTransactions()
}));

describe('<FinancialTransactions />', () => {
  // Set mock function result before running any tests
  beforeAll(() => {
    mockGetFinancialTransactions.mockResolvedValue(Promise.resolve(mockFinancialTransactions));
  });

  it('should have a $3,417.97 charge from our mock data', async () => {
    const { getByText } = render(<FinancialTransactions />);

    await waitForElement(() => getByText('$3,417.97'));
  });

  it('should find link to view all transactions and it triggers analytics', async () => {
    const { getByText } = render(<FinancialTransactions />);
    const transactions = await waitForElement(() => getByText(/See all transactions/));
    fireEvent.click(transactions);
    expect(mockGAEvent).toHaveBeenCalled();
  });

  it('should show an empty state when there are no recent transactions', async () => {
    mockGetFinancialTransactions.mockResolvedValue(
      Promise.resolve({ attributes: { transactions: [] } })
    );
    const { getByText, debug } = render(<FinancialTransactions />);
    const empty = await waitForElement(() => getByText(/No recent transactions/));

    expect(empty).toBeInTheDocument();
  });
});
