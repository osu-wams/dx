import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { alterMock, render } from 'src/util/test-utils';
import Courses from '../Courses';
import { mockGAEvent } from 'src/setupTests';
import { format } from 'src/util/helpers';
import { startDate } from '../schedule/schedule-utils';
import { infoButtonState } from 'src/state';
import { CLASS_SCHEDULE_API } from 'src/mocks/apis';

const mockInitialState = jest.fn();

describe('<Courses />', () => {
  beforeEach(() => {
    render(<Courses />);
  });
  it('renders a list of courses for the current user', async () => {
    const courseTitle = await screen.findByText(/data structures/i);
    expect(courseTitle).toBeInTheDocument();
  });

  it('Finds "8" as the course count in the Badge', async () => {
    const NumCourses = await screen.findByText('8');
    expect(NumCourses).toBeInTheDocument();
  });

  it('renders a list of sorted courses for the current user', async () => {
    const courses = await screen.findAllByTestId('course-list-item-header');
    expect(courses.map((c) => c.textContent)).toStrictEqual([
      'CS261',
      'CS262',
      'CS290',
      'ED408',
      'PH212',
      'PH222',
      'RL100',
      'WR214',
    ]);
  });

  it('loads a modal with course details when clicked, close button dismisses it', async () => {
    const OpSysBtn = await screen.findByText(/data structures/i);
    userEvent.click(OpSysBtn);

    // Dialg is present and displays the current course
    const courseDialog = await screen.findByTestId('course-dialog');
    expect(courseDialog).toBeInTheDocument();
    expect(courseDialog).toHaveTextContent(/data structures/i);
    expect(courseDialog).toHaveTextContent(/CRN 23909/i);

    // Close dialog
    const closeBtn = await screen.findByText('Close');
    userEvent.click(closeBtn);
    expect(screen.queryByTestId('course-dialog')).not.toBeInTheDocument();
  });

  it('Various Links are present as well as Google Analytics events are recorded', async () => {
    const OpSysBtn = await screen.findByText(/data structures/i);
    userEvent.click(OpSysBtn);

    // Dialog is present and displays the current course
    const courseDialog = await screen.findByTestId('course-dialog');
    expect(courseDialog).toHaveTextContent(/data structures/i);

    // MapLink is present and clickable
    const MapLink = await screen.findByText(/View Strand Agriculture Hall/i);
    userEvent.click(MapLink);

    // Professor email link is clickable
    const ContactProfessorLink = await screen.findByText(/E-mail Hess/i);
    userEvent.click(ContactProfessorLink);

    // All Courses Link
    const ViewCoursesLink = await screen.findByText(/view courses/i);
    userEvent.click(ViewCoursesLink);

    // We click 4 links, so 4 GA events need to have been triggered
    expect(mockGAEvent).toHaveBeenCalledTimes(4);
  });

  it('Course spells out the month and day for Final exams', async () => {
    const TestoBtn = await screen.findByText(/testo physics/i);
    userEvent.click(TestoBtn);

    // Dialg is present and displays the corrent course
    const courseDialog = await screen.findByTestId('course-dialog');
    expect(courseDialog).toBeInTheDocument();

    // For Final exams we spell out the month and day (match meetingDateTime format on Course.tsx)
    const monthDay = format(startDate(), 'MMMM d');
    expect(courseDialog).toHaveTextContent(monthDay);
  });

  it('Course Midterm data is excluded from view', async () => {
    const TestoBtn = await screen.findByText(/testo physics/i);
    userEvent.click(TestoBtn);

    // Dialg is present and displays the corrent course
    const courseDialog = await screen.findByTestId('course-dialog');
    expect(courseDialog).toBeInTheDocument();

    // Mid terms are currently excluded due to inconsistent data source
    expect(screen.queryByText(/MID GRP/)).not.toBeInTheDocument();
  });

  it('Footer has a Link that when clicked and Google Analytics Event fired', async () => {
    const CanvasLink = await screen.findByText(/View more in Canvas/i);
    userEvent.click(CanvasLink);

    expect(mockGAEvent).toHaveBeenCalledTimes(1);
  });
});

describe('with an InfoButton in the CardFooter', () => {
  it('does not display the button when the infoButtonData is missing it', async () => {
    mockInitialState.mockReturnValue([
      {
        state: infoButtonState,
        value: [{ content: '...', id: 'some-other-id', title: '...' }],
      },
    ]);
    const { queryByTestId } = render(<Courses />, { initialStates: mockInitialState() });
    const element = queryByTestId('current-courses');
    expect(element).not.toBeInTheDocument();
  });

  it('displays the button when the infoButtonData is included', async () => {
    mockInitialState.mockReturnValue([
      {
        state: infoButtonState,
        value: [
          { content: 'Info Button Content', id: 'current-courses', title: 'Info Button Title' },
        ],
      },
    ]);
    const { getByTestId } = render(<Courses />, { initialStates: mockInitialState() });
    const element = getByTestId('current-courses');
    expect(element).toBeInTheDocument();
  });
});

describe('without courses present', () => {
  beforeEach(() => {
    alterMock(CLASS_SCHEDULE_API, []);
    render(<Courses />);
  });

  it('contains message about no courses scheduled this term', () => {
    expect(screen.getByText(/do not have any courses scheduled/i)).toBeInTheDocument();
  });

  it('contains past courses link and tracked in GA', () => {
    const pastCoursesLink = screen.getByText(/past courses and grades/i, { selector: 'a' });
    expect(pastCoursesLink).toBeInTheDocument();

    userEvent.click(pastCoursesLink);
    expect(mockGAEvent).toHaveBeenCalledTimes(1);
  });
});
