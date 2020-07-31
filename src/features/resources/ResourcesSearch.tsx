import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { breakpoints } from 'src/theme';
import { SearchBar } from 'src/ui/SearchBar';
import {
  selectedCategoryState,
  resourceSearchState,
  debouncedResourceSearchState,
} from 'src/state/application';
import { useRecoilState, useResetRecoilState } from 'recoil';

const ResourcesSearch: React.FC<any> = () => {
  const [query, setQuery] = useRecoilState(resourceSearchState);
  const resetDebouncedQuery = useResetRecoilState(debouncedResourceSearchState);
  const [selectedCategory, setSelectedCategory] = useRecoilState(selectedCategoryState);

  const isDesktop = useMediaQuery({ query: `(min-width: ${breakpoints.small})` });

  const onChange = (event) => {
    const newValue = event.target.value;
    if (!newValue.length) resetDebouncedQuery();
    if (selectedCategory !== 'all') setSelectedCategory('all');
    setQuery(event.target.value);
  };

  return (
    <SearchBar
      id="resourcesSearch"
      labelText="Find resources"
      inputValue={query}
      onChange={onChange}
      autoFocus={isDesktop ? true : false} // eslint-disable-line
    />
  );
};

export default ResourcesSearch;
