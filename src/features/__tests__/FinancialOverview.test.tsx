import React from 'react';
import { render } from '../../util/test-utils';
import userEvent from '@testing-library/user-event';
import FinancialOverview from '../financial-overview/FinancialOverview';
import { mockGAEvent } from '../../setupTests';

it('should find link to view and make payment and clicking it triggers analytics', async () => {
  const { getByText, findByText } = render(<FinancialOverview />);
  await findByText('Financial Overview');
  const MakePayment = getByText('Make a payment');
  const AddMoney = getByText('Add money');

  userEvent.click(MakePayment);
  userEvent.click(AddMoney);

  expect(mockGAEvent).toHaveBeenCalledTimes(2);
});
