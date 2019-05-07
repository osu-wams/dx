import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import PageTitle from '../ui/PageTitle';
import ResourcesCategories from '../features/resources/ResourcesCategories';
import ResourcesSearch from '../features/resources/ResourcesSearch';
import ResourcesList from '../features/resources/ResourcesList';

const getResources = query =>
  axios.get(`/api/services${query ? `?query=${query}` : ''}`).then(res => res.data);

const getResourcesByCategory = categoryId =>
  axios
    .get(`/api/services${categoryId != 'all' ? `?category=${categoryId}` : ''}`)
    .then(res => res.data);

const Resources = () => {
  const [resources, setResources] = useState<any>([]);
  const [selectedCategory, setSelectedCategory] = useState<String>('all');

  const fetchResources = query => {
    getResources(query)
      .then(res => {
        setResources(res.data);
      })
      .catch(console.log);
  };

  const fetchResourcesByCategory = category => {
    getResourcesByCategory(category)
      .then(res => {
        setResources(res.data);
      })
      .catch(console.log);
  };

  return (
    <div data-testid="resources-page">
      <PageTitle title="Resources" />
      <ResourcesSearch onQueryChanged={fetchResources} setSelectedCategory={setSelectedCategory} />
      <ResourcesCategories
        onCategorySelected={fetchResourcesByCategory}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <ResourcesList resources={resources} />
    </div>
  );
};

export default Resources;
