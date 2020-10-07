import React from 'react';
import { render, mockEmployeeUser, mockGradUser } from 'src/util/test-utils';
import userEvent from '@testing-library/user-event';
import { TrendingResources } from 'src/features/TrendingResources';
import { mockGAEvent } from 'src/setupTests';
import { Resources } from '@osu-wams/hooks';

const mockUseResources = jest.fn();
const mockUseTrendingResources = jest.fn();

const { resourcesData, trendingResourcesData } = Resources.mockResources;

jest.mock('@osu-wams/hooks', () => ({
  // @ts-ignore spreading object
  ...jest.requireActual('@osu-wams/hooks'),
  useResources: () => mockUseResources(),
  useTrendingResources: () => mockUseTrendingResources(),
}));

describe('Trending Resources Card', () => {
  beforeEach(() => {
    mockUseResources.mockReturnValue(resourcesData);
    mockUseTrendingResources.mockReturnValue(trendingResourcesData);
  });

  it('does not render when there are no trending resources', async () => {
    mockUseTrendingResources.mockReturnValue({ ...trendingResourcesData, data: [] });
    const { queryByText } = render(<TrendingResources />);
    expect(queryByText('Trending')).toBeNull();
  });

  it('Renders Trending Resources Card Title and the 1 active trending resource for the student', async () => {
    const { findByText, queryByText } = render(<TrendingResources />);
    expect(await findByText('Trending')).toBeInTheDocument();
    expect(await findByText('Student Jobs')).toBeInTheDocument();
    expect(queryByText('Employee Only')).toBeNull();
  });

  it('does not render a graduate student resource for the undergraduate student user', async () => {
    const { findByText, queryByText } = render(<TrendingResources />);
    expect(await findByText('Trending')).toBeInTheDocument();
    expect(await findByText('Student Jobs')).toBeInTheDocument();
    expect(queryByText('Employee Only')).toBeNull();
    expect(queryByText('Graduate Student Only')).toBeNull();
  });

  it('renders a graduate student resource for the graduate student user', async () => {
    const { findByText, queryByText } = render(<TrendingResources />, { user: mockGradUser });
    expect(await findByText('Trending')).toBeInTheDocument();
    expect(await findByText('Graduate Student Only')).toBeInTheDocument();
    expect(queryByText('Employee Only')).toBeNull();
    expect(queryByText('Student Jobs')).toBeNull();
  });

  it('Renders Trending Resources Card Title and the 1 active trending resource for the employee', async () => {
    const { findByText, queryByText } = render(<TrendingResources />, { user: mockEmployeeUser });
    expect(await findByText('Trending')).toBeInTheDocument();
    expect(await findByText('Employee Only')).toBeInTheDocument();
    expect(queryByText('Student Jobs')).toBeNull();
  });

  it('User can click on the resource and it sends a google analytics event', async () => {
    const { findByText } = render(<TrendingResources />);
    const resource = await findByText('Student Jobs');
    expect(resource).toBeInTheDocument();
    userEvent.click(resource);
    expect(mockGAEvent).toHaveBeenCalledTimes(1);
    var el = document.querySelector('a[href="/resources"]');
    if (el) {
      userEvent.click(el);
    }
    expect(mockGAEvent).toHaveBeenCalledTimes(2);
  });
});
