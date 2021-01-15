import React from 'react';
import { render } from 'src/util/test-utils';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Message } from '@osu-wams/lib';
import { messagesState } from 'src/state/messages';
import { useApplicationMessages } from 'src/util/useApplicationMessages';
import { ApplicationMessages } from '../ApplicationMessages';

jest.mock('nanoid', () => () => `nanoid-${Date.now()}`);

const newMessage = jest.fn();

// Simple Component to test Adding a message
const TestComponent = () => {
  const { addMessage } = useApplicationMessages();
  return (
    <div>
      <button onClick={() => addMessage(newMessage())}>Add</button>
      <ApplicationMessages />
    </div>
  );
};

const { mockMessage } = Message;
const { body, title } = mockMessage;

it('renders a message with close button and data', async () => {
  render(<ApplicationMessages />, {
    initialStates: [
      {
        state: messagesState,
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
        state: messagesState,
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
        state: messagesState,
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
        state: messagesState,
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
        state: messagesState,
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
        state: messagesState,
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
        state: messagesState,
        value: [{ ...mockMessage, visible: false }],
      },
    ],
  });
  expect(screen.queryByText(title)).not.toBeInTheDocument();
  expect(screen.queryByText(body)).not.toBeInTheDocument();
});

it('adds and displays a new message', async () => {
  newMessage.mockReturnValueOnce({
    ...mockMessage,
  });
  render(<TestComponent />);
  userEvent.click(screen.getByText(/Add/i));
  expect(await screen.findByText(title)).toBeInTheDocument();
  expect(await screen.findByText(body)).toBeInTheDocument();
});

it('close button dismisses a visible message', async () => {
  render(<ApplicationMessages />, {
    initialStates: [{ state: messagesState, value: [mockMessage] }],
  });

  expect(screen.getByText(title)).toBeInTheDocument();
  expect(screen.getByText(body)).toBeInTheDocument();

  const dismissButton = screen.getByRole('button', { name: /close/i });
  userEvent.click(dismissButton);
  expect(screen.queryByText(title)).not.toBeInTheDocument();
  expect(screen.queryByText(body)).not.toBeInTheDocument();
});
