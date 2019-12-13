import React from 'react';
import { waitForElement, fireEvent } from '@testing-library/react';
import { render, mockAppContext } from '../../util/test-utils';
import { faCube } from '@fortawesome/pro-light-svg-icons';
import { resourcesCardData } from '../../api/__mocks__/resources.data';
import ResourcesCard from '../ResourcesCard';
import { mockGAEvent } from '../../setupTests';

const mockUseResourcesByQueue = jest.fn();

jest.mock('../../api/resources', () => ({
  useResourcesByQueue: () => mockUseResourcesByQueue()
}));

describe('<ResourcesCard />', () => {
  // Set mock function result before running any tests
  beforeEach(() => {
    mockUseResourcesByQueue.mockReturnValue(resourcesCardData);
  });

  it('should render the appropriate title', async () => {
    const { getByText } = render(<ResourcesCard categ="financial" icon={faCube} />);
    expect(getByText('Featured Resources')).toBeInTheDocument();
  });

  it('should have items with icons and text', async () => {
    const { getByText, container } = render(<ResourcesCard categ="financial" icon={faCube} />);
    await waitForElement(() => getByText('Student Jobs'));
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('should have two items', async () => {
    const { getByText, debug, getByTestId } = render(
      <ResourcesCard categ="financial" icon={faCube} />
    );
    await waitForElement(() => getByText('Student Jobs'));
    expect(getByTestId('resource-container').children).toHaveLength(5);
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
      await waitForElement(() => getByText('View more financial resources'));
    }
    {
      const { getByText } = render(<ResourcesCard categ="academic" icon={faCube} />);
      const AllAcademicLink = await waitForElement(() => getByText('View more academic resources'));
      expect(AllAcademicLink).toBeInTheDocument();

      // Google Analytics is setup and fires
      fireEvent.click(AllAcademicLink);
      expect(mockGAEvent).toHaveBeenCalled();
    }
  });

  it('should return "No resources available" when Resources data is empty', async () => {
    mockUseResourcesByQueue.mockReturnValue({
      data: { entityQueueTitle: 'hi', items: [] },
      loading: false,
      error: false
    });
    const { getByText } = render(<ResourcesCard categ="financial" icon={faCube} />);
    await waitForElement(() => getByText('No resources available.'));
  });
});

describe('with an InfoButton in the CardFooter', () => {
  const validIinfoButtonId = 'financial-resources';

  beforeEach(() => {
    mockUseResourcesByQueue.mockReturnValue(resourcesCardData);
  });

  test('does not display the button when the infoButtonData is missing it', async () => {
    mockAppContext.infoButtonData = [{ id: 'invalid-id', content: 'content', title: 'title' }];
    const { queryByTestId } = render(<ResourcesCard categ="financial" icon={faCube} />, {
      appContext: mockAppContext
    });

    const element = queryByTestId(validIinfoButtonId);
    expect(element).not.toBeInTheDocument();
  });

  test('displays the button when the infoButtonData is included', async () => {
    mockAppContext.infoButtonData = [
      { id: validIinfoButtonId, content: 'content', title: 'title' }
    ];
    const { getByTestId } = render(<ResourcesCard categ="financial" icon={faCube} />, {
      appContext: mockAppContext
    });

    const element = await waitForElement(() => getByTestId(validIinfoButtonId));
    expect(element).toBeInTheDocument();
  });
});
