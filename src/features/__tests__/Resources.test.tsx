import React from 'react';
import { render, cleanup, waitForElement, fireEvent } from '@testing-library/react';
import {
  resourcesData,
  resourcesDataByCategory,
  categoriesData,
  defaultCategory
} from '../../api/__mocks__/resources.data';
import Resources from '../../pages/Resources';

afterEach(cleanup);

const sleep = ms => {
  return new Promise(res => setTimeout(res, ms));
};

const mockGetResources = jest.fn();
const mockGetResourcesByCategory = jest.fn();
const mockGetCategories = jest.fn();
const mockDefaultCategory = jest.fn(() => defaultCategory);

jest.mock('../../api/resources', () => ({
  getResources: () => mockGetResources(),
  getResourcesByCategory: () => mockGetResourcesByCategory(),
  getCategories: () => mockGetCategories(),
  defaultCategoryId: () => mockDefaultCategory()
}));

describe('<Resources />', () => {
  // Set mock function result before running any tests
  beforeAll(() => {
    mockGetResources.mockResolvedValue(Promise.resolve(resourcesData.data));
    mockGetResourcesByCategory.mockResolvedValue(Promise.resolve(resourcesDataByCategory.data));
    mockGetCategories.mockResolvedValue(Promise.resolve(categoriesData.data));
  });

  it('should render the resources page', async () => {
    const { getByTestId } = render(<Resources />);
    expect(getByTestId('resources-page')).toBeInTheDocument();
  });

  it('should have the Popular tag selected', async () => {
    const { getByLabelText, queryByText, findByText } = render(<Resources />);
    const popular = await waitForElement(() => getByLabelText('Popular'));
    const all = await waitForElement(() => getByLabelText('All'));
    expect(popular).toHaveProperty('checked', true);
    expect(all).toHaveProperty('checked', false);
    expect(findByText(/Billing Information/)).not.toBeNull();
    expect(queryByText(/Student Jobs/)).toBeNull();
  });

  it('should have a clickable All category', async () => {
    const { getByLabelText, findByText } = render(<Resources />);
    const popular = await waitForElement(() => getByLabelText('Popular'));
    const all = await waitForElement(() => getByLabelText('All'));
    fireEvent.click(all);
    expect(popular).toHaveProperty('checked', false);
    expect(all).toHaveProperty('checked', true);
    expect(findByText(/Billing Information/)).not.toBeNull();
    expect(findByText(/Student Jobs/)).not.toBeNull();
  });

  it('should be able to reselect a category', async () => {
    const { getByLabelText, queryByText, findByText } = render(<Resources />);
    const popular = await waitForElement(() => getByLabelText('Popular'));
    const all = await waitForElement(() => getByLabelText('All'));
    fireEvent.click(all);
    fireEvent.click(popular);
    expect(popular).toHaveProperty('checked', true);
    expect(all).toHaveProperty('checked', false);
    expect(findByText(/Billing Information/)).not.toBeNull();
    expect(queryByText(/Student Jobs/)).toBeNull();
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
    const popular = await waitForElement(() => getByLabelText('Popular'));
    const all = await waitForElement(() => getByLabelText('All'));
    expect(popular).toHaveProperty('checked', false);
    expect(all).toHaveProperty('checked', true);
    expect(findByText(/Billing Information/)).not.toBeNull();
    expect(findByText(/Student Jobs/)).not.toBeNull();
    location.search = '';
  });

  it('should move to the All category when searching', async () => {
    console.log(window.location.search);
    const { getByLabelText, findByText, getByPlaceholderText } = render(<Resources />);
    const popular = await waitForElement(() => getByLabelText('Popular'));
    const all = await waitForElement(() => getByLabelText('All'));
    expect(popular).toHaveProperty('checked', true);
    expect(all).toHaveProperty('checked', false);
    await fireEvent.change(getByPlaceholderText('Find resources'), {
      target: {
        value: 'example'
      }
    });
    // Need to wait for debounce
    await sleep(400);
    // Need to fire off another event now that it's initialized
    await fireEvent.change(getByPlaceholderText('Find resources'), {
      target: {
        value: 'example search'
      }
    });
    // Need to wait for debounce
    await sleep(400);
    expect(popular).toHaveProperty('checked', false);
    expect(all).toHaveProperty('checked', true);
    expect(findByText(/Billing Information/)).not.toBeNull();
    expect(findByText(/Student Jobs/)).not.toBeNull();
  });
});
