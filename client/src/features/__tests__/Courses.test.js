import React from 'react';
import { render } from '../../componentTestUtils';
import { fireEvent, waitForElement } from 'react-testing-library';
import Courses from '../Courses';

test('renders', () => {
  render(<Courses />);
});

test('Specific course loads on click, close button closes', async () => {
  const { getByText, getByTestId, queryByTestId } = render(<Courses />);

  const OpSysBtn = await waitForElement(() => getByText('Operating Systems I'));
  fireEvent.click(OpSysBtn);

  // Dialg is present and matches the particular course CRN
  const courseDialog = await waitForElement(() => getByTestId('course-dialog'));
  expect(courseDialog).toBeInTheDocument();
  expect(courseDialog).toHaveTextContent(/CRN: 17851/i);

  // Close dialog
  const closeBtn = await waitForElement(() => getByText('Close'));
  fireEvent.click(closeBtn);
  expect(queryByTestId('course-dialog')).toBeNull();
});

describe('<Courses />', () => {
  it('renders a list of courses for the current user', async () => {
    const { getByText } = render(<Courses />);
    const courseTitle = await waitForElement(() => getByText(/operating systems i/i));
    expect(courseTitle).toBeInTheDocument();
  });
});
