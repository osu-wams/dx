import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithAllContexts as render, authUser, mockEmployeeUser } from 'src/util/test-utils';
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
    render(<Affiliations />);
    expect(screen.queryByText('(Override)')).not.toBeInTheDocument();
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

    expect(await screen.findAllByText(/Override/i)).toHaveLength(3);
  });

  /**
   * Even though 3 settings are "overriden" compared to the attributes, only 1 is seen.
   * Employees who were once students have "Stale" classification data and we are ignoring it.
   */
  it('employee only user sees just 1 overriden setting, skipping the others', async () => {
    mockUser.mockReturnValue({
      ...mockEmployeeUser,
      data: {
        ...mockEmployeeUser.data,
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
          ...mockEmployeeUser.data.audienceOverride,
          firstYear: false,
          international: false,
          graduate: true,
        },
      },
    });
    render(<Affiliations />, { user: mockUser() });
    const found = await screen.findByText(/Override/i);

    expect(found).toBeInTheDocument();
  });
});
