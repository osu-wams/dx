import React, { useState, useEffect, useContext } from 'react';
import styled, { ThemeContext } from 'styled-components/macro';
import { faFilter } from '@fortawesome/pro-light-svg-icons';
import { faFilter as solidFaFilter } from '@fortawesome/pro-solid-svg-icons';
import { breakpoints, spacing, fontSize as themeFontSize, borderRadius } from '@osu-wams/theme';
import { SearchBar } from 'src/ui/SearchBar';
import { Event } from 'src/util/gaTracking';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { SearchWrapper } from 'src/ui/SearchBar';
import { useNavigate, useMatch } from '@reach/router';
import Icon from 'src/ui/Icon';
import { Mobile } from 'src/hooks/useMediaQuery';
import { StyledBtn } from 'src/ui/CustomBtn';
import { Routes } from '@osu-wams/utils';
import { State } from '@osu-wams/hooks';

const {
  applicationSearchMobileFilterState,
  applicationSearchState,
  filteredApplicationSearchState,
  selectedTypeFilters,
  selectedAudienceFilters,
  selectedCampusFilters,
  fuseIndex,
} = State;

const HeaderSearchWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  padding-left: ${spacing.large};
  padding-right: ${spacing.large};
  @media (max-width: ${breakpoints.small}) {
    padding: 0 0 2rem 0;
  }
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
  const selectedTypes = useRecoilValue(selectedTypeFilters);
  const selectedAudiences = useRecoilValue(selectedAudienceFilters);
  const selectedCampuses = useRecoilValue(selectedCampusFilters);
  const searchIndex = useRecoilValue(fuseIndex);
  const [onSearchPage, setOnSearchPage] = useState(false);
  const [input, setInput] = useState('');
  const navigatedToSearch = useMatch(Routes.Routes().search.fullPath);
  const navigate = useNavigate();
  const queryTerm = getSearchQuerystring();

  const resetSearch = () => {
    setOnSearchPage(false);
    setSearch('');
    setInput('');
  };

  // When a user visits the /search page directly, fetch optionally provided query and set it
  useEffect(() => {
    if (navigatedToSearch && queryTerm) {
      setSearch(queryTerm);
    }

    // ApplicationSearchBar fell out of scope (mobile), so reset search
    return () => resetSearch();
  }, []);

  // Side effects when browser is navigating to/from the /search page
  useEffect(() => {
    if (!navigatedToSearch) {
      // User has navigated away from /search, reset search
      resetSearch();
    } else {
      // User has navigated to /search, set onSearchPage to true
      setOnSearchPage(true);

      // User comes back to the page with the back button
      if (!search && queryTerm) {
        setInput(queryTerm);
        setSearch(queryTerm);
      }
    }
  }, [navigatedToSearch]);

  // Side effects when search term is changed
  useEffect(() => {
    updateHistory(search);
    setInput(search);

    // Navigate to search page then set shared state to initiate a search
    if (!onSearchPage && !navigatedToSearch && search) {
      navigate(Routes.Routes().search.fullPath).then((_v) => setSearch(search));
    }
  }, [search]);

  // Typically when hitting back/forward in browser windows
  // Checks if queryTerm in url is the same as what is in state and sets the ui accordingly
  useEffect(() => {
    if (queryTerm && search !== queryTerm) {
      setInput(queryTerm);
      setSearch(queryTerm);
    }
  }, [queryTerm]);

  // Track events in GA when search term is updated and items are filtered
  useEffect(() => {
    if (search) {
      // If a query has no results, emit a GA Event to track for improving items search
      const records = searchIndex.getIndex()['records'];
      if (filteredItems.length === 0 && records?.length) {
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
      navigate(Routes.Routes().search.fullPath).then((_v) => setSearch(input));
    } else {
      // While on the search page, set the query causing application state to operate and
      // results to render.
      setSearch(input);
    }
  };

  const onKeyUp = (event) => {
    if (event.key === 'Enter' && input) {
      searchHandler();
    }
  };

  const onChange = (event) => {
    const newValue = event.target.value;
    setInput(newValue);
  };

  const filterCount = selectedAudiences.length + selectedCampuses.length + selectedTypes.length;
  return (
    <HeaderSearchWrapper>
      <SearchBar
        id="applicationSearch"
        data-testid="applicationSearch"
        labelText=""
        inputValue={input}
        onChange={onChange}
        onKeyUp={onKeyUp}
        onClick={searchHandler}
        fontSize={fontSize}
        // autoFocus={isDesktop ? true : false} // eslint-disable-line
      />
      <Mobile>
        <SearchFilter>
          <StyledBtn>
            <Icon
              data-testid="search-filter"
              color={
                filterCount
                  ? themeContext.ui.search.icon.selectedColor
                  : themeContext.ui.search.icon.color
              }
              icon={filterCount ? solidFaFilter : faFilter}
              onClick={(e) => {
                setShowMobileFilter((v) => !v);
              }}
              fontSize={themeFontSize[24]}
            />
          </StyledBtn>
        </SearchFilter>
      </Mobile>
    </HeaderSearchWrapper>
  );
};

export default ApplicationSearchBar;
