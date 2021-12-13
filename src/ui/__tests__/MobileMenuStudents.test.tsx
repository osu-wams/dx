import React from 'react';
import userEvent from '@testing-library/user-event';
import { waitFor, screen } from '@testing-library/react';
import { renderWithAllContexts as render } from 'src/util/test-utils';
import { MobileMenuStudents } from '../MainNav/MobileMenuStudents';
import { mockGAEvent } from 'src/setupTests';
import { BrowserRouter } from 'react-router-dom';

const mockToggle = jest.fn();

test('More menu has links that are tracked via Google Analytics', async () => {
  render(
    <BrowserRouter>
      <MobileMenuStudents toggleFullMenu={mockToggle} />
    </BrowserRouter>
  );

  const resources = screen.getByText('Resources');
  const academics = screen.getByText('Academics');
  const finances = screen.getByText('Finances');
  const overview = screen.getByText('Overview');

  userEvent.click(resources);
  userEvent.click(academics);
  userEvent.click(finances);
  userEvent.click(overview);

  await waitFor(() => expect(mockGAEvent).toHaveBeenCalledTimes(4));
});
