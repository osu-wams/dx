import React, { useContext, useState, useEffect } from 'react';
import { fal, faHeart } from '@fortawesome/pro-light-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import Checkbox from '@material-ui/core/Checkbox';
import { Resources } from '@osu-wams/hooks';
import { AppContext } from 'src/contexts/app-context';
import { ListItemFlex, ListItemResourceLink, ListItemContentLinkName } from 'src/ui/List';
import { ThemeContext } from 'src/theme';
import { IconLookup } from './resources-utils';
import Icon from 'src/ui/Icon';
import { TrendingEvent } from './GATrendingResource';

// Adds all font awesome icons so we can call them by name (coming from Drupal API)
library.add(fal, fab);

const ResourceItem = ({ resource, event }) => {
  const themeContext = useContext(ThemeContext);
  const [favs, setFav] = useState(false);
  const { user } = useContext(AppContext);
  const isFavorite = (resId: string, favs: any) => {
    const res = favs.find(r => r.resourceId === resId);
    return res ? res.active : false;
  };

  useEffect(() => {
    setFav(isFavorite(resource.id, user.data.favoriteResources));
  }, [user.data.favoriteResources, resource.id]);

  // Adds or removes a resource from FavoriteResource and refreshes the cache to get new list
  const updateFavorites = async () => {
    await Resources.postFavorite(resource.id, !favs, 0);
    await user.refreshFavorites();
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
          TrendingEvent(resource, user.data);
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
          'aria-label': favs
            ? `Remove ${resource.title} link from your favorite resources`
            : `Add ${resource.title} link to your favorite resources`
        }}
      />
    </ListItemFlex>
  );
};

export { ResourceItem };
