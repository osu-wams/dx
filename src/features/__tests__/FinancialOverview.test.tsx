import React from 'react';
import { waitForElement, fireEvent } from '@testing-library/react';
import { render } from '../../util/test-utils';
import FinancialOverview from '../financial-overview/FinancialOverview';
import { mockGAEvent } from '../../setupTests';

it('should find link to view and make payment and clicking it triggers analytics, and add money should not be visible when the mealplan is not being rendered', async () => {
  const { getByText, queryByText } = render(<FinancialOverview />);
  const MakePayment = await waitForElement(() => getByText('Make a payment'));
  const AddMoney = queryByText('Add money');

  fireEvent.click(MakePayment);
  
  expect(mockGAEvent).toHaveBeenCalled();
  expect(AddMoney).not.toBeInTheDocument()
});
