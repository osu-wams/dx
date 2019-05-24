import React from 'react';
import { render, waitForElement } from 'react-testing-library';
import mockAccountBalance from '../../api/student/__mocks__/accountBalance.data';
import AccountBalance from '../AccountBalance';

const mockGetAccountBalance = jest.fn();

jest.mock('../../api/student/account-balance', () => ({
  getAccountBalance: () => mockGetAccountBalance()
}));

describe('<AccountBalance />', () => {
  // Set mock function result before running any tests
  beforeAll(() => {
    mockGetAccountBalance.mockResolvedValue(Promise.resolve(mockAccountBalance));
  });

  it('should render and have the approriate title', async () => {
    const { getByText } = render(<AccountBalance />);
    expect(getByText('OSU Account Balance')).toBeInTheDocument;
  });

  it('should have a $2,356.00 balance from our mock data', async () => {
    const { getByText } = render(<AccountBalance />);
    await waitForElement(() => getByText('$2,356.00'));
  });

  it('should return "No data" when AccountBalance data is empty', async () => {
    mockGetAccountBalance.mockResolvedValue(Promise.resolve({}));
    const { getByText } = render(<AccountBalance />);
    await waitForElement(() => getByText('No data'));
  });
});
