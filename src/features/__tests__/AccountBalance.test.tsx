import React from 'react';
import { waitForElement } from '@testing-library/react';
import { render } from '../../util/test-utils';
import mockAccountBalance from '../../api/student/__mocks__/accountBalance.data';
import AccountBalance from '../financial-overview/AccountBalance';

const mockUseAccountBalance = jest.fn();

jest.mock('../../api/student/account-balance', () => ({
  useAccountBalance: () => mockUseAccountBalance()
}));

describe('<AccountBalance />', () => {
  // Set mock function result before running any tests
  beforeEach(() => {
    mockUseAccountBalance.mockReturnValue(mockAccountBalance);
  });

  it('should render and have the approriate title', async () => {
    const { getByText } = render(<AccountBalance />);
    expect(getByText('Student Account Balance')).toBeInTheDocument();
  });

  it('should have a $2,356.00 balance from our mock data', async () => {
    const { getByText } = render(<AccountBalance />);
    await waitForElement(() => getByText('$2,356.00'));
    await waitForElement(() => getByText('Make a payment'));
  });

  it('should have a $0.00 balance from our mock data', async () => {
    mockAccountBalance.data.attributes.currentBalance = 0;
    mockUseAccountBalance.mockReturnValue(mockAccountBalance);
    const { getByText } = render(<AccountBalance />);
    await waitForElement(() => getByText('$0.00'));
    await waitForElement(() => getByText('Make a payment'));
  });

  it('should return "No data" when AccountBalance data is empty', async () => {
    mockUseAccountBalance.mockResolvedValue(Promise.resolve({}));
    const { getByText } = render(<AccountBalance />);
    await waitForElement(() => getByText('No data'));
    await waitForElement(() => getByText('Make a payment'));
  });
});
