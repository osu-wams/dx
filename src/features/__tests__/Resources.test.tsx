import React from 'react';
import { wait } from '@testing-library/react';
import { render, authUser, mockEmployeeUser } from '../../util/test-utils';
import userEvent from '@testing-library/user-event';
import Resources from '../../pages/Resources';
import { mockGAEvent } from '../../setupTests';
import { Resources as hooksResources } from '@osu-wams/hooks';

const mockUseResources = jest.fn();
const mockUseCategories = jest.fn();
const mockDefaultCategory = jest.fn();
const { resourcesData, categoriesData, defaultCategory } = hooksResources.mockResources;

const mockUseResourcesByQueue = jest.fn();
jest.mock('@osu-wams/hooks', () => {
  return {
    ...jest.requireActual('@osu-wams/hooks'),
    useResources: () => mockUseResources(),
    useCategories: () => mockUseCategories(),
    defaultCategoryName: () => mockDefaultCategory()
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
    utils = render(<Resources />);
  } else {
    utils = render(<Resources />, {
      user: userType
    });
  }
  const featured = utils.getByLabelText('Featured');
  const all = utils.getByLabelText('All');
  const searchInput = utils.getByPlaceholderText('Find resources') as HTMLInputElement;
  const academic = utils.getByLabelText('Academic');
  const financial = utils.getByLabelText('Financial');

  return {
    ...utils,
    searchInput,
    featured,
    academic,
    financial,
    all
  };
};

describe('<Resources />', () => {
  // Set mock function result before running any tests
  beforeEach(() => {
    mockUseResources.mockReturnValue(resourcesData);
    mockUseCategories.mockReturnValue(categoriesData);
    mockDefaultCategory.mockReturnValue(defaultCategory);
  });

  it('should display the title Resources', async () => {
    const { findByText } = render(<Resources />);
    expect(await findByText('Resources', { selector: 'h1' })).toBeInTheDocument();
  });

  it('should have the Featured tag selected', async () => {
    const { all, featured, queryByText, findByText } = renderResources();

    await wait(() => expect(featured).toHaveClass('selected'));
    expect(all).not.toHaveClass('selected');
    expect(findByText(/Billing Information/)).not.toBeNull();
    expect(queryByText(/Webcams/)).toBeNull();
  });

  it('Should have a link to skip to results with matching ID in the result container', async () => {
    const { getByText, findByTestId } = render(<Resources />);
    const skipLink = getByText('Skip to results');
    const anchor = skipLink.getAttribute('href')!.slice(1);
    const results = await findByTestId('resourcesResults');
    const resultsId = results.getAttribute('id');

    expect(anchor).toEqual(resultsId);
  });

  it('should have "Featured" selected and clickable All category that gets appripriate results', async () => {
    const { findByText, all, featured } = renderResources();

    expect(featured).toHaveClass('selected'); // default selected

    userEvent.click(all);

    expect(featured).not.toHaveClass('selected');
    expect(all).toHaveClass('selected');
    expect(await findByText(/Student Jobs/)).not.toBeNull();
    expect(await findByText(/Billing Information/)).not.toBeNull();
  });

  it('should have clickable categories that report to GoogleAnalytics', async () => {
    const { getByText } = render(<Resources />);
    const BillingInformationResource = await getByText(/Billing Information/);
    expect(BillingInformationResource).not.toBeNull();
    userEvent.click(BillingInformationResource);
    expect(mockGAEvent).toHaveBeenCalled();
  });

  it('should empty input and get results for that category only when clicking category link', async () => {
    mockDefaultCategory.mockReturnValue(defaultCategory);
    const { searchInput, academic, findByText } = renderResources();

    // Search input value changed to "noResults"
    await userEvent.type(searchInput, 'noResults');

    expect(await findByText(/found 0 results/)).toBeInTheDocument();
    userEvent.click(academic);
    expect(await findByText(/Student Athletes/)).toBeInTheDocument();
    expect(await findByText(/found 1 result/)).toBeInTheDocument();
    // Search input should be clear, 'noResults' should be gone
    expect(searchInput.value).toEqual('');
  });

  it('Changes Search term should re-run the search effectively', async () => {
    const { queryByText, searchInput, findByText } = renderResources();

    await userEvent.type(searchInput, 'billingNotThere');

    expect(await findByText(/found 0 results/)).toBeInTheDocument();
    expect(queryByText(/Billing Information/)).not.toBeInTheDocument();

    await userEvent.type(searchInput, 'billing');

    expect(await findByText(/Billing Information/)).toBeInTheDocument();
  });

  it('should be able to reselect a category and get appropriate data back', async () => {
    const { queryByText, findByText, academic, all } = renderResources();

    userEvent.click(all);
    userEvent.click(academic);
    expect(academic).toHaveClass('selected');
    expect(all).not.toHaveClass('selected');
    expect(await findByText(/Student Athletes/)).toBeInTheDocument();
    expect(queryByText(/Billing Information/)).toBeNull();
  });

  it('should load a different category based on the URL parameter', async () => {
    let location = {
      ...window.location,
      search: '?category=all'
    };
    Object.defineProperty(window, 'location', {
      writable: true,
      value: location
    });
    const { findByText, featured, all } = renderResources();

    expect(featured).not.toHaveClass('selected');
    expect(all).toHaveClass('selected');
    expect(await findByText(/Billing Information/)).toBeInTheDocument();
    expect(await findByText(/Student Jobs/)).toBeInTheDocument();
    location.search = '';
  });

  it('should move to the All category when searching', async () => {
    const { findByText, queryByText, featured, all, searchInput } = renderResources();

    expect(featured).toHaveClass('selected');
    expect(all).not.toHaveClass('selected');
    await userEvent.type(searchInput, 'student job');
    // Need to wait for debounce
    expect(await findByText(/found 1 result/)).toBeInTheDocument();
    expect(await findByText(/Student Jobs/)).toBeInTheDocument();

    expect(featured).not.toHaveClass('selected');
    expect(all).toHaveClass('selected');

    expect(queryByText(/Billing Information/)).toBeNull();
  });

  describe('with audiences', () => {
    it('shows all resources', async () => {
      const newAuthUser = { ...authUser, classification: { id: authUser.data.osuId } };
      const { findByText, all } = renderResources(newAuthUser);

      userEvent.click(all);
      expect(all).toHaveClass('selected');
      expect(await findByText(/Billing Information/)).toBeInTheDocument();
      expect(await findByText(/Student Jobs/)).toBeInTheDocument();
    });
  });

  describe('with student and employee affiliations', () => {
    it('finds Listservs as an employee but not Student Jobs, since that is student only', async () => {
      const { queryByText, findByText, all } = renderResources(mockEmployeeUser);
      userEvent.click(all);

      expect(all).toHaveClass('selected');
      expect(await findByText(/found 5 results/)).toBeInTheDocument();
      expect(await findByText(/Listservs/)).toBeInTheDocument();
      expect(await queryByText(/Student Jobs/)).toBeNull();
    });

    it('finds Listservs as an employee when clicking the Financial category', async () => {
      const { queryByText, findByText, financial } = renderResources(mockEmployeeUser);

      userEvent.click(financial);

      expect(financial).toHaveClass('selected');
      expect(await findByText(/found 2 results/)).toBeInTheDocument();
      expect(await findByText(/Listservs/)).toBeInTheDocument();
      expect(await queryByText(/Student Jobs/)).toBeNull();
    });

    it('cannot find "Student Jobs" when searching as an Employee, but finds "Listservs"', async () => {
      const { queryByText, findByText, searchInput } = renderResources(mockEmployeeUser);

      await userEvent.type(searchInput, 'student job');
      // Student Jobs resources is null because it's only there for Student, not employee
      expect(await queryByText(/Student Jobs/)).toBeNull();

      await userEvent.type(searchInput, 'Listservs');
      expect(await findByText(/Listservs/)).toBeInTheDocument();
    });

    it('cannot find "Listservs" when searching as a Student, but finds "Student Jobs"', async () => {
      const { queryByText, findByText, searchInput } = renderResources();

      await userEvent.type(searchInput, 'student job');
      expect(await findByText(/Student Jobs/)).toBeInTheDocument();

      await userEvent.type(searchInput, 'Listservs');
      expect(await queryByText(/Listservs/)).toBeNull();
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
      const { queryByText, findByText, all } = renderResources();

      await userEvent.click(all);
      expect(all).toHaveClass('selected');
      expect(await findByText(/found 3 results/)).toBeInTheDocument();
      expect(await findByText(/Student Jobs/)).toBeInTheDocument();
      expect(await queryByText(/Listservs/)).toBeNull();
    });
  });
});
