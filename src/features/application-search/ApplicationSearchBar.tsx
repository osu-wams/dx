import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import { breakpoints, spacing } from 'src/theme';
import { SearchBar } from 'src/ui/SearchBar';
import { Event } from 'src/util/gaTracking';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  applicationSearchState,
  filteredApplicationSearchState,
} from 'src/state/applicationSearch';
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

const getSearchQuerystring = () => {
  if (window.location.search.startsWith('?q=')) {
    const terms = window.location.search.split('=');
    if (terms.length === 2) {
      return decodeURI(terms[1]);
    }
  }
};

const ApplicationSearchBar: React.FC<any> = () => {
  const [query, setQuery] = useRecoilState(applicationSearchState);
  const filteredItems = useRecoilValue(filteredApplicationSearchState);
  const [onSearchPage, setOnSearchPage] = useState(false);
  const [input, setInput] = useState('');
  // const [selectedCategory, setSelectedCategory] = useRecoilState(selectedCategoryState);
  const match = useMatch('/search');
  const navigate = useNavigate();

  // When a user visits the /search page directly, fetch an optionally provided query and set it
  useEffect(() => {
    const query = getSearchQuerystring();
    if (match && query) {
      setQuery(query);
    }
  }, []);

  /**
   * Manage the search field state flow;
   * - User visited search page directly, set local state to track that they are on the page
   * - User clicked an internal link navigating them away from Search page, clear the search
   *   field and reset local state.
   */
  useEffect(() => {
    if (!match && input) {
      setInput('');
    } else if (match && !onSearchPage) {
      setOnSearchPage(true);
    }
    if (!match) {
      setOnSearchPage(false);
    }
  }, [match]);

  /**
   * User typing in the search field state flow;
   * - In all cases, perform the query by setting local state for input
   * - Navigate the user to the search page if they are not already there and are
   *   typing in the search field
   * - Update the location querystring without causing the browser to navigate (history.pushState)
   *   to maintain bookmarkable searches, unless the effect is triggered by the user deleting the final
   *   character from the search field (query becomes falsy)
   */
  useEffect(() => {
    const queryString = getSearchQuerystring();
    if (query && query !== queryString) {
      window.history.pushState({ q: query }, `MyOregonState Search ${query}`, `?q=${query}`);
    } else if (!query && queryString) {
      window.history.pushState({ q: query }, 'MyOregonState Search', '?');
    }
    if (!onSearchPage && query) {
      navigate('/search');
      setOnSearchPage(true);
    }
    setInput(query);
  }, [query]);

  useEffect(() => {
    if (query) {
      // If a query has no results, emit a GA Event to track for improving items search
      if (filteredItems.length === 0) {
        Event('application-search-failed', query);
      }

      // Avoids sending single characters to Google Analytics
      if (query.length >= 2 && filteredItems.length > 0) {
        Event('application-search', query);
      }
    }
  }, [query, filteredItems]);

  const performSearch = () => {
    if (!onSearchPage && input) {
      // Google Custom Search isn't in scope when the user is not on the search page,
      // so it isn't able to render through the application state. Sadly, the user
      // has to be redirected to the search page for the results container to be rendered
      // and managed by the Google JS.
      navigate('/search', { state: { query: input } });
    } else {
      // While on the search page, set the query causing application state to operate and
      // results to render.
      setQuery(input);
    }
  };

  const onKeyDown = (event) => {
    if (event.code === 'Enter' && input) {
      performSearch();
    }
  };

  const onChange = (event) => {
    const newValue = event.target.value;
    setInput(newValue);
  };

  return (
    <HeaderSearchWrapper>
      <SearchBar
        id="applicationSearch"
        labelText=""
        inputValue={input}
        onChange={onChange}
        onKeyDown={onKeyDown}
        onClick={performSearch}
        // autoFocus={isDesktop ? true : false} // eslint-disable-line
      />
    </HeaderSearchWrapper>
  );
};

export default ApplicationSearchBar;
