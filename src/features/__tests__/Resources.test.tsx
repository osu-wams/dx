import React from 'react';
import { waitFor, screen, act } from '@testing-library/react';
import {
  render,
  authUser,
  mockEmployeeUser,
  renderWithUserContext,
  mockGradUser,
} from 'src/util/test-utils';
import { Context as ResponsiveContext } from 'react-responsive';
import userEvent from '@testing-library/user-event';
import ResourcesComponent from 'src/pages/Resources';
import { mockGAEvent, mockTrendingEvent } from 'src/setupTests';
import { Resources } from '@osu-wams/hooks';
import { resourceUsage } from 'process';

const mockUseResources = jest.fn();
const mockUseCategories = jest.fn();
const mockDefaultCategory = jest.fn();
const mockPostFavorite = jest.fn();
const { resourcesData, categoriesData, defaultCategory } = Resources.mockResources;

jest.mock('@osu-wams/hooks', () => {
  const original = jest.requireActual('@osu-wams/hooks');
  return {
    ...original,
    useResources: () => mockUseResources(),
    useCategories: () => mockUseCategories(),
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
const renderResources = (userType?: any) => {
  let utils;
  if (!userType) {
    utils = render(<ResourcesComponent />);
  } else {
    utils = render(<ResourcesComponent />, {
      user: userType,
    });
  }
  const featured = utils.getByLabelText('Featured');
  const all = utils.getByLabelText('All');
  const searchInput = utils.getByPlaceholderText('Find resources') as HTMLInputElement;
  const financial = utils.getByLabelText('Financial');

  return {
    ...utils,
    searchInput,
    featured,
    financial,
    all,
  };
};

describe('<Resources />', () => {
  // Set mock function result before running any tests
  beforeEach(() => {
    mockUseResources.mockReturnValue(resourcesData);
    mockUseCategories.mockReturnValue(categoriesData);
    mockDefaultCategory.mockReturnValue(defaultCategory);
  });

  describe('Components', () => {
    it('should display the title Resources', () => {
      renderResources();
      expect(screen.getByText('Resources', { selector: 'h1' })).toBeInTheDocument();
    });

    it('should not autoFocus the search input on mobile', () => {
      const { searchInput } = renderResources();
      expect(searchInput).not.toHaveFocus();
    });

    it('should autoFocus on desktop', () => {
      renderWithUserContext(
        <ResponsiveContext.Provider value={{ width: '768' }}>
          <ResourcesComponent />
        </ResponsiveContext.Provider>
      );
      const searchInput = screen.getByPlaceholderText('Find resources') as HTMLInputElement;
      expect(searchInput).toHaveFocus();
    });

    it('Should have a link to skip to results with matching ID in the result container', async () => {
      const { getByText, findByTestId } = renderResources();
      const skipLink = getByText('Skip to results');
      const anchor = skipLink.getAttribute('href')!.slice(1);
      const results = await findByTestId('resourcesResults');
      const resultsId = results.getAttribute('id');

      expect(anchor).toEqual(resultsId);
    });

    it('should load with the "Featured" category selected and results filtered accordingly', async () => {
      const { all, featured } = renderResources();

      await waitFor(() => expect(featured).toHaveClass('selected'));
      expect(all).not.toHaveClass('selected');
      expect(screen.getByText(/Billing Information/)).toBeInTheDocument();
      expect(screen.queryByText(/Webcams/)).toBeNull();
    });
  });

  describe('Category interactions', () => {
    it('should have "Featured" selected and clickable All category that gets appropriate results', async () => {
      mockDefaultCategory.mockReturnValue('All');
      const { findByText, all, featured } = renderResources();

      expect(featured).toHaveClass('selected'); // default selected

      userEvent.click(all);

      expect(featured).not.toHaveClass('selected');
      expect(all).toHaveClass('selected');
      expect(await findByText(/Student Jobs/)).toBeInTheDocument();
      expect(await findByText(/Billing Information/)).toBeInTheDocument();
    });

    it('should have clickable categories that report to GoogleAnalytics', async () => {
      renderResources();
      const BillingInformationResource = screen.getByText(/Billing Information/);
      expect(BillingInformationResource).not.toBeNull();
      userEvent.click(BillingInformationResource);
      expect(mockGAEvent).toHaveBeenCalledTimes(1);
      expect(mockTrendingEvent).toHaveBeenCalledTimes(1);
    });

    it('should have clickable categories that will not report as a trending resource', async () => {
      mockDefaultCategory.mockReturnValue('All');
      mockUseResources.mockReturnValue({
        ...resourcesData,
        data: [
          { ...resourcesData.data[0], excludeTrending: true, locations: ['Corvallis', 'Bend'] },
        ],
      });
      renderResources();
      const nonTrendingResource = screen.getByText(/Testo/);
      expect(nonTrendingResource).not.toBeNull();
      userEvent.click(nonTrendingResource);
      expect(mockGAEvent).toHaveBeenCalledTimes(1);
      expect(mockTrendingEvent).not.toHaveBeenCalledTimes(1);
    });

    it('should empty input and get results for that category only when clicking category link', async () => {
      mockDefaultCategory.mockReturnValue(defaultCategory);
      const { searchInput } = renderResources();

      const academic = screen.getByLabelText('Academic');

      // Search input value changed to "noResults"
      await userEvent.type(searchInput, 'noResults');

      expect(await screen.findByText(/found 0 results/)).toBeInTheDocument();
      userEvent.click(academic);
      expect(await screen.findByText(/Student Athletes/)).toBeInTheDocument();
      expect(await screen.findByText(/found 1 result/)).toBeInTheDocument();
      // Search input should be clear, 'noResults' should be gone
      expect(searchInput.value).toEqual('');
    });

    it('should be able to reselect a category and get appropriate data back', async () => {
      const { all } = renderResources();

      const academic = screen.getByLabelText('Academic');

      userEvent.click(all);
      userEvent.click(academic);
      expect(academic).toHaveClass('selected');
      expect(all).not.toHaveClass('selected');
      expect(await screen.findByText(/Student Athletes/)).toBeInTheDocument();
      expect(screen.queryByText(/Billing Information/)).toBeNull();
    });
  });

  it('Changes Search term should re-run the search effectively', async () => {
    const { searchInput } = renderResources();
    const badQuery = 'billingNotThere';

    userEvent.type(searchInput, badQuery);

    expect(await screen.findByText(/found 0 results/)).toBeInTheDocument();
    expect(screen.queryByText(/Billing Information/)).toBeNull();
    expect(mockGAEvent).toHaveBeenCalledTimes(1);

    // We need to clear the input value if not the below interaction sits on top of the previous
    searchInput.value = '';

    await userEvent.type(searchInput, 'billing');

    expect(await screen.findByText(/Billing Information/)).toBeInTheDocument();
    expect(mockGAEvent).toHaveBeenCalledTimes(2);
  });

  it('searches for case-insensitive synonyms', async () => {
    const badQuery = 'billingNotThere';
    const { searchInput } = renderResources();
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
    const { findByText, featured, all } = renderResources();

    expect(featured).not.toHaveClass('selected');
    expect(all).toHaveClass('selected');
    expect(await findByText(/Billing Information/)).toBeInTheDocument();
    expect(await findByText(/Student Jobs/)).toBeInTheDocument();
    location.search = '';
  });

  it('should change categories when the back button is clicked', async () => {
    const { featured, all } = renderResources();

    expect(all).toBeInTheDocument();
    expect(featured).toHaveClass('selected');
    expect(all).not.toHaveClass('selected');
    userEvent.click(all);
    expect(featured).not.toHaveClass('selected');
    expect(all).toHaveClass('selected');
    // Back button causes window.onpopstate to fire and it would have the previously clicked category
    window.onpopstate!(new PopStateEvent('state', { state: { category: 'featured' } }));
    expect(featured).toHaveClass('selected');
    expect(all).not.toHaveClass('selected');
  });

  it('should move to the All category when searching', async () => {
    const { featured, all, searchInput } = renderResources();

    expect(featured).toHaveClass('selected');
    expect(all).not.toHaveClass('selected');
    await userEvent.type(searchInput, 'student job');
    expect(await screen.findByText(/found 1 result/)).toBeInTheDocument();
    expect(await screen.findByText(/Student Jobs/)).toBeInTheDocument();

    expect(featured).not.toHaveClass('selected');
    expect(all).toHaveClass('selected');

    expect(screen.queryByText(/Billing Information/)).toBeNull();
  });

  describe('Favorite Resources tests', () => {
    it('should have favorites category when user has active favorites resources', async () => {
      renderResources();
      const favorites = await screen.findByText(/favorites/i);
      expect(favorites).toBeInTheDocument();
      userEvent.click(favorites);
      expect(await screen.findByText(/found 2 results/i)).toBeInTheDocument();
    });

    it('Finds Student Jobs resource, clicking on heart input adds it as a favorite', async () => {
      const { findByText, all } = renderResources();
      userEvent.click(all);

      expect(await findByText(/Student Jobs/)).toBeInTheDocument();
      var el = document.querySelector(
        `input[aria-label="Add Student Jobs link to your favorite resources"]`
      );
      expect(el).toBeInTheDocument();

      // checking for el to avoid element might be null error
      el ? userEvent.click(el) : null;
      expect(await mockPostFavorite).toHaveBeenCalledTimes(1);
      expect(await authUser.refreshFavorites).toHaveBeenCalledTimes(1);
      expect(mockGAEvent).toHaveBeenCalledTimes(2);
    });

    it('should not find the favorites category button when user does not have favorites resources', async () => {
      const noFavUser = { ...authUser, data: { ...authUser.data, favoriteResources: [] } };
      renderResources(noFavUser);

      expect(screen.queryByText(/favorites/i)).toBeNull();
    });
  });

  describe('with audiences', () => {
    it('shows all resources', async () => {
      const newAuthUser = { ...authUser, classification: { id: authUser.data.osuId } };
      const { all } = renderResources(newAuthUser);

      userEvent.click(all);
      expect(all).toHaveClass('selected');
      expect(await screen.findByText(/Billing Information/)).toBeInTheDocument();
      expect(await screen.findByText(/Student Jobs/)).toBeInTheDocument();
    });
  });

  describe('Graduate Student', () => {
    beforeEach(() => {
      const { all } = renderResources(mockGradUser);
      userEvent.click(all);
    });

    it('finds 3 total results that apply to them', async () => {
      expect(await screen.findByText(/found 3 results/i)).toBeInTheDocument();
    });

    it('finds "Graduate Student Only" item but not "Student Jobs" since that is tagged undegraduate', async () => {
      expect(await screen.findByText(/Graduate Student Only/i)).toBeInTheDocument();
      expect(screen.queryByText(/Student Jobs/i)).toBeNull();
    });
  });

  describe('Undergraduate Student', () => {
    beforeEach(() => {
      const { all } = renderResources();
      userEvent.click(all);
    });

    it('finds "Student Jobs" since that is tagged undegraduate, but not "Graduate Student Only"', async () => {
      expect(await screen.findByText(/Student Jobs/i)).toBeInTheDocument();
      expect(screen.queryByText(/Graduate Student Only/i)).toBeNull();
    });
  });

  describe('with student and employee affiliations', () => {
    it('finds Listservs as an employee but not Student Jobs, since that is student only', async () => {
      mockDefaultCategory.mockReturnValue('All');
      const { all } = renderResources(mockEmployeeUser);
      userEvent.click(all);

      expect(all).toHaveClass('selected');
      expect(await screen.findByText(/found 4 results/)).toBeInTheDocument();
      // employee and student tagged events
      expect(screen.getByText(/Academics for Student Athletes/)).toBeInTheDocument();
      expect(screen.getByText(/Billing Information/)).toBeInTheDocument();

      // employee only events
      expect(screen.getByText(/Listservs/)).toBeInTheDocument();
      expect(screen.getByText(/Employee Only/)).toBeInTheDocument();

      // student only event cannot be found
      expect(screen.queryByText(/Student Jobs/)).toBeNull();
      // Bend only event not present for Corvallis Employee
      expect(screen.queryByText(/Bend Testo Success Center/)).toBeNull();
    });

    it('finds Listservs as an employee when clicking the Financial category', async () => {
      mockDefaultCategory.mockReturnValue('Financial');
      const { financial } = renderResources(mockEmployeeUser);

      userEvent.click(financial);

      expect(financial).toHaveClass('selected');
      expect(await screen.findByText(/found 2 results/)).toBeInTheDocument();
      expect(await screen.findByText(/Listservs/)).toBeInTheDocument();
      expect(screen.queryByText(/Student Jobs/)).toBeNull();
    });

    it('cannot find "Student Jobs" when searching as an Employee, but finds "Listservs"', async () => {
      const { searchInput } = renderResources(mockEmployeeUser);

      await userEvent.type(searchInput, 'student job');
      // Student Jobs resources is null because it's only there for Student, not employee
      expect(screen.queryByText(/Student Jobs/)).toBeNull();

      await userEvent.type(searchInput, 'Listservs');
      expect(await screen.findByText(/Listservs/)).toBeInTheDocument();
    });

    it('cannot find "Listservs" when searching as a Student, but finds "Student Jobs"', async () => {
      const { searchInput } = renderResources();

      userEvent.type(searchInput, 'student job');
      expect(await screen.findByText(/Student Jobs/)).toBeInTheDocument();

      userEvent.type(searchInput, 'Listservs');
      expect(screen.queryByText(/Listservs/)).toBeNull();
    });

    it('finds "Student Jobs" and "Billing Information" but not "Listservs" when clicking the Financial category', async () => {
      const { queryByText, getByText, findByText, financial } = renderResources();

      userEvent.click(financial);

      expect(financial).toHaveClass('selected');
      expect(await findByText(/found 2 results/)).toBeInTheDocument();
      expect(queryByText(/Listservs/)).toBeNull();
      expect(getByText(/Student Jobs/)).toBeInTheDocument();
      expect(getByText(/Billing Information/)).toBeInTheDocument();
    });

    it('finds the 3 student resources and cannot find Listservs employee resource', async () => {
      const { all } = renderResources();
      userEvent.click(all);
      expect(all).toHaveClass('selected');
      expect(await screen.findByText(/found 3 results/i)).toBeInTheDocument();
      expect(await screen.findByText(/Student Jobs/i)).toBeInTheDocument();
      expect(screen.queryByText(/Listservs/i)).toBeNull();
    });
  });
});
