import React from 'react';
import { renderWithAllContexts as render, alterMock } from 'src/util/test-utils';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AcademicCalendar from '../AcademicCalendar';
import { State, Events } from '@osu-wams/hooks';
import { mockGAEvent } from 'src/setupTests';
import { ACADEMIC_CALENDAR_API } from 'src/mocks/apis';

const { academicCalendar3 } = Events.mockEvents;
const mockInitialState = jest.fn();

describe('<AcademicCalendar />', () => {
  it('should find the "Testo Event" as a title', async () => {
    render(<AcademicCalendar />);
    const eventTitle = await screen.findByText('Testo Event');
    expect(eventTitle).toBeInTheDocument();
  });

  it('Displays a maximum of 5 events, even if there are more', async () => {
    render(<AcademicCalendar />);
    await screen.findByText('Testo Event');

    const eventCounter = await screen.findByTestId('icon-counter');
    expect(eventCounter).toHaveTextContent('5');
  });

  it('can click on footer and event to send data to analytics', async () => {
    render(<AcademicCalendar />);
    const eventTitle = await screen.findByText('Testo Event');
    userEvent.click(eventTitle);

    const viewCalendar = await screen.findByText('View more in the academic calendar');
    userEvent.click(viewCalendar);
    expect(mockGAEvent).toHaveBeenCalledTimes(2);
  });

  it('should have "3" as a value when only 3 calendar events are present', async () => {
    alterMock(ACADEMIC_CALENDAR_API, academicCalendar3.data);
    render(<AcademicCalendar />);
    expect(await screen.findByText(/8-week session begins/i)).toBeInTheDocument();

    const eventCounter = await screen.findByTestId('icon-counter');
    expect(eventCounter).toHaveTextContent('3');
  });

  it('should return "No Calendar Events" when no events are loaded', async () => {
    alterMock(ACADEMIC_CALENDAR_API, []);
    render(<AcademicCalendar />);
    expect(await screen.findByText('No Calendar Events')).toBeInTheDocument();
  });
});

describe('with an InfoButton in the CardFooter', () => {
  test('does not display the button when the infoButtonData is missing it', async () => {
    mockInitialState.mockReturnValue([
      {
        state: State.infoButtonState,
        value: [{ content: '...', id: 'some-other-id', title: '...' }],
      },
    ]);
    render(<AcademicCalendar />, {
      initialStates: mockInitialState(),
    });

    const element = screen.queryByTestId('academic-calendar');
    expect(element).not.toBeInTheDocument();
  });

  test('displays the button when the infoButtonData is included', async () => {
    mockInitialState.mockReturnValue([
      {
        state: State.infoButtonState,
        value: [
          { content: 'Info Button Content', id: 'academic-calendar', title: 'Info Button Title' },
        ],
      },
    ]);
    render(<AcademicCalendar />, {
      initialStates: mockInitialState(),
    });

    const element = screen.getByTestId('academic-calendar');
    expect(element).toBeInTheDocument();
  });
});
