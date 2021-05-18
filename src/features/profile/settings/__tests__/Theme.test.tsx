import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from 'src/util/test-utils';
import Theme from 'src/features/profile/settings/Theme';

const mockPostSettings = jest.fn();
jest.mock('@osu-wams/hooks', () => {
  const original = jest.requireActual('@osu-wams/hooks');
  return {
    ...original,
    User: {
      ...original.User,
      postSettings: () => mockPostSettings(),
    },
  };
});

describe('<Theme />', () => {
  beforeEach(() => {
    mockPostSettings.mockResolvedValue(Promise.resolve({}));
  });
  it('renders with the themes listed', async () => {
    render(<Theme />);
    const buttons = screen.getAllByRole('radio');
    expect(buttons).toHaveLength(2);
  });

  it('renders with default test data settings having the default theme checked', async () => {
    render(<Theme />);
    const lightThemeButton = screen.getByLabelText(/light/i);
    expect(lightThemeButton).toBeInTheDocument();

    const darkThemeButton = screen.getByLabelText(/dark/i);
    expect(darkThemeButton).toBeInTheDocument();

    expect(lightThemeButton).toBeChecked();
    expect(darkThemeButton).not.toBeChecked();
  });

  it('submits updates when a change is fired', async () => {
    render(<Theme />);
    const lightButton = screen.getByLabelText('Light');
    userEvent.click(lightButton);
    const darkButton = screen.getByLabelText('Dark');
    userEvent.click(darkButton);
    // Clicking a radio button that is already checked is no-op, this should
    // only register a click on each of the other buttons
    expect(mockPostSettings).toHaveBeenCalledTimes(1);
  });
});
