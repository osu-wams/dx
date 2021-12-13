import React from 'react';
import { renderWithAllContexts as render } from 'src/util/test-utils';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mockGAEvent, mockInitialState } from 'src/setupTests';
import ApplicationSearchBar from 'src/features/application-search/ApplicationSearchBar';
import { State, Resources, Student } from '@osu-wams/hooks';
import { BrowserRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

const notFoundSearchTerm = 'bobross';
const foundSearchTerm = 'testo';
describe('<ApplicationSearchBar />', () => {
  it('render nothing when there is no search', async () => {
    render(
      <BrowserRouter>
        <ApplicationSearchBar />
      </BrowserRouter>
    );
    const searchBar = await screen.findByTestId('applicationSearch');
    expect(searchBar).toBeInTheDocument();
    expect(searchBar).toHaveValue('');
  });
  it('sends a GA event when there are no filtered items found', async () => {
    render(
      <BrowserRouter>
        <ApplicationSearchBar />
      </BrowserRouter>,
      {
        initialStates: [
          {
            state: State.applicationSearchState,
            value: notFoundSearchTerm,
          },
          {
            state: State.gradesState,
            value: Student.Grades.mockGrades,
          },
        ],
      }
    );
    expect(mockGAEvent).toBeCalledWith('application-search-failed', notFoundSearchTerm);
    expect(mockGAEvent).toBeCalledTimes(1);
  });
  it('sends a GA event when there are filtered items found', async () => {
    render(
      <BrowserRouter>
        <ApplicationSearchBar />
      </BrowserRouter>,
      {
        initialStates: [
          {
            state: State.applicationSearchState,
            value: foundSearchTerm,
          },
          {
            state: State.resourceState,
            value: {
              data: Resources.mockResources.resourcesData.data,
              isLoading: false,
              isSuccess: false,
              isError: false,
            },
          },
        ],
      }
    );
    expect(mockGAEvent).toBeCalledWith('application-search', foundSearchTerm);
    expect(mockGAEvent).toBeCalledTimes(1);
  });

  describe('with an empty search input', () => {
    let history;
    let searchBar;

    beforeEach(async () => {
      history = createMemoryHistory({ initialEntries: ['/'] });
      mockInitialState.mockReturnValueOnce([
        {
          state: State.applicationSearchState,
          value: '',
        },
        {
          state: State.resourceState,
          value: {
            data: Resources.mockResources.resourcesData.data,
            isLoading: false,
            isSuccess: false,
            isError: false,
          },
        },
      ]);
      render(
        <Router location={history.location} navigator={history}>
          <ApplicationSearchBar />
        </Router>,
        { initialStates: mockInitialState() }
      );
      searchBar = await screen.findByTestId('applicationSearch');
    });
    it('updates location and input field when search is performed', async () => {
      userEvent.type(searchBar, `${notFoundSearchTerm}{enter}`);
      expect(history.location.pathname).toBe('/search');
      await waitFor(() => {
        expect(mockGAEvent).toBeCalledWith('application-search-failed', notFoundSearchTerm);
        expect(mockGAEvent).toBeCalledTimes(1);
      });
    });
    it('navigates to the search page when search is performed', async () => {
      userEvent.type(searchBar, `${foundSearchTerm}{enter}`);
      expect(history.location.pathname).toBe('/search');
      await waitFor(() => {
        expect(mockGAEvent).toBeCalledWith('application-search', foundSearchTerm);
        expect(mockGAEvent).toBeCalledTimes(1);
      });
    });
    it('performs a search after the enter key is pressed', async () => {
      userEvent.type(searchBar, `${foundSearchTerm}`);
      expect(history.location.pathname).toBe('/');
      userEvent.type(searchBar, '{enter}');
      expect(history.location.pathname).toBe('/search');
      await waitFor(() => {
        expect(mockGAEvent).toBeCalledWith('application-search', foundSearchTerm);
        expect(mockGAEvent).toBeCalledTimes(1);
      });
    });
    it('performs a search when the search button is clicked', async () => {
      userEvent.type(searchBar, `${foundSearchTerm}`);
      expect(history.location.pathname).toBe('/');
      const button = await screen.findAllByRole('button');
      userEvent.click(button[0]);
      expect(history.location.pathname).toBe('/search');
      await waitFor(() => {
        expect(mockGAEvent).toBeCalledWith('application-search', foundSearchTerm);
        expect(mockGAEvent).toBeCalledTimes(1);
      });
    });
  });
  it("Error should be handled when search term is '%'", async () => {
    window.location.search = '?q=%';
    render(
      <BrowserRouter>
        <ApplicationSearchBar />
      </BrowserRouter>
    );
    const searchBar = await screen.findByTestId('applicationSearch');
    expect(searchBar).toBeInTheDocument();
  });
});
