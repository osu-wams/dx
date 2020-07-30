import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render, authUser } from 'src/util/test-utils';
import Affiliations from '../Affiliations';

const mockUser = jest.fn();
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

describe('<Affiliations />', () => {
  afterEach(() => jest.clearAllMocks());
  beforeEach(() => {
    mockPostSettings.mockReturnValue(Promise.resolve());
  });
  it('renders with default test data settings', async () => {
    const { queryAllByText } = render(<Affiliations />);
    expect(queryAllByText('(Override)')).toHaveLength(0);
  });

  it('submits updates when a change is fired', async () => {
    mockPostSettings.mockReturnValue(Promise.resolve());
    render(<Affiliations />);

    userEvent.click(screen.getByLabelText(/First Year Student/i));
    userEvent.click(screen.getByLabelText(/international student/i));
    userEvent.click(screen.getByLabelText(/Graduate Student/i));

    expect(mockPostSettings).toHaveBeenCalledTimes(3);
  });

  it('renders with test data as overridden settings', async () => {
    mockUser.mockReturnValue({
      ...authUser,
      data: {
        ...authUser.data,
        classification: {
          id: '123',
          attributes: {
            levelCode: '01',
            campusCode: 'C',
            classification: 'Freshman',
            isInternational: true,
          },
        },
        audienceOverride: {
          ...authUser.data.audienceOverride,
          firstYear: false,
          international: false,
          graduate: true,
        },
      },
    });

    render(<Affiliations />, { user: mockUser() });
    const found = await screen.findAllByText(/Override/i);

    expect(screen.queryAllByText(/Override/i)).toHaveLength(3);
  });
});
