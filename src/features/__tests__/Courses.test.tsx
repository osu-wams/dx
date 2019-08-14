import React from 'react';
import { render, fireEvent, waitForElement } from '@testing-library/react';
import mockCourseSchedule from '../../api/student/__mocks__/courses.data';
import Courses from '../Courses';

const mockGetCourseSchedule = jest.fn();

jest.mock('../../api/student', () => ({
  getCourseSchedule: () => mockGetCourseSchedule(),
}));

describe('<Courses />', () => {
  beforeAll(() => {
    mockGetCourseSchedule.mockResolvedValue(Promise.resolve(mockCourseSchedule));
  });

  it('renders', () => {
    render(<Courses />);
  });

  it('renders a list of courses for the current user', async () => {
    const { getByText } = render(<Courses />);
    const courseTitle = await waitForElement(() => getByText(/data structures/i));
    expect(courseTitle).toBeInTheDocument();
  });

  it('Finds "8" as the course count in the Badge', async () => {
    const { getByText } = render(<Courses />);
    const NumCourses = await waitForElement(() => getByText('8'));
    expect(NumCourses).toBeInTheDocument();
  });
});

test('Specific course loads on click, close button closes', async () => {
  const { getByText, getByTestId, queryByTestId } = render(<Courses />);

  const OpSysBtn = await waitForElement(() => getByText(/data structures/i));
  fireEvent.click(OpSysBtn);

  // Dialg is present and displays the corrent course
  const courseDialog = await waitForElement(() => getByTestId('course-dialog'));
  expect(courseDialog).toBeInTheDocument();
  expect(courseDialog).toHaveTextContent(/data structures/i);

  // Close dialog
  const closeBtn = await waitForElement(() => getByText('Close'));
  fireEvent.click(closeBtn);
  expect(queryByTestId('course-dialog')).toBeNull();
});

test('Course spells out the month and day "december 6" for Final exams', async () => {
  const { getByText, getByTestId } = render(<Courses />);

  const TestoBtn = await waitForElement(() => getByText(/testo physics/i));
  fireEvent.click(TestoBtn);

  // Dialg is present and displays the corrent course
  const courseDialog = await waitForElement(() => getByTestId('course-dialog'));
  expect(courseDialog).toBeInTheDocument();

  // For Final exams we spell out the month and day
  expect(courseDialog).toHaveTextContent(/december 6/i);
});
