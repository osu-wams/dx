import React from 'react';
import { renderWithAllContexts as render } from 'src/util/test-utils';
import { screen } from '@testing-library/react';
import MealPlans from '../financial-overview/MealPlans';
import { Person } from '@osu-wams/hooks';

const mockMealPlans = Person.MealPlans.mockMealPlans;
const mockUseMealPlans = jest.fn();
const mockNoData = { data: [], isSuccess: false, error: false };

jest.mock('@osu-wams/hooks', () => {
  return {
    ...jest.requireActual('@osu-wams/hooks'),
    useMealPlans: () => mockUseMealPlans(),
  };
});

describe('<MealPlans />', () => {
  // Set mock function result before running any tests
  beforeEach(() => {
    mockUseMealPlans.mockReturnValue(mockMealPlans);
  });

  it('should have a $16.88 balance from our mock data', async () => {
    render(<MealPlans />);
    expect(screen.getByText('$16.88')).toBeInTheDocument();
    expect(screen.getByText('Add money')).toBeInTheDocument();
  });

  it('should have Meal Plan Balance as title from our mock data', async () => {
    render(<MealPlans />);
    expect(screen.getByText('Meal Plan Balance')).toBeInTheDocument();
    expect(screen.getByText('Add money')).toBeInTheDocument();
  });

  it('should let user know they do not have a meal plan', async () => {
    mockUseMealPlans.mockResolvedValue(Promise.resolve(mockNoData));
    render(<MealPlans />);
    expect(screen.getByText('You do not have a meal plan.')).toBeInTheDocument();
    expect(screen.getByText('Add money')).toBeInTheDocument();
  });
});
