/* eslint-disable testing-library/no-node-access */
import React from 'react';
import { waitFor, screen, fireEvent } from '@testing-library/react';
import {
  renderWithAllContexts as render,
  authUser,
  mockEmployeeUser,
  renderWithUserContext,
  mockGradUser,
  mockGradStudentEmployeeUser,
} from 'src/util/test-utils';
import { Context as ResponsiveContext } from 'react-responsive';
import userEvent from '@testing-library/user-event';
import ResourcesComponent from 'src/pages/Resources';
import { mockGAEvent, mockTrendingEvent } from 'src/setupTests';
import { State, Resources } from '@osu-wams/hooks';
import { User } from '@osu-wams/lib';

const mockInitialState = jest.fn();
const mockDefaultCategory = jest.fn();
const mockPostFavorite = jest.fn();
const { resourcesData, defaultCategory } = Resources.mockResources;
window.open = jest.fn();

jest.mock('@osu-wams/hooks', () => {
  const original = jest.requireActual('@osu-wams/hooks');
  return {
    ...original,
    defaultCategoryName: () => mockDefaultCategory(),
    Resources: {
      ...original.Resources,
      postFavorite: () => mockPostFavorite(),
    },
  };
});

/**
 * Render Resources with the most commonly used features
 * We reuse a lot of these elements in our tests
 * Here we can simplify the logic in one place
 */
const renderResources = async (userType?: any) => {
  if (!userType) {
    render(<ResourcesComponent />, { initialStates: mockInitialState() });
  } else {
    render(<ResourcesComponent />, {
      user: userType,
      initialStates: mockInitialState(),
    });
  }
  await screen.findByText('Resources');
  const featured = await screen.findByLabelText('Featured');
  const all = await screen.findByLabelText('All');
  const favorites = await screen.findByLabelText('Favorites');
  const searchInput = (await screen.findByPlaceholderText('Find resources')) as HTMLInputElement;
  const financial = await screen.findByLabelText('Financial');

  return {
    searchInput,
    featured,
    financial,
    all,
    favorites,
  };
};

describe('<Resources />', () => {
  // Set mock function result before running any tests
  beforeEach(() => {
    mockInitialState.mockReturnValue([
      {
        state: State.resourceState,
        value: resourcesData,
      },
    ]);
  });

  describe('Components', () => {
    it('should display the title Resources', async () => {
      renderResources();
      expect(screen.getByText('Resources', { selector: 'h1' })).toBeInTheDocument();
    });

    it('should not autoFocus the search input on mobile', async () => {
      const { searchInput } = await renderResources();
      expect(searchInput).not.toHaveFocus();
    });

    it('should autoFocus on desktop', async () => {
      renderWithUserContext(
        <ResponsiveContext.Provider value={{ width: '768' }}>
          <ResourcesComponent />
        </ResponsiveContext.Provider>
      );
      await screen.findByText('Resources');
      const searchInput = (await screen.findByPlaceholderText(
        'Find resources'
      )) as HTMLInputElement;
      expect(searchInput).toHaveFocus();
    });

    it('Should have a link to skip to results with matching ID in the result container', async () => {
      await renderResources();
      const skipLink = screen.getByText('Skip to results');
      const anchor = skipLink.getAttribute('href')!.slice(1);
      const results = await screen.findByTestId('resourcesResults');
      const resultsId = results.getAttribute('id');

      expect(anchor).toEqual(resultsId);
    });

    it('should load with the "Featured" category selected and results filtered accordingly', async () => {
      const { all, featured } = await renderResources();

      await waitFor(() => expect(featured).toHaveClass('selected'));
      expect(all).not.toHaveClass('selected');
      expect(screen.getByText(/Billing Information/)).toBeInTheDocument();
      expect(screen.queryByText(/Webcams/)).not.toBeInTheDocument();
    });
  });

  describe('Category interactions', () => {
    it('should have "Featured" selected and clickable All category that gets appropriate results', async () => {
      mockDefaultCategory.mockReturnValue('All');
      const { all, featured } = await renderResources();

      expect(featured).toHaveClass('selected'); // default selected

      userEvent.click(all);

      expect(await screen.findByText(/Student Jobs/)).toBeInTheDocument();
      expect(await screen.findByText(/Billing Information/)).toBeInTheDocument();

      expect(featured).not.toHaveClass('selected');
      expect(all).toHaveClass('selected');
    });

    it('should have clickable categories that report to GoogleAnalytics', async () => {
      renderResources();
      const BillingInformationResource = screen.getByText(/Billing Information/);
      expect(BillingInformationResource).toBeInTheDocument();
      userEvent.click(BillingInformationResource);
      expect(mockGAEvent).toHaveBeenCalledTimes(1);
      expect(mockTrendingEvent).toHaveBeenCalledTimes(1);
    });

    it('should have clickable categories that will not report as a trending resource', async () => {
      mockDefaultCategory.mockReturnValue('All');
      mockInitialState.mockReturnValue([
        {
          state: State.resourceState,
          value: {
            isLoading: resourcesData.isLoading,
            isSuccess: resourcesData.isSuccess,
            isError: resourcesData.isError,
            data: [
              { ...resourcesData.data[0], excludeTrending: true, locations: ['Corvallis', 'Bend'] },
            ],
          },
        },
      ]);
      renderResources();
      const nonTrendingResource = await screen.findByText(/Testo/);
      expect(nonTrendingResource).toBeInTheDocument();
      userEvent.click(nonTrendingResource);
      expect(mockGAEvent).toHaveBeenCalledTimes(1);
      expect(mockTrendingEvent).not.toHaveBeenCalledTimes(1);
    });

    it('should empty input and get results for that category only when clicking category link', async () => {
      mockDefaultCategory.mockReturnValue(defaultCategory);
      const { searchInput } = await renderResources();

      const academic = await screen.findByLabelText('Academic');

      // Search input value changed to "noResults"
      await userEvent.type(searchInput, 'noResults');

      expect(await screen.findByText(/found 0 results/)).toBeInTheDocument();
      userEvent.click(academic);
      expect(await screen.findByText(/Student Athletes/)).toBeInTheDocument();
      expect(await screen.findByText(/found 1 result/)).toBeInTheDocument();
      // Search input should be clear, 'noResults' should be gone
      await waitFor(() => expect(searchInput.value).toEqual(''));
    });

    it('should empty input and get results for favorites category only when clicking category link', async () => {
      mockDefaultCategory.mockReturnValue(defaultCategory);
      const { searchInput, favorites } = await renderResources();

      // Search input value changed to "noResults"
      await userEvent.type(searchInput, 'noResults');

      expect(await screen.findByText(/found 0 results/)).toBeInTheDocument();
      userEvent.click(favorites);

      // Mock data has three favorites for the default user, two are active and one is not so will
      // not be displayed.
      expect(await screen.findByText(/found 2 results/)).toBeInTheDocument();
      expect(await screen.findByText(/Student Athletes/)).toBeInTheDocument();
      expect(await screen.findByText(/Billing Information/)).toBeInTheDocument();
      expect(screen.queryByText(/Bend Testo/)).not.toBeInTheDocument();

      // Search input should be clear, 'noResults' should be gone
      await waitFor(() => expect(searchInput.value).toEqual(''));
    });

    it('should be able to reselect a category and get appropriate data back', async () => {
      const { all } = await renderResources();

      const academic = screen.getByLabelText('Academic');

      userEvent.click(all);
      // Billing information is present for all
      expect(await screen.findByText(/Billing Information/)).toBeInTheDocument();

      userEvent.click(academic);
      // Student Athletes is present but Billing information is no longer present
      expect(await screen.findByText(/Student Athletes/)).toBeInTheDocument();
      expect(screen.queryByText(/Billing Information/)).not.toBeInTheDocument();

      expect(academic).toHaveClass('selected');
      expect(all).not.toHaveClass('selected');
    });
  });

  it('Changes Search term should re-run the search effectively', async () => {
    const { searchInput } = await renderResources();
    const badQuery = 'billingNotThere';

    userEvent.type(searchInput, badQuery);

    expect(await screen.findByText(/found 0 results/)).toBeInTheDocument();
    expect(screen.queryByText(/Billing Information/)).not.toBeInTheDocument();
    expect(mockGAEvent).toHaveBeenCalledTimes(1);

    // We need to clear the input value if not the below interaction sits on top of the previous
    searchInput.value = '';

    await userEvent.type(searchInput, 'billing');

    expect(await screen.findByText(/Billing Information/)).toBeInTheDocument();
    expect(mockGAEvent).toHaveBeenCalledTimes(2);
  });

  it('searches for case-insensitive synonyms', async () => {
    const badQuery = 'billingNotThere';
    const { searchInput } = await renderResources();
    await userEvent.type(searchInput, 'BOO');
    expect(await screen.findByText(/Billing Information/)).toBeInTheDocument();
    // We need to clear the input value if not the below interaction sits on top of the previous
    searchInput.value = '';
    await userEvent.type(searchInput, badQuery);
    expect(await screen.findByText(/found 0 results/)).toBeInTheDocument();
    // We need to clear the input value if not the below interaction sits on top of the previous
    searchInput.value = '';
    await userEvent.type(searchInput, 'boo');
    expect(await screen.findByText(/Billing Information/)).toBeInTheDocument();
  });

  it('should load a different category based on the URL parameter', async () => {
    let location = {
      ...window.location,
      search: '?category=all',
    };
    Object.defineProperty(window, 'location', {
      writable: true,
      value: location,
    });

    const { featured, all } = await renderResources();
    await waitFor(() => expect(featured).not.toHaveClass('selected'));
    expect(all).toHaveClass('selected');
    expect(await screen.findByText(/Billing Information/)).toBeInTheDocument();
    expect(await screen.findByText(/Student Jobs/)).toBeInTheDocument();
    location.search = '';
  });

  it('should change categories when the back button is clicked', async () => {
    const { featured, all } = await renderResources();

    expect(all).toBeInTheDocument();
    await waitFor(() => expect(featured).toHaveClass('selected'));
    expect(all).not.toHaveClass('selected');

    userEvent.click(all);
    await waitFor(() => expect(all).toHaveClass('selected'));
    expect(featured).not.toHaveClass('selected');

    // Back button causes window.onpopstate to fire and it would have the previously clicked category
    fireEvent.popState(window, {
      state: { category: 'featured' },
    });

    await waitFor(() => expect(featured).toHaveClass('selected'));
    expect(all).not.toHaveClass('selected');
  });

  it('should move to the All category when searching', async () => {
    const { featured, all, searchInput } = await renderResources();

    expect(featured).toHaveClass('selected');
    expect(all).not.toHaveClass('selected');
    await userEvent.type(searchInput, 'student job');
    expect(await screen.findByText(/found 1 result/)).toBeInTheDocument();
    expect(await screen.findByText(/Student Jobs/)).toBeInTheDocument();

    expect(featured).not.toHaveClass('selected');
    expect(all).toHaveClass('selected');

    expect(screen.queryByText(/Billing Information/)).not.toBeInTheDocument();
  });

  describe('Favorite Resources tests', () => {
    it('should have favorites category when user has active favorites resources', async () => {
      await renderResources();
      const favorites = await screen.findByText(/favorites/i);
      expect(favorites).toBeInTheDocument();
      userEvent.click(favorites);
      expect(await screen.findByText(/found 2 results/i)).toBeInTheDocument();
    });

    it('Finds Student Jobs resource, clicking on heart input adds it as a favorite', async () => {
      const { all } = await renderResources();
      userEvent.click(all);

      expect(await screen.findByText(/Student Jobs/)).toBeInTheDocument();
      var el = document.querySelector(
        `input[aria-label="Add Student Jobs link to your favorite resources"]`
      );
      expect(el).toBeInTheDocument();

      // checking for el to avoid element might be null error
      el ? userEvent.click(el) : null;

      expect(await mockPostFavorite).toHaveBeenCalledTimes(1);
      expect(authUser.refreshFavorites).toHaveBeenCalledTimes(1);
      expect(mockGAEvent).toHaveBeenCalledTimes(1);
    });

    it('should not find the favorites category button when user does not have favorites resources', async () => {
      const noFavUser = { ...authUser, data: { ...authUser.data, favoriteResources: [] } };
      renderResources(noFavUser);

      expect(screen.queryByText(/favorites/i)).not.toBeInTheDocument();
    });
  });

  describe('with audiences', () => {
    it('shows all resources', async () => {
      const newAuthUser = { ...authUser, classification: { id: authUser.data.osuId } };
      const { all } = await renderResources(newAuthUser);

      userEvent.click(all);
      expect(await screen.findByText(/Billing Information/)).toBeInTheDocument();
      expect(await screen.findByText(/Student Jobs/)).toBeInTheDocument();
      expect(all).toHaveClass('selected');
    });
  });

  describe('Graduate Student', () => {
    beforeEach(async () => {
      const { all } = await renderResources(mockGradUser);
      userEvent.click(all);
    });

    it('finds 4 total results that apply to them', async () => {
      expect(await screen.findByText(/found 4 results/i)).toBeInTheDocument();
    });

    it('finds "Graduate Student Only" item but not "Student Jobs" since that is tagged undegraduate', async () => {
      expect(await screen.findByText(/Graduate Student Only/i)).toBeInTheDocument();
      expect(screen.queryByText(/Student Jobs/i)).not.toBeInTheDocument();
    });
  });

  describe('Undergraduate Student', () => {
    beforeEach(async () => {
      const { all } = await renderResources();
      userEvent.click(all);
    });

    it('finds "Student Jobs" since that is tagged undegraduate, but not "Graduate Student Only"', async () => {
      expect(await screen.findByText(/Student Jobs/i)).toBeInTheDocument();
      expect(screen.queryByText(/Graduate Student Only/i)).not.toBeInTheDocument();
    });
  });

  describe('Graduate Student Employee', () => {
    beforeEach(async () => {
      const { all } = await renderResources(mockGradStudentEmployeeUser);
      userEvent.click(all);
    });

    it('finds 4 total results that apply to them', async () => {
      expect(await screen.findByText(/found 4 results/i)).toBeInTheDocument();
    });

    it('finds "Graduate Student Only" item but not "Student Jobs" since that is tagged undegraduate', async () => {
      expect(await screen.findByText(/Graduate Student Only/i)).toBeInTheDocument();
      expect(screen.queryByText(/Student Jobs/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/Employee Only/i)).not.toBeInTheDocument();
    });
  });

  describe('Graduate Student Employee on the Employee Dashboard', () => {
    beforeEach(async () => {
      const { all } = await renderResources({
        ...mockGradStudentEmployeeUser,
        data: {
          ...mockGradStudentEmployeeUser.data,
          primaryAffiliationOverride: User.AFFILIATIONS.employee,
        },
      });
      userEvent.click(all);
    });

    it('does not find "Graduate Student Only" item because employee of dashboard defaults', async () => {
      expect(await screen.findByText(/Employee Only/i)).toBeInTheDocument();
      expect(screen.queryByText(/Graduate Student Only/i)).not.toBeInTheDocument();
    });
  });

  describe('with student and employee affiliations', () => {
    it('finds Listservs as an employee but not Student Jobs, since that is student only', async () => {
      mockDefaultCategory.mockReturnValue('All');
      const { all } = await renderResources(mockEmployeeUser);
      userEvent.click(all);

      expect(await screen.findByText(/found 5 results/)).toBeInTheDocument();

      // employee and student tagged events
      expect(screen.getByText(/Academics for Student Athletes/)).toBeInTheDocument();
      expect(screen.getByText(/Billing Information/)).toBeInTheDocument();
      expect(screen.getByText(/Box/)).toBeInTheDocument();

      // employee only events
      expect(screen.getByText(/Listservs/)).toBeInTheDocument();
      expect(screen.getByText(/Employee Only/)).toBeInTheDocument();

      // student only event cannot be found
      expect(screen.queryByText(/Student Jobs/)).not.toBeInTheDocument();
      // Bend only event not present for Corvallis Employee
      expect(screen.queryByText(/Bend Testo Success Center/)).not.toBeInTheDocument();

      // styles are applied
      expect(all).toHaveClass('selected');
    });

    it('finds Listservs as an employee when clicking the Financial category', async () => {
      mockDefaultCategory.mockReturnValue('Financial');
      const { financial } = await renderResources(mockEmployeeUser);

      userEvent.click(financial);

      expect(await screen.findByText(/found 2 results/)).toBeInTheDocument();
      expect(await screen.findByText(/Listservs/)).toBeInTheDocument();
      expect(screen.queryByText(/Student Jobs/)).not.toBeInTheDocument();
      expect(financial).toHaveClass('selected');
    });

    it('cannot find "Student Jobs" when searching as an Employee, but finds "Listservs"', async () => {
      const { searchInput } = await renderResources(mockEmployeeUser);

      await userEvent.type(searchInput, 'student job');
      // Student Jobs resources is null because it's only there for Student, not employee
      expect(screen.queryByText(/Student Jobs/)).not.toBeInTheDocument();

      await userEvent.type(searchInput, 'Listservs');
      expect(await screen.findByText(/Listservs/)).toBeInTheDocument();
    });

    it('cannot find "Listservs" when searching as a Student, but finds "Student Jobs"', async () => {
      const { searchInput } = await renderResources();

      userEvent.type(searchInput, 'student job');
      expect(await screen.findByText(/Student Jobs/)).toBeInTheDocument();

      userEvent.type(searchInput, 'Listservs');
      expect(screen.queryByText(/Listservs/)).not.toBeInTheDocument();
    });

    it('finds "Student Jobs" and "Billing Information" but not "Listservs" when clicking the Financial category', async () => {
      const { financial } = await renderResources();
      userEvent.click(financial);

      expect(await screen.findByText(/found 2 results/)).toBeInTheDocument();
      expect(screen.queryByText(/Listservs/)).not.toBeInTheDocument();
      expect(screen.getByText(/Student Jobs/)).toBeInTheDocument();
      expect(screen.getByText(/Billing Information/)).toBeInTheDocument();
      expect(financial).toHaveClass('selected');
    });

    it('finds the 4 student resources and cannot find Listservs employee resource', async () => {
      const { all } = await renderResources();
      userEvent.click(all);
      expect(await screen.findByText(/found 4 results/i)).toBeInTheDocument();
      expect(await screen.findByText(/Student Jobs/i)).toBeInTheDocument();
      expect(screen.queryByText(/Listservs/i)).not.toBeInTheDocument();
      expect(all).toHaveClass('selected');
    });
  });
});
