import React from 'react';
import { render, alterMock } from 'src/util/test-utils';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mockGAEvent } from 'src/setupTests';
import People from 'src/features/application-search/People';
import { PEOPLE_API } from 'src/mocks/apis';
import { State } from '@osu-wams/hooks';

describe('<People />', () => {
  it('should render nothing when there is no search', async () => {
    render(<People />);
    expect(await screen.findByText('People')).toBeInTheDocument();
    expect(screen.queryByText('Bob Ross')).not.toBeInTheDocument();
  });
  it('should render as list of people when searched', async () => {
    render(<People />, {
      initialStates: [
        {
          state: State.applicationSearchState,
          value: 'superceded-by-msw-mock-return',
        },
      ],
    });

    expect(await screen.findByText('Sch of Mech/Ind/Mfg Engr')).toBeInTheDocument();
    expect(await screen.findByText('Showing 3 of 3')).toBeInTheDocument();
    expect(await screen.findByTestId('icon-counter')).toHaveTextContent('3');
    const link = await screen.findByText('Bob Ross');
    expect(link).toBeInTheDocument();
    userEvent.click(link);
    expect(mockGAEvent).toHaveBeenCalledTimes(1);
    const externalLink = await screen.findByText('OSU Directory');
    expect(externalLink).toBeInTheDocument();
    userEvent.click(externalLink);
    expect(mockGAEvent).toHaveBeenCalledTimes(2);
  });

  it('should return appropriate text when data is empty', async () => {
    alterMock(PEOPLE_API, []);
    render(<People />, {
      initialStates: [
        {
          state: State.applicationSearchState,
          value: 'superceded-by-msw-mock-return',
        },
      ],
    });

    expect(await screen.findByText(/No people found./i)).toBeInTheDocument();
  });

  it('should return appropriate text when an error text is returned', async () => {
    alterMock(PEOPLE_API, 'Error text', 500);
    render(<People />, {
      initialStates: [
        {
          state: State.applicationSearchState,
          value: 'superceded-by-msw-mock-return',
        },
      ],
    });

    expect(await screen.findByText(/Error text/i)).toBeInTheDocument();
  });

  it('should return default error when no error message is returned', async () => {
    alterMock(PEOPLE_API, null, 500);
    render(<People />, {
      initialStates: [
        {
          state: State.applicationSearchState,
          value: 'superceded-by-msw-mock-return',
        },
      ],
    });

    expect(await screen.findByText(/Failed searching for People./i)).toBeInTheDocument();
  });
});
