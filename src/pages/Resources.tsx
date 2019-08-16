import React, { useState, useEffect } from 'react';
import PageTitle from '../ui/PageTitle';
import ResourcesCategories from '../features/resources/ResourcesCategories';
import ResourcesSearch from '../features/resources/ResourcesSearch';
import ResourcesList from '../features/resources/ResourcesList';
import { getCategories, getResourcesByCategory, defaultCategoryId } from '../api/resources';

const Resources = () => {
  const [resources, setResources] = useState<any>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [categories, setCategories] = useState<any>([]);

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
      .then(data => {
        fetchResourcesByCategory(theCategoryId);
        setCategories(data);
      })
      .catch(console.log);
  }, []);

  const fetchResourcesByCategory = category => {
    getResourcesByCategory(category)
      .then(res => {
        setResources(res);
        setSelectedCategory(category);
      })
      .catch(console.log);
  };

  return (
    <div data-testid="resources-page">
      <PageTitle title="Resources" />
      {selectedCategory !== '' && (
        <>
          <ResourcesSearch setResources={setResources} setSelectedCategory={setSelectedCategory} />
          <ResourcesCategories
            fetchResourcesByCategory={fetchResourcesByCategory}
            selectedCategory={selectedCategory}
            categories={categories}
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
