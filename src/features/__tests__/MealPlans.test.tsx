import React from 'react';
import { waitForElement } from '@testing-library/react';
import { render } from '../../util/test-utils';
import mockMealPlans from '../../api/persons/__mocks__/mealPlans.data';
import MealPlans from '../MealPlans';

const mockGetMealPlans = jest.fn();

jest.mock('../../api/persons/meal-plans', () => ({
  getMealPlans: () => mockGetMealPlans()
}));

describe('<MealPlans />', () => {
  // Set mock function result before running any tests
  beforeAll(() => {
    mockGetMealPlans.mockResolvedValue(Promise.resolve(mockMealPlans));
  });

  it('should have a $16.88 balance from our mock data', async () => {
    const { getByText } = render(<MealPlans />);
    await waitForElement(() => getByText('$16.88'));
  });

  it('should have Orange Cash as title from our mock data', async () => {
    const { getByText } = render(<MealPlans />);
    await waitForElement(() => getByText('Orange Cash'));
  });

  it('should return "No meal plans" when MealPlan data is empty', async () => {
    mockGetMealPlans.mockResolvedValue(Promise.resolve({}));
    const { getByText } = render(<MealPlans />);
    await waitForElement(() => getByText('No meal plans'));
  });
});
