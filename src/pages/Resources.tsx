import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';
import PageTitle from '../ui/PageTitle';
import { CardBase } from '../ui/Card';
import { theme } from '../theme';
import ResourcesCategories from '../features/resources/ResourcesCategories';
import ResourcesSearch from '../features/resources/ResourcesSearch';
import ResourcesList from '../features/resources/ResourcesList';
import { defaultCategoryId, useCategories, useResources } from '../api/resources';

//import type here
const Resources = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>(defaultCategoryId);
  const [query, setQuery] = useState<string>('');
  const categories = useCategories();
  const resources = useResources(
    query !== ''
      ? `?query=${query}`
      : `?category=${selectedCategory !== 'all' ? selectedCategory : ''}`
  );

  useEffect(() => {
    if(window.location.search.startsWith('?category=')){
      const terms = window.location.search.split('=')
      if(terms.length === 2){
        setSelectedCategory(terms[1]);
      }
    }
  }, []);

  return (
    <ResourcesWrapper data-testid="resources-page">
      <PageTitle title="Resources" />
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
            currentCategory={selectedCategory}
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
  );
};

const ResourcesWrapper = styled(CardBase)`
  padding: ${theme.spacing.unit * 2}px;
`;

export default Resources;
