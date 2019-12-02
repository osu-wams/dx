import React from 'react';
import { fireEvent } from '@testing-library/react';
import { render } from '../../../../util/test-utils';
import Theme from '../Theme';

const mockPostSettings = jest.fn(() => Promise.resolve());

jest.mock('../../../../api/user', () => ({
  ...jest.requireActual('../../../../api/user'),
  postSettings: () => mockPostSettings()
}));

describe('<Theme />', () => {
  beforeEach(() => {
    mockPostSettings.mockReturnValue(Promise.resolve());
  });
  it('renders with the themes listed', async () => {
    const { container } = render(<Theme />);
    const buttons = container.querySelectorAll("input[type='radio']");
    expect(buttons).toHaveLength(2);
  });

  it('renders with default test data settings having the default theme checked', async () => {
    const { container } = render(<Theme />);
    const lightThemeButton = container.querySelector("input[value='light']") as HTMLInputElement;
    expect(lightThemeButton).toBeInTheDocument();
    const darkThemeButton = container.querySelector("input[value='dark']") as HTMLInputElement;
    expect(darkThemeButton).toBeInTheDocument();
    expect(lightThemeButton.checked).toEqual(true);
    expect(darkThemeButton.checked).toEqual(false);
  });

  it('submits updates when a change is fired', async () => {
    const { getByTestId } = render(<Theme />);
    const lightButton = getByTestId('light');
    fireEvent.click(lightButton.children[0].children[0]);
    const darkButton = getByTestId('dark');
    fireEvent.click(darkButton.children[0].children[0]);
    // Clicking a radio button that is already checked is no-op, this should
    // only register a click on each of the other buttons
    expect(mockPostSettings).toHaveBeenCalledTimes(1);
  });
});
