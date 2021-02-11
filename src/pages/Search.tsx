import React from 'react';
import PageTitle from 'src/ui/PageTitle';
import { MainGridWrapper } from '../theme';
import { ThreeCol } from 'src/ui/Grids';
import { Filters, GoogleSearchResults, People, Places } from 'src/features/application-search';
import SearchResultListItem from 'src/ui/ApplicationSearch/SearchResultListItem';
import { filteredApplicationSearchState } from 'src/state/applicationSearch';
import { useRecoilValue } from 'recoil';
import useAnnouncementsState from 'src/hooks/useAnnouncementsState';
import { ANNOUNCEMENT_PAGES } from 'src/state/announcements';

const Search = () => {
  useAnnouncementsState(ANNOUNCEMENT_PAGES.academics);
  useAnnouncementsState(ANNOUNCEMENT_PAGES.dashboard);
  useAnnouncementsState(ANNOUNCEMENT_PAGES.finances);
  const filteredItems = useRecoilValue(filteredApplicationSearchState);

  return (
    <MainGridWrapper data-testid="search-page">
      <ThreeCol>
        <div className="col-1">
          <div style={{ position: 'sticky', top: '30px' }}>
            <Filters />
          </div>
        </div>
        <div className="col-2">
          <PageTitle title="Search Results" />
          {filteredItems.length > 0 &&
            filteredItems.map((i) => (
              <SearchResultListItem key={`${i.item.type}-${i.item.id}`} searchResult={i} />
            ))}
          <GoogleSearchResults />
        </div>
        <div className="col-3">
          <div style={{ position: 'sticky', top: '30px' }}>
            <People />
            <Places />
          </div>
        </div>
      </ThreeCol>
    </MainGridWrapper>
  );
};

export default Search;
