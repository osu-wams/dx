import React from 'react';
import { waitForElement, fireEvent } from '@testing-library/react';
import { render } from '../../util/test-utils';
import mockFinancialTransactions from '../../api/student/__mocks__/accountTransactions.data';
import FinancialTransactions from '../FinancialTransactions';
import { mockGAEvent } from '../../setupTests';

const mockUseFinancialTransactions = jest.fn();

jest.mock('../../api/student/account-transactions', () => ({
  useAccountTransactions: () => mockUseFinancialTransactions()
}));

describe('<FinancialTransactions />', () => {
  // Set mock function result before running any tests
  beforeEach(() => {
    mockUseFinancialTransactions.mockReturnValue(mockFinancialTransactions);
  });

  it('should have a $3,417.97 charge from our mock data', async () => {
    const { getByText } = render(<FinancialTransactions />);

    await waitForElement(() => getByText('$3,417.97'));
  });

  it('should find link to view all transactions and it triggers analytics', async () => {
    const { getByText } = render(<FinancialTransactions />);
    const transactions = await waitForElement(() => getByText(/View more transactions/));
    fireEvent.click(transactions);
    expect(mockGAEvent).toHaveBeenCalled();
  });

  it('should show an empty state when there are no recent transactions', async () => {
    mockUseFinancialTransactions.mockReturnValue({
      data: { attributes: { transactions: [] } },
      loading: false,
      error: false
    });
    const { getByText, debug } = render(<FinancialTransactions />);
    const empty = await waitForElement(() =>
      getByText(/There are no recent transactions for this term/)
    );

    expect(empty).toBeInTheDocument();
  });
});
