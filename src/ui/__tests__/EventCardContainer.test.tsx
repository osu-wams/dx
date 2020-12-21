import React from 'react';
import { cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EventCardContainer from '../EventCardContainer';
import { render, mockEmployeeUser } from 'src/util/test-utils';
import { Announcements, Events } from '@osu-wams/hooks';
import { mockGAEvent } from 'src/setupTests';

const { employeeEvents, studentExperienceEvents, studentExperienceEvents_10 } = Events.mockEvents;
const { announcementsData, announcementsData_10 } = Announcements.mockAnnouncements;
const mockUseAnnouncements = jest.fn();
const mockUseStudentExperienceEvents = jest.fn();
const mockUseCampusEvents = jest.fn();
const mockUseEmployeeEvents = jest.fn();

const mockNoData = { data: [], loading: false, error: false };

jest.mock('@osu-wams/hooks', () => {
  return {
    // @ts-ignore spread error on object only
    ...jest.requireActual('@osu-wams/hooks'),
    useAnnouncements: () => mockUseAnnouncements(),
    useStudentExperienceEvents: () => mockUseStudentExperienceEvents(),
    useCampusEvents: () => mockUseCampusEvents(),
    useEmployeeEvents: () => mockUseEmployeeEvents(),
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
    const { findAllByTestId, getByText, queryByText } = render(
      <EventCardContainer page="dashboard" />
    );
    // Need to wait for data to come in
    const cards = await findAllByTestId('eventcard');
    expect(getByText(/Student Only Announcement/i)).toBeInTheDocument();
    expect(queryByText(/Employee Only Announcement/i)).not.toBeInTheDocument();
    expect(cards).toHaveLength(5);
  });

  it('should show 6 employee event cards for an employee in corvallis', async () => {
    const { findAllByTestId, getByText, queryByText } = render(
      <EventCardContainer page="dashboard" />,
      {
        user: mockEmployeeUser,
      }
    );
    const events = await findAllByTestId('eventcard');
    expect(events).toHaveLength(6);
    expect(getByText(/Employee Only Announcement/i)).toBeInTheDocument();
    expect(queryByText(/Student Only Announcement/i)).not.toBeInTheDocument();
    expect(queryByText(/Transfer Tuesdays at COCC/i)).not.toBeInTheDocument();
    expect(
      queryByText(/The Road Less Traveled - Willamette Valley PhotoArts Guild Exhibit/i)
    ).toBeInTheDocument();
  });

  it('should show 6 employee event cards for an employee in corvallis with a non-standard campus code', async () => {
    const { findAllByTestId, getByText, queryByText } = render(
      <EventCardContainer page="dashboard" />,
      {
        user: {
          ...mockEmployeeUser,
          data: { ...mockEmployeeUser.data, audienceOverride: { campusCode: 'J' } },
        },
      }
    );
    const events = await findAllByTestId('eventcard');
    expect(events).toHaveLength(6);
    expect(getByText(/Employee Only Announcement/i)).toBeInTheDocument();
    expect(queryByText(/Student Only Announcement/i)).not.toBeInTheDocument();
    expect(queryByText(/Transfer Tuesdays at COCC/i)).not.toBeInTheDocument();
    expect(
      queryByText(/The Road Less Traveled - Willamette Valley PhotoArts Guild Exhibit/i)
    ).toBeInTheDocument();
  });

  it('should show 5 employee event cards for an employee in bend', async () => {
    const { findAllByTestId, getByText, queryByText } = render(
      <EventCardContainer page="dashboard" />,
      {
        user: {
          ...mockEmployeeUser,
          data: { ...mockEmployeeUser.data, audienceOverride: { campusCode: 'B' } },
        },
      }
    );
    const events = await findAllByTestId('eventcard');
    expect(events).toHaveLength(5);
    expect(getByText(/Employee Only Announcement/i)).toBeInTheDocument();
    expect(queryByText(/Student Only Announcement/i)).not.toBeInTheDocument();
    expect(queryByText(/Transfer Tuesdays at COCC/i)).toBeInTheDocument();
    expect(
      queryByText(/The Road Less Traveled - Willamette Valley PhotoArts Guild Exhibit/i)
    ).not.toBeInTheDocument();
  });

  it('should display text', async () => {
    const { findAllByTestId, getByText } = render(<EventCardContainer page="dashboard" />);
    await findAllByTestId('eventcard');
    expect(getByText(/Announcement test body text 2/i)).toBeInTheDocument();
    expect(getByText(/Announcement link title/i)).toBeInTheDocument();
    expect(getByText(/Localist test title 1/i)).toBeInTheDocument();
  });

  it('should track clicks to events and announcements', async () => {
    const { findAllByTestId, getByText } = render(<EventCardContainer page="dashboard" />);
    await findAllByTestId('eventcard');
    const localist = getByText(/Localist test title/i);
    const announcementLink = getByText(/Announcement link title/i);
    userEvent.click(localist);
    userEvent.click(announcementLink);
    expect(mockGAEvent).toHaveBeenCalledTimes(2);
  });

  it('should alternate types of events', async () => {
    const { findAllByTestId, getAllByText } = render(<EventCardContainer page="dashboard" />);
    const cards = await findAllByTestId('eventcard');
    const bodyText = getAllByText(/body text/i);
    expect(cards[0]).toContainElement(bodyText[0]);
    expect(cards[2]).toContainElement(bodyText[1]);
    expect(cards[1]).not.toContainElement(bodyText[0]);
    expect(cards[1]).not.toContainElement(bodyText[1]);
  });

  it('should render only announcements when no localist events loaded', async () => {
    mockUseStudentExperienceEvents.mockReturnValue(mockNoData);
    const { findAllByTestId } = render(<EventCardContainer page="dashboard" />);
    const cards = await findAllByTestId('eventcard');
    expect(cards).toHaveLength(2);
  });

  it('should render only localist events when no announcements loaded', async () => {
    mockUseStudentExperienceEvents.mockReturnValue(studentExperienceEvents);
    mockUseAnnouncements.mockReturnValue(mockNoData);
    const { findAllByTestId } = render(<EventCardContainer page="dashboard" />);
    const cards = await findAllByTestId('eventcard');
    expect(cards).toHaveLength(3);
  });

  it('should only display a max of 12 eventcards', async () => {
    mockUseAnnouncements.mockReturnValue(announcementsData_10);
    mockUseStudentExperienceEvents.mockReturnValue(studentExperienceEvents_10);
    const { findAllByTestId } = render(<EventCardContainer page="dashboard" />);
    expect(await findAllByTestId('eventcard')).toHaveLength(12);
  });

  it('should not display the announcements in the same order everytime', async () => {
    mockUseAnnouncements.mockReturnValue(announcementsData_10);
    mockUseStudentExperienceEvents.mockReturnValue(studentExperienceEvents_10);

    let match = true;

    const { findAllByTestId } = render(<EventCardContainer page="dashboard" />);
    const test1 = await findAllByTestId('eventcard');

    // rerendering the screen, not using rerender because the randomizer is in a useEffect that isn't getting triggered by rerender
    await cleanup();
    render(<EventCardContainer page="dashboard" />);
    const test2 = await findAllByTestId('eventcard');

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
      const { findAllByTestId, queryByText, getByText } = render(
        <EventCardContainer page="dashboard" />
      );
      await findAllByTestId('eventcard');
      expect(getByText(/Localist test title 1/i)).toBeInTheDocument();
      expect(queryByText(/2019 Oregon Employees/i)).not.toBeInTheDocument();
    });

    it('should see Employee Events but not student ones', async () => {
      const { findAllByTestId, queryByText, getByText } = render(
        <EventCardContainer page="dashboard" />,
        {
          user: mockEmployeeUser,
        }
      );
      await findAllByTestId('eventcard');
      expect(getByText(/Employee Only Announcement/i)).toBeInTheDocument();
      expect(getByText(/Announcement link title/i)).toBeInTheDocument();
      expect(queryByText(/Localist test title 1/i)).not.toBeInTheDocument();
      expect(getByText(/2019 Oregon Employees/i)).toBeInTheDocument();
    });
  });
});
