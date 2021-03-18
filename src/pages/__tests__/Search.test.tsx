import React from 'react';
import { render } from 'src/util/test-utils';
import { screen } from '@testing-library/react';
import { mockInitialState } from 'src/setupTests';
import {
  applicationSearchState,
  applicationTypeFilterState,
  selectedTypeFilters,
} from 'src/state/applicationSearch';
import { resourceState } from 'src/state';
import { Resources } from '@osu-wams/hooks';
import Search from '../Search';

const notFoundSearchTerm = 'bobross';
const foundSearchTerm = 'testo';

describe('<Search/>', () => {
  it('renders the proper layout for mobile view', async () => {
    render(<Search />);
    expect(await screen.findByText(/Perform a search using the search box/)).toBeInTheDocument();
    expect(await screen.findByText(/People/)).toBeInTheDocument();
    expect(await screen.findByText(/Places/)).toBeInTheDocument();
    expect(await screen.findAllByRole('button')).toHaveLength(4);
    expect(await screen.findByTestId('search-filter')).toBeInTheDocument();
    expect(screen.queryByText(/OSU Search Results/)).not.toBeInTheDocument();
    const searchBar = await screen.findByTestId('applicationSearch');
    expect(searchBar).toBeInTheDocument();
    expect(searchBar).toHaveValue('');
  });

  it('renders the proper layout for desktop view', async () => {
    render(<Search />, { isDesktop: true });
    expect(await screen.findByText(/Perform a search using the search box/)).toBeInTheDocument();
    expect(await screen.findByText(/People/)).toBeInTheDocument();
    expect(await screen.findByText(/Places/)).toBeInTheDocument();
    expect(await screen.findByText(/Filter Results/)).toBeInTheDocument();
    // eslint-disable-next-line jest-dom/prefer-in-document
    expect(screen.queryAllByRole('button')).toHaveLength(0);
    expect(screen.queryByTestId('search-filter')).not.toBeInTheDocument();
    expect(screen.queryByText(/OSU Search Results/)).not.toBeInTheDocument();
    expect(screen.queryByTestId('applicationSearch')).not.toBeInTheDocument();
  });

  describe('with a search term having no results', () => {
    beforeEach(() => {
      mockInitialState.mockReturnValueOnce([
        {
          state: applicationSearchState,
          value: notFoundSearchTerm,
        },
      ]);
    });
    it('renders a search page with no results found', async () => {
      render(<Search />, { initialStates: mockInitialState() });
      expect(await screen.findByText(/"bobross" did not return/)).toBeInTheDocument();
      expect(await screen.findByText(/OSU Search Results/)).toBeInTheDocument();
    });
  });

  describe('with a search term having results', () => {
    beforeEach(() => {
      mockInitialState.mockReturnValueOnce([
        {
          state: applicationSearchState,
          value: foundSearchTerm,
        },
        {
          state: resourceState,
          value: {
            data: Resources.mockResources.resourcesData.data,
            isLoading: false,
            isSuccess: false,
            isError: false,
          },
        },
      ]);
    });
    it('renders a search page with results found', async () => {
      render(<Search />, { initialStates: mockInitialState() });
      expect(await screen.findByText(/Bend Testo Success Center/)).toBeInTheDocument();
      expect(await screen.findByText(/OSU Search Results/)).toBeInTheDocument();
    });

    it('renders a search page with results filtered out by 1 filter', async () => {
      render(<Search />, {
        initialStates: [
          ...mockInitialState(),
          {
            state: applicationTypeFilterState,
            value: [
              {
                checked: true,
                label: 'Events',
                name: 'events',
                type: 'Event',
              },
            ],
          },
        ],
      });
      expect(screen.queryByText(/Bend Testo Success Center/)).not.toBeInTheDocument();
      expect(await screen.findByText(/with 1 filter set/)).toBeInTheDocument();
      expect(await screen.findByText(/OSU Search Results/)).toBeInTheDocument();
    });
    it('renders a search page with results filtered out by more than 1 filter', async () => {
      render(<Search />, {
        initialStates: [
          ...mockInitialState(),
          {
            state: applicationTypeFilterState,
            value: [
              {
                checked: true,
                label: 'Events',
                name: 'events',
                type: 'Event',
              },
              {
                checked: true,
                label: 'Announcements',
                name: 'announcements',
                type: 'Annoucement',
              },
            ],
          },
        ],
      });
      expect(screen.queryByText(/Bend Testo Success Center/)).not.toBeInTheDocument();
      expect(await screen.findByText(/with 2 filters set/)).toBeInTheDocument();
      expect(await screen.findByText(/OSU Search Results/)).toBeInTheDocument();
    });
  });
});
