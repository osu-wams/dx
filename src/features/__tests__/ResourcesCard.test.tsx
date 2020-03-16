import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, mockAppContext } from '../../util/test-utils';
import { faCube } from '@fortawesome/pro-light-svg-icons';
import ResourcesCard from '../ResourcesCard';
import { mockGAEvent, mockTrendingEvent } from '../../setupTests';
import { Resources } from '@osu-wams/hooks';

const { resourcesCardData } = Resources.mockResources;

const mockUseResourcesByQueue = jest.fn();
jest.mock('@osu-wams/hooks', () => {
  return {
    ...jest.requireActual('@osu-wams/hooks'),
    useResourcesByQueue: () => mockUseResourcesByQueue()
  };
});

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
    const { findByText, container } = render(<ResourcesCard categ="financial" icon={faCube} />);
    await findByText('Student Jobs');
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('should have two items', async () => {
    const { findByText, getByTestId } = render(<ResourcesCard categ="financial" icon={faCube} />);
    await findByText('Student Jobs');
    expect(getByTestId('resource-container').children).toHaveLength(3);
  });

  it('should have a clickable resource that fires GooglaAnalytics', async () => {
    const { findByText } = render(<ResourcesCard categ="financial" icon={faCube} />);
    const StudentJobsResource = await findByText('Student Jobs');
    userEvent.click(StudentJobsResource);
    expect(mockGAEvent).toHaveBeenCalledTimes(1);
    expect(mockTrendingEvent).toHaveBeenCalledTimes(1);
  });

  it('should have a link to all category resources', async () => {
    {
      const { findByText } = render(<ResourcesCard categ="financial" icon={faCube} />);
      await findByText('View more financial resources');
    }
    {
      const { findByText } = render(<ResourcesCard categ="academic" icon={faCube} />);
      const AllAcademicLink = await findByText('View more academic resources');
      expect(AllAcademicLink).toBeInTheDocument();

      // Google Analytics is setup and fires
      userEvent.click(AllAcademicLink);
      expect(mockGAEvent).toHaveBeenCalledTimes(1);
    }
  });

  it('should return "No resources available" when Resources data is empty', async () => {
    mockUseResourcesByQueue.mockReturnValue({
      data: { entityQueueTitle: 'hi', items: [] },
      loading: false,
      error: false
    });
    const { findByText } = render(<ResourcesCard categ="financial" icon={faCube} />);
    expect(await findByText('No resources available.')).toBeInTheDocument();
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

  test('displays the button when the infoButtonData is included', () => {
    mockAppContext.infoButtonData = [
      { id: validIinfoButtonId, content: 'content', title: 'title' }
    ];
    const { getByTestId } = render(<ResourcesCard categ="financial" icon={faCube} />, {
      appContext: mockAppContext
    });

    const element = getByTestId(validIinfoButtonId);
    expect(element).toBeInTheDocument();
  });
});
