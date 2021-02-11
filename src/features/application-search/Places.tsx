import React from 'react';
import styled from 'styled-components/macro';
import { faMapMarkerAlt } from '@fortawesome/pro-light-svg-icons';
import { Card, CardHeader, CardIcon, CardFooter } from 'src/ui/Card';
import { ListItemContentLink, ListItemText, ListItemContent } from 'src/ui/List';
import placeholderImage from 'src/assets/location-placeholder.png';
import { ExternalLink } from 'src/ui/Link';
import { Constants, useLocations } from '@osu-wams/hooks';
import { useRecoilValue } from 'recoil';
import { applicationSearchState } from 'src/state/applicationSearch';
import { Types } from '@osu-wams/lib';
import Url from 'src/util/externalUrls.data';
import { Event } from 'src/util/gaTracking';
import { ListCount, ListErrorMessage } from 'src/ui/ApplicationSearch/ListItem';

const LocationImage = styled.img`
  border-radius: 50%;
`;

const renderItems = (count: number, data: Types.Location[]) => {
  if (!data.length) {
    return (
      <ListItemContent compact>
        <ListItemText>No places found.</ListItemText>
      </ListItemContent>
    );
  }
  return data.slice(0, count).map(({ id, name, link, image }) => (
    <ListItemContentLink
      key={id}
      href={link || ''}
      onClick={() => Event('application-search-place', 'Individual place search link')}
      compact
    >
      <LocationImage src={image ? image : placeholderImage} alt={name} />
      <ListItemText>{name}</ListItemText>
    </ListItemContentLink>
  ));
};

const Places: React.FC = () => {
  const search = useRecoilValue(applicationSearchState);
  const { error, data } = useLocations(search, {
    ...Constants.REACT_QUERY_DEFAULT_CONFIG,
    enabled: !!search,
    retry: false,
  });
  return (
    <Card>
      <CardHeader title="Places" badge={<CardIcon icon={faMapMarkerAlt} />} />
      {error && ListErrorMessage('Failed searching for Places.', error)}
      {data && renderItems(5, data)}
      {data && ListCount(5, data)}
      <CardFooter>
        {search && (
          <ExternalLink
            href={Url.osuMap.main}
            onClick={() => Event('application-search-places', 'Footer external search link')}
          >
            Campus Map
          </ExternalLink>
        )}
      </CardFooter>
    </Card>
  );
};

export default Places;
