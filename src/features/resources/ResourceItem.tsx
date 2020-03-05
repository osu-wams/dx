import React, { useContext, useState, useEffect } from 'react';
import { faHeart } from '@fortawesome/pro-light-svg-icons';
import Checkbox from '@material-ui/core/Checkbox';
import { Resources } from '@osu-wams/hooks';
import { UserContext } from 'src/App';
import { ListItemFlex, ListItemResourceLink, ListItemContentLinkName } from 'src/ui/List';
import { ThemeContext } from 'src/theme';
import { IconLookup } from './resources-utils';
import Icon from 'src/ui/Icon';
import { TrendingEvent } from './GATrendingResource';

const ResourceItem = ({ resource, event }) => {
  const themeContext = useContext(ThemeContext);
  const [favs, setFav] = useState(false);
  const user = useContext<any>(UserContext);
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
