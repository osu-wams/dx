import React from 'react';
import { renderWithAllContexts as render } from 'src/util/test-utils';
import { screen } from '@testing-library/react';
import { mockInitialState } from 'src/setupTests';
import userEvent from '@testing-library/user-event';
import { State, Resources, SearchIndex } from '@osu-wams/hooks';
import Search from '../Search';

const { applicationSearchState, applicationTypeFilterState, pageSearchIndexState, resourceState } =
  State;
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
        {
          state: pageSearchIndexState,
          value: {
            data: SearchIndex.mockPageSearchIndex.pageSearchIndexData,
            isLoading: false,
            isSuccess: false,
            isError: false,
          },
        },
      ]);
    });
    it('renders a search page with the About page as a result', async () => {
      render(<Search />, { initialStates: mockInitialState() });
      const searchBar = screen.getByTestId('applicationSearch');

      // Search input value changed to "noResults"
      await userEvent.type(searchBar, 'noResults{enter}');
      expect(screen.queryByText(/About page description/)).not.toBeInTheDocument();
      userEvent.clear(searchBar);

      await userEvent.type(searchBar, 'About{enter}');
      expect(await screen.findByText(/About page description/)).toBeInTheDocument();
    });

    it('renders a search result to pageNotFound for an undefined page index result', async () => {
      render(<Search />, {
        initialStates: [
          ...mockInitialState(),
          {
            state: pageSearchIndexState,
            value: {
              data: [
                {
                  ...SearchIndex.mockPageSearchIndex.pageSearchIndexData[0],
                  page: null,
                },
              ],
              isLoading: false,
              isSuccess: false,
              isError: false,
            },
          },
        ],
      });
      const searchBar = screen.getByTestId('applicationSearch');

      await userEvent.type(searchBar, 'About{enter}');
      expect(await screen.findByTestId('simple-internal-link')).toHaveAttribute(
        'href',
        '/pageNotFound'
      );
    });

    it('renders a search result to pageNotFound for a page index not defined in Routes', async () => {
      render(<Search />, {
        initialStates: [
          ...mockInitialState(),
          {
            state: pageSearchIndexState,
            value: {
              data: [
                {
                  ...SearchIndex.mockPageSearchIndex.pageSearchIndexData[0],
                  page: 'BobRoss',
                },
              ],
              isLoading: false,
              isSuccess: false,
              isError: false,
            },
          },
        ],
      });
      const searchBar = screen.getByTestId('applicationSearch');

      await userEvent.type(searchBar, 'About{enter}');
      expect(await screen.findByTestId('simple-internal-link')).toHaveAttribute(
        'href',
        '/pageNotFound'
      );
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
