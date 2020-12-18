import React from 'react';
import Finances from '../Finances';
import { render, alterMock } from 'src/util/test-utils';
import { Announcements, Person, Resources, Student } from '@osu-wams/hooks';
import { ACADEMIC_ANNOUNCEMENTS_API } from 'src/mocks/apis';


const { resourcesCardData } = Resources.mockResources;
const { academicAnnouncementResult } = Announcements.mockAnnouncements;
const mockAccountBalance = Student.AccountBalance.mockAccountBalance;
const mockAccountTransactions = Student.AccountTransactions.mockAccountTransactions;
const mockMealPlans = Person.MealPlans.mockMealPlans;

describe('Finances page with standard data', () => {

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
    alterMock(ACADEMIC_ANNOUNCEMENTS_API, {
      data: [],
      loading: false,
      error: false
    })
    const { getByTestId, findByText } = render(<Finances />);
    await findByText('Student Account Balance');
    expect(() => getByTestId('finances-announcements')).toThrow(); //will throw if announcements is being displayed
  });
});
