import React, { FC, useContext, useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import { fal, faHeart } from '@fortawesome/pro-light-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { library, IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { UserContext } from '../App';
import { Card, CardHeader, CardContent, CardFooter, CardIcon } from '../ui/Card';
import { List, ListItemFlex, ListItemContentLinkSVG, ListItemContentLinkName } from '../ui/List';
import { styled, ThemeContext } from '../theme';
import { InternalLink } from '../ui/Link';
import FailedState from '../ui/FailedState';
import { Event } from '../util/gaTracking';
import { Types } from '@osu-wams/lib';
import { User, Resources, useResourcesByQueue } from '@osu-wams/hooks';
import { IconLookup } from './resources/resources-utils';
import Checkbox from '@material-ui/core/Checkbox';
import Icon from 'src/ui/Icon';

// Setup a font awesome library to use for searching icons from the backend.
library.add(fal, fab);

const { hasAudience } = User;

const ResourcesContainer = styled(CardContent)`
  padding-bottom: 0;
`;

/**
 * Resources Card
 *
 * Displays resources from a given categorY
 */
const ResourcesCard: FC<{ categ: string; icon: IconDefinition }> = ({ categ, icon }) => {
  const user = useContext<any>(UserContext);
  const res = useResourcesByQueue(categ);
  const [resources, setResources] = useState<Types.Resource[]>([]);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (!user.loading && !res.loading) {
      const resourcesToUse = res.data?.items?.filter(r => hasAudience(user.data, r));
      setResources(resourcesToUse);
    }
  }, [res.data, res.loading, user.data, user.loading]);
  /* eslint-enable react-hooks/exhaustive-deps */

  const cardTitle = res.data.entityQueueTitle + ' Resources';

  // For employee_featured, we don't want the employee part...
  if (categ.split('_')[1]) {
    categ = categ.split('_')[1];
  }

  return (
    <Card>
      <CardHeader title={cardTitle} badge={<CardIcon icon={icon} />} />
      <ResourcesContainer>
        {res.loading && <Skeleton count={5} />}

        {!res.loading && !user.loading && resources?.length > 0 && (
          <List data-testid="resource-container">
            {resources.map(resource => (
              <ResourceItem key={resource.id} resource={resource} categ={categ} />
            ))}
          </List>
        )}

        {!res.loading && !res.error && resources?.length === 0 && <EmptyState />}

        {!res.loading && res.error && <FailedState>Oops, something went wrong!</FailedState>}
      </ResourcesContainer>
      {resources?.length > 0 && (
        <CardFooter infoButtonId={`${categ}-resources`}>
          <InternalLink
            to={`/resources?category=${categ.toLowerCase()}`}
            onClick={() => Event('resources-card', `view all ${categ} link`)}
          >
            View more {categ} resources
          </InternalLink>
        </CardFooter>
      )}
    </Card>
  );
};

const ResourceItem = ({ resource, categ }) => {
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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFav(event.target.checked);
    Resources.postFavorite(resource.id, !favs, 0);
  };

  return (
    <ListItemFlex>
      <ListItemContentLinkSVG
        href={resource.link}
        target="_blank"
        onClick={() => Event('resources-card', categ, resource.title)}
      >
        {IconLookup(resource.iconName, themeContext.features.resources.icon.color)}
        <ListItemContentLinkName>{resource.title}</ListItemContentLinkName>
      </ListItemContentLinkSVG>
      <Checkbox
        icon={<Icon icon={faHeart} />}
        checkedIcon={<Icon icon={faHeart} color="#d73f09" />}
        value={resource.id}
        checked={favs}
        onChange={handleChange}
        // inputProps={{ 'aria-label': 'secondary checkbox' }}
      />
    </ListItemFlex>
  );
};

// Todo: Replace with actual empty state when ready in mockups.
const EmptyState = () => <span>No resources available.</span>;

export default ResourcesCard;
