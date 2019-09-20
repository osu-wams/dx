import React from 'react';
import { waitForElement, fireEvent } from '@testing-library/react';
import { render, authUser } from '../../util/test-utils';
import { resourcesData, categoriesData, defaultCategory } from '../../api/__mocks__/resources.data';
import Resources from '../../pages/Resources';
import { mockGAEvent } from '../../setupTests';

const sleep = (ms: number) => {
  return new Promise(res => setTimeout(res, ms));
};

const mockUseResources = jest.fn();
const mockUseCategories = jest.fn();
const mockDefaultCategory = defaultCategory;

jest.mock('../../api/resources', () => ({
  useResources: () => mockUseResources(),
  useCategories: () => mockUseCategories(),
  defaultCategoryId: () => mockDefaultCategory
}));

describe('<Resources />', () => {
  // Set mock function result before running any tests
  beforeAll(() => {
    mockUseResources.mockReturnValue(resourcesData);
    mockUseCategories.mockReturnValue(categoriesData);
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

  it('should have a clickable All category', async () => {
    const { getByLabelText, findByText } = render(<Resources />);
    const featured = await waitForElement(() => getByLabelText('Featured'));
    const all = await waitForElement(() => getByLabelText('All'));
    fireEvent.click(all);
    await sleep(50);
    expect(featured).not.toHaveClass('selected');
    expect(all).toHaveClass('selected');
    expect(findByText(/Student Jobs/)).not.toBeNull();
    expect(findByText(/Billing Information/)).not.toBeNull();
  });

  it('should have clickable categories that report to GoogleAnalytics', async () => {
    const { getByText } = render(<Resources />);
    await sleep(50);
    const BillingInformationResource = await getByText(/Billing Information/);
    expect(BillingInformationResource).not.toBeNull();
    fireEvent.click(BillingInformationResource);
    expect(mockGAEvent).toHaveBeenCalled();
  });

  it('should be able to reselect a category', async () => {
    const { getByLabelText, queryByText, findByText } = render(<Resources />);
    const academic = await waitForElement(() => getByLabelText('Academic'));
    const all = await waitForElement(() => getByLabelText('All'));
    fireEvent.click(all);
    fireEvent.click(academic);
    await sleep(50);
    expect(academic).toHaveClass('selected');
    expect(all).not.toHaveClass('selected');
    expect(findByText(/Billing Information/)).not.toBeNull();
    expect(queryByText(/Webcams/)).toBeNull();
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
    await sleep(50);
    const featured = await waitForElement(() => getByLabelText('Featured'));
    const all = await waitForElement(() => getByLabelText('All'));
    expect(featured).not.toHaveClass('selected');
    expect(all).toHaveClass('selected');
    expect(findByText(/Billing Information/)).not.toBeNull();
    expect(findByText(/Student Jobs/)).not.toBeNull();
    location.search = '';
  });

  it('should move to the All category when searching', async () => {
    console.log(window.location.search);
    const { getByLabelText, findByText, getByPlaceholderText } = render(<Resources />);
    let featured = await waitForElement(() => getByLabelText('Featured'));
    let all = await waitForElement(() => getByLabelText('All'));
    expect(featured).toHaveClass('selected');
    expect(all).not.toHaveClass('selected');
    await fireEvent.change(getByPlaceholderText('Find resources'), {
      target: {
        value: 'example'
      }
    });
    // Need to wait for debounce
    await sleep(600);
    expect(featured).not.toHaveClass('selected');
    expect(all).toHaveClass('selected');
    expect(findByText(/Billing Information/)).not.toBeNull();
    expect(findByText(/Student Jobs/)).not.toBeNull();
  });

  describe('with audiences', () => {
    it('shows all resources', async () => {
      const newAuthUser = { ...authUser, classification: { id: authUser.osuId } };
      const { getByLabelText, findByText } = render(<Resources />, {
        user: newAuthUser
      });
      const all = await waitForElement(() => getByLabelText('All'));
      fireEvent.click(all);
      await sleep(50);
      expect(all).toHaveClass('selected');
      expect(findByText(/Billing Information/)).not.toBeNull();
      expect(findByText(/Student Jobs/)).not.toBeNull();
    });
    it('shows one resource', async () => {
      const newAuthUser = {
        ...authUser,
        classification: {
          id: authUser.osuId,
          attributes: {
            level: '',
            campus: '',
            classification: '',
            isInternational: true
          }
        }
      };
      const { getByLabelText, queryByText, findByText } = render(<Resources />, {
        user: newAuthUser
      });
      const all = await waitForElement(() => getByLabelText('All'));
      fireEvent.click(all);
      await sleep(50);
      expect(all).toHaveClass('selected');
      expect(findByText(/Billing Information/)).not.toBeNull();
      expect(queryByText(/Student Jobs/)).toBeNull();
    });
  });
});
