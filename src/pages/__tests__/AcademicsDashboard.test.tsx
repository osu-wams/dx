import React from 'react';
import { renderWithUserContext, render } from '../../util/test-utils';
import AcademicsDashboard from '../Academics/AcademicsDashboard';
import { waitForElement, wait } from '@testing-library/dom';
import {mockAcademicAnnouncementResult} from '../../api/__mocks__/announcements.data'


const mockUseAnnouncements = jest.fn()

jest.mock('../../api/announcements', () => ({
  useAnnouncements: () => mockUseAnnouncements()
}))

describe('<AcademicsDashboard />', () => {
  beforeEach(() => {
    mockUseAnnouncements.mockReturnValue(mockAcademicAnnouncementResult)
  })

  it('renders without errors', async () => {
    const { getByTestId } = renderWithUserContext(<AcademicsDashboard />);
    getByTestId('academics-dashboard')
  })

  it('should not render Announcements with no events', async () => {
    mockUseAnnouncements.mockReturnValue({data: [], loading: false, error: false});
    const { getByTestId } = render(<AcademicsDashboard />)
    expect(() => getByTestId('academics-announcements')).toThrow() //will throw if announcements is being displayed
  })

  it('should render Announcements and event cards when at least one event is present', async () => {
    const { getAllByTestId, getByTestId } = render(<AcademicsDashboard />)
    await waitForElement(() => getByTestId('academics-announcements')) //will throw if no results
    await waitForElement(() => getAllByTestId('eventcard')) //will throw if no results
  }) 

});
