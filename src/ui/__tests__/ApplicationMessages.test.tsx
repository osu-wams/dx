/* eslint-disable testing-library/no-node-access */
import React from 'react';
import { renderWithAllContexts as render } from 'src/util/test-utils';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Message } from '@osu-wams/lib';
import { State } from '@osu-wams/hooks';
import { ApplicationMessages } from '../ApplicationMessages';

const { mockMessage } = Message;
const { body, title } = mockMessage;

it('renders a message with close button and data', async () => {
  render(<ApplicationMessages />, {
    initialStates: [
      {
        state: State.messagesState,
        value: [mockMessage],
      },
    ],
  });
  expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: title })).toBeInTheDocument();
  expect(screen.getByText(body)).toBeInTheDocument();

  // Default "info" Message
  const messageIcon = document.querySelector('[data-icon="info-circle"]');
  const messageType = document.querySelector('[type="info"]');
  expect(messageIcon).toBeInTheDocument();
  expect(messageType).toBeInTheDocument();
});

it('renders a "warn" message with appropriate icon', async () => {
  render(<ApplicationMessages />, {
    initialStates: [
      {
        state: State.messagesState,
        value: [{ ...mockMessage, type: 'warn' }],
      },
    ],
  });

  // Warn Message
  const messageType = document.querySelector('[type="warn"]');
  const messageIcon = document.querySelector('[data-icon="exclamation-triangle"]');
  expect(messageType).toBeInTheDocument();
  expect(messageIcon).toBeInTheDocument();
});

it('renders a "success" message with appropriate icon', async () => {
  render(<ApplicationMessages />, {
    initialStates: [
      {
        state: State.messagesState,
        value: [{ ...mockMessage, type: 'success' }],
      },
    ],
  });

  // Success Message
  const messageType = document.querySelector('[type="success"]');
  const messageIcon = document.querySelector('[data-icon="check-circle"]');
  expect(messageType).toBeInTheDocument();
  expect(messageIcon).toBeInTheDocument();
});

it('renders an "error" message with appropriate icon', async () => {
  render(<ApplicationMessages />, {
    initialStates: [
      {
        state: State.messagesState,
        value: [{ ...mockMessage, type: 'error' }],
      },
    ],
  });

  // Error Message
  const messageType = document.querySelector('[type="error"]');
  const messageIcon = document.querySelector('[data-icon="bomb"]');
  expect(messageType).toBeInTheDocument();
  expect(messageIcon).toBeInTheDocument();
});

it('renders an "info" message with appropriate icon when type is missing', async () => {
  render(<ApplicationMessages />, {
    initialStates: [
      {
        state: State.messagesState,
        value: [{ ...mockMessage, type: null }],
      },
    ],
  });

  // Default "info" Message
  const messageIcon = document.querySelector('[data-icon="info-circle"]');
  const messageType = document.querySelector('[type="info"]');
  expect(messageIcon).toBeInTheDocument();
  expect(messageType).toBeInTheDocument();
});

it('renders an "info" message with appropriate icon when type is bogus', async () => {
  render(<ApplicationMessages />, {
    initialStates: [
      {
        state: State.messagesState,
        value: [{ ...mockMessage, type: 'bogus' }],
      },
    ],
  });

  // Default "info" Message
  const messageIcon = document.querySelector('[data-icon="info-circle"]');
  const messageType = document.querySelector('[type="bogus"]');
  expect(messageIcon).toBeInTheDocument();
  expect(messageType).toBeInTheDocument();
});

it('does not render if there is no message in state', async () => {
  render(<ApplicationMessages />);
  expect(screen.queryByText(title)).not.toBeInTheDocument();
  expect(screen.queryByText(body)).not.toBeInTheDocument();
});

it('does not render if visibility is false', async () => {
  render(<ApplicationMessages />, {
    initialStates: [
      {
        state: State.messagesState,
        value: [{ ...mockMessage, visible: false }],
      },
    ],
  });
  expect(screen.queryByText(title)).not.toBeInTheDocument();
  expect(screen.queryByText(body)).not.toBeInTheDocument();
});

it('close button dismisses a visible message', async () => {
  render(<ApplicationMessages />, {
    initialStates: [{ state: State.messagesState, value: [mockMessage] }],
  });

  expect(screen.getByText(title)).toBeInTheDocument();
  expect(screen.getByText(body)).toBeInTheDocument();

  const dismissButton = screen.getByRole('button', { name: /close/i });
  userEvent.click(dismissButton);
  expect(screen.queryByText(title)).not.toBeInTheDocument();
  expect(screen.queryByText(body)).not.toBeInTheDocument();
});

it('close button dismisses each message on the stack one at a time', async () => {
  const secondMockMessage = {
    ...mockMessage,
    id: 'second-mock-id',
    title: 'Second mock title',
    body: 'Second mock body',
  };
  render(<ApplicationMessages />, {
    initialStates: [
      {
        state: State.messagesState,
        value: [mockMessage, secondMockMessage],
      },
    ],
  });

  expect(screen.getByText(title)).toBeInTheDocument();
  expect(screen.getByText(body)).toBeInTheDocument();

  const dismissButton = screen.getByRole('button', { name: /close/i });
  userEvent.click(dismissButton);
  expect(screen.queryByText(title)).not.toBeInTheDocument();
  expect(screen.queryByText(body)).not.toBeInTheDocument();

  expect(screen.getByText(secondMockMessage.title)).toBeInTheDocument();
  expect(screen.getByText(secondMockMessage.body)).toBeInTheDocument();

  const secondDismissButton = screen.getByRole('button', { name: /close/i });
  userEvent.click(secondDismissButton);
  expect(screen.queryByText(secondMockMessage.title)).not.toBeInTheDocument();
  expect(screen.queryByText(secondMockMessage.body)).not.toBeInTheDocument();
});
