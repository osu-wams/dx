import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { breakpoints } from 'src/theme';
import { SearchBar } from 'src/ui/SearchBar';

const ResourcesSearch: React.FC<any> = ({ query, setQuery, setSelectedCategory }) => {
  const handleChange = (value) => {
    setQuery(value);
    setSelectedCategory('all');
  };

  const isDesktop = useMediaQuery({ query: `(min-width: ${breakpoints.small})` });

  return (
    <SearchBar
      id="resourcesSearch"
      labelText="Find resources"
      inputValue={query}
      onChange={(e) => handleChange(e.target.value)}
      autoFocus={isDesktop ? true : false} // eslint-disable-line
    />
  );
};

export default ResourcesSearch;
