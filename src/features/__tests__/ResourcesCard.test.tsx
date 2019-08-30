import React from 'react';
import { render, waitForElement } from '@testing-library/react';
import { faCube } from '@fortawesome/pro-light-svg-icons';
import { resourcesData, categoriesData } from '../../api/__mocks__/resources.data';
import ResourcesCard from '../ResourcesCard';

const mockGetResourcesByQueue = jest.fn();
const mockGetCategories = jest.fn();

jest.mock('../../api/resources', () => ({
  getResourcesByQueue: () => mockGetResourcesByQueue(),
  getCategories: () => mockGetCategories()
}));

describe('<ResourcesCard />', () => {
  // Set mock function result before running any tests
  beforeAll(() => {
    mockGetResourcesByQueue.mockResolvedValue(Promise.resolve(resourcesData.data));
    mockGetCategories.mockResolvedValue(Promise.resolve(categoriesData.data));
  });

  it('should render the appropriate title', async () => {
    {
      const { getByText } = render(<ResourcesCard categ="financial" icon={faCube} />);
      expect(getByText('Financial Resources')).toBeInTheDocument();
    }
    {
      const { getByText } = render(<ResourcesCard categ="academic" icon={faCube} />);
      expect(getByText('Academic Resources')).toBeInTheDocument();
    }
  });

  it('should have items with icons and text', async () => {
    const { getByText, container } = render(<ResourcesCard categ="financial" icon={faCube} />);
    await waitForElement(() => getByText('Student Jobs'));
    expect(container.querySelector('img')).toBeInTheDocument();
  });

  it('should have two items', async () => {
    const { getByText, getByTestId } = render(<ResourcesCard categ="financial" icon={faCube} />);
    await waitForElement(() => getByText('Student Jobs'));
    expect(getByTestId('resource-container').children).toHaveLength(2);
  });

  it('should have a link to all category resources', async () => {
    {
      const { getByText } = render(<ResourcesCard categ="financial" icon={faCube} />);
      await waitForElement(() => getByText('See all financial resources'));
    }
    {
      const { getByText } = render(<ResourcesCard categ="academic" icon={faCube} />);
      await waitForElement(() => getByText('See all academic resources'));
    }
  });

  it('should return "No resources available" when Resources data is empty', async () => {
    mockGetResourcesByQueue.mockResolvedValue(Promise.resolve({}));
    const { getByText } = render(<ResourcesCard categ="financial" icon={faCube} />);
    await waitForElement(() => getByText('No resources available.'));
  });
});
