import React from 'react';
import { render, fireEvent, waitForElement } from 'react-testing-library';
import Courses from '../Courses';

test('renders', () => {
  render(<Courses />);
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

describe('<Courses />', () => {
  it('renders a list of courses for the current user', async () => {
    const { getByText } = render(<Courses />);
    const courseTitle = await waitForElement(() => getByText(/data structures/i));
    expect(courseTitle).toBeInTheDocument();
  });
});
