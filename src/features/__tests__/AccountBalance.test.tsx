import React from 'react';
import { screen } from '@testing-library/react';
import { render, alterMock } from 'src/util/test-utils';
import AccountBalance from '../financial-overview/AccountBalance';
import { ACCOUNT_BALANCE_API } from 'src/mocks/apis';

describe('<AccountBalance />', () => {
  it('should render and have the approriate title', async () => {
    render(<AccountBalance />);
    expect(screen.getByText('Student Account Balance')).toBeInTheDocument();
  });

  it('should have a $2,356.00 balance from our mock data', async () => {
    render(<AccountBalance />);
    expect(await screen.findByText('$2,356.00')).toBeInTheDocument();
    expect(screen.getByText('Make a payment')).toBeInTheDocument();
  });

  it('should have a $0.00 balance from our mock data', async () => {
    alterMock(ACCOUNT_BALANCE_API, { attributes: { currentBalance: '0' } });
    render(<AccountBalance />);
    expect(await screen.findByText('$0.00')).toBeInTheDocument();
  });

  it('should return "No data" when AccountBalance data is empty', async () => {
    alterMock(ACCOUNT_BALANCE_API, {});
    render(<AccountBalance />);
    expect(await screen.findByText('No data')).toBeInTheDocument();
    expect(screen.getByText('Make a payment')).toBeInTheDocument();
  });
});
