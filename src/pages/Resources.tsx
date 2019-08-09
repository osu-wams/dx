import React, { useState, useEffect } from 'react';
import PageTitle from '../ui/PageTitle';
import ResourcesCategories from '../features/resources/ResourcesCategories';
import ResourcesSearch from '../features/resources/ResourcesSearch';
import ResourcesList from '../features/resources/ResourcesList';
import { getResources, getResourcesByCategory, defaultCategoryId, IResourceResult } from '../api/resources';

//import type here
const Resources = () => {
  const [resources, setResources] = useState<Array<IResourceResult>>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  useEffect(() => {
    if (window.location.search.startsWith('?category=')) {
      const queryString = window.location.search.split('=');
      if (queryString.length === 2) {
        setSelectedCategory(queryString[1]);
      }
    } else {
      // Needed here because of async behavior in ResourcesCategories
      // Set selected category to 'popular' by default
      setSelectedCategory(defaultCategoryId);
    }
  }, []);

  const fetchResources = query => {
    getResources(query)
      .then(res => setResources(res))
      .catch(console.log);
  };

  const fetchResourcesByCategory = category => {
    getResourcesByCategory(category)
      .then(res => setResources(res))
      .catch(console.log);
  };

  return (
    <div data-testid="resources-page">
      <PageTitle title="Resources" />
      {selectedCategory !== '' && (
        <>
          <ResourcesSearch
            onQueryChanged={fetchResources}
            setSelectedCategory={setSelectedCategory}
          />
          <ResourcesCategories
            onCategorySelected={fetchResourcesByCategory}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </>
      )}
      {resources.length > 0 ? (
        <ResourcesList resources={resources} />
      ) : (
        /* @TODO need mockup styling to do and messaging for no results */
        <div>No results </div>
      )}
    </div>
  );
};

export default Resources;
