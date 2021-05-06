import React from 'react';
import { cleanup, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EventCardContainer from '../EventCardContainer';
import { render, mockEmployeeUser, alterMock } from 'src/util/test-utils';
import { State, Announcements, Events } from '@osu-wams/hooks';
import { mockGAEvent } from 'src/setupTests';
import { STUDENT_EVENTS_API, ANNOUNCEMENTS_API } from 'src/mocks/apis';

const { studentExperienceEvents, studentExperienceEvents_10 } = Events.mockEvents;
const { announcementsData, announcementsData_10 } = Announcements.mockAnnouncements;

describe('<EventCardContainer />', () => {
  // Set mock function result before running any tests
  beforeEach(() => {
    alterMock(ANNOUNCEMENTS_API, announcementsData.data);
    alterMock(STUDENT_EVENTS_API, studentExperienceEvents.data);
  });

  it('should show 5 student event cards', async () => {
    const { findByText, queryByText, getAllByTestId } = render(
      <EventCardContainer page={State.ANNOUNCEMENT_PAGES.dashboard} />
    );

    await waitFor(() => {
      expect(getAllByTestId('eventcard')).toHaveLength(5);
    });

    expect(await findByText(/Student Only Announcement/i)).toBeInTheDocument();
    expect(queryByText(/Employee Only Announcement/i)).not.toBeInTheDocument();
    expect(
      await findByText(/Katherine Dziedzic - Integrative Biology PhD Defense Seminar/i)
    ).toBeInTheDocument();
  });

  it('should show 6 employee event cards for an employee in corvallis', async () => {
    const { getAllByTestId, findByText, queryByText } = render(
      <EventCardContainer page={State.ANNOUNCEMENT_PAGES.dashboard} />,
      {
        user: mockEmployeeUser,
      }
    );

    expect(await findByText(/Employee Only Announcement/i)).toBeInTheDocument();
    expect(queryByText(/Student Only Announcement/i)).not.toBeInTheDocument();
    expect(queryByText(/Transfer Tuesdays at COCC/i)).not.toBeInTheDocument();
    expect(
      await findByText(/The Road Less Traveled - Willamette Valley PhotoArts Guild Exhibit/i)
    ).toBeInTheDocument();

    await waitFor(() => {
      expect(getAllByTestId('eventcard')).toHaveLength(6);
    });
  });

  it('should show 6 employee event cards for an employee in corvallis with a non-standard campus code', async () => {
    const { getAllByTestId, findByText, queryByText } = render(
      <EventCardContainer page={State.ANNOUNCEMENT_PAGES.dashboard} />,
      {
        user: {
          ...mockEmployeeUser,
          data: { ...mockEmployeeUser.data, audienceOverride: { campusCode: 'J' } },
        },
      }
    );

    await waitFor(() => {
      expect(getAllByTestId('eventcard')).toHaveLength(6);
    });
    expect(await findByText(/Employee Only Announcement/i)).toBeInTheDocument();
    expect(queryByText(/Student Only Announcement/i)).not.toBeInTheDocument();
    expect(queryByText(/Transfer Tuesdays at COCC/i)).not.toBeInTheDocument();
    expect(
      queryByText(/The Road Less Traveled - Willamette Valley PhotoArts Guild Exhibit/i)
    ).toBeInTheDocument();
  });

  it('should show 5 employee event cards for an employee in bend', async () => {
    const { getAllByTestId, findByText, queryByText } = render(
      <EventCardContainer page={State.ANNOUNCEMENT_PAGES.dashboard} />,
      {
        user: {
          ...mockEmployeeUser,
          data: { ...mockEmployeeUser.data, audienceOverride: { campusCode: 'B' } },
        },
      }
    );

    await waitFor(() => {
      expect(getAllByTestId('eventcard')).toHaveLength(5);
    });
    expect(await findByText(/Employee Only Announcement/i)).toBeInTheDocument();
    expect(queryByText(/Student Only Announcement/i)).not.toBeInTheDocument();
    expect(queryByText(/Transfer Tuesdays at COCC/i)).toBeInTheDocument();
    expect(
      queryByText(/The Road Less Traveled - Willamette Valley PhotoArts Guild Exhibit/i)
    ).not.toBeInTheDocument();
  });

  it('should display text', async () => {
    const { findAllByTestId, findByText } = render(
      <EventCardContainer page={State.ANNOUNCEMENT_PAGES.dashboard} />
    );
    await findAllByTestId('eventcard');
    expect(await findByText(/Announcement test body text 2/i)).toBeInTheDocument();
    expect(await findByText(/Announcement link title/i)).toBeInTheDocument();
    expect(await findByText(/Localist test title 1/i)).toBeInTheDocument();
  });

  it('should track clicks to events and announcements', async () => {
    const { findAllByTestId, findByText } = render(
      <EventCardContainer page={State.ANNOUNCEMENT_PAGES.dashboard} />
    );
    await findAllByTestId('eventcard');
    const localist = await findByText(/Localist test title/i);
    const announcementLink = await findByText(/Announcement link title/i);
    userEvent.click(localist);
    userEvent.click(announcementLink);
    expect(mockGAEvent).toHaveBeenCalledTimes(2);
  });

  it('should alternate types of events', async () => {
    const { getAllByTestId, getAllByText } = render(
      <EventCardContainer page={State.ANNOUNCEMENT_PAGES.dashboard} />
    );
    await waitFor(() => {
      const cards = getAllByTestId('eventcard');
      const bodyText = getAllByText(/body text/i);
      expect(cards[0]).toContainElement(bodyText[0]);
      expect(cards[2]).toContainElement(bodyText[1]);
      expect(cards[1]).not.toContainElement(bodyText[0]);
      expect(cards[1]).not.toContainElement(bodyText[1]);
    });
  });

  it('should render only announcements when no localist events loaded', async () => {
    alterMock(STUDENT_EVENTS_API, []);
    const { getAllByTestId } = render(
      <EventCardContainer page={State.ANNOUNCEMENT_PAGES.dashboard} />
    );
    await waitFor(() => {
      expect(getAllByTestId('eventcard')).toHaveLength(2);
    });
  });

  it('should render only localist events when no announcements loaded', async () => {
    alterMock(STUDENT_EVENTS_API, studentExperienceEvents.data);
    alterMock(ANNOUNCEMENTS_API, []);

    const { getAllByTestId } = render(
      <EventCardContainer page={State.ANNOUNCEMENT_PAGES.dashboard} />
    );

    await waitFor(() => {
      expect(getAllByTestId('eventcard')).toHaveLength(3);
    });
  });

  it('should only display a max of 12 eventcards', async () => {
    alterMock(ANNOUNCEMENTS_API, announcementsData_10.data);
    alterMock(STUDENT_EVENTS_API, studentExperienceEvents_10.data);

    const { getAllByTestId } = render(
      <EventCardContainer page={State.ANNOUNCEMENT_PAGES.dashboard} />
    );

    await waitFor(() => {
      expect(getAllByTestId('eventcard')).toHaveLength(12);
    });
  });

  it('should not display the announcements in the same order everytime', async () => {
    alterMock(ANNOUNCEMENTS_API, announcementsData_10.data);
    alterMock(STUDENT_EVENTS_API, studentExperienceEvents_10.data);
    let match = true;
    const { findAllByTestId } = render(
      <EventCardContainer page={State.ANNOUNCEMENT_PAGES.dashboard} />
    );
    const test1 = await findAllByTestId('eventcard');

    cleanup(); // ensure the dom fully clears and cleans before rendering a second time
    render(<EventCardContainer page={State.ANNOUNCEMENT_PAGES.dashboard} />);

    const test2 = await findAllByTestId('eventcard');
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
      const { findAllByTestId, queryByText, findByText } = render(
        <EventCardContainer page={State.ANNOUNCEMENT_PAGES.dashboard} />
      );
      await findAllByTestId('eventcard');
      expect(await findByText(/Localist test title 1/i)).toBeInTheDocument();
      expect(queryByText(/2019 Oregon Employees/i)).not.toBeInTheDocument();
    });

    it('should see Employee Events but not student ones', async () => {
      const { findAllByTestId, queryByText, findByText } = render(
        <EventCardContainer page={State.ANNOUNCEMENT_PAGES.dashboard} />,
        {
          user: mockEmployeeUser,
        }
      );
      await findAllByTestId('eventcard');
      expect(await findByText(/Employee Only Announcement/i)).toBeInTheDocument();
      expect(await findByText(/Announcement link title/i)).toBeInTheDocument();
      expect(queryByText(/Localist test title 1/i)).not.toBeInTheDocument();
      expect(await findByText(/2019 Oregon Employees/i)).toBeInTheDocument();
    });
  });
});
