import React, { useState, useEffect, FC } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { faArrowRight } from '@fortawesome/pro-light-svg-icons';
import { Card, CardHeader, CardContent, CardFooter } from '../ui/Card';
import Icon from '../ui/Icon';
import Button from '../ui/Button';
import { Color, theme } from '../theme';

const ResourceContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto;
  grid-row-gap: 16px;
  grid-column-gap: 16px;
`;

const Resource = styled.a`
  :link,
  :visited,
  :hover,
  :active {
    text-decoration: none;
  }
  color: ${Color['black']};
  padding: 1.5rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  flex: 2;
  align-items: center;
  text-align: center;
  justify-content: center;
`;

const ResourceIconBorder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${theme.spacing.unit * 6}px;
  height: ${theme.spacing.unit * 6}px;
  border: 1px solid ${Color['neutral-300']};
  border-radius: 50%;
`;

const ResourceIcon = styled.img`
  padding: ${theme.spacing.unit}px;
`;

const getResources = (categ: string) =>
  getCategoryId(categ).then(categoryId =>
    Promise.all([
      categoryId,
      axios
        .get(
          `/api/resources${
            categoryId != 'all'
              ? `?category=1b9b7a4b-5a64-41af-a40a-8bb01abedd19,${categoryId}`
              : ''
          }`
        )
        .then(res => res.data)
    ]).then(res => res[1])
  );

const getCategoryId = (categ: string) =>
  axios
    .get('/api/resources/categories')
    .then(
      res => res.data.find((e: any) => e.attributes.name.toUpperCase() == categ.toUpperCase()).id
    );

/**
 * Resources Card
 *
 * Displays resources from a given set of categories
 */
const ResourcesCard: FC<{ categ: string }> = ({ categ }) => {
  const [resources, setResources] = useState<any>([]);
  const [categoryId, setCategoryId] = useState<any>('');
  const cardTitle = categ.charAt(0).toUpperCase() + categ.slice(1) + ' Resources';
  console.log(resources);

  // Populate resources and category ID
  useEffect(() => {
    getResources(categ)
      .then(setResources)
      .catch(console.log);
    getCategoryId(categ)
      .then(setCategoryId)
      .catch(console.log);
  }, []);

  return (
    <Card>
      <CardHeader title={cardTitle} />
      <CardContent>
        {resources.length ? (
          <ResourceContainer>
            {resources.map(({ id, attributes }) => (
              <Resource key={id} href={attributes.field_service_url.uri} target="_blank">
                <ResourceIconBorder>
                  <ResourceIcon src={attributes.icon} />
                </ResourceIconBorder>
                <>{attributes.title}</>
              </Resource>
            ))}
          </ResourceContainer>
        ) : (
          <EmptyState />
        )}
      </CardContent>
      {categoryId !== '' && (
        <CardFooter>
          <Button
            as="a"
            href={`/resources?category=${categoryId}`}
            bg={Color.transparent}
            fg={Color['pine-400']}
          >
            See all {categ} resources
            <Icon
              icon={faArrowRight}
              color={Color['pine-400']}
              style={{ marginLeft: `${theme.spacing.unit}px` }}
            />
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

// Todo: Replace with actual empty state when ready in mockups.
const EmptyState = () => <span>No resources available.</span>;

export default ResourcesCard;
