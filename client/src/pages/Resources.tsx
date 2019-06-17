import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PageTitle from '../ui/PageTitle';
import ResourcesCategories from '../features/resources/ResourcesCategories';
import ResourcesSearch from '../features/resources/ResourcesSearch';
import ResourcesList from '../features/resources/ResourcesList';

const getResources = query =>
  axios.get(`/api/services${query ? `?query=${query}` : ''}`).then(res => res.data);

const getResourcesByCategory = categoryId =>
  axios
    .get(`/api/services${categoryId !== 'all' ? `?category=${categoryId}` : ''}`)
    .then(res => res.data);

const Resources = () => {
  const [resources, setResources] = useState<any>([]);
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
      setSelectedCategory('1b9b7a4b-5a64-41af-a40a-8bb01abedd19');
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
