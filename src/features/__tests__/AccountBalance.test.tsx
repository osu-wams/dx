import React from 'react';
import { render } from '../../util/test-utils';
import AccountBalance from '../financial-overview/AccountBalance';
import { Student } from '@osu-wams/hooks';

const mockAccountBalance = Student.AccountBalance.mockAccountBalance;
const mockUseAccountBalance = jest.fn();

jest.mock('@osu-wams/hooks', () => {
  return {
    ...jest.requireActual('@osu-wams/hooks'),
    useAccountBalance: () => mockUseAccountBalance()
  };
});

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
    expect(getByText('$2,356.00')).toBeInTheDocument();
    expect(getByText('Make a payment')).toBeInTheDocument();
  });

  it('should have a $0.00 balance from our mock data', async () => {
    mockAccountBalance.data.attributes.currentBalance = 0;
    mockUseAccountBalance.mockReturnValue(mockAccountBalance);
    const { getByText } = render(<AccountBalance />);
    expect(getByText('$0.00')).toBeInTheDocument();
    expect(getByText('Make a payment')).toBeInTheDocument();
  });

  it('should return "No data" when AccountBalance data is empty', async () => {
    mockUseAccountBalance.mockResolvedValue(Promise.resolve({}));
    const { getByText } = render(<AccountBalance />);
    expect(getByText('No data')).toBeInTheDocument();
    expect(getByText('Make a payment')).toBeInTheDocument();
  });
});
