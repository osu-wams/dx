import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
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
    render(<ResourcesCard categ="financial" icon={faCube} />);
    expect(await screen.findByText('Featured')).toBeInTheDocument();
  });

  it('should have items with icons and text', async () => {
    const { container } = render(<ResourcesCard categ="financial" icon={faCube} />);
    await screen.findByText('Student Jobs');
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('should have two financial resources with audience of Student', async () => {
    render(<ResourcesCard categ="financial" icon={faCube} />);
    await screen.findByText('Student Jobs');
    expect(screen.getByTestId('resource-container').children).toHaveLength(2);
  });

  it('should have a clickable resource that fires GooglaAnalytics', async () => {
    render(<ResourcesCard categ="financial" icon={faCube} />);
    const StudentJobsResource = await screen.findByText('Student Jobs');
    userEvent.click(StudentJobsResource);
    expect(mockGAEvent).toHaveBeenCalledTimes(1);
    expect(mockTrendingEvent).toHaveBeenCalledTimes(1);
  });

  it('financial resources should have a more financial resources link', async () => {
    render(<ResourcesCard categ="financial" icon={faCube} />);
    await screen.findByText('View more financial resources');
  });

  it('should have a link to all category resources', async () => {
    render(<ResourcesCard categ="academic" icon={faCube} />);
    const AllAcademicLink = await screen.findByText('View more academic resources');
    expect(AllAcademicLink).toBeInTheDocument();

    // Google Analytics is setup and fires
    userEvent.click(AllAcademicLink);
    expect(mockGAEvent).toHaveBeenCalledTimes(1);
  });

  it('should return "No resources available" when Resources data is empty', async () => {
    alterMock(RESOURCES_BY_QUEUE_API, {
      entityQueueTitle: 'Foo Bar',
      items: [],
    });
    render(<ResourcesCard categ="financial" icon={faCube} />);
    expect(await screen.findByText('No resources available.')).toBeInTheDocument();
  });

  it('should not open new window when clicking resource with IT System down', async () => {
    render(
      <>
        <ResourcesCard categ="featured" icon={faStars} />
        <ITSystemStatus />
      </>
    );

    global.open = jest.fn();
    const BoxResource = await screen.findAllByText('Box');
    expect(BoxResource).toHaveLength(2);
    userEvent.click(BoxResource[0]);
    expect(global.open).not.toHaveBeenCalled();
  });

  it('should have warning icon on resource if IT system is down', async () => {
    const { container } = render(
      <>
        <ResourcesCard categ="featured" icon={faStars} />
        <ITSystemStatus />
      </>
    );

    expect(await screen.findAllByText('Box')).toHaveLength(2);
    expect(await screen.findByTestId('warning-icon')).toBeInTheDocument();
    // makes sure class is present that styles the warning icon appropriately
    expect(container.querySelector('.warning-icon')).toBeInTheDocument();
  });

  it('should only have 1 warning icon, because only 1 resource is down', async () => {
    render(
      <>
        <ResourcesCard categ="featured" icon={faStars} />
        <ITSystemStatus />
      </>
    );
    await screen.findByText('Featured');
    // findAllBy* + toHaveLength(1) currently fails testing library linting for some reason, so we are sidestepping it
    const failingResources = await screen.findAllByTestId('warning-icon');
    expect(failingResources.length).toBe(1);
  });

  it('should display warning message if resource with IT system down is clicked', async () => {
    render(
      <>
        <ResourcesCard categ="featured" icon={faStars} />
        <ITSystemStatus />
      </>
    );
    await screen.findByText('Featured');
    const BoxResource = await screen.findAllByText('Box');
    userEvent.click(BoxResource[0]);
    expect(await screen.findByText(/Resource may be unavailable/i)).toBeInTheDocument();
    expect(await screen.findByText(/Performance Issues./i)).toBeInTheDocument();
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
    render(<ResourcesCard categ="financial" icon={faCube} />, {
      initialStates: mockInitialState(),
    });

    const element = screen.queryByTestId('financial-resources');
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
    render(<ResourcesCard categ="financial" icon={faCube} />, {
      initialStates: mockInitialState(),
    });

    expect(await screen.findByTestId('financial-resources')).toBeInTheDocument();
  });
});
