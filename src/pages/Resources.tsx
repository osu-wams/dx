import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PageTitle from '../ui/PageTitle';
import { CardBase } from '../ui/Card';
import { theme } from '../theme';
import ResourcesCategories from '../features/resources/ResourcesCategories';
import ResourcesSearch from '../features/resources/ResourcesSearch';
import ResourcesList from '../features/resources/ResourcesList';
import {
  getCategories,
  getResourcesByCategory,
  defaultCategoryId,
  IResourceResult,
  ICategory
} from '../api/resources';

//import type here
const Resources = () => {
  const [resources, setResources] = useState<IResourceResult[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [query, setQuery] = useState<String>('');

  useEffect(() => {
    let theCategoryId = defaultCategoryId;
    if (window.location.search.startsWith('?category=')) {
      const queryString = window.location.search.split('=');
      if (queryString.length === 2) {
        theCategoryId = queryString[1];
      }
    }
    setSelectedCategory(theCategoryId);
    getCategories()
      .then((data: ICategory[]) => {
        fetchResourcesByCategory(theCategoryId);
        setCategories(data);
      })
      .catch(console.log);
  }, []);

  const fetchResourcesByCategory = (category: string) => {
    getResourcesByCategory(category)
      .then((res: IResourceResult[]) => {
        setResources(res);
        setSelectedCategory(category);
      })
      .catch(console.log);
  };

  return (
    <ResourcesWrapper data-testid="resources-page">
      <PageTitle title="Resources" />
      {selectedCategory !== '' && (
        <>
          <ResourcesSearch
            setResources={setResources}
            setSelectedCategory={setSelectedCategory}
            setSearchTerm={(term: string) => setQuery(term)}
          />
          <ResourcesCategories
            fetchResourcesByCategory={fetchResourcesByCategory}
            selectedCategory={selectedCategory}
            categories={categories}
          />
        </>
      )}
      {query !== '' && (
        <StyledParagraph>
          Found {resources.length} resources for {query}
        </StyledParagraph>
      )}
      {resources.length > 0 ? (
        <ResourcesList resources={resources} />
      ) : (
        /* @TODO need mockup styling to do and messaging for no results */
        <div>No results</div>
      )}
    </ResourcesWrapper>
  );
};

const ResourcesWrapper = styled(CardBase)`
  padding: ${theme.spacing.unit * 2}px;
`;

const StyledParagraph = styled.p`
  font-size: 14px;
`;

export default Resources;
