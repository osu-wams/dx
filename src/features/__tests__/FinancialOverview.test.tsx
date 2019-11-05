import React from 'react';
import { waitForElement, fireEvent } from '@testing-library/react';
import { render } from '../../util/test-utils';
import FinancialOverview from '../financial-overview/FinancialOverview';
import { mockGAEvent } from '../../setupTests';

it('should find link to view and make payment and clicking it triggers analytics', async () => {
  const { getByText } = render(<FinancialOverview />);
  const MakePayment = await waitForElement(() => getByText('Make a payment'));
  const AddMoney = await waitForElement(() => getByText('Add money'));

  fireEvent.click(MakePayment);
  fireEvent.click(AddMoney);
  expect(mockGAEvent).toHaveBeenCalledTimes(2);

});
