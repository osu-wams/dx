import React from 'react';
import { render } from 'src/util/test-utils';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Message } from '@osu-wams/lib';
import { messagesState } from '../messages';
import { useApplicationMessages } from '../../util/useApplicationMessages';

jest.mock('uuid', () => ({ v4: () => `messageuuid${Date.now()}` }));

const newMessage = jest.fn();

const TestComponent = () => {
  const { message, addMessage, dismissMessage } = useApplicationMessages();
  return (
    <>
      <button onClick={() => addMessage(newMessage())}>Add</button>
      {message && (
        <div key={`${message.id}`}>
          <span>{message.type}</span>
          <span>{message.title}</span>
          <span>{message.body}</span>
          <span>{message.visible}</span>
          <button onClick={() => dismissMessage(message)}>Dismiss</button>
        </div>
      )}
    </>
  );
};

const { mockMessage } = Message;
const { body, title, type } = mockMessage;

it('renders a message in state', async () => {
  render(<TestComponent />, {
    initialStates: [
      {
        state: messagesState,
        value: [mockMessage],
      },
    ],
  });
  expect(screen.getByText(type)).toBeInTheDocument();
  expect(screen.getByText(title)).toBeInTheDocument();
  expect(screen.getByText(body)).toBeInTheDocument();
});

it('renders with no message in state', async () => {
  const { queryByText } = render(<TestComponent />);
  expect(queryByText(type)).not.toBeInTheDocument();
  expect(queryByText(title)).not.toBeInTheDocument();
  expect(queryByText(body)).not.toBeInTheDocument();
});

it('adds and displays a new message', async () => {
  newMessage.mockReturnValueOnce({
    ...mockMessage,
    body: 'Test Body',
    title: 'Test Title',
    type: 'error',
  });
  const { queryByText } = render(<TestComponent />);
  const addButton = await screen.findByText(/Add/i);
  userEvent.click(addButton);
  expect(queryByText('error')).toBeInTheDocument();
  expect(queryByText('Test Title')).toBeInTheDocument();
  expect(queryByText('Test Body')).toBeInTheDocument();
});

it('dismisses a visible message', async () => {
  const { queryByText } = render(<TestComponent />, {
    initialStates: [{ state: messagesState, value: [mockMessage] }],
  });

  expect(queryByText(type)).toBeInTheDocument();
  expect(queryByText(title)).toBeInTheDocument();
  expect(queryByText(body)).toBeInTheDocument();

  const dismissButton = await screen.findByText(/Dismiss/i);
  userEvent.click(dismissButton);
  expect(queryByText(type)).not.toBeInTheDocument();
  expect(queryByText(title)).not.toBeInTheDocument();
  expect(queryByText(body)).not.toBeInTheDocument();
});
