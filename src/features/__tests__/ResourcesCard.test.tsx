import React from 'react';
import { render, waitForElement } from '@testing-library/react';
import { resourcesData, categoriesData } from '../../api/__mocks__/resources.data';
import ResourcesCard from '../ResourcesCard';

const mockGetResources = jest.fn();
const mockGetCategories = jest.fn();

jest.mock('../../api/resources', () => ({
  getResources: () => mockGetResources(),
  getResourcesByCategory: () => mockGetResources(),
  getCategories: () => mockGetCategories()
}));

describe('<ResourcesCard />', () => {
  // Set mock function result before running any tests
  beforeAll(() => {
    mockGetResources.mockResolvedValue(Promise.resolve(resourcesData.data));
    mockGetCategories.mockResolvedValue(Promise.resolve(categoriesData.data));
  });

  it('should render the approriate title', async () => {
    {
      const { getByText } = render(<ResourcesCard categ="financial" />);
      expect(getByText('Financial Resources')).toBeInTheDocument();
    }
    {
      const { getByText } = render(<ResourcesCard categ="academic" />);
      expect(getByText('Academic Resources')).toBeInTheDocument();
    }
  });

  it('should have items with icons and text', async () => {
    const { getByText, container } = render(<ResourcesCard categ="financial" />);
    await waitForElement(() => getByText('Student Jobs'));
    expect(container.querySelector('img')).toBeInTheDocument();
  });

  it('should have two items', async () => {
    const { getByText, getByTestId } = render(<ResourcesCard categ="financial" />);
    await waitForElement(() => getByText('Student Jobs'));
    expect(getByTestId('resource-container').children).toHaveLength(2);
  });

  it('should have a link to all category resources', async () => {
    {
      const { getByText } = render(<ResourcesCard categ="financial" />);
      await waitForElement(() => getByText('See all financial resources'));
    }
    {
      const { getByText } = render(<ResourcesCard categ="academic" />);
      await waitForElement(() => getByText('See all academic resources'));
    }
  });

  it('should return "No resources available" when Resources data is empty', async () => {
    mockGetResources.mockResolvedValue(Promise.resolve({}));
    const { getByText } = render(<ResourcesCard categ="financial" />);
    await waitForElement(() => getByText('No resources available.'));
  });
});
