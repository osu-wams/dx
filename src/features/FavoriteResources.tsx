import React, { useEffect, useState } from 'react';
import { Loading } from 'src/ui/Loading';
import { Types } from '@osu-wams/lib';
import { Card, CardHeader, CardContent, CardFooter, CardIcon } from '../ui/Card';
import { List } from 'src/ui/List';
import { faHeart } from '@fortawesome/pro-light-svg-icons';
import { useResources } from '@osu-wams/hooks';
import { Event } from 'src/util/gaTracking';
import FailedState from 'src/ui/FailedState';
import { InternalLink } from 'src/ui/Link';
import { EmptyState, EmptyStateImage, EmptyStateText } from 'src/ui/EmptyStates';
import { ResourceItem } from './resources/ResourceItem';
import { activeFavoriteResources } from './resources/resources-utils';
import favoritesImg from 'src/assets/favorites.svg';
import { userState } from 'src/state/application';
import { useRecoilValue } from 'recoil';

/**
 * Filters all resources to display a card with individuals FavoriteResources
 */
export const FavoriteResources = () => {
  const user = useRecoilValue(userState);
  const res = useResources();
  const [favoriteResources, setFavoriteResources] = useState<Types.Resource[]>([]);

  useEffect(() => {
    if (user.data.favoriteResources && res.data && res.data.length > 0) {
      setFavoriteResources(activeFavoriteResources(user.data.favoriteResources, res.data));
    }
  }, [res.data, user.data.favoriteResources]);

  const NoFavorites = () => (
    <EmptyState>
      <EmptyStateImage src={favoritesImg} alt="" />
      <EmptyStateText>
        You have not added any favorite resources yet. See all resources and pin your favorites
        here.
      </EmptyStateText>
    </EmptyState>
  );

  return (
    <Card>
      <CardHeader title="Favorites" badge={<CardIcon icon={faHeart} />} />
      <CardContent>
        {res.isLoading && <Loading lines={5} />}

        {!res.isLoading && favoriteResources?.length > 0 && (
          <List data-testid="resource-container">
            {favoriteResources.map((resource) => (
              <ResourceItem
                key={resource.id}
                resource={resource}
                event={() => Event('favorite-resources-card', resource.title)}
              />
            ))}
          </List>
        )}
        {!res.isLoading && !res.error && favoriteResources?.length === 0 && <NoFavorites />}

        {!res.isLoading && res.error && <FailedState>Oops, something went wrong!</FailedState>}
      </CardContent>
      <CardFooter infoButtonId="favorite-resources">
        <InternalLink
          to="/resources?category=all"
          onClick={() => Event('favorite-resources-card', `view all resources link`)}
        >
          View all resources
        </InternalLink>
      </CardFooter>
    </Card>
  );
};
