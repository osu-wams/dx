import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { render, authUser, mockEmployeeUser } from 'src/util/test-utils';
import Campus from '../Campus';

const mockPostSettings = jest.fn();
const mockUser = jest.fn();
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

describe('<Campus />', () => {
  beforeEach(() => {
    mockPostSettings.mockReturnValue(Promise.resolve());
  });
  it('renders with default test data settings having only 1 default campus', async () => {
    mockUser.mockReturnValue({
      ...authUser,
      data: {
        ...authUser.data,
        classification: {
          ...authUser.data.classification,
          attributes: {
            ...authUser.data.classification.attributes,
            campusCode: 'C',
          },
        },
      },
    });
    render(<Campus />, { user: mockUser() });
    const defaultCampus = screen.getByText('(Default)');
    expect(defaultCampus).toBeInTheDocument();
    const campusLabel = defaultCampus!.parentElement;
    expect(campusLabel).toHaveTextContent('Corvallis');
  });

  it('renders with default test data in the context of a bend student', async () => {
    mockUser.mockReturnValue({
      ...authUser,
      data: {
        ...authUser.data,
        classification: {
          ...authUser.data.classification,
          attributes: {
            ...authUser.data.classification.attributes,
            campusCode: 'B',
          },
        },
      },
    });
    render(<Campus />, { user: mockUser() });
    const defaultCampus = screen.getByText('(Default)');
    expect(defaultCampus).toBeInTheDocument();
    const campusLabel = defaultCampus!.parentElement;
    expect(campusLabel).toHaveTextContent('Bend');
  });

  it('renders with default test data in the context of a corvallis student with an non standard campus code', async () => {
    mockUser.mockReturnValue({
      ...authUser,
      data: {
        ...authUser.data,
        classification: {
          ...authUser.data.classification,
          attributes: {
            ...authUser.data.classification.attributes,
            campusCode: 'J',
          },
        },
      },
    });
    render(<Campus />, { user: mockUser() });
    const defaultCampus = screen.getByText('(Default)');
    expect(defaultCampus).toBeInTheDocument();
    const campusLabel = defaultCampus!.parentElement;
    expect(campusLabel).toHaveTextContent('Corvallis');
  });

  it('renders with test data as an Employee only user having no classification attributes', async () => {
    mockUser.mockReturnValue({
      ...mockEmployeeUser,
    });
    const { getByText } = render(<Campus />, { user: mockUser() });
    const defaultCampus = getByText('(Default)');
    const campusLabel = defaultCampus!.parentElement;
    expect(campusLabel).toHaveTextContent('Corvallis');
  });

  it('submits updates when a change is fired', async () => {
    const { getByTestId } = render(<Campus />, { user: mockUser() });
    const corvallisButton = getByTestId('corvallis');
    fireEvent.click(corvallisButton.children[0].children[0]);
    const bendButton = getByTestId('bend');
    fireEvent.click(bendButton.children[0].children[0]);
    const ecampusButton = getByTestId('ecampus');
    fireEvent.click(ecampusButton.children[0].children[0]);
    // Clicking a radio button that is already checked is no-op, this should
    // only register a click on each of the other buttons
    expect(mockPostSettings).toHaveBeenCalledTimes(2);
  });
});
