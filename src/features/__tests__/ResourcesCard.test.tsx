import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, alterMock } from 'src/util/test-utils';
import { faCube, faStars } from '@fortawesome/pro-light-svg-icons';
import ResourcesCard from '../ResourcesCard';
import { ITSystemStatus } from '../it-systems-status/ITSystemStatus';
import { mockGAEvent, mockTrendingEvent } from 'src/setupTests';
import { State } from '@osu-wams/hooks';
import { RESOURCES_BY_QUEUE_API } from 'src/mocks/apis';

window.open = jest.fn();

const mockInitialState = jest.fn();
describe('<ResourcesCard />', () => {
  it('should render the appropriate title', async () => {
    const { findByText } = render(<ResourcesCard categ="financial" icon={faCube} />);
    expect(await findByText('Featured')).toBeInTheDocument();
  });

  it('should have items with icons and text', async () => {
    const { findByText, container } = render(<ResourcesCard categ="financial" icon={faCube} />);
    await findByText('Student Jobs');
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('should have two financial resources with audience of Student', async () => {
    const { findByText, getByTestId } = render(<ResourcesCard categ="financial" icon={faCube} />);
    await findByText('Student Jobs');
    expect(getByTestId('resource-container').children).toHaveLength(2);
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
    alterMock(RESOURCES_BY_QUEUE_API, {
      entityQueueTitle: 'Foo Bar',
      items: [],
    });
    const { findByText } = render(<ResourcesCard categ="financial" icon={faCube} />);
    expect(await findByText('No resources available.')).toBeInTheDocument();
  });

  it('should not open new window when clicking resource with IT System down', async () => {
    const { findByText } = render(
      <>
        <ResourcesCard categ="featured" icon={faStars} />
        <ITSystemStatus />
      </>
    );

    global.open = jest.fn();

    const BoxResource = await findByText('Box');
    expect(BoxResource).toBeInTheDocument();

    userEvent.click(BoxResource);
    expect(global.open).not.toHaveBeenCalled();
  });

  it('should have warning icon on resource if IT system is down', async () => {
    const { findByTestId, findByText } = render(
      <>
        <ResourcesCard categ="featured" icon={faStars} />
        <ITSystemStatus />
      </>
    );
    const BoxResource = await findByText('Box');

    expect(await findByTestId('warning-icon')).toBeInTheDocument();
  });

  it('should display warning message if resource with IT system down is clicked', async () => {
    const { findByText, findAllByText } = render(
      <>
        <ResourcesCard categ="featured" icon={faStars} />
        <ITSystemStatus />
      </>
    );
    await findByText('Featured');
    const BoxResource = await findAllByText('Box');
    userEvent.click(BoxResource[0]);
    expect(await findByText(/Resource may be unavailable/i)).toBeInTheDocument();
    expect(await findByText(/Performance Issues./i)).toBeInTheDocument();
  });
});

describe('with an InfoButton in the CardFooter', () => {
  it('does not display the button when the infoButtonData is missing it', async () => {
    mockInitialState.mockReturnValue([
      {
        state: State.infoButtonState,
        value: [{ content: '...', id: 'some-other-id', title: '...' }],
      },
    ]);
    const { queryByTestId } = render(<ResourcesCard categ="financial" icon={faCube} />, {
      initialStates: mockInitialState(),
    });

    const element = queryByTestId('financial-resources');
    expect(element).not.toBeInTheDocument();
  });

  it('displays the button when the infoButtonData is included', async () => {
    mockInitialState.mockReturnValue([
      {
        state: State.infoButtonState,
        value: [
          { content: 'Info Button Content', id: 'financial-resources', title: 'Info Button Title' },
        ],
      },
    ]);
    const { findByTestId } = render(<ResourcesCard categ="financial" icon={faCube} />, {
      initialStates: mockInitialState(),
    });

    expect(await findByTestId('financial-resources')).toBeInTheDocument();
  });
});
