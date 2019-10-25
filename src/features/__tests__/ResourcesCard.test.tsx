import React from 'react';
import { waitForElement, fireEvent } from '@testing-library/react';
import { render } from '../../util/test-utils';
import { faCube } from '@fortawesome/pro-light-svg-icons';
import { resourcesData, categoriesData } from '../../api/__mocks__/resources.data';
import ResourcesCard from '../ResourcesCard';
import { mockGAEvent } from '../../setupTests';

const mockUseResourcesByQueue = jest.fn();
const mockUseCategories = jest.fn();

jest.mock('../../api/resources', () => ({
  useResourcesByQueue: () => mockUseResourcesByQueue(),
  useCategories: () => mockUseCategories()
}));

describe('<ResourcesCard />', () => {
  // Set mock function result before running any tests
  beforeAll(() => {
    mockUseResourcesByQueue.mockReturnValue(resourcesData);
    mockUseCategories.mockReturnValue(categoriesData);
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
    expect(getByTestId('resource-container').children).toHaveLength(3);
  });

  it('should have a clickable resource that fires GooglaAnalytics', async () => {
    const { getByText } = render(<ResourcesCard categ="financial" icon={faCube} />);
    const StudentJobsResource = await waitForElement(() => getByText('Student Jobs'));
    fireEvent.click(StudentJobsResource);
    expect(mockGAEvent).toHaveBeenCalled();
  });

  it('should have a link to all category resources', async () => {
    {
      const { getByText } = render(<ResourcesCard categ="financial" icon={faCube} />);
      await waitForElement(() => getByText('See all financial resources'));
    }
    {
      const { getByText } = render(<ResourcesCard categ="academic" icon={faCube} />);
      const AllAcademicLink = await waitForElement(() => getByText('See all academic resources'));
      expect(AllAcademicLink).toBeInTheDocument();

      // Google Analytics is setup and fires
      fireEvent.click(AllAcademicLink);
      expect(mockGAEvent).toHaveBeenCalled();
    }
  });

  it('should return "No resources available" when Resources data is empty', async () => {
    mockUseResourcesByQueue.mockReturnValue({ data: [], loading: false, error: false });
    const { getByText } = render(<ResourcesCard categ="financial" icon={faCube} />);
    await waitForElement(() => getByText('No resources available.'));
  });
});

describe('with an InfoButton in the CardFooter', () => {
  const validIinfoButtonId = 'financial-resources';

  test('does not display the button when the infoButtonData is missing it', async () => {
    const { queryByTestId } = render(<ResourcesCard categ="financial" icon={faCube} />, {
      appContext: {
        infoButtonData: [{ id: 'invalid-id', content: 'content', title: 'title' }]
      }
    });

    const element = queryByTestId(validIinfoButtonId);
    expect(element).not.toBeInTheDocument();
  });

  test('displays the button when the infoButtonData is included', async () => {
    const { getByTestId } = render(<ResourcesCard categ="financial" icon={faCube} />, {
      appContext: {
        infoButtonData: [{ id: validIinfoButtonId, content: 'content', title: 'title' }]
      }
    });

    const element = await waitForElement(() => getByTestId(validIinfoButtonId));
    expect(element).toBeInTheDocument();
  });
});
