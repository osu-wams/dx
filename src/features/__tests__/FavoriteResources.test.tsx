import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render, authUser } from 'src/util/test-utils';
import { FavoriteResources } from 'src/features/FavoriteResources';
import { mockGAEvent } from 'src/setupTests';
import { Resources } from '@osu-wams/hooks';
import { resourceState } from 'src/state';

const mockInitialState = jest.fn();
const mockPostFavorite = jest.fn();

const { resourcesData } = Resources.mockResources;

jest.mock('@osu-wams/hooks', () => {
  const original = jest.requireActual('@osu-wams/hooks');
  return {
    ...original,
    Resources: {
      ...original.Resources,
      postFavorite: () => mockPostFavorite(),
    },
  };
});

describe('Favorite Resources Card', () => {
  beforeEach(() => {
    mockInitialState.mockReturnValue([
      {
        state: resourceState,
        value: resourcesData,
      },
    ]);
  });

  it('Empty State shows up when user has no Favorites', async () => {
    const noFavUser = { ...authUser, data: { ...authUser.data, favoriteResources: [] } };
    render(<FavoriteResources />, { user: noFavUser, initialStates: mockInitialState() });
    expect(await screen.findByText(/You have not added any favorite/i)).toBeInTheDocument();
    expect(screen.queryByText('Academics for Student Athletes')).not.toBeInTheDocument();
  });

  it('Renders Favorite Resources Card Title and the 2 active favorite resources', async () => {
    render(<FavoriteResources />, { initialStates: mockInitialState() });
    expect(screen.getByText('Favorites')).toBeInTheDocument();

    expect(screen.getByText('Academics for Student Athletes')).toBeInTheDocument();

    expect(screen.getByText('Billing Information')).toBeInTheDocument();
  });

  it('User can click to remove item from favorites card', async () => {
    render(<FavoriteResources />, { initialStates: mockInitialState() });

    // Billing Information is found...
    expect(screen.getByText('Billing Information')).toBeInTheDocument();
    const removeBilling = screen.getByLabelText(
      'Remove Billing Information link from your favorite resources'
    );
    userEvent.click(removeBilling);
    // Once for the removal, and another time for the resorting order of all resources
    expect(await mockPostFavorite).toHaveBeenCalledTimes(2);
    expect(await authUser.refreshFavorites).toHaveBeenCalledTimes(1);
    expect(mockGAEvent).toHaveBeenCalledTimes(1);
  });
});
