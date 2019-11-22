import React from 'react';
import { waitForElement, fireEvent, act } from '@testing-library/react';
import { render, authUser, sleep } from '../../util/test-utils';
import { resourcesData, categoriesData, defaultCategory } from '../../api/__mocks__/resources.data';
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
    const { getByText } = render(<Resources />);
    await waitForElement(() => getByText('Resources'));
  });

  it('should have the Featured tag selected', async () => {
    const { getByLabelText, queryByText, findByText } = render(<Resources />);
    const featured = await waitForElement(() => getByLabelText('Featured'));
    const all = await waitForElement(() => getByLabelText('All'));
    fireEvent.click(featured);
    await sleep(50);
    expect(featured).toHaveClass('selected');
    expect(all).not.toHaveClass('selected');
    expect(findByText(/Billing Information/)).not.toBeNull();
    expect(queryByText(/Webcams/)).toBeNull();
  });

  it('Should have a link to skip to results with matching ID in the result container', async () => {
    const { getByText, getByTestId } = render(<Resources />);
    const skipLink = await waitForElement(() => getByText('Skip to results'));
    const anchor = skipLink.getAttribute('href').slice(1);
    const results = await waitForElement(() => getByTestId('resourcesResults'));
    const resultsId = results.getAttribute('id');

    expect(anchor).toEqual(resultsId);
  });

  it('should have a clickable All category', async () => {
    const { getByLabelText, findByText } = render(<Resources />);
    const featured = await waitForElement(() => getByLabelText('Featured'));
    const all = await waitForElement(() => getByLabelText('All'));
    await fireEvent.click(all);
    expect(featured).not.toHaveClass('selected');
    expect(all).toHaveClass('selected');
    expect(await findByText(/Student Jobs/)).not.toBeNull();
    expect(await findByText(/Billing Information/)).not.toBeNull();
  });

  it('should have clickable categories that report to GoogleAnalytics', async () => {
    const { getByText } = render(<Resources />);
    const BillingInformationResource = await getByText(/Billing Information/);
    expect(BillingInformationResource).not.toBeNull();
    fireEvent.click(BillingInformationResource);
    expect(mockGAEvent).toHaveBeenCalled();
  });

  it('should empty input and get results for that category only when clicking category link', async () => {
    const { getByLabelText, getByPlaceholderText, findByText } = render(<Resources />);
    const featured = await waitForElement(() => getByLabelText('Featured'));
    expect(featured).toHaveClass('selected');

    const academic = await waitForElement(() => getByLabelText('Academic'));
    const searchInput = getByPlaceholderText('Find resources') as HTMLInputElement;

    // Search input value changed to "noResults"
    await fireEvent.change(searchInput, {
      target: {
        value: 'noResults'
      }
    });

    expect(await findByText(/found 0 results/)).toBeInTheDocument();
    await fireEvent.click(academic);
    expect(await findByText(/Student Athletes/)).toBeInTheDocument();
    expect(await findByText(/found 1 result/)).toBeInTheDocument();
    // Search input should be clear, 'noResults' should be gone
    expect(searchInput.value).toEqual('');
  });

  it('Changes Search term should re-run the search effectively', async () => {
    const { getByLabelText, queryByText, getByPlaceholderText, findByText } = render(<Resources />);
    const featured = await waitForElement(() => getByLabelText('Featured'));
    expect(featured).toHaveClass('selected');

    // const academic = await waitForElement(() => getByLabelText('Academic'));
    const searchInput = getByPlaceholderText('Find resources') as HTMLInputElement;
    // Search input value changed to "noResults"
    await fireEvent.change(searchInput, {
      target: {
        value: 'billingNotThere'
      }
    });

    expect(await findByText(/found 0 results/)).toBeInTheDocument();
    expect(queryByText(/Billing Information/)).not.toBeInTheDocument();

    await fireEvent.change(searchInput, {
      target: {
        value: 'billing'
      }
    });

    expect(await findByText(/Billing Information/));
  });

  it('should be able to reselect a category', async () => {
    const { getByLabelText, queryByText, findByText } = render(<Resources />);
    const academic = await waitForElement(() => getByLabelText('Academic'));
    const all = await waitForElement(() => getByLabelText('All'));
    await fireEvent.click(all);
    await fireEvent.click(academic);
    expect(academic).toHaveClass('selected');
    expect(all).not.toHaveClass('selected');
    expect(findByText(/Student Athletes/)).not.toBeNull();
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
    expect(await findByText(/Billing Information/)).not.toBeNull();
    expect(await findByText(/Student Jobs/)).not.toBeNull();
    location.search = '';
  });

  it('should move to the All category when searching', async () => {
    const { getByLabelText, findByText, queryByText, getByPlaceholderText, debug } = render(
      <Resources />
    );
    let featured = await waitForElement(() => getByLabelText('Featured'));
    let all = await waitForElement(() => getByLabelText('All'));
    const input = await waitForElement(() => getByPlaceholderText('Find resources'));
    // await sleep(2000);
    expect(featured).toHaveClass('selected');
    expect(all).not.toHaveClass('selected');
    await fireEvent.change(input, {
      target: {
        value: 'student job'
      }
    });
    // Need to wait for debounce
    expect(await findByText(/found 1 result/)).toBeInTheDocument();
    expect(await findByText(/Student Jobs/)).toBeInTheDocument();
    // expect()
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
      await fireEvent.click(all);
      expect(all).toHaveClass('selected');
      expect(await findByText(/Billing Information/)).not.toBeNull();
      expect(await findByText(/Student Jobs/)).not.toBeNull();
    });
  });
});
