import React from 'react';
import { fireEvent, waitForElement } from '@testing-library/react';
import { render, mockAppContext } from '../../util/test-utils';
import mockCourseSchedule from '../../api/student/__mocks__/courses.data';
import Courses from '../Courses';
import { mockGAEvent } from '../../setupTests';
import { format } from '../../util/helpers';
import { startDate } from '../schedule/schedule-utils';

const mockUseCourseSchedule = jest.fn();

jest.mock('../../api/student', () => ({
  useCourseSchedule: () => {
    return mockUseCourseSchedule();
  }
}));

beforeEach(() => {
  mockUseCourseSchedule.mockReturnValue(mockCourseSchedule);
});

describe('<Courses />', () => {
  it('renders', () => {
    render(<Courses />);
  });

  it('renders a list of courses for the current user', async () => {
    const { getByText } = render(<Courses />);
    const courseTitle = await waitForElement(() => getByText(/data structures/i));
    expect(courseTitle).toBeInTheDocument();
  });

  it('Finds "7" as the course count in the Badge', async () => {
    const { getByText } = render(<Courses />);
    const NumCourses = await waitForElement(() => getByText('7'));
    expect(NumCourses).toBeInTheDocument();
  });

  it('renders a list of sorted courses for the current user', async () => {
    const { queryAllByTestId } = render(<Courses />);
    const courses = await waitForElement(() => queryAllByTestId('course-list-item-header'));
    expect(courses.map(c => c.textContent)).toStrictEqual([
      'CS261',
      'CS262',
      'CS290',
      'ED408',
      'PH212',
      'PH222',
      'WR214'
    ]);
  });
});

test('Specific course loads on click, close button closes', async () => {
  const { getByText, getByTestId, queryByTestId } = render(<Courses />);

  const OpSysBtn = await waitForElement(() => getByText(/data structures/i));
  fireEvent.click(OpSysBtn);

  // Dialg is present and displays the current course
  const courseDialog = await waitForElement(() => getByTestId('course-dialog'));
  expect(courseDialog).toBeInTheDocument();
  expect(courseDialog).toHaveTextContent(/data structures/i);

  // Close dialog
  const closeBtn = await waitForElement(() => getByText('Close'));
  fireEvent.click(closeBtn);
  expect(queryByTestId('course-dialog')).toBeNull();
});

test('Various Links are present as well as Google Analytics events are recorded', async () => {
  const { getByText, getByTestId } = render(<Courses />);

  const OpSysBtn = await waitForElement(() => getByText(/data structures/i));
  fireEvent.click(OpSysBtn);
  expect(mockGAEvent).toHaveBeenCalled();

  // Dialog is present and displays the current course
  const courseDialog = await waitForElement(() => getByTestId('course-dialog'));
  expect(courseDialog).toHaveTextContent(/data structures/i);

  // MapLink is present and clickable
  const MapLink = await waitForElement(() => getByText(/View Strand Agriculture Hall/i));
  fireEvent.click(MapLink);
  expect(mockGAEvent).toHaveBeenCalled();

  // Professor email link is clickable
  const ContactProfessorLink = await waitForElement(() => getByText(/E-mail Hess/i));
  fireEvent.click(ContactProfessorLink);
  expect(mockGAEvent).toHaveBeenCalled();

  // All Courses Link
  const ViewCoursesLink = await waitForElement(() => getByText(/view courses/i));
  fireEvent.click(ViewCoursesLink);
  expect(mockGAEvent).toHaveBeenCalled();
});

test('Course spells out the month and day for Final exams', async () => {
  const { findByText, getByTestId } = render(<Courses />);

  const TestoBtn = await waitForElement(() => findByText(/testo physics/i));
  fireEvent.click(TestoBtn);

  // Dialg is present and displays the corrent course
  const courseDialog = await waitForElement(() => getByTestId('course-dialog'));
  expect(courseDialog).toBeInTheDocument();

  // For Final exams we spell out the month and day (match meetingDateTime format on Course.tsx)
  const monthDay = format(startDate(), 'MMMM d');
  expect(courseDialog).toHaveTextContent(monthDay);
});

test('Course Midterm data is excluded from view', async () => {
  const { getByText, queryByText, getByTestId } = render(<Courses />);

  const TestoBtn = await waitForElement(() => getByText(/testo physics/i));
  fireEvent.click(TestoBtn);

  // Dialg is present and displays the corrent course
  const courseDialog = await waitForElement(() => getByTestId('course-dialog'));
  expect(courseDialog).toBeInTheDocument();

  // Mid terms are currently excluded due to inconsistent data source
  expect(queryByText(/MID GRP/)).not.toBeInTheDocument();
});

test('Footer has a Link that when clicked and Google Analytics Event fired', async () => {
  const { getByText } = render(<Courses />);
  const CanvasLink = await waitForElement(() => getByText(/View more in Canvas/i));
  fireEvent.click(CanvasLink);
  expect(mockGAEvent).toHaveBeenCalled();
});

describe('with an InfoButton in the CardFooter', () => {
  const validIinfoButtonId = 'current-courses';

  test('does not display the button when the infoButtonData is missing it', async () => {
    mockAppContext.infoButtonData = [{ id: 'invalid-id', content: 'content', title: 'title' }];
    const { queryByTestId } = render(<Courses />, { appContext: mockAppContext });
    const element = queryByTestId(validIinfoButtonId);
    expect(element).not.toBeInTheDocument();
  });

  test('displays the button when the infoButtonData is included', async () => {
    mockAppContext.infoButtonData = [
      { id: validIinfoButtonId, content: 'content', title: 'title' }
    ];
    const { getByTestId } = render(<Courses />, { appContext: mockAppContext });
    const element = await waitForElement(() => getByTestId(validIinfoButtonId));
    expect(element).toBeInTheDocument();
  });
});
