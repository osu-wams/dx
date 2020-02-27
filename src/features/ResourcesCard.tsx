import React, { FC, useContext, useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import { fal, faHeart, faHeartCircle } from '@fortawesome/pro-light-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { library, IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { UserContext } from '../App';
import { Card, CardHeader, CardContent, CardFooter, CardIcon } from '../ui/Card';
import { List, ListItem, ListItemContentLinkSVG, ListItemContentLinkName } from '../ui/List';
import { styled, ThemeContext } from '../theme';
import { InternalLink } from '../ui/Link';
import FailedState from '../ui/FailedState';
import { Event } from '../util/gaTracking';
import { Types } from '@osu-wams/lib';
import { User, useFavorites, Resources, useResourcesByQueue } from '@osu-wams/hooks';
import { IconLookup } from './resources/resources-utils';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

// import Favorite from '@material-ui/icons/Favorite';
// import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
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

  const favRes = useFavorites();

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (!user.loading && !res.loading) {
      const resourcesToUse = res.data?.items?.filter(r => hasAudience(user.data, r));
      setResources(resourcesToUse);
    }
  }, [res.data, res.loading, user.data, user.data.favoriteResources, user.loading]);
  /* eslint-enable react-hooks/exhaustive-deps */

  const cardTitle = res.data.entityQueueTitle + ' Resources';

  // For employee_featured, we don't want the employee part...
  if (categ.split('_')[1]) {
    categ = categ.split('_')[1];
  }

  // useEffect(() => {}, [user.data.favoriteResources]);
  const isFavorite = (resId: string, favs: any) => {
    // user.data.favoriteResources.toArray()
    const favResources = Object.values(favs) as any;
    // return favResources;
    // console.log(favs);
    // console.log(favResources);
    const res = favResources.find(r => r.resourceId === resId);
    if (res) {
      // console.log(res.active + ' ' + item.id);
      // console.log(res.active);

      return res.active;
    } else {
      // console.log('not active favResources:' + favResources + ' item id: ' + item.id);

      return false;
    }
  };

  return (
    <Card>
      <CardHeader title={cardTitle} badge={<CardIcon icon={icon} />} />
      <ResourcesContainer>
        {res.loading && <Skeleton count={5} />}

        {!res.loading && user.data.favoriteResources && resources?.length > 0 && (
          <List data-testid="resource-container">
            {/* {console.log(user.data.favoriteResources)} */}

            {resources.map(resource => (
              <ResourceItem
                key={resource.id}
                fav={{ fav: isFavorite(resource.id, user.data.favoriteResources) }}
                tes={{ odd: true }}
                resource={resource}
                categ={categ}
              />
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

const ResourceItem = ({ resource, tes, fav, categ }) => {
  const themeContext = useContext(ThemeContext);
  // const user = useContext<any>(UserContext);
  const item = resource;
  console.log(fav);
  // const isFavorite = (resId: string) => {
  //   // user.data.favoriteResources.toArray()
  //   const favResources = Object.values(fr) as any;
  //   // return favResources;
  //   console.log(favResources);
  //   const res = favResources.find(r => r.resourceId === resId);
  //   if (res) {
  //     console.log(res.active + ' ' + item.id);
  //     return res.active;
  //   } else {
  //     console.log('not active favResources:' + favResources + ' item id: ' + item.id);

  //     return false;
  //   }
  // };
  // console.log(fr);
  const [favs, setFav] = useState(fav.fav);

  // useEffect(() => {
  //   setFav(isFavorite(item.id));
  //   console.log(fav);
  // }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFav(event.target.checked);
    Resources.postFavorite(item.id, !fav.fav, 0);
  };

  return (
    <ListItem>
      <ListItemContentLinkSVG
        href={item.link}
        target="_blank"
        onClick={() => Event('resources-card', categ, item.title)}
      >
        {IconLookup(item.iconName, themeContext.features.resources.icon.color)}
        <ListItemContentLinkName>{item.title}</ListItemContentLinkName>
      </ListItemContentLinkSVG>
      {/* {console.log(fav + ' ' + isFavorite(item.id) + ' ' + item.title)} */}
      <Checkbox
        icon={<Icon icon={faHeart} />}
        checkedIcon={<Icon icon={faHeart} color="#d73f09" />}
        value={item.id}
        checked={favs}
        onChange={handleChange}
        // inputProps={{ 'aria-label': 'secondary checkbox' }}
      />
      {/* {console.log(isFavorite(resource.id))} */}
    </ListItem>
  );
};

// Todo: Replace with actual empty state when ready in mockups.
const EmptyState = () => <span>No resources available.</span>;

export default ResourcesCard;
