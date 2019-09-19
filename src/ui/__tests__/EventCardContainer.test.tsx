import React from 'react';
import { waitForElement, fireEvent } from '@testing-library/react';
import { render } from '../../util/test-utils';
import EventCardContainer from '../EventCardContainer';
import { announcementsData, localistData } from '../__mocks__/announcements.data';
import { mockGAEvent } from '../../setupTests';

const mockUseAnnouncements = jest.fn();
const mockUseStudentExperienceEvents = jest.fn();
const mockNoData = {data:[], loading: false, error: false}

jest.mock('../../api/announcements', () => {
  return {
    useAnnouncements: () => mockUseAnnouncements()
  };
});

jest.mock('../../api/events', () => {
  return {
    useStudentExperienceEvents: () => mockUseStudentExperienceEvents()
  };
});

describe('<EventCardContainer />', () => {
  // Set mock function result before running any tests
  beforeAll(() => {
    mockUseAnnouncements.mockReturnValue(announcementsData);
    mockUseStudentExperienceEvents.mockReturnValue(localistData);
  });

  it('should render all cards', async () => {
    const { getAllByTestId } = render(<EventCardContainer />);
    // Need to wait for data to come in
    await waitForElement(() => getAllByTestId('eventcard'));

    expect(getAllByTestId('eventcard')).toHaveLength(3);
  });

  it('should display text', async () => {
    const { getAllByTestId, getByText } = render(<EventCardContainer />);
    await waitForElement(() => getAllByTestId('eventcard'));
    expect(getByText(/Announcement test body text 2/i)).toBeInTheDocument();
    expect(getByText(/Announcement link title/i)).toBeInTheDocument();
    expect(getByText(/Localist test title 1/i)).toBeInTheDocument();
  });

  it('should track clicks to events and announcements', async () => {
    const { getAllByTestId, getByText } = render(<EventCardContainer />);
    await waitForElement(() => getAllByTestId('eventcard'));
    const localist = getByText(/Localist test title/i);
    const announcementLink = getByText(/Announcement link title/i);
    fireEvent.click(localist);
    fireEvent.click(announcementLink);
    expect(mockGAEvent).toHaveBeenCalledTimes(2);
  });

  it('should alternate types of events', async () => {
    const { getAllByTestId, getAllByText } = render(<EventCardContainer />);
    await waitForElement(() => getAllByTestId('eventcard'));
    const cards = getAllByTestId('eventcard');
    const bodyText = getAllByText(/body text/i);
    expect(cards[0]).toContainElement(bodyText[0]);
    expect(cards[2]).toContainElement(bodyText[1]);
    expect(cards[1]).not.toContainElement(bodyText[0]);
    expect(cards[1]).not.toContainElement(bodyText[1]);
  });

  it('should render only announcements when no localist events loaded', async () => {
    mockUseStudentExperienceEvents.mockReturnValue(mockNoData);
    const { getAllByTestId } = render(<EventCardContainer />);
    await waitForElement(() => getAllByTestId('eventcard'));
    expect(getAllByTestId('eventcard')).toHaveLength(2);
  });

  it('should render only localist events when no announcements loaded', async () => {
    mockUseStudentExperienceEvents.mockReturnValue(localistData)
    mockUseAnnouncements.mockReturnValue(mockNoData);
    const { getAllByTestId } = render(<EventCardContainer />);
    await waitForElement(() => getAllByTestId('eventcard'));
    expect(getAllByTestId('eventcard')).toHaveLength(1);
  });

});
