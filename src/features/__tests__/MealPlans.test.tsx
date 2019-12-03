import React from 'react';
import { waitForElement } from '@testing-library/react';
import { render } from '../../util/test-utils';
import mockMealPlans from '../../api/persons/__mocks__/mealPlans.data';
import MealPlans from '../financial-overview/MealPlans';

const mockUseMealPlans = jest.fn();
const mockNoData = { data: [], loading: false, error: false };

jest.mock('../../api/persons/meal-plans', () => ({
  useMealPlans: () => mockUseMealPlans()
}));

describe('<MealPlans />', () => {
  // Set mock function result before running any tests
  beforeEach(() => {
    mockUseMealPlans.mockReturnValue(mockMealPlans);
  });

  it('should have a $16.88 balance from our mock data', async () => {
    const { getByText } = render(<MealPlans />);
    await waitForElement(() => getByText('$16.88'));
    await waitForElement(() => getByText('Add money'));
  });

  it('should have Meal Plan Balance as title from our mock data', async () => {
    const { getByText } = render(<MealPlans />);
    await waitForElement(() => getByText('Meal Plan Balance'));
    await waitForElement(() => getByText('Add money'));
  });

  it('should not render if no balance ', async () => {
    mockUseMealPlans.mockResolvedValue(Promise.resolve(mockNoData));
    const { getByText } = render(<MealPlans />);
    await waitForElement(() => getByText('No meal plans'));
    await waitForElement(() => getByText('Add money'));
  });
});
