import React from 'react';
import userEvent from '@testing-library/user-event';
import { render } from 'src/util/test-utils';
import { faCube } from '@fortawesome/pro-light-svg-icons';
import ResourcesCard from '../ResourcesCard';
import { mockGAEvent, mockTrendingEvent } from 'src/setupTests';
import { Resources } from '@osu-wams/hooks';
import { infoButtonState } from 'src/state';

const { resourcesCardData } = Resources.mockResources;
const mockInitialState = jest.fn();

const mockUseResourcesByQueue = jest.fn();
jest.mock('@osu-wams/hooks', () => {
  return {
    // @ts-ignore spread object
    ...jest.requireActual('@osu-wams/hooks'),
    useResourcesByQueue: () => mockUseResourcesByQueue(),
  };
});

describe('<ResourcesCard />', () => {
  // Set mock function result before running any tests
  beforeEach(() => {
    mockUseResourcesByQueue.mockReturnValue(resourcesCardData);
  });

  it('should render the appropriate title', async () => {
    const { getByText } = render(<ResourcesCard categ="financial" icon={faCube} />);
    expect(getByText('Featured')).toBeInTheDocument();
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
      error: false,
    });
    const { findByText } = render(<ResourcesCard categ="financial" icon={faCube} />);
    expect(await findByText('No resources available.')).toBeInTheDocument();
  });
});

describe('with an InfoButton in the CardFooter', () => {
  beforeEach(() => {
    mockUseResourcesByQueue.mockReturnValue(resourcesCardData);
  });

  test('does not display the button when the infoButtonData is missing it', async () => {
    mockInitialState.mockReturnValue([
      {
        state: infoButtonState,
        value: [{ content: '...', id: 'some-other-id', title: '...' }],
      },
    ]);
    const { queryByTestId } = render(<ResourcesCard categ="financial" icon={faCube} />, {
      initialStates: mockInitialState(),
    });

    const element = queryByTestId('financial-resources');
    expect(element).not.toBeInTheDocument();
  });

  test('displays the button when the infoButtonData is included', () => {
    mockInitialState.mockReturnValue([
      {
        state: infoButtonState,
        value: [
          { content: 'Info Button Content', id: 'financial-resources', title: 'Info Button Title' },
        ],
      },
    ]);
    const { getByTestId } = render(<ResourcesCard categ="financial" icon={faCube} />, {
      initialStates: mockInitialState(),
    });

    const element = getByTestId('financial-resources');
    expect(element).toBeInTheDocument();
  });
});
