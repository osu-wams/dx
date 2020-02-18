import React from 'react';
import userEvent from '@testing-library/user-event';
import { wait } from '@testing-library/react';
import { render } from '../../util/test-utils';
import { MobileMenuStudents } from '../MainNav/MobileMenuStudents';
import { mockGAEvent } from '../../setupTests';

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

  await wait(() => expect(mockGAEvent).toHaveBeenCalledTimes(4));
});
