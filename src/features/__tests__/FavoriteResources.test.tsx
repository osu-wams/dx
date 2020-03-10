import React from 'react';
import { render, authUser } from 'src/util/test-utils';
import userEvent from '@testing-library/user-event';
import { FavoriteResources } from 'src/features/FavoriteResources';
import { mockGAEvent, mockTrendingEvent } from 'src/setupTests';
import { Resources } from '@osu-wams/hooks';

const mockUseResources = jest.fn();
const mockPostFavorite = jest.fn();

const { resourcesData } = Resources.mockResources;

jest.mock('@osu-wams/hooks', () => {
  const original = jest.requireActual('@osu-wams/hooks');
  return {
    ...original,
    useResources: () => mockUseResources(),
    Resources: {
      ...original.Resources,
      postFavorite: () => mockPostFavorite()
    }
  };
});

describe('Favorite Resources Card', () => {
  beforeEach(() => {
    mockUseResources.mockReturnValue(resourcesData);
    // authUser.refreshFavorites = mockRefreshFavorites;
  });

  it('Empty State shows up when user has no Favorites', async () => {
    const noFavUser = { ...authUser, data: { ...authUser.data, favoriteResources: [] } };
    const { findByText, queryByText } = render(<FavoriteResources />, { user: noFavUser });
    expect(await findByText(/You have not added any favorite/i)).toBeInTheDocument();
    expect(queryByText('Academics for Student Athletes')).toBeNull();
  });

  it('Renders Favorite Resources Card Title and the 2 active favorite resources', async () => {
    const { findByText } = render(<FavoriteResources />);
    expect(await findByText('Favorite Resources')).toBeInTheDocument();

    expect(await findByText('Academics for Student Athletes')).toBeInTheDocument();

    expect(await findByText('Billing Information')).toBeInTheDocument();
  });

  it('User can click to remove item from favorites card', async () => {
    const { findByText } = render(<FavoriteResources />);

    // Billing Information is found...
    expect(await findByText('Billing Information')).toBeInTheDocument();
    var el = document.querySelector(
      `input[aria-label="Remove Billing Information link from your favorite resources"]`
    );
    userEvent.click(el);
    expect(await mockPostFavorite).toHaveBeenCalledTimes(1);
    expect(await authUser.refreshFavorites).toHaveBeenCalledTimes(1);

    // expect(queryByText('Billing Information')).toBeNull();
  });
});
