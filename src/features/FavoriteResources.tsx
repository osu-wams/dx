import React, { useEffect, useState, useContext } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Types } from '@osu-wams/lib';
import { Card, CardHeader, CardContent, CardFooter, CardIcon } from '../ui/Card';
import { List } from '../ui/List';
import { faHeart } from '@fortawesome/pro-light-svg-icons';
import { useResources } from '@osu-wams/hooks';
import { UserContext } from 'src/App';
import { Event } from 'src/util/gaTracking';
import FailedState from 'src/ui/FailedState';
import { InternalLink } from 'src/ui/Link';
import { EmptyState } from 'src/ui/EmptyStates';
import { ResourceItem } from './resources/ResourceItem';

export const FavoriteResources = () => {
  const user = useContext(UserContext);
  const res = useResources();
  const [favoriteResources, setFavoriteResources] = useState<Types.Resource[]>([]);

  useEffect(() => {
    if (user.data.favoriteResources && res.data.length > 0) {
      const hasActiveFavorite = resourceId =>
        user.data.favoriteResources.some(f => f.active && f.resourceId === resourceId);

      const favorites = res.data.filter(f => f !== undefined && hasActiveFavorite(f.id));

      setFavoriteResources(favorites);
    }
  }, [res.data, user.data.favoriteResources]);

  return (
    <Card>
      <CardHeader title="Favorite Resources" badge={<CardIcon icon={faHeart} />} />
      <CardContent>
        {res.loading && <Skeleton count={5} />}

        {!res.loading && favoriteResources?.length > 0 && (
          <List data-testid="resource-container">
            {console.log(favoriteResources)}
            {favoriteResources.map(resource => (
              <ResourceItem
                key={resource.id}
                resource={resource}
                event={() => Event('favorite-resources-card', resource.title)}
              />
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
