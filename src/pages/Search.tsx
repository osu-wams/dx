import React from 'react';
import { State, useAnnouncementsState } from '@osu-wams/hooks';
import PageTitle from 'src/ui/PageTitle';
import styled from 'styled-components/macro';
import { spacing } from '@osu-wams/theme';
import { MainGridWrapper, ThreeCol } from 'src/ui/grid';
import {
  ApplicationSearchBar,
  Filters,
  GoogleSearchResults,
  People,
  Places,
} from 'src/features/application-search';
import SearchResultListItem from 'src/ui/ApplicationSearch/SearchResultListItem';
import { useRecoilValue } from 'recoil';
import { Desktop, Mobile } from 'src/hooks/useMediaQuery';
import { FiltersMobile } from 'src/features/application-search/FiltersMobile';
import emptySearch from 'src/assets/empty-search.svg';
import { EmptyState, EmptyStateImage, EmptyStateText } from 'src/ui/EmptyStates';
import { Helpers } from '@osu-wams/utils';

const {
  ANNOUNCEMENT_PAGES,
  applicationSearchState,
  filteredApplicationSearchState,
  selectedTypeFilters,
  selectedAudienceFilters,
  selectedCampusFilters,
} = State;

const EmptyStateStyle = styled(EmptyState)({
  padding: `0 0 ${spacing.default} 0`,
});

const EmptySearchState = ({
  query,
  selectedTypes,
  selectedAudiences,
  selectedCampuses,
}: {
  query?: string;
  selectedTypes: string[];
  selectedAudiences: string[];
  selectedCampuses: string[];
}) => {
  const count = selectedTypes.length + selectedAudiences.length + selectedCampuses.length;
  const filtersSet = count ? `, with ${count} ${Helpers.singularPlural(count, 'filter')} set,` : '';
  return (
    <EmptyStateStyle>
      <EmptyStateImage src={emptySearch} alt="Search Icon" />
      {query ? (
        <EmptyStateText>{`Your search for "${query}"${filtersSet} did not return any results from within MyOregonState. See the results from an OSU web search below for possible matches.`}</EmptyStateText>
      ) : (
        <EmptyStateText>
          Perform a search using the search box at the top of the page.
        </EmptyStateText>
      )}
    </EmptyStateStyle>
  );
};

const Search = () => {
  useAnnouncementsState(ANNOUNCEMENT_PAGES.academics);
  useAnnouncementsState(ANNOUNCEMENT_PAGES.dashboard);
  useAnnouncementsState(ANNOUNCEMENT_PAGES.finances);
  const filteredItems = useRecoilValue(filteredApplicationSearchState);
  const query = useRecoilValue(applicationSearchState);
  const selectedTypes = useRecoilValue(selectedTypeFilters);
  const selectedAudiences = useRecoilValue(selectedAudienceFilters);
  const selectedCampuses = useRecoilValue(selectedCampusFilters);

  return (
    <MainGridWrapper data-testid="search-page">
      <Desktop>
        <ThreeCol>
          <div className="col-1">
            <div style={{ position: 'sticky', top: spacing.xl }}>
              <Filters />
            </div>
          </div>
          <div className="col-2">
            <PageTitle title="Search" />
            {filteredItems.length > 0 &&
              filteredItems.map((i) => (
                <SearchResultListItem key={`${i.item.type}-${i.item.id}`} searchResult={i} />
              ))}
            {(filteredItems.length === 0 || !query) &&
              EmptySearchState({ query, selectedAudiences, selectedCampuses, selectedTypes })}
            <GoogleSearchResults />
          </div>
          <div className="col-3">
            <div style={{ position: 'sticky', top: spacing.xl }}>
              <People />
              <Places />
            </div>
          </div>
        </ThreeCol>
      </Desktop>
      <Mobile>
        <PageTitle title="Search" />
        <ApplicationSearchBar />
        {filteredItems.length > 0 &&
          filteredItems.map((i) => (
            <SearchResultListItem key={`${i.item.type}-${i.item.id}`} searchResult={i} />
          ))}
        {(filteredItems.length === 0 || !query) &&
          EmptySearchState({ query, selectedAudiences, selectedCampuses, selectedTypes })}
        <People />
        <Places />
        <GoogleSearchResults />
        <FiltersMobile />
      </Mobile>
    </MainGridWrapper>
  );
};

export default Search;
