import React, { FC, useContext } from 'react';
import Skeleton from 'react-loading-skeleton';
import styled from 'styled-components';
import { faCube, IconDefinition } from '@fortawesome/pro-light-svg-icons';
import { UserContext } from '../App';
import { Card, CardHeader, CardContent, CardFooter, CardIcon } from '../ui/Card';
import Icon from '../ui/Icon';
import { List, ListItem, ListItemContentLink } from '../ui/List';
import { Color, theme } from '../theme';
import { useResourcesByQueue, useCategories } from '../api/resources';
import { InternalLink } from '../ui/Link';
import FailedState from '../ui/FailedState';
import { Event } from '../util/gaTracking';

const ResourcesContainer = styled(CardContent)`
  /* padding-top: 1.6rem;
  padding-bottom: 0; */
`;

const ResourceName = styled.div`
  font-size: ${theme.fontSize[18]};
  color: ${Color['neutral-700']};
  padding-left: ${theme.spacing.unit * 2}px;
`;

const ResourceImg = styled.img`
  width: 3rem;
`;

const ResourceIcon = styled(Icon)`
  height: auto;
`;

/**
 * Resources Card
 *
 * Displays resources from a given set of categories
 */
const ResourcesCard: FC<{ categ: string; icon: IconDefinition }> = ({ categ, icon }) => {
  const user = useContext<any>(UserContext);
  const getCategoryId = data =>
    data.filter((e: any) => e.name.toUpperCase() === categ.toUpperCase());
  const resources = useResourcesByQueue(categ, user);
  const categories = useCategories(getCategoryId);
  const cardTitle = categ.charAt(0).toUpperCase() + categ.slice(1) + ' Resources';

  const validCategory = (): boolean => {
    return categories.data.length > 0 && categories.data[0].id !== '';
  };

  return (
    <Card>
      <CardHeader title={cardTitle} badge={<CardIcon icon={icon} />} />
      <ResourcesContainer>
        {categories.loading && <Skeleton count={5} />}
        {resources.data.length ? (
          <List data-testid="resource-container">
            {resources.data.map(resource => (
              <ListItem key={resource.id}>
                <ListItemContentLink
                  href={resource.uri}
                  target="_blank"
                  onClick={() => Event('resources-card', categ, resource.title)}
                >
                  {resource.icon !== undefined ? (
                    <ResourceImg src={resource.icon} />
                  ) : (
                    <ResourceIcon icon={faCube} color={Color.black} />
                  )}
                  <ResourceName>{resource.title}</ResourceName>
                </ListItemContentLink>
              </ListItem>
            ))}
          </List>
        ) : !categories.loading && !resources.error ? (
          <EmptyState />
        ) : (
          <FailedState>Oops, something went wrong!</FailedState>
        )}
      </ResourcesContainer>
      {validCategory() && (
        <CardFooter infoButtonId={`${categ}-resources`}>
          <InternalLink
            to={`/resources?category=${categories.data[0].name.toLowerCase()}`}
            onClick={() => Event('resources-card', `view all ${categ} link`)}
          >
            See all {categ} resources
          </InternalLink>
        </CardFooter>
      )}
    </Card>
  );
};

// Todo: Replace with actual empty state when ready in mockups.
const EmptyState = () => <span>No resources available.</span>;

export default ResourcesCard;
