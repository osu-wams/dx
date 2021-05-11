import React from 'react';
import styled from 'styled-components/macro';
import { faMapMarkerAlt } from '@fortawesome/pro-light-svg-icons';
import { Card, CardContent, CardHeader, CardIcon, CardFooter } from 'src/ui/Card';
import {
  ListItemContentLink,
  ListItemContentLinkName,
  ListItemText,
  ListItemContent,
} from 'src/ui/List';
import placeholderImage from 'src/assets/location-placeholder.png';
import { ExternalLink } from 'src/ui/Link';
import { State, Constants, useLocations } from '@osu-wams/hooks';
import { useRecoilValue } from 'recoil';
import { Types } from '@osu-wams/lib';
import { Url } from '@osu-wams/utils';
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
      href={link!}
      target="_blank"
      onClick={() => Event('application-search-place', 'Individual place search link')}
      compact
    >
      <LocationImage src={image ? image : placeholderImage} alt={name} />
      <ListItemText>
        <ListItemContentLinkName noPadding>{name}</ListItemContentLinkName>
      </ListItemText>
    </ListItemContentLink>
  ));
};

const Places: React.FC = () => {
  const search = useRecoilValue(State.applicationSearchState);
  const { error, data } = useLocations(search, {
    ...Constants.REACT_QUERY_DEFAULT_CONFIG,
    enabled: !!search,
    retry: false,
  });
  return (
    <Card>
      <CardHeader
        title="Places"
        badge={<CardIcon icon={faMapMarkerAlt} count={data?.length ?? 0} />}
      />
      <CardContent flush>
        {error && ListErrorMessage('Failed searching for Places.', error)}
        {data && renderItems(5, data)}
        {data && ListCount(5, data)}
      </CardContent>
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
