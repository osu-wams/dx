import React from 'react';
import { waitForElement, wait } from '@testing-library/react';
import Finances from '../Finances';
import { renderWithUserContext, render } from '../../util/test-utils';
import {mockAcademicAnnouncementResult} from '../../api/__mocks__/announcements.data'

const mockUseAnnouncements = jest.fn()

jest.mock('../../api/announcements', () => ({
  useAnnouncements: () => mockUseAnnouncements()
}))

describe('<Finances />', () => {

  beforeEach(() => {
    mockUseAnnouncements.mockReturnValue(mockAcademicAnnouncementResult)
  })

  it('should render the finances page', async () => {
    const { getByTestId } = render(<Finances />);
    getByTestId('finances-page')
  });

  it('should display the title Finances', async () => {
    const { getByText } = render(<Finances />);
    await waitForElement(() => getByText('Finances'));
  });

  it('should not render Announcements with no events', async () => {
    mockUseAnnouncements.mockReturnValue({data: [], loading: false, error: false});
    const { getByTestId } = render(<Finances />)
    expect(() => getByTestId('finances-announcements')).toThrow() //will throw if announcements is being displayed
  })

  it('should render Announcements and event cards when at least one event is present', async () => {
    const { getAllByTestId, getByTestId } = render(<Finances />)
    await waitForElement(() => getByTestId('finances-announcements')) //will throw if no results
    await waitForElement(() => getAllByTestId('eventcard')) //will throw if no results
  }) 

});