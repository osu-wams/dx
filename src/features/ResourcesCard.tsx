import React, { FC } from 'react';
import Skeleton from 'react-loading-skeleton';
import styled from 'styled-components';
import { faCube, IconDefinition } from '@fortawesome/pro-light-svg-icons';
import { Card, CardHeader, CardContent, CardFooter, CardIcon } from '../ui/Card';
import Icon from '../ui/Icon';
import { List, ListItem, ListItemContentLink } from '../ui/List';
import { Color, theme } from '../theme';
import { useResourcesByQueue, useCategories } from '../api/resources';
import { InternalLink } from '../ui/Link';
import FailedState from '../ui/FailedState';

const ResourcesContainer = styled(CardContent)`
  padding-top: 0;
  padding-bottom: 0;
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

  const getCategoryId = data => data.filter((e: any) => e.name.toUpperCase() === categ.toUpperCase());
  const resources = useResourcesByQueue(categ);
  const categories = useCategories(getCategoryId);
  const cardTitle = categ.charAt(0).toUpperCase() + categ.slice(1) + ' Resources';

  return (
    <Card>
      <CardHeader
        title={cardTitle}
        badge={<CardIcon icon={icon} count={resources.data.length} />}
      />
      <ResourcesContainer>
        {categories.loading && <Skeleton count={5} />}
        {resources.data.length ? (
          <List data-testid="resource-container">
            {resources.data.map(resource => (
              <ListItem spaced key={resource.id}>
                <ListItemContentLink spaced href={resource.uri} target="_blank">
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
      {
        categories.data.length && categories.data[0].id !== '' && (
        <CardFooter infoButtonId={`${categ}-resources`}>
          <InternalLink to={`/resources?category=${categories.data[0].id}`}>
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
