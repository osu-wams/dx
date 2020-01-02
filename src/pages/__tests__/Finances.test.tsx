import React from 'react';
import { waitForElement, wait } from '@testing-library/react';
import Finances from '../Finances';
import { render } from '../../util/test-utils';
import { mockAcademicAnnouncementResult } from '../../api/__mocks__/announcements.data';
import mockMealPlans from '../../api/persons/__mocks__/mealPlans.data';
import { resourcesCardData } from '../../api/__mocks__/resources.data';
import mockFinancialTransactions from '../../api/student/__mocks__/accountTransactions.data';
import mockAccountBalance from '../../api/student/__mocks__/accountBalance.data';

const mockUseAnnouncements = jest.fn();
const mockUseMealPlans = jest.fn();
const mockUseResourcesByQueue = jest.fn();
const mockUseFinancialTransactions = jest.fn();
const mockUseAccountBalance = jest.fn();

jest.mock('../../api/announcements', () => ({
  ...jest.requireActual('../../api/announcements'),
  useAnnouncements: () => mockUseAnnouncements()
}));

jest.mock('../../api/persons/meal-plans', () => ({
  useMealPlans: () => mockUseMealPlans()
}));

jest.mock('../../api/resources', () => ({
  useResourcesByQueue: () => mockUseResourcesByQueue()
}));

jest.mock('../../api/student/account-transactions', () => ({
  useAccountTransactions: () => mockUseFinancialTransactions()
}));

jest.mock('../../api/student/account-balance', () => ({
  useAccountBalance: () => mockUseAccountBalance()
}));

describe('Finances page with standard data', () => {
  beforeEach(() => {
    mockUseAnnouncements.mockReturnValue(mockAcademicAnnouncementResult);
    mockUseMealPlans.mockReturnValue(mockMealPlans);
    mockUseResourcesByQueue.mockReturnValue(resourcesCardData);
    mockUseFinancialTransactions.mockReturnValue(mockFinancialTransactions);
    mockUseAccountBalance.mockReturnValue(mockAccountBalance);
  });

  it('should render the finances page', async () => {
    const { getByTestId, findByText } = render(<Finances />);
    await findByText('Finances');
    const page = await waitForElement(() => getByTestId('finances-page'));
    expect(page).toBeInTheDocument();
  });

  it('should render Announcements and event cards when at least one event is present', async () => {
    const { getAllByTestId, getByTestId, findByText } = render(<Finances />);
    await findByText('Finances');
    await waitForElement(() => getByTestId('finances-announcements')); //will throw if no results
    await waitForElement(() => getAllByTestId('eventcard')); //will throw if no results
  });

  it('should not render Announcements with no events', async () => {
    mockUseAnnouncements.mockReturnValue({ data: [], loading: false, error: false });
    const { getByTestId, findByText } = render(<Finances />);
    await findByText('Student Account Balance');
    expect(() => getByTestId('finances-announcements')).toThrow(); //will throw if announcements is being displayed
  });
});
