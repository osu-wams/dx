import React from 'react';
import { render, mockEmployeeUser, mockGradUser } from 'src/util/test-utils';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { TrendingResources } from 'src/features/TrendingResources';
import { mockGAEvent } from 'src/setupTests';
import { State, Resources } from '@osu-wams/hooks';
import { Routes } from '@osu-wams/utils';

const mockInitialState = jest.fn();
window.open = jest.fn();

const { resourcesData } = Resources.mockResources;

describe('Trending Resources Card', () => {
  beforeEach(() => {
    mockInitialState.mockReturnValue([
      {
        state: State.resourceState,
        value: resourcesData,
      },
    ]);
  });

  it('does not render when there are no trending resources', async () => {
    render(<TrendingResources />, { initialStates: mockInitialState() });
    expect(screen.queryByText('Trending')).not.toBeInTheDocument();
  });

  it('Renders Trending Resources Card Title and the 1 active trending resource for the student', async () => {
    render(<TrendingResources />, {
      initialStates: mockInitialState(),
    });
    expect(await screen.findByText('Trending')).toBeInTheDocument();
    expect(screen.getByText('Student Jobs')).toBeInTheDocument();
    expect(screen.queryByText('Employee Only')).not.toBeInTheDocument();
  });

  it('does not render a graduate student resource for the undergraduate student user', async () => {
    render(<TrendingResources />, {
      initialStates: mockInitialState(),
    });
    expect(await screen.findByText('Trending')).toBeInTheDocument();
    expect(screen.getByText('Student Jobs')).toBeInTheDocument();
    expect(screen.queryByText('Employee Only')).not.toBeInTheDocument();
    expect(screen.queryByText('Graduate Student Only')).not.toBeInTheDocument();
  });

  it('renders a graduate student resource for the graduate student user', async () => {
    render(<TrendingResources />, {
      user: mockGradUser,
      initialStates: mockInitialState(),
    });
    expect(await screen.findByText('Trending')).toBeInTheDocument();
    expect(screen.getByText('Graduate Student Only')).toBeInTheDocument();
    expect(screen.queryByText('Employee Only')).not.toBeInTheDocument();
    expect(screen.queryByText('Student Jobs')).not.toBeInTheDocument();
  });

  it('Renders Trending Resources Card Title and the 1 active trending resource for the employee', async () => {
    render(<TrendingResources />, {
      user: mockEmployeeUser,
      initialStates: mockInitialState(),
    });
    expect(await screen.findByText('Trending')).toBeInTheDocument();
    expect(screen.getByText('Employee Only')).toBeInTheDocument();
    expect(screen.queryByText('Student Jobs')).not.toBeInTheDocument();
  });

  it('User can click on the resource and it sends a google analytics event', async () => {
    render(<TrendingResources />, { initialStates: mockInitialState() });
    expect(await screen.findByText('Trending')).toBeInTheDocument();
    const resource = screen.getByText('Student Jobs');
    expect(resource).toBeInTheDocument();
    userEvent.click(resource);
    expect(mockGAEvent).toHaveBeenCalledTimes(1);
    var el = document.querySelector(`a[href="${Routes.Routes('student').resources.fullPath}"]`);
    if (el) {
      userEvent.click(el);
    }
    expect(mockGAEvent).toHaveBeenCalledTimes(2);
  });
});
