import React, { FC, useContext, useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import styled from 'styled-components';
import { fal } from '@fortawesome/pro-light-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { library, IconDefinition, findIconDefinition } from '@fortawesome/fontawesome-svg-core';
import { UserContext } from '../App';
import { Card, CardHeader, CardContent, CardFooter, CardIcon } from '../ui/Card';
import Icon from '../ui/Icon';
import { List, ListItem, ListItemContentLink } from '../ui/List';
import { Color, theme } from '../theme';
import { useResourcesByQueue } from '../api/resources';
import { InternalLink } from '../ui/Link';
import FailedState from '../ui/FailedState';
import { Event } from '../util/gaTracking';
import { hasAudience } from '../api/user';
import boxSync from '../assets/logo-box-sync.png';
import canvasLogo from '../assets/logo-canvas.png';
import gDrive from '../assets/logo-drive.png';
import gMail from '../assets/logo-gmail.png';
import zoom from '../assets/logo-zoom.png';

/**
 * Mappings for all the pngs we need for services that might be rendered on the page.
 */
const logoMapping = {
  'logo-box-sync': boxSync,
  'logo-canvas': canvasLogo,
  'logo-drive': gDrive,
  'logo-gmail': gMail,
  'logo-zoom': zoom
};

// Setup a font awesome library to use for searching for icons from the backend.
library.add(fal, fab);

const ResourcesContainer = styled(CardContent)`
  padding-bottom: 0;
`;

const ResourceName = styled.div`
  font-size: ${theme.fontSize[18]};
  color: ${Color['neutral-700']};
  padding-left: ${theme.spacing.unit * 2}px;
`;

const ResourceImg = styled.img`
  width: 3rem;
`;

const ResourceIcon = styled(Icon)`
  height: auto;
`;

/**
 * Resources Card
 *
 * Displays resources from a given categorY
 */
const ResourcesCard: FC<{ categ: string; icon: IconDefinition }> = ({ categ, icon }) => {
  const user = useContext<any>(UserContext);
  const res = useResourcesByQueue(categ);
  const [resources, setResources] = useState<any>([]);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (!user.loading && !res.loading) {
      const resourcesToUse = res.data.filter(resource => hasAudience(user.data, resource));
      setResources(resourcesToUse);
    }
  }, [res.data, res.loading, user.data, user.loading]);
  /* eslint-enable react-hooks/exhaustive-deps */

  const cardTitle = categ.charAt(0).toUpperCase() + categ.slice(1) + ' Resources';

  return (
    <Card>
      <CardHeader title={cardTitle} badge={<CardIcon icon={icon} />} />
      <ResourcesContainer>
        {res.loading && <Skeleton count={5} />}
        {!res.loading && resources.length > 0 && (
          <List data-testid="resource-container">
            {resources.map(resource => (
              <ListItem key={resource.id}>
                <ListItemContentLink
                  href={resource.link}
                  target="_blank"
                  onClick={() => Event('resources-card', categ, resource.title)}
                >
                  {resource.iconName !== undefined ? (
                    IconLookupCustom(resource.iconName)
                  ) : (
                    <ResourceIcon icon={fal.faCube} color={Color['neutral-550']} />
                  )}
                  <ResourceName>{resource.title}</ResourceName>
                </ListItemContentLink>
              </ListItem>
            ))}
          </List>
        )}

        {!res.loading && !res.error && resources.length === 0 && <EmptyState />}

        {!res.loading && res.error && <FailedState>Oops, something went wrong!</FailedState>}
      </ResourcesContainer>
      {resources.length > 0 && (
        <CardFooter infoButtonId={`${categ}-resources`}>
          <InternalLink
            to={`/resources?category=${categ.toLowerCase()}`}
            onClick={() => Event('resources-card', `view all ${categ} link`)}
          >
            View more {categ} resources
          </InternalLink>
        </CardFooter>
      )}
    </Card>
  );
};

// Todo: Replace with actual empty state when ready in mockups.
const EmptyState = () => <span>No resources available.</span>;

const IconLookupCustom = iconName => {
  const iconSplit = iconName.split('.');
  if (iconSplit[0] === 'fal' || iconSplit[0] === 'fab') {
    const lookupIconDefinition: IconDefinition = findIconDefinition({
      prefix: iconSplit[0],
      iconName: iconSplit[1]
    });
    return <Icon icon={lookupIconDefinition} color={Color['neutral-550']} />;
  } else if (iconSplit[0] === 'osu') {
    return <ResourceImg src={logoMapping[iconSplit[1]]} alt={iconSplit[1]} />;
  } else {
    return <Icon icon={fal.faCube} color={Color.black} />;
  }
};
export default ResourcesCard;
