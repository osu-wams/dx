import React, { useContext, useState, useEffect } from 'react';
import { ThemeContext } from 'styled-components/macro';
import { fal, faHeart } from '@fortawesome/pro-light-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import Checkbox from '@material-ui/core/Checkbox';
import { Resources } from '@osu-wams/hooks';
import { Types } from '@osu-wams/lib';
import { ListItemFlex, ListItemResourceLink, ListItemContentLinkName } from 'src/ui/List';
import { IconLookup } from './resources-utils';
import Icon from 'src/ui/Icon';
import { TrendingEvent } from './GATrendingResource';
import { Event } from 'src/util/gaTracking';
import { userState } from 'src/state/application';
import { useRecoilValue } from 'recoil';

// Adds all font awesome icons so we can call them by name (coming from Drupal API)
library.add(fal, fab);

const ResourceItem = ({ resource, event }: { resource: Types.Resource; event: any }) => {
  const themeContext = useContext(ThemeContext);
  const user = useRecoilValue(userState);
  const [favs, setFav] = useState(false);

  const isFavorite = (resId: string, favs: Types.FavoriteResource[]) => {
    const res: Types.FavoriteResource | undefined = favs.find(
      (r: Types.FavoriteResource) => r.resourceId === resId
    );
    return res?.active || false;
  };

  useEffect(() => {
    if (resource.id && user.data.favoriteResources) {
      setFav(isFavorite(resource.id, user.data.favoriteResources));
    }
  }, [user.data.favoriteResources, resource.id]);

  const favoriteLabelText = (currentFavState: boolean) => {
    return currentFavState
      ? `Remove ${resource.title} link from your favorite resources`
      : `Add ${resource.title} link to your favorite resources`;
  };

  // Adds or removes a resource from FavoriteResource and refreshes the cache to get new list
  const updateFavorites = async () => {
    await Resources.postFavorite(resource.id, !favs, 0);
    // TODO: add refreshing favorites call
    // await user.refreshFavorites();
    Event('favorite-resource', resource.id, favoriteLabelText(favs));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFav(event.target.checked);
    updateFavorites();
  };

  return (
    <ListItemFlex>
      <ListItemResourceLink
        href={resource.link}
        target="_blank"
        onClick={() => {
          event();
          if (!resource.excludeTrending) {
            TrendingEvent(resource, user.data);
          }
        }}
      >
        {IconLookup(resource.iconName, themeContext.features.resources.icon.color)}
        <ListItemContentLinkName>{resource.title}</ListItemContentLinkName>
      </ListItemResourceLink>
      <Checkbox
        icon={<Icon icon={faHeart} />}
        checkedIcon={<Icon icon={faHeart} color="#d73f09" />}
        value={resource.id}
        checked={favs}
        onChange={handleChange}
        inputProps={{
          'aria-label': favoriteLabelText(favs),
        }}
      />
    </ListItemFlex>
  );
};

export { ResourceItem };
