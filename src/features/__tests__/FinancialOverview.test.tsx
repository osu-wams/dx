import React from 'react';
import { renderWithAllContexts as render } from 'src/util/test-utils';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FinancialOverview from '../financial-overview/FinancialOverview';
import { mockGAEvent } from 'src/setupTests';

it('should find link to view and make payment and clicking it triggers analytics', async () => {
  render(<FinancialOverview />);
  await screen.findByText('Financial Overview');
  const MakePayment = screen.getByText('Make a payment');
  const AddMoney = screen.getByText('Add money');

  userEvent.click(MakePayment);
  userEvent.click(AddMoney);

  expect(mockGAEvent).toHaveBeenCalledTimes(2);
});
