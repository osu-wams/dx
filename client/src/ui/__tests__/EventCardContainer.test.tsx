import React from 'react';
import { render, waitForElement } from '@testing-library/react';
import EventCardContainer from '../EventCardContainer';

jest.unmock('../../api/announcements');
jest.unmock('../../api/events');

const mockAnnouncements = [
  {
    id: '12345',
    attributes: {
      title: 'Announcement test title 1',
      field_announcement_body: 'Announcement test body text 1',
      field_announcement_action: {
        uri: 'https://oregonstate.edu',
        title: 'Announcement link title'
      },
      background_image:
        'http://dev-api-dx.pantheonsite.io/sites/default/files/2019-03/example_image_0.jpg'
    }
  },
  {
    id: '67890',
    attributes: {
      title: 'Announcement test title 2',
      field_announcement_body: 'Announcement test body text 2',
      field_announcement_action: null
    }
  }
];

const mockLocalist = [
  {
    event: {
      title: 'Localist test title 1',
      photo_url:
        'http://dev-api-dx.pantheonsite.io/sites/default/files/2019-03/example_image_0.jpg',
      localist_url: 'https://events.oregonstate.edu/event/intro_to_media_workshop_2369',
      event_instances: [
        {
          event_instance: {
            id: '13579'
          }
        }
      ]
    }
  }
];

const mockGetAnnouncements = jest.fn();
const mockGetStudentExperienceEvents = jest.fn();

jest.mock('../../api/announcements', () => {
  return {
    getAnnouncements: () => mockGetAnnouncements()
  };
});

jest.mock('../../api/events', () => {
  return {
    getStudentExperienceEvents: () => mockGetStudentExperienceEvents()
  };
});

// @OTODO - Whate were we planning on doing with this?
// const desktop = () => {
//   const spy = jest.spyOn(window, 'matchMedia');
//   spy.mockImplementation(query => {
//     return {
//       matches: true,
//       media: query,
//       onchange: null,
//       addListener: jest.fn(),
//       removeListener: jest.fn(),
//       addEventListener: jest.fn(),
//       removeEventListener: jest.fn(),
//       dispatchEvent: jest.fn()
//     };
//   });
//   return spy;
// };

describe('<EventCardContainer />', () => {
  // Set mock function result before running any tests
  beforeAll(() => {
    mockGetAnnouncements.mockResolvedValue(Promise.resolve(mockAnnouncements));
    mockGetStudentExperienceEvents.mockResolvedValue(Promise.resolve(mockLocalist));
  });

  it('should render all cards', async () => {
    const { getAllByTestId } = render(<EventCardContainer />);
    // Need to wait for data to come in
    await waitForElement(() => getAllByTestId('eventcard'));

    expect(getAllByTestId('eventcard')).toHaveLength(3);
  });

  it('should render only announcements when no localist events loaded', async () => {
    mockGetStudentExperienceEvents.mockResolvedValueOnce(Promise.resolve([]));
    const { getAllByTestId } = render(<EventCardContainer />);
    await waitForElement(() => getAllByTestId('eventcard'));
    expect(getAllByTestId('eventcard')).toHaveLength(2);
  });

  it('should render only localist events when no announcements loaded', async () => {
    mockGetAnnouncements.mockResolvedValueOnce(Promise.resolve([]));
    const { getAllByTestId } = render(<EventCardContainer />);
    await waitForElement(() => getAllByTestId('eventcard'));
    expect(getAllByTestId('eventcard')).toHaveLength(1);
  });

  it('should display text', async () => {
    const { getAllByTestId, getByText } = render(<EventCardContainer />);
    await waitForElement(() => getAllByTestId('eventcard'));
    expect(getByText(/Announcement test body text 2/i)).toBeInTheDocument();
    expect(getByText(/Announcement link title/i)).toBeInTheDocument();
    expect(getByText(/Localist test title 1/i)).toBeInTheDocument();
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
});
