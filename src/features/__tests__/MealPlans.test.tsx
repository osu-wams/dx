import React from 'react';
import { waitForElement, fireEvent } from '@testing-library/react';
import { render } from '../../util/test-utils';
import mockMealPlans from '../../api/persons/__mocks__/mealPlans.data';
import MealPlans from '../MealPlans';
import { mockGAEvent } from '../../setupTests';

const mockUseMealPlans = jest.fn();
const mockNoData = { data: [], loading: false, error: false };

jest.mock('../../api/persons/meal-plans', () => ({
  useMealPlans: () => mockUseMealPlans()
}));

describe('<MealPlans />', () => {
  // Set mock function result before running any tests
  beforeAll(() => {
    mockUseMealPlans.mockReturnValue(mockMealPlans);
  });

  it('should have a $16.88 balance from our mock data', async () => {
    const { getByText } = render(<MealPlans />);
    await waitForElement(() => getByText('$16.88'));
  });

  it('should find link to view and add balance and clicking it triggers analytics', async () => {
    const { getByText } = render(<MealPlans />);
    const AddBalance = await waitForElement(() => getByText('View and Add Balance'));
    fireEvent.click(AddBalance);
    expect(mockGAEvent).toHaveBeenCalled();
  });

  it('should have Orange Cash as title from our mock data', async () => {
    const { getByText } = render(<MealPlans />);
    await waitForElement(() => getByText('Orange Cash'));
  });

  it('should return "No meal plans" when MealPlan data is empty', async () => {
    mockUseMealPlans.mockReturnValue(mockNoData);
    const { getByText } = render(<MealPlans />);
    await waitForElement(() => getByText('No meal plans'));
  });
});
