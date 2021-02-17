import React, { useState, useEffect, useContext } from 'react';
import styled, { ThemeContext } from 'styled-components/macro';
import { faFilter } from '@fortawesome/pro-light-svg-icons';
import { breakpoints, spacing, fontSize as themeFontSize, borderRadius } from 'src/theme';
import { SearchBar } from 'src/ui/SearchBar';
import { Event } from 'src/util/gaTracking';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  applicationSearchMobileFilterState,
  applicationSearchState,
  filteredApplicationSearchState,
} from 'src/state/applicationSearch';
import { SearchWrapper } from 'src/ui/SearchBar';
import { useNavigate, useMatch } from '@reach/router';
import Icon from 'src/ui/Icon';
import { Mobile } from 'src/util/useMediaQuery';

const HeaderSearchWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  padding-left: ${spacing.large};
  padding-right: ${spacing.large};
  @media (min-width: ${breakpoints.headerSearch}) {
    padding-right: 150px;
  }
  ${SearchWrapper} {
    flex: 1;
    margin: 0 auto;
  }
`;

const SearchFilter = styled.div`
  background-color: ${({ theme }) => theme.ui.search.input.background};
  color: ${({ theme }) => theme.ui.input.default.color};
  padding: ${spacing.default};
  margin-left: ${spacing.medium};
  border-radius: ${borderRadius[8]};
  border: 1px solid ${({ theme }) => theme.ui.search.input.border.color};
`;

const getSearchQuerystring = () => {
  if (window.location.search.startsWith('?q=')) {
    const terms = window.location.search.split('=');
    if (terms.length === 2) {
      return decodeURI(terms[1]);
    }
  }
};

/**
 * !Important side-effect noted
 * Updates the history (updates browser location) to help establish bookmarkable/sharable urls.
 * ! Also sets ?q= prior to the GoogleSearchResults component coming into scope the first time, which
 * ! provides the term for the GCSE javascript to establish the first rendering of search results. Removing
 * ! this functionality will cause the first visit to the Search page (aside from direct visit to /search) to
 * ! not automatically use the search term for results
 * @param search the search term to use
 */
const updateHistory = (search: string) => {
  const queryString = getSearchQuerystring();
  if (search && search !== queryString) {
    window.history.pushState({ q: search }, `MyOregonState Search ${search}`, `?q=${search}`);
  } else if (!search && queryString) {
    window.history.pushState({ q: search }, 'MyOregonState Search', '?');
  }
};

const ApplicationSearchBar = ({ fontSize }: { fontSize?: string }) => {
  const themeContext = useContext(ThemeContext);
  const [search, setSearch] = useRecoilState(applicationSearchState);
  const setShowMobileFilter = useSetRecoilState(applicationSearchMobileFilterState);
  const filteredItems = useRecoilValue(filteredApplicationSearchState);
  const [onSearchPage, setOnSearchPage] = useState(false);
  const [input, setInput] = useState('');
  const navigatedToSearch = useMatch('/search');
  const navigate = useNavigate();

  // When a user visits the /search page directly, fetch optionally provided query and set it
  useEffect(() => {
    const query = getSearchQuerystring();
    if (navigatedToSearch && query) {
      setSearch(query);
    }
  }, []);

  // Side effects when browser is navigating to/from the /search page
  useEffect(() => {
    if (!navigatedToSearch && input) {
      // User has navigate away from /search, clear the input field
      setInput('');
    } else if (navigatedToSearch && !onSearchPage) {
      // User has navigated to /search, set onSearchPage to true
      setOnSearchPage(true);
    }
    if (!navigatedToSearch) {
      // User has navigated away from /search, set onSearchPage to false
      setOnSearchPage(false);
    }
  }, [navigatedToSearch]);

  // Side effects when search term is changed
  useEffect(() => {
    updateHistory(search);
    setInput(search);

    // Navigate to search page then set shared state to initiate a search
    if (!onSearchPage && search) {
      navigate('/search').then((_v) => setSearch(search));
    }
  }, [search]);

  // Track events in GA when search term is updated and items are filtered
  useEffect(() => {
    if (search) {
      // If a query has no results, emit a GA Event to track for improving items search
      if (filteredItems.length === 0) {
        Event('application-search-failed', search);
      }

      // Avoids sending single characters to Google Analytics
      if (search.length >= 2 && filteredItems.length > 0) {
        Event('application-search', search);
      }
    }
  }, [search, filteredItems]);

  const searchHandler = () => {
    if (!onSearchPage && input) {
      // Navigate to search page then set shared state to initiate a search
      navigate('/search').then((_v) => setSearch(input));
    } else {
      // While on the search page, set the query causing application state to operate and
      // results to render.
      setSearch(input);
    }
  };

  const onKeyDown = (event) => {
    if (event.code === 'Enter' && input) {
      searchHandler();
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
        onClick={searchHandler}
        fontSize={fontSize}
        // autoFocus={isDesktop ? true : false} // eslint-disable-line
      />
      <Mobile>
        <SearchFilter>
          <Icon
            icon={faFilter}
            color={themeContext.ui.search.icon.color}
            onClick={(e) => {
              setShowMobileFilter((v) => !v);
            }}
            fontSize={themeFontSize[24]}
          />
        </SearchFilter>
      </Mobile>
    </HeaderSearchWrapper>
  );
};

export default ApplicationSearchBar;
