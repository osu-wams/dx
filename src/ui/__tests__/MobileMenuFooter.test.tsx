import React from 'react';
import userEvent from '@testing-library/user-event';
import { render } from 'src/util/test-utils';
import { MobileMenuFooter } from '../MainNav/MobileMenuFooter';
import { mockGAEvent } from 'src/setupTests';

// To avoid calling the parent prop
const mockToggle = jest.fn();

test('More menu has links that are tracked via Google Analytics', async () => {
  const { getByText } = render(<MobileMenuFooter toggleFullMenu={mockToggle} />);

  const beta = getByText('Beta');
  const support = getByText('Help');
  const feedback = getByText('Feedback');

  userEvent.click(beta);
  userEvent.click(support);
  userEvent.click(feedback);

  expect(mockGAEvent).toHaveBeenCalledTimes(3);
});
