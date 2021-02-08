import React from 'react';
import PageTitle from 'src/ui/PageTitle';
import { MainGridWrapper } from '../theme';
import { ThreeCol } from 'src/ui/Grids';
import {
  Filters,
  GoogleSearchResults,
  SearchResultListItem,
} from 'src/features/application-search';
import { filteredApplicationSearchState } from 'src/state/applicationSearch';
import { useRecoilValue } from 'recoil';
import { faUser } from '@fortawesome/pro-light-svg-icons';
import { Card, CardHeader, CardContent, CardIcon, CardFooter } from 'src/ui/Card';
import { ListItem, ListItemContentLink } from 'src/ui/List';
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
            <People /> <Places />
          </div>
        </div>
      </ThreeCol>
    </MainGridWrapper>
  );
};

export { Search };

const People: React.FC = () => {
  return (
    <Card>
      <CardHeader title="People" badge={<CardIcon icon={faUser} />} />
      <CardContent>
        <ListItemContentLink>Mauricio Cordoba</ListItemContentLink>
        <ListItemContentLink>Michael McDonald</ListItemContentLink>
        <ListItemContentLink>Josh Gum</ListItemContentLink>
      </CardContent>

      <CardFooter></CardFooter>
    </Card>
  );
};

const Places: React.FC = () => {
  return (
    <Card>
      <CardHeader title="Places" badge={<CardIcon icon={faUser} />} />
      <CardContent>
        <ListItem>Library</ListItem>
      </CardContent>

      <CardFooter></CardFooter>
    </Card>
  );
};
