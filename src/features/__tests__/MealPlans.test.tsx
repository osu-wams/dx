import React from 'react';
import { render, waitForElement } from '@testing-library/react';
import mockMealPlans from '../../api/persons/__mocks__/mealPlans.data';
import MealPlans from '../MealPlans';
import axiosMock from 'axios'


const mockGetMealPlans = jest.fn();

jest.mock('../../api/persons/meal-plans', () => ({
  getMealPlans: () => mockGetMealPlans()
}));

describe('<MealPlans />', () => {
  // Set mock function result before running any tests
  beforeAll(() => {
    mockGetMealPlans.mockResolvedValue(Promise.resolve(mockMealPlans));
  });

  it('should render the approriate title', async () => {
    const { getByText } = render(<MealPlans />);
    expect(getByText('No meal plans')).toBeInTheDocument();
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
