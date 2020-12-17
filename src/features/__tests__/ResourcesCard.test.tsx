import React from 'react';
import userEvent from '@testing-library/user-event';
import { render } from 'src/util/test-utils';
import { faCube } from '@fortawesome/pro-light-svg-icons';
import ResourcesCard from '../ResourcesCard';
import { mockGAEvent, mockTrendingEvent } from 'src/setupTests';
import { infoButtonState } from 'src/state';

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
    // TODO: Reach into the MSW mock and (alterMock), and set the data.items to be empty?
    const { findByText } = render(<ResourcesCard categ="financial" icon={faCube} />);
    expect(await findByText('No resources available.')).toBeInTheDocument();
  });
});

describe('with an InfoButton in the CardFooter', () => {
  it('does not display the button when the infoButtonData is missing it', async () => {
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

  it('displays the button when the infoButtonData is included', async () => {
    mockInitialState.mockReturnValue([
      {
        state: infoButtonState,
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
