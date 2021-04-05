import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from 'src/util/test-utils';
import { AdminSettings } from '../AdminSettings';
import { mockGAEvent } from 'src/setupTests';

jest.mock('nanoid', () => () => `nanoid-${Date.now()}`);

const mockAddMessage = jest.fn();
jest.mock('../../../hooks/useApplicationMessages.tsx', () => ({
  useApplicationMessages: () => ({
    addMessage: mockAddMessage,
  }),
}));

const mockPostSettings = jest.fn();
const mockApiCache = jest.fn();
jest.mock('@osu-wams/hooks', () => {
  const original = jest.requireActual('@osu-wams/hooks');
  return {
    ...original,
    User: {
      ...original.User,
      postSettings: () => mockPostSettings(),
    },
    Admin: {
      ...original.Admin,
      getResetApiCache: () => mockApiCache(),
    },
  };
});

describe('<AdminSettings />', () => {
  beforeEach(() => {
    mockPostSettings.mockResolvedValue(Promise.resolve({}));
    render(<AdminSettings />);
  });
  it('Sees the fieldset legends', async () => {
    expect(await screen.findByText(/developer/i)).toBeInTheDocument();
    expect(await screen.findByText(/Admin Actions/i)).toBeInTheDocument();
  });

  describe('developer', () => {
    it('Sees the ReactQuery DevTools and mocks the post with a click', () => {
      const button = screen.getByLabelText(/ReactQuery DevTools/i);
      expect(button).toBeInTheDocument();
      userEvent.click(button);
      expect(mockPostSettings).toHaveBeenCalledTimes(1);
      expect(mockGAEvent).toHaveBeenCalledTimes(1);
    });
  });
  describe('admin actions', () => {
    it('Clear ALL API button calls the mockPost', async () => {
      const clear = screen.getByRole('button', { name: /Clear All API Caches/i });
      expect(clear).toBeInTheDocument();
      userEvent.click(clear);
      expect(mockApiCache).toHaveBeenCalledTimes(1);
    });

    it('Clear ALL API button click logs to analytics and disables button', async () => {
      const clear = screen.getByRole('button', { name: /Clear All API Caches/i });
      expect(clear).toBeInTheDocument();
      userEvent.click(clear);
      expect(mockGAEvent).toHaveBeenCalledTimes(1);
      expect(await screen.findByRole('button', { name: /Clear All API Caches/i })).toBeDisabled();
    });

    it('Clear ALL API button adds an application message to state', async () => {
      const clear = screen.getByRole('button', { name: /Clear All API Caches/i });
      expect(clear).toBeInTheDocument();
      userEvent.click(clear);
      expect(mockAddMessage).toHaveBeenCalledWith({
        body: 'API caches have been cleared.',
        title: 'Clear API Cache',
        type: 'success',
        visible: true,
      });
    });
  });
});
