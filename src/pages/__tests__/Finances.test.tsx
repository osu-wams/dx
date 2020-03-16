import React from 'react';
import Finances from '../Finances';
import { render } from '../../util/test-utils';
import { Announcements, Person, Resources, Student } from '@osu-wams/hooks';

const { resourcesCardData } = Resources.mockResources;
const { academicAnnouncementResult } = Announcements.mockAnnouncements;
const mockAccountBalance = Student.AccountBalance.mockAccountBalance;
const mockAccountTransactions = Student.AccountTransactions.mockAccountTransactions;
const mockMealPlans = Person.MealPlans.mockMealPlans;

const mockUseAnnouncements = jest.fn();
const mockUseMealPlans = jest.fn();
const mockUseResourcesByQueue = jest.fn();
const mockUseAccountTransactions = jest.fn();
const mockUseAccountBalance = jest.fn();

jest.mock('@osu-wams/hooks', () => {
  return {
    ...jest.requireActual('@osu-wams/hooks'),
    useAccountBalance: () => mockUseAccountBalance(),
    useAccountTransactions: () => mockUseAccountTransactions(),
    useAnnouncements: () => mockUseAnnouncements(),
    useMealPlans: () => mockUseMealPlans(),
    useResourcesByQueue: () => mockUseResourcesByQueue()
  };
});

describe('Finances page with standard data', () => {
  beforeEach(() => {
    mockUseAnnouncements.mockReturnValue(academicAnnouncementResult);
    mockUseMealPlans.mockReturnValue(mockMealPlans);
    mockUseResourcesByQueue.mockReturnValue(resourcesCardData);
    mockUseAccountTransactions.mockReturnValue(mockAccountTransactions);
    mockUseAccountBalance.mockReturnValue(mockAccountBalance);
  });

  it('should render the finances page', async () => {
    const { findByTestId, findByText } = render(<Finances />);
    await findByText('Finances');
    const page = await findByTestId('finances-page');
    expect(page).toBeInTheDocument();
  });

  it('should render Announcements and event cards when at least one event is present', async () => {
    const { findAllByTestId, findByTestId, findByText } = render(<Finances />);
    await findByText('Finances');
    await findByTestId('finances-announcements'); //will throw if no results
    await findAllByTestId('eventcard'); //will throw if no results
  });

  it('should not render Announcements with no events', async () => {
    mockUseAnnouncements.mockReturnValue({ data: [], loading: false, error: false });
    const { getByTestId, findByText } = render(<Finances />);
    await findByText('Student Account Balance');
    expect(() => getByTestId('finances-announcements')).toThrow(); //will throw if announcements is being displayed
  });
});
