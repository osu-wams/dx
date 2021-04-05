import React from 'react';
import { render, alterMock } from 'src/util/test-utils';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mockGAEvent } from 'src/setupTests';
import Places from 'src/features/application-search/Places';
import { LOCATIONS_API } from 'src/mocks/apis';
import { applicationSearchState } from 'src/state/applicationSearch';

describe('<Places />', () => {
  it('should render nothing when there is no search', async () => {
    render(<Places />);
    expect(await screen.findByText('Places')).toBeInTheDocument();
    expect(screen.queryByText('Cascade Hall')).not.toBeInTheDocument();
  });
  it('should render as list of people when searched', async () => {
    render(<Places />, {
      initialStates: [
        {
          state: applicationSearchState,
          value: 'superceded-by-msw-mock-return',
        },
      ],
    });
    expect(await screen.findByAltText('Cascade Hall')).toBeInTheDocument();
    expect(await screen.findByText('Showing 3 of 3')).toBeInTheDocument();
    const link = await screen.findByText('Cascade Hall');
    expect(link).toBeInTheDocument();
    userEvent.click(link);
    expect(mockGAEvent).toHaveBeenCalledTimes(1);
    const externalLink = await screen.findByText('Campus Map');
    expect(externalLink).toBeInTheDocument();
    userEvent.click(externalLink);
    expect(mockGAEvent).toHaveBeenCalledTimes(2);
  });

  it('should return appropriate text when data is empty', async () => {
    alterMock(LOCATIONS_API, []);
    render(<Places />, {
      initialStates: [
        {
          state: applicationSearchState,
          value: 'superceded-by-msw-mock-return',
        },
      ],
    });

    expect(await screen.findByText(/No places found./i)).toBeInTheDocument();
  });

  it('should return appropriate text when an error text is returned', async () => {
    alterMock(LOCATIONS_API, 'Error text', 500);
    render(<Places />, {
      initialStates: [
        {
          state: applicationSearchState,
          value: 'superceded-by-msw-mock-return',
        },
      ],
    });

    expect(await screen.findByText(/Error text/i)).toBeInTheDocument();
  });

  it('should return default error when no error message is returned', async () => {
    alterMock(LOCATIONS_API, null, 500);
    render(<Places />, {
      initialStates: [
        {
          state: applicationSearchState,
          value: 'superceded-by-msw-mock-return',
        },
      ],
    });

    expect(await screen.findByText(/Failed searching for Places./i)).toBeInTheDocument();
  });
});
