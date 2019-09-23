import React from 'react';
import { waitForElement, fireEvent } from '@testing-library/react';
import { render } from '../../util/test-utils';
import FinancialOverview from '../financial-overview/FinancialOverview';
import { mockGAEvent } from '../../setupTests';

it('should find link to view and add balance and clicking it triggers analytics', async () => {
    /* 
    Normally we'd want to have the link in the MealPlans card, but due to UI decisions
    we put it in the FinancialOverview card so that we could have it in line with the
    info button.
    */

    const { getByText } = render(<FinancialOverview />);
    const AddBalance = await waitForElement(() => getByText('Add money'));
    fireEvent.click(AddBalance);
    expect(mockGAEvent).toHaveBeenCalled();
  });