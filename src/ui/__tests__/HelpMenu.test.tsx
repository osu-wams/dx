import React from 'react';
import userEvent from '@testing-library/user-event';
import { renderWithAllContexts as render } from 'src/util/test-utils';
import { HelpMenu } from '../HeaderNav/HelpMenu';
import { mockGAEvent } from 'src/setupTests';
import { screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

it('Help button and Get Help link are in the menu and tracked via GA', async () => {
  render(
    <BrowserRouter>
      <HelpMenu />
    </BrowserRouter>
  );

  userEvent.click(screen.getByRole('button', { name: /help/i }));

  const helpLink = await screen.findByText('Get Help', { selector: 'a' });

  expect(helpLink).toBeInTheDocument();

  userEvent.click(helpLink);
  expect(mockGAEvent).toHaveBeenCalledTimes(2);
});

it('Feedback link tracked via GA', async () => {
  render(
    <BrowserRouter>
      <HelpMenu />
    </BrowserRouter>
  );

  userEvent.click(screen.getByRole('button', { name: /help/i }));

  const feedbackLink = await screen.findByText('Give feedback', { selector: 'a' });

  expect(feedbackLink).toBeInTheDocument();

  userEvent.click(feedbackLink);
  expect(mockGAEvent).toHaveBeenCalledTimes(2);
});

it('About MyOregonState link tracked via GA', async () => {
  render(
    <BrowserRouter>
      <HelpMenu />
    </BrowserRouter>
  );

  userEvent.click(screen.getByRole('button', { name: /help/i }));

  const about = await screen.findByText(/About MyOregonState/i, { selector: 'a' });
  expect(about).toBeInTheDocument();

  userEvent.click(about);
  expect(mockGAEvent).toHaveBeenCalledTimes(2);
});
