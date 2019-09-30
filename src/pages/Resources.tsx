import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';
import { CardBase } from '../ui/Card';
import { theme } from '../theme';
import ResourcesCategories from '../features/resources/ResourcesCategories';
import ResourcesSearch from '../features/resources/ResourcesSearch';
import ResourcesList from '../features/resources/ResourcesList';
import { defaultCategoryId, useCategories, useResources } from '../api/resources';
import { MainGridWrapper, MainGrid, MainGridCol } from '../ui/PageGrid';
import PageTitle from '../ui/PageTitle';
import { UserContext } from '../App';

//import type here
const Resources = () => {
  const user = useContext(UserContext);
  const [selectedCategory, setSelectedCategory] = useState<string>(getInitialCategory());
  const [query, setQuery] = useState<string>('');
  const categories = useCategories();
  const resources = useResources(
    query !== ''
      ? `?query=${query}`
      : `?category=${selectedCategory !== 'all' ? selectedCategory : ''}`,
    user
  );

  return (
    <MainGridWrapper>
      <PageTitle title="Resources" />
      <MainGrid>
        <MainGridCol className="col-span-2">
          <ResourcesWrapper data-testid="resources-page">
            {selectedCategory !== '' && (
              <>
                <ResourcesSearch
                  query={query}
                  setQuery={setQuery}
                  setSelectedCategory={setSelectedCategory}
                />
                {categories.loading && <Skeleton />}
                <ResourcesCategories
                  categories={categories.data}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                />
              </>
            )}
            {resources.loading && <Skeleton count={5} />}
            {!resources.loading && resources.data.length > 0 ? (
              <ResourcesList resources={resources.data} />
            ) : (
              !resources.loading && (
                /* @TODO need mockup styling to do and messaging for no results */
                <div>No results</div>
              )
            )}
          </ResourcesWrapper>
        </MainGridCol>
      </MainGrid>
    </MainGridWrapper>
  );
};

const getInitialCategory = () => {
  if (window.location.search.startsWith('?category=')) {
    const terms = window.location.search.split('=');
    if (terms.length === 2) {
      return terms[1];
    }
  }
  return defaultCategoryId;
};

const ResourcesWrapper = styled(CardBase)`
  padding: ${theme.spacing.unit * 2}px;
`;

export default Resources;
