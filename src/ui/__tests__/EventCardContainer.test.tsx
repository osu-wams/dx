import React from 'react';
import { waitForElement, fireEvent, cleanup } from '@testing-library/react';
import EventCardContainer from '../EventCardContainer';
import { render, authUser, mockEmployeeUser } from '../../util/test-utils';
import { announcementsData, announcementsData_10 } from '../__mocks__/announcements.data';
import {
  employeeEvents,
  studentExperienceEvents,
  studentExperienceEvents_10
} from '../__mocks__/events.data';
import { mockGAEvent } from '../../setupTests';
const mockUseAnnouncements = jest.fn();
const mockUseStudentExperienceEvents = jest.fn();
const mockUseCampusEvents = jest.fn();
const mockUseEmployeeEvents = jest.fn();

const mockNoData = { data: [], loading: false, error: false };

jest.mock('../../api/announcements', () => {
  return {
    ...jest.requireActual('../../api/announcements'),
    useAnnouncements: () => mockUseAnnouncements()
  };
});

jest.mock('../../api/events', () => {
  return {
    useStudentExperienceEvents: () => mockUseStudentExperienceEvents(),
    useCampusEvents: () => mockUseCampusEvents(),
    useEmployeeEvents: () => mockUseEmployeeEvents()
  };
});

describe('<EventCardContainer />', () => {
  // Set mock function result before running any tests
  beforeEach(() => {
    mockUseAnnouncements.mockReturnValue(announcementsData);
    mockUseStudentExperienceEvents.mockReturnValue(studentExperienceEvents);
    mockUseCampusEvents.mockReturnValue(studentExperienceEvents);
    mockUseEmployeeEvents.mockReturnValue(employeeEvents);
  });

  it('should show 5 student event cards', async () => {
    const { getAllByTestId, getByText, queryByText } = render(<EventCardContainer page="dashboard" />);
    // Need to wait for data to come in
    await waitForElement(() => getAllByTestId('eventcard'));
    expect(getByText(/Student Only Announcement/i)).toBeInTheDocument();
    expect(queryByText(/Employee Only Announcement/i)).not.toBeInTheDocument();
    expect(getAllByTestId('eventcard')).toHaveLength(5);
  });

  it('should show 7 employee event cards', async () => {
    const { getAllByTestId, getByText, queryByText } = render(<EventCardContainer page="dashboard" />, {
      user: mockEmployeeUser
    });
    const events = await waitForElement(() => getAllByTestId('eventcard'));
    const employeeAnnouncement = getByText(/Employee Only Announcement/i);
    expect(events).toHaveLength(7);
    expect(employeeAnnouncement).toBeInTheDocument();
    expect(queryByText(/Student Only Announcement/i)).not.toBeInTheDocument();
  });

  it('should display text', async () => {
    const { getAllByTestId, getByText } = render(<EventCardContainer page="dashboard" />);
    await waitForElement(() => getAllByTestId('eventcard'));
    expect(getByText(/Announcement test body text 2/i)).toBeInTheDocument();
    expect(getByText(/Announcement link title/i)).toBeInTheDocument();
    expect(getByText(/Localist test title 1/i)).toBeInTheDocument();
  });

  it('should track clicks to events and announcements', async () => {
    const { getAllByTestId, getByText } = render(<EventCardContainer page="dashboard" />);
    await waitForElement(() => getAllByTestId('eventcard'));
    const localist = getByText(/Localist test title/i);
    const announcementLink = getByText(/Announcement link title/i);
    fireEvent.click(localist);
    fireEvent.click(announcementLink);
    expect(mockGAEvent).toHaveBeenCalledTimes(2);
  });

  it('should alternate types of events', async () => {
    const { getAllByTestId, getAllByText } = render(<EventCardContainer page="dashboard" />);
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
    const { getAllByTestId } = render(<EventCardContainer page="dashboard" />);
    await waitForElement(() => getAllByTestId('eventcard'));
    expect(getAllByTestId('eventcard')).toHaveLength(2);
  });

  it('should render only localist events when no announcements loaded', async () => {
    mockUseStudentExperienceEvents.mockReturnValue(studentExperienceEvents);
    mockUseAnnouncements.mockReturnValue(mockNoData);
    const { getAllByTestId } = render(<EventCardContainer page="dashboard" />);
    await waitForElement(() => getAllByTestId('eventcard'));
    expect(getAllByTestId('eventcard')).toHaveLength(3);
  });

  it('should only display a max of 12 eventcards', async () => {
    mockUseAnnouncements.mockReturnValue(announcementsData_10);
    mockUseStudentExperienceEvents.mockReturnValue(studentExperienceEvents_10);
    const { getAllByTestId } = render(<EventCardContainer page="dashboard" />);
    expect(await waitForElement(() => getAllByTestId('eventcard'))).toHaveLength(12);
  });

  it('should not display the announcements in the same order everytime', async () => {
    mockUseAnnouncements.mockReturnValue(announcementsData_10);
    mockUseStudentExperienceEvents.mockReturnValue(studentExperienceEvents_10);

    let match = true;

    const { getAllByTestId } = render(<EventCardContainer page="dashboard" />);
    const test1 = await waitForElement(() => getAllByTestId('eventcard'));

    // rerendering the screen, not using rerender because the randomizer is in a useEffect that isn't getting triggered by rerender
    cleanup();
    render(<EventCardContainer page="dashboard" />);
    const test2 = await waitForElement(() => getAllByTestId('eventcard'));

    // make sure they are the same length first
    expect(test1.length).toEqual(test2.length);

    // loop through each and check to see if either of the arrays at index x dont match
    for (let x = 0; x < test1.length; x++) {
      if (test1[x].innerHTML != test2[x].innerHTML) {
        match = false;
      }
    }

    expect(match).toBeFalsy(); // if the randomizer did it's job, match should have got set to false at some point
  });

  describe('Employee vs Student Events', () => {
    it('should see Student Events but not employee ones', async () => {
      const { getAllByTestId, queryByText, getByText } = render(
        <EventCardContainer page="dashboard" />
      );
      await waitForElement(() => getAllByTestId('eventcard'));
      expect(getByText(/Localist test title 1/i)).toBeInTheDocument();
      expect(queryByText(/2019 Oregon Employees/i)).not.toBeInTheDocument();
    });

    it('should see Employee Events but not student ones', async () => {
      const { getAllByTestId, queryByText, getByText } = render(
        <EventCardContainer page="dashboard" />,
        {
          user: mockEmployeeUser
        }
      );
      await waitForElement(() => getAllByTestId('eventcard'));
      expect(getByText(/Announcement test body text 3/i)).toBeInTheDocument();
      expect(getByText(/Announcement link title/i)).toBeInTheDocument();
      expect(queryByText(/Localist test title 1/i)).not.toBeInTheDocument();
      expect(getByText(/2019 Oregon Employees/i)).toBeInTheDocument();
    });
  });
});
