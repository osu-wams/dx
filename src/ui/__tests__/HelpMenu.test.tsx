import React from 'react';
import userEvent from '@testing-library/user-event';
import { render } from 'src/util/test-utils';
import { HelpMenu } from '../HeaderNav/HelpMenu';
import { mockGAEvent } from 'src/setupTests';
import { act, screen } from '@testing-library/react';

it('Help button and Get Help link are in the menu and tracked via GA', async () => {
  render(<HelpMenu />);

  await act(async () => {
    userEvent.click(screen.getByRole('button', { name: /help/i }));
  });

  const helpLink = await screen.findByText('Get Help', { selector: 'a' });

  expect(helpLink).toBeInTheDocument();

  await act(async () => {
    userEvent.click(helpLink);
  });
  expect(mockGAEvent).toHaveBeenCalledTimes(2);
});

it('Feedback link tracked via GA', async () => {
  render(<HelpMenu />);

  await act(async () => {
    userEvent.click(screen.getByRole('button', { name: /help/i }));
  });

  const feedbackLink = await screen.findByText('Give feedback', { selector: 'a' });

  expect(feedbackLink).toBeInTheDocument();

  await act(async () => {
    userEvent.click(feedbackLink);
  });
  expect(mockGAEvent).toHaveBeenCalledTimes(2);
});

it('Getting Started link tracked via GA', async () => {
  render(<HelpMenu />);

  await act(async () => {
    userEvent.click(screen.getByRole('button', { name: /help/i }));
  });

  const gettingStartedLink = await screen.findByText('Getting Started', { selector: 'a' });

  expect(gettingStartedLink).toBeInTheDocument();

  await act(async () => {
    userEvent.click(gettingStartedLink);
  });
  expect(mockGAEvent).toHaveBeenCalledTimes(2);
});
