import React, { useEffect, useState, useContext } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Types } from '@osu-wams/lib';
import { Card, CardHeader, CardContent, CardFooter, CardIcon } from '../ui/Card';
import { List, ListItem, ListItemContentLinkSVG, ListItemContentLinkName } from '../ui/List';
import { faHeart } from '@fortawesome/pro-light-svg-icons';
import { ThemeContext } from 'src/theme';

import { Resources as hooksResources, useFavorites, useResources, User } from '@osu-wams/hooks';
import { UserContext } from 'src/App';
import { TrendingEvent } from './resources/GATrendingResource';
import { Event } from 'src/util/gaTracking';
import { IconLookup } from './resources/resources-utils';
import FailedState from 'src/ui/FailedState';
import { InternalLink } from 'src/ui/Link';
import { EmptyState } from 'src/ui/EmptyStates';

export const FavoriteResources = () => {
  const user = useContext(UserContext);
  const [query, setQuery] = useState<string>('');
  const res = useResources();
  const [favoriteResources, setFavoriteResources] = useState<any>([]);
  const themeContext = useContext(ThemeContext);
  const favRes = useFavorites();

  /**
   * Filter a list of resources where it has a category in its list matching the provided name
   * parameter unless the category is 'all'.
   * @param {string} name the category name to filter on
   * @param {Resource[]} resources a list of resources to inspect for matching category
   */
  // const filterFavorites = (resId: string, resources: Types.Resource[]): Types.Resource[] => {

  //   return resources.filter(
  //     resource =>
  //       resource.categories.findIndex(s => s.toLowerCase().includes(name.toLowerCase())) > -1
  //   );
  // };

  // const favoriteResources = res.data;

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (favRes && res.data.length > 0) {
      const favs = Object.values(favRes.data) as Types.FavoriteResource[];
      const onlyFavIds = [] as string[];
      // console.log(favs);
      favs.map(f => {
        // console.log(f);
        if (f.active === true) {
          onlyFavIds.push(f.resourceId);
        }
      });
      // console.log(onlyFavIds);
      // const fan = [] as any;
      const favorites = res.data.filter(f => {
        if (f !== undefined) {
          return onlyFavIds.includes(f.id) && f;
          // fan.push(f);
        }

        //   // fan.push(f);
      });
      console.log(favorites);
      // const fav = favs.filter(r => r.active === true);
      // if (res.data && user.data && user.data.favoriteResources > 0) {
      //   let filtered = res.data.filter(
      //     r => filterFavorites(user.data, r)
      //   );

      setFavoriteResources(favorites);
    }
  }, [res.data]);
  /* eslint-enable react-hooks/exhaustive-deps */

  return (
    <Card>
      <CardHeader title="Favorite Resources" badge={<CardIcon icon={faHeart} />} />
      <CardContent>
        {res.loading && <Skeleton count={5} />}

        {!res.loading && favoriteResources?.length > 0 && (
          <List data-testid="resource-container">
            {console.log(favoriteResources)}
            {favoriteResources.map(resource => (
              <ListItem key={resource.id}>
                <ListItemContentLinkSVG
                  href={resource.link}
                  target="_blank"
                  onClick={() => {
                    Event('favorite-resources-card', resource.title);
                    TrendingEvent(resource, user.data);
                  }}
                >
                  {IconLookup(resource.iconName, themeContext.features.resources.icon.color)}
                  <ListItemContentLinkName>{resource.title}</ListItemContentLinkName>
                </ListItemContentLinkSVG>
              </ListItem>
            ))}
          </List>
        )}
        {!res.loading && !res.error && favoriteResources?.length === 0 && <EmptyState />}

        {!res.loading && res.error && <FailedState>Oops, something went wrong!</FailedState>}
      </CardContent>
      {favoriteResources?.length > 0 && (
        <CardFooter infoButtonId="favorite-resources">
          <InternalLink
            to="/resources"
            onClick={() => Event('favorite-resources-card', `view all resources link`)}
          >
            View all resources
          </InternalLink>
        </CardFooter>
      )}
    </Card>
  );
};
