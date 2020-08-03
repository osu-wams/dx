import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { breakpoints } from 'src/theme';
import { SearchBar } from 'src/ui/SearchBar';
import {
  selectedCategoryState,
  resourceSearchState,
  debouncedResourceSearchState,
} from 'src/state/application';
import { useRecoilState, useSetRecoilState, useResetRecoilState } from 'recoil';

const ResourcesSearch: React.FC<any> = () => {
  const setQuery = useSetRecoilState(resourceSearchState);
  const [input, setInput] = useState('');
  const resetDebouncedQuery = useResetRecoilState(debouncedResourceSearchState);
  const [selectedCategory, setSelectedCategory] = useRecoilState(selectedCategoryState);

  const isDesktop = useMediaQuery({ query: `(min-width: ${breakpoints.small})` });

  const onChange = (event) => {
    const newValue = event.target.value;
    setInput(newValue);
    if (!newValue.length) resetDebouncedQuery();
    if (selectedCategory !== 'all') setSelectedCategory('all');
    // Expensive function, let it operate async, state updates will cause related values
    // to refresh and render to happen asap
    setTimeout(setQuery(newValue));
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
