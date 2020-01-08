import React from 'react';
import { waitForElement, wait } from '@testing-library/react';
import { render, authUser, mockEmployeeUser } from '../../util/test-utils';
import { resourcesData, categoriesData, defaultCategory } from '../../api/__mocks__/resources.data';
import userEvent from '@testing-library/user-event';
import Resources from '../../pages/Resources';
import { mockGAEvent } from '../../setupTests';

const mockUseResources = jest.fn();
const mockUseCategories = jest.fn();
const mockDefaultCategory = jest.fn();

jest.mock('../../api/resources', () => ({
  useResources: () => mockUseResources(),
  useCategories: () => mockUseCategories(),
  defaultCategoryName: () => mockDefaultCategory()
}));

describe('<Resources />', () => {
  // Set mock function result before running any tests
  beforeEach(() => {
    mockUseResources.mockReturnValue(resourcesData);
    mockUseCategories.mockReturnValue(categoriesData);
    mockDefaultCategory.mockReturnValue(defaultCategory);
  });

  it('should display the title Resources', async () => {
    const { findByText } = render(<Resources />);
    expect(await findByText('Resources')).toBeInTheDocument();
  });

  it('should have the Featured tag selected', async () => {
    const { findByLabelText, queryByText, findByText } = render(<Resources />);
    const featured = await findByLabelText('Featured');
    const all = await findByLabelText('All');
    userEvent.click(featured);
    await wait(() => expect(featured).toHaveClass('selected'));
    expect(all).not.toHaveClass('selected');
    expect(findByText(/Billing Information/)).not.toBeNull();
    expect(queryByText(/Webcams/)).toBeNull();
  });

  it('Should have a link to skip to results with matching ID in the result container', async () => {
    const { findByText, findByTestId } = render(<Resources />);
    const skipLink = await findByText('Skip to results');
    const anchor = skipLink.getAttribute('href').slice(1);
    const results = await findByTestId('resourcesResults');
    const resultsId = results.getAttribute('id');

    expect(anchor).toEqual(resultsId);
  });

  it('should have "Featured" selected and clickable All category that gets appripriate results', async () => {
    const { getByLabelText, findByText } = render(<Resources />);
    const featured = await waitForElement(() => getByLabelText('Featured'));
    const all = await waitForElement(() => getByLabelText('All'));
    expect(featured).toHaveClass('selected');

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
    const { getByLabelText, getByPlaceholderText, findByText } = render(<Resources />);

    const academic = await waitForElement(() => getByLabelText('Academic'));
    const searchInput = getByPlaceholderText('Find resources') as HTMLInputElement;

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
    const { queryByText, getByPlaceholderText, findByText } = render(<Resources />);

    const searchInput = getByPlaceholderText('Find resources') as HTMLInputElement;
    // Search input value changed to "noResults"
    await userEvent.type(searchInput, 'billingNotThere');

    expect(await findByText(/found 0 results/)).toBeInTheDocument();
    expect(queryByText(/Billing Information/)).not.toBeInTheDocument();

    await userEvent.type(searchInput, 'billing');

    expect(await findByText(/Billing Information/));
  });

  it('should be able to reselect a category and get appropriate data back', async () => {
    const { getByLabelText, queryByText, findByText } = render(<Resources />);
    const academic = await waitForElement(() => getByLabelText('Academic'));
    const all = await waitForElement(() => getByLabelText('All'));
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

    const { getByLabelText, findByText } = render(<Resources />);
    const featured = await waitForElement(() => getByLabelText('Featured'));
    const all = await waitForElement(() => getByLabelText('All'));
    expect(featured).not.toHaveClass('selected');
    expect(all).toHaveClass('selected');
    expect(await findByText(/Billing Information/)).toBeInTheDocument();
    expect(await findByText(/Student Jobs/)).toBeInTheDocument();
    location.search = '';
  });

  it('should move to the All category when searching', async () => {
    const { getByLabelText, findByText, queryByText, getByPlaceholderText } = render(<Resources />);
    let featured = await waitForElement(() => getByLabelText('Featured'));
    let all = await waitForElement(() => getByLabelText('All'));
    const input = await waitForElement(() => getByPlaceholderText('Find resources'));
    // await sleep(2000);
    expect(featured).toHaveClass('selected');
    expect(all).not.toHaveClass('selected');
    await userEvent.type(input, 'student job');
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
      const { getByLabelText, findByText } = render(<Resources />, {
        user: newAuthUser
      });
      const all = await waitForElement(() => getByLabelText('All'));
      userEvent.click(all);
      expect(all).toHaveClass('selected');
      expect(await findByText(/Billing Information/)).toBeInTheDocument();
      expect(await findByText(/Student Jobs/)).toBeInTheDocument();
    });
  });

  describe('with student and employee affiliations', () => {
    it('finds Listservs as an employee but not Student Jobs, since that is student only', async () => {
      const { queryByText, findByText, getByLabelText } = render(<Resources />, {
        user: mockEmployeeUser
      });
      const all = await waitForElement(() => getByLabelText('All'));
      userEvent.click(all);
      expect(all).toHaveClass('selected');
      await findByText(/found 4 results/);

      expect(await findByText(/Listservs/)).toBeInTheDocument();
      expect(await queryByText(/Student Jobs/)).toBeNull();
    });

    it('finds Listservs as an employee when clicking the Financial category', async () => {
      const { queryByText, findByText, getByLabelText } = render(<Resources />, {
        user: mockEmployeeUser
      });
      const financial = await waitForElement(() => getByLabelText('Financial'));
      userEvent.click(financial);
      expect(financial).toHaveClass('selected');
      await findByText(/found 2 results/);

      expect(await findByText(/Listservs/)).toBeInTheDocument();
      expect(await queryByText(/Student Jobs/)).toBeNull();
    });

    it('cannot find "Student Jobs" when searching as an Employee, but finds "Listservs"', async () => {
      const { queryByText, findByText, getByPlaceholderText } = render(<Resources />, {
        user: mockEmployeeUser
      });
      const input = await waitForElement(() => getByPlaceholderText('Find resources'));
      await userEvent.type(input, 'student job');

      expect(await queryByText(/Student Jobs/)).toBeNull();
      await userEvent.type(input, 'Listservs');

      expect(await findByText(/Listservs/)).toBeInTheDocument();
    });

    it('cannot find "Listservs" when searching as a Student, but finds "Student Jobs"', async () => {
      const { queryByText, findByText, getByPlaceholderText } = render(<Resources />);
      const input = await waitForElement(() => getByPlaceholderText('Find resources'));

      await userEvent.type(input, 'student job');
      expect(await findByText(/Student Jobs/)).toBeInTheDocument();

      await userEvent.type(input, 'Listservs');

      expect(await queryByText(/Listservs/)).toBeNull();
    });

    it('finds "Student Jobs" and "Billing Information" but not "Listservs" when clicking the Financial category', async () => {
      const { queryByText, findByText, getByLabelText } = render(<Resources />);
      const tech = await waitForElement(() => getByLabelText('Financial'));
      userEvent.click(tech);
      expect(tech).toHaveClass('selected');

      await findByText(/found 2 results/);

      expect(await queryByText(/Listservs/)).toBeNull();
      expect(await queryByText(/Student Jobs/)).toBeInTheDocument();
      expect(await queryByText(/Billing Information/)).toBeInTheDocument();
    });

    it('finds the 3 student resources and cannot find Listservs employee resource', async () => {
      const { getByLabelText, queryByText, findByText } = render(<Resources />);

      const all = await waitForElement(() => getByLabelText('All'));
      await userEvent.click(all);
      expect(all).toHaveClass('selected');

      await findByText(/found 3 results/);

      expect(await findByText(/Student Jobs/)).toBeInTheDocument();
      expect(await queryByText(/Listservs/)).toBeNull();
    });
  });
});
