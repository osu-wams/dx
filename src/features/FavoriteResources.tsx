import React, { useEffect, useState } from 'react';
import { Loading } from 'src/ui/Loading';
import { Types, User } from '@osu-wams/lib';
import { Card, CardHeader, CardContent, CardFooter, CardIcon } from '../ui/Card';
import { List } from 'src/ui/List';
import { faHeart } from '@fortawesome/pro-light-svg-icons';
import { Event } from 'src/util/gaTracking';
import FailedState from 'src/ui/FailedState';
import { InternalLink } from 'src/ui/Link';
import { EmptyState, EmptyStateImage, EmptyStateText } from 'src/ui/EmptyStates';
import { ResourceItem } from './resources/ResourceItem';
import { activeFavoriteResources } from './resources/resources-utils';
import favoritesImg from 'src/assets/favorites.svg';
import { resourceState, userState } from 'src/state';
import { useRecoilValue } from 'recoil';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { Resources } from '@osu-wams/hooks';

/**
 * Filters all resources to display a card with individuals FavoriteResources
 */
export const FavoriteResources = () => {
  const user = useRecoilValue(userState);
  const res = useRecoilValue(resourceState);
  const [favoriteResources, setFavoriteResources] = useState<
    (Types.FavoriteResource & { resource?: Types.Resource })[]
  >([]);
  const dashboardLink = `/${User.getAffiliation(user.data).toLowerCase()}`;

  useEffect(() => {
    if (user.data.favoriteResources && res.data && res.data.length > 0) {
      setFavoriteResources(activeFavoriteResources(user.data.favoriteResources, res.data));
      setFieldComponents(activeFavoriteResources(user.data.favoriteResources, res.data));
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

  const [fieldComponents, setFieldComponents] = useState<any[]>([]);
  const swapArrayElements = (elementsArray, startIndex, endIndex) => {
    const result = Array.from(elementsArray);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };
  const onDragEnd = (draggableItem) => {
    const droppedOutsideContainer = !draggableItem.destination;
    if (droppedOutsideContainer) {
      return;
    }

    const sourceIndex = draggableItem.source.index;
    const destinationIndex = draggableItem.destination.index;
    const reorderedComponentsList = swapArrayElements(
      fieldComponents,
      sourceIndex,
      destinationIndex
    );

    setFieldComponents(reorderedComponentsList);
  };

  useEffect(() => {
    const resources = fieldComponents.map(({ resource, active }, index) => ({
      resourceId: resource.id,
      active: active,
      order: index,
    }));

    if (resources.length > 1) {
      const fetchData = async () => {
        await Resources.postFavorite(resources);
      };
      fetchData();
    }
  }, [fieldComponents]);

  return (
    <Card>
      <CardHeader title="Favorites" badge={<CardIcon icon={faHeart} />} />
      <CardContent>
        {res.isLoading && <Loading lines={5} />}

        {!res.isLoading && favoriteResources?.length > 0 && (
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId={favoriteResources[0].resourceId}>
              {(provided) => (
                <List
                  data-testid="resource-container"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {fieldComponents.map(
                    ({ resource }, index) =>
                      resource && (
                        <ResourceItem
                          resource={resource}
                          event={() => Event('favorite-resources-card', resource.title)}
                          draggable
                          index={index}
                          key={resource.id}
                        />
                      )
                  )}
                  {provided.placeholder}
                </List>
              )}
            </Droppable>
          </DragDropContext>
        )}
        {!res.isLoading && !res.isError && favoriteResources?.length === 0 && <NoFavorites />}

        {!res.isLoading && res.isError && <FailedState>Oops, something went wrong!</FailedState>}
      </CardContent>
      <CardFooter infoButtonId="favorite-resources">
        <InternalLink
          to={`${dashboardLink}/resources?category=all`}
          onClick={() => Event('favorite-resources-card', `view all resources link`)}
        >
          View all resources
        </InternalLink>
      </CardFooter>
    </Card>
  );
};
