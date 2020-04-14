import React from 'react';
import userEvent from '@testing-library/user-event';
import { waitFor } from '@testing-library/react';
import { render } from 'src/util/test-utils';
import { MobileMenuStudents } from '../MainNav/MobileMenuStudents';
import { mockGAEvent } from 'src/setupTests';

const mockToggle = jest.fn();

test('More menu has links that are tracked via Google Analytics', async () => {
  const { getByText } = render(<MobileMenuStudents toggleFullMenu={mockToggle} />);

  const resources = getByText('Resources');
  const academics = getByText('Academics');
  const finances = getByText('Finances');
  const overview = getByText('Overview');

  userEvent.click(resources);
  userEvent.click(academics);
  userEvent.click(finances);
  userEvent.click(overview);

  await waitFor(() => expect(mockGAEvent).toHaveBeenCalledTimes(4));
});
