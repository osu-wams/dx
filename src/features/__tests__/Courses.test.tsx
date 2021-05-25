import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { renderWithAllContexts as render } from 'src/util/test-utils';
import Courses from '../Courses';
import { mockGAEvent, mockInitialState } from 'src/setupTests';
import { Helpers } from '@osu-wams/utils';
import { State } from '@osu-wams/hooks';
import { startDate } from '../schedule/schedule-utils';
import { mockCourseSchedule } from 'src/mocks/handlers';

describe('<Courses />', () => {
  beforeEach(() => {
    mockInitialState.mockReturnValueOnce([
      {
        state: State.courseState,
        value: { isLoading: false, isError: false, isSuccess: true, data: mockCourseSchedule },
      },
    ]);
    render(<Courses />, { initialStates: mockInitialState() });
  });
  it('renders a list of courses for the current user', async () => {
    const courseTitle = screen.getByText(/data structures/i);
    expect(courseTitle).toBeInTheDocument();
  });

  it('Finds "9" as the course count in the Badge', async () => {
    const NumCourses = screen.getByText('9');

    expect(NumCourses).toBeInTheDocument();
  });

  it('renders a list of sorted courses for the current user', async () => {
    const courses = screen.getAllByTestId('course-list-item-header');
    expect(courses.map((c) => c.textContent)).toStrictEqual([
      'CS261',
      'CS262',
      'CS290',
      'ED408',
      'GP100',
      'PH212',
      'PH222',
      'RL100',
      'WR214',
    ]);
  });

  it('loads a modal with course details when clicked, close button dismisses it', async () => {
    const OpSysBtn = screen.getByText(/data structures/i);
    userEvent.click(OpSysBtn);

    // Dialg is present and displays the current course
    const courseDialog = screen.getByTestId('course-dialog');
    expect(courseDialog).toBeInTheDocument();
    expect(courseDialog).toHaveTextContent(/data structures/i);
    expect(courseDialog).toHaveTextContent(/CRN 23909/i);

    // Close dialog
    const closeBtn = screen.getByText('Close');
    userEvent.click(closeBtn);
    expect(screen.queryByTestId('course-dialog')).not.toBeInTheDocument();
  });

  it('Various Links are present as well as Google Analytics events are recorded', async () => {
    const OpSysBtn = screen.getByText(/data structures/i);
    userEvent.click(OpSysBtn);

    // Dialog is present and displays the current course
    const courseDialog = screen.getByTestId('course-dialog');
    expect(courseDialog).toHaveTextContent(/data structures/i);

    // MapLink is present and clickable
    const MapLink = screen.getByText(/View Strand Agriculture Hall/i);
    userEvent.click(MapLink);

    // Professor email link is visible, it shoudn't be clicked with jest though,
    // the testing framework doesn't support a href="mailto:...."
    expect(screen.getByText(/E-mail Hess/i)).toBeInTheDocument();

    // All Courses Link
    const ViewCoursesLink = screen.getByText(/view courses/i);
    userEvent.click(ViewCoursesLink);

    // We click 4 links, so 4 GA events need to have been triggered
    expect(mockGAEvent).toHaveBeenCalledTimes(3);
  });

  it('Course spells out the month and day for Final exams', async () => {
    const TestoBtn = screen.getByText(/testo physics/i);
    userEvent.click(TestoBtn);

    // Dialg is present and displays the corrent course
    const courseDialog = screen.getByTestId('course-dialog');
    expect(courseDialog).toBeInTheDocument();

    // For Final exams we spell out the month and day (match meetingDateTime format on Course.tsx)
    const monthDay = Helpers.format(startDate(), 'MMMM d');
    expect(courseDialog).toHaveTextContent(monthDay);
  });

  it('Course Midterm data is excluded from view', async () => {
    const TestoBtn = screen.getByText(/testo physics/i);

    expect(screen.queryByTestId('course-dialog')).not.toBeInTheDocument();
    userEvent.click(TestoBtn);

    // Dialg is present and displays the corrent course
    const courseDialog = screen.getByTestId('course-dialog');
    expect(courseDialog).toBeInTheDocument();

    // Mid terms are currently excluded due to inconsistent data source
    expect(screen.queryByText(/MID GRP/)).not.toBeInTheDocument();
  });

  it('Footer has a Link that when clicked and Google Analytics Event fired', async () => {
    const CanvasLink = screen.getByText(/View more in Canvas/i);
    userEvent.click(CanvasLink);

    expect(mockGAEvent).toHaveBeenCalledTimes(1);
  });
});

describe('with an InfoButton in the CardFooter and missing data', () => {
  beforeEach(() => {
    mockInitialState.mockReturnValueOnce([
      {
        state: State.infoButtonState,
        value: [{ content: '...', id: 'some-other-id', title: '...' }],
      },
    ]);
  });

  it('does not display the button when the infoButtonData is missing it', async () => {
    render(<Courses />, { initialStates: mockInitialState() });
    const element = screen.queryByTestId('current-courses');
    expect(element).not.toBeInTheDocument();
  });
});
describe('with an InfoButton in the CardFooter', () => {
  beforeEach(() => {
    mockInitialState.mockReturnValueOnce([
      {
        state: State.infoButtonState,
        value: [
          { content: 'Info Button Content', id: 'current-courses', title: 'Info Button Title' },
        ],
      },
    ]);
  });

  it('displays the button when the infoButtonData is included', async () => {
    render(<Courses />, { initialStates: mockInitialState() });

    expect(screen.getByTestId('current-courses')).toBeInTheDocument();
  });
});

describe('without courses present', () => {
  beforeEach(() => {
    mockInitialState.mockReturnValueOnce([
      {
        state: State.courseState,
        value: { isLoading: false, isError: false, isSuccess: true, data: [] },
      },
    ]);
    render(<Courses />, { initialStates: mockInitialState() });
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
