import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { renderWithAllContexts as render } from 'src/util/test-utils';
import { MobileMenuFooter } from '../MainNav/MobileMenuFooter';
import { mockGAEvent } from 'src/setupTests';

// To avoid calling the parent prop
const mockToggle = jest.fn();

test('More menu has links that are tracked via Google Analytics', async () => {
  render(<MobileMenuFooter toggleFullMenu={mockToggle} />);

  userEvent.click(screen.getByText('About'));
  userEvent.click(screen.getByText('Help'));
  userEvent.click(screen.getByText('Feedback'));

  expect(mockGAEvent).toHaveBeenCalledTimes(3);
});
