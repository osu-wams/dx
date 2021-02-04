import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import { breakpoints, spacing } from 'src/theme';
import { SearchBar } from 'src/ui/SearchBar';
import { Event } from 'src/util/gaTracking';
import { useRecoilValue } from 'recoil';
import useDebouncedSearchState from 'src/hooks/useDebouncedSearchState';
import {
  applicationSearchState,
  debouncedApplicationSearchState,
  filteredApplicationSearchState,
} from 'src/state/search';
import { SearchWrapper } from 'src/ui/SearchBar';
import { useNavigate, useMatch } from '@reach/router';

const HeaderSearchWrapper = styled.div`
  flex-grow: 1;
  padding-left: ${spacing.large};
  padding-right: ${spacing.large};
  @media (min-width: ${breakpoints.headerSearch}) {
    padding-right: 150px;
  }
  ${SearchWrapper} {
    margin: 0 auto;
  }
`;

const ApplicationSearch: React.FC<any> = () => {
  const { debouncedQuery, query, setQuery, resetDebouncedSearch } = useDebouncedSearchState({
    searchState: applicationSearchState,
    debouncedSearchState: debouncedApplicationSearchState,
    timeout: 250,
  });
  const filteredItems = useRecoilValue(filteredApplicationSearchState);
  const [input, setInput] = useState('');
  // const [selectedCategory, setSelectedCategory] = useRecoilState(selectedCategoryState);
  const match = useMatch('/search');
  const navigate = useNavigate();

  useEffect(() => {
    setInput(query);
    if (!match && query) {
      navigate('/search');
    }
  }, [query]);

  useEffect(() => {
    if (debouncedQuery) {
      // If a query has no results, emit a GA Event to track for improving items search
      if (filteredItems.length === 0) {
        Event('application-search-failed', debouncedQuery);
      }

      // Avoids sending single characters to Google Analytics
      if (debouncedQuery.length >= 2 && filteredItems.length > 0) {
        Event('application-search', debouncedQuery);
      }
    }
  }, [debouncedQuery, filteredItems]);

  const onChange = (event) => {
    const newValue = event.target.value;
    setInput(newValue);
    if (!newValue.length) resetDebouncedSearch();
    // if (selectedCategory !== 'all') setSelectedCategory('all');
    // Expensive function, let it operate async, state updates will cause related values
    // to refresh and render to happen asap
    setTimeout(() => setQuery(newValue));
  };

  return (
    <HeaderSearchWrapper>
      <SearchBar
        id="applicationSearch"
        labelText=""
        inputValue={input}
        onChange={onChange}
        // autoFocus={isDesktop ? true : false} // eslint-disable-line
      />
    </HeaderSearchWrapper>
  );
};

export default ApplicationSearch;
