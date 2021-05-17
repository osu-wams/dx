import React, { useState, useEffect } from 'react';
import { State } from '@osu-wams/hooks';
import { useMediaQuery } from 'react-responsive';
import { breakpoints } from '@osu-wams/theme';
import { SearchBar } from 'src/ui/SearchBar';
import { Event } from 'src/util/gaTracking';
import { useRecoilState, useRecoilValue } from 'recoil';
import useDebouncedSearchState from 'src/hooks/useDebouncedSearchState';

const {
  selectedCategoryState,
  resourceSearchState,
  debouncedResourceSearchState,
  filteredResourcesState,
} = State;

const ResourcesSearch: React.FC<any> = () => {
  const { debouncedQuery, query, setQuery, resetDebouncedSearch } = useDebouncedSearchState({
    searchState: resourceSearchState,
    debouncedSearchState: debouncedResourceSearchState,
    timeout: 250,
  });
  const filteredResources = useRecoilValue(filteredResourcesState);
  const [input, setInput] = useState('');
  const [selectedCategory, setSelectedCategory] = useRecoilState(selectedCategoryState);

  const isDesktop = useMediaQuery({ query: `(min-width: ${breakpoints.small})` });

  useEffect(() => {
    setInput(query);
  }, [query]);

  useEffect(() => {
    if (debouncedQuery) {
      // If a query has no results, emit a GA Event to track for improving resources and synonyms
      if (filteredResources.length === 0) {
        Event('resource-search-failed', debouncedQuery);
      }

      // Avoids sending single characters to Google Analytics
      if (debouncedQuery.length >= 2 && filteredResources.length > 0) {
        Event('resource-search', debouncedQuery);
      }
    }
  }, [debouncedQuery, filteredResources]);

  const onChange = (event) => {
    const newValue = event.target.value;
    setInput(newValue);
    if (!newValue.length) resetDebouncedSearch();
    if (selectedCategory !== 'all') setSelectedCategory('all');
    // Expensive function, let it operate async, state updates will cause related values
    // to refresh and render to happen asap
    setTimeout(() => setQuery(newValue));
  };

  return (
    <SearchBar
      id="resourcesSearch"
      labelText="Find resources"
      inputValue={input}
      onChange={onChange}
      autoFocus={isDesktop ? true : false} // eslint-disable-line
    />
  );
};

export default ResourcesSearch;
